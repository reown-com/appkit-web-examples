import cors from 'cors';
import express from 'express';
import { isAddress, encodeFunctionData, toHex, parseEther } from "viem";
//import { SmartSessionGrantPermissionsResponse } from "@reown/appkit-experimental/smart-session";
import { privateKeyToAccount , signMessage } from "viem/accounts";
import { prepareCalls, handleFetchReceipt, sendPreparedCalls } from "./util/prepareCalls.js";
import { storageABI } from "./config/index.ts";

// get env variables
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// configure cors and sessions
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // frontend URLs
  credentials: true,
}))
app.use(express.json())


// get the signer public key
app.get('/api/signer', (_, res) => {
  try {
    const APPLICATION_PRIVATE_KEY = process.env.APPLICATION_PRIVATE_KEY;
    if (!APPLICATION_PRIVATE_KEY) {
      return res.status(400).json({ message: "Missing required environment variables" });
    }

    const serverPrivateAccount = privateKeyToAccount(APPLICATION_PRIVATE_KEY);
    res.json({ publicKey: serverPrivateAccount.publicKey });
  } catch (err) {
    console.error("Error in /api/signer endpoint:", err);
    return res.status(500).json({ 
      message: "Error getting application signer",
      error: err.message 
    });
  }
});


app.post('/api/executeFunction', async (req, res) => {
  try {
    console.log("create-smart-session server");
    const APPLICATION_PRIVATE_KEY = process.env.APPLICATION_PRIVATE_KEY;
    if (!APPLICATION_PRIVATE_KEY) {
      return res.status(400).json({ message: "Missing required environment variables" });
    }

    const { permissions, data } = req.body;

    if (!permissions) {
      return res.status(400).json({ message: "No permissions provided" });
    }

    const userAddress = permissions.address;
    const context = permissions.context;

    if (!userAddress || !isAddress(userAddress)) {
      throw new Error("Invalid User address");
    }
    
    // make the prepare calls
    const response = await makePrepareCalls(userAddress, data.chainId, data.contractAddress, storageABI, data.functionName, context);
    
    console.log("response: ", response);
    // sign the hash
    const signature = await signatureCall(APPLICATION_PRIVATE_KEY, response.signatureRequest.hash);

    // send the prepared calls
    const sendPreparedCallsResponse = await sendPreparedCalls({
      context: response.context,
      preparedCalls: response.preparedCalls,
      signature: signature,
    });

    const userOpIdentifier = sendPreparedCallsResponse[0];

    // get the receipt
    const receipt = await handleFetchReceipt(userOpIdentifier);
    const txHash = receipt.receipts?.[0]?.transactionHash;

    const finalJSON = {
      message: `OK`,
      status: receipt.receipts?.[0]?.status === '0x1' ? 'success' : 'error',
      userOpIdentifier,
      txLink: txHash
    };
    return res.status(200).json({ finalJSON });

  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({ 
      message: "An error occurred", 
      error: e.message 
    });
  }
  
  });

const signatureCall = async (privateKey, messageHash) => {
  return await signMessage({
    privateKey: privateKey,
    message: { raw: messageHash },
  });
}


const makePrepareCalls = async (userAddress, chainId, contractAddress, abi, functionName, context) => {
  const prepareCallsArgs = {
    from: userAddress,
    chainId: toHex(chainId),
    calls: [
      {
        to: contractAddress,
        data: encodeFunctionData({
          abi: abi,
          functionName: functionName,
          args: [Math.floor(Math.random() * 1000) + 1]
        }),
        value: parseEther("0") // in case of a transfer parseEther("0.0001"),
      }
    ],
    capabilities: {
      permissions: { context: context }
    }
  }
  const prepareCallsResponse = await prepareCalls(prepareCallsArgs);

  if (prepareCallsResponse.length !== 1 && prepareCallsResponse[0]) {
    throw new Error("Invalid response type");
  }
  const response = prepareCallsResponse[0];
  if (!response || response.preparedCalls.type !== "user-operation-v07") {
    throw new Error("Invalid response type");
  }

  return response;
}


// start the server
const listener = app.listen(8080, () =>
	console.log('Listening on port ' + listener.address().port),
);