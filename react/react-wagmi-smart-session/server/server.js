import cors from 'cors';
import express from 'express';
import { isAddress, encodeFunctionData, toHex, parseEther } from "viem";
//import { SmartSessionGrantPermissionsResponse } from "@reown/appkit-experimental/smart-session";
import { privateKeyToAccount  } from "viem/accounts";
import { prepareCalls, handleFetchReceipt, sendPreparedCalls } from "./util/prepareCalls.js";

// get env variables
import dotenv from 'dotenv';
dotenv.config();
// get Project ID
const projectId = process.env.PROJECT_ID;

const storageABI = [
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const app = express();

// configure cors and sessions
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // frontend URLs
  credentials: true,
}))
app.use(express.json())
/* app.use(Session({
  name: 'smart-session',
  secret: "smart-session-secret",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, sameSite: true }
})); */


// get the signer public key
app.get('/api/signer', (req, res) => {
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


app.post('/api/create-smart-session', async (req, res) => {
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

    //setSmartSession({ grantedPermissions: permissions });
    console.log("permissions: ", permissions);

    const userAddress = permissions.address;
    //const chainId = permissions.chainId;
    const context = permissions.context;


    if (!userAddress || !isAddress(userAddress)) {
      throw new Error("Invalid User address");
    }
    const serverPrivateAccount = privateKeyToAccount(APPLICATION_PRIVATE_KEY);
    console.log("data: ", data);
    const prepareCallsArgs = {
      from: userAddress,
      chainId: toHex(data.chainId),
      calls: [
        {
          to: data.contractAddress,
          data: encodeFunctionData({
            abi: storageABI,
            functionName: "store",
            args: [321]
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

    const signature = await signatureCall(serverPrivateAccount, response.signatureRequest.hash);

    const sendPreparedCallsResponse = await sendPreparedCalls({
      context: response.context,
      preparedCalls: response.preparedCalls,
      signature: signature,
    });

    const userOpIdentifier = sendPreparedCallsResponse[0];

    const receipt = await handleFetchReceipt(userOpIdentifier);
    const txHash = receipt.receipts?.[0]?.transactionHash;
      
      const finalJSON = {
        message: `OK`,
        status: receipt.receipts?.[0]?.status === '0x1' ? 'success' : 'error',
        userOpIdentifier,
        txLink: txHash,
        value: data.args.value,
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


  // ------------------------------------------------------------

// Store sessions in memory at module level so they persist between requests
const smartSessions = new Map();

const setSmartSession = ({ grantedPermissions }) => {
  if (!grantedPermissions?.address) return;
  
  // Add session with expiry check
  smartSessions.set(grantedPermissions.address.toLowerCase(), {
    permissions: grantedPermissions,
    createdAt: Date.now(),
    expiresAt: grantedPermissions.expiry * 1000 // Convert UNIX timestamp to milliseconds
  });

  // Clean up expired sessions
  cleanExpiredSessions();
}

const getSmartSession = (address) => {
  if (!address) return null;
  
  const session = smartSessions.get(address.toLowerCase());
  if (!session) return null;

  // Check if session is expired
  if (Date.now() > session.expiresAt) {
    clearSmartSession(address);
    return null;
  }

  return session;
}

const clearSmartSession = (address) => {
  if (!address) return;
  smartSessions.delete(address.toLowerCase());
}

const cleanExpiredSessions = () => {
  const now = Date.now();
  for (const [address, session] of smartSessions.entries()) {
    if (now > session.expiresAt) {
      smartSessions.delete(address);
    }
  }
}



// start the server
const listener = app.listen(8080, () =>
	console.log('Listening on port ' + listener.address().port),
);