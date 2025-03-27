import cors from 'cors';
import express from 'express';
import { isAddress } from "viem";
import { SmartSessionGrantPermissionsResponse } from "@reown/appkit-experimental/smart-session";
import { privateKeyToAccount } from "viem/accounts";


// get env variables
import dotenv from 'dotenv';
dotenv.config();
// get Project ID
const projectId = process.env.PROJECT_ID;

const app = express();

// configure cors and sessions
app.use(cors({
  origin: 'http://localhost:5174', // frontend URL
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
app.get('/signer', (req, res) => {
  try {
    const APPLICATION_PRIVATE_KEY = process.env.APPLICATION_PRIVATE_KEY;
    if (!APPLICATION_PRIVATE_KEY) {
      return res.status(400).json({ message: "Missing required environment variables" });
    }
    const serverPrivateAccount = privateKeyToAccount(APPLICATION_PRIVATE_KEY);
    res.json(serverPrivateAccount.publicKey);
  } catch (err) {
    return res.status(500).json({ message: "Error getting application signer" });
  }
});


app.post('/create-smart-session"', async (req, res) => {
  try {
    const APPLICATION_PRIVATE_KEY = process.env.APPLICATION_PRIVATE_KEY;
    if (!APPLICATION_PRIVATE_KEY) {
      return res.status(400).json({ message: "Missing required environment variables" });
    }

    const { permissions } = req.body;

    if (!permissions) {
      return res.status(400).json({ message: "No permissions provided" });
    }

    const userAddress = permissions.address;

    if (!userAddress || !isAddress(userAddress)) {
      throw new Error("Invalid User address");
    }
    const serverPrivateAccount = privateKeyToAccount(APPLICATION_PRIVATE_KEY);

    const txHash = await createGame(account, userAddress);

    return res.status(200).json({ transactionHash: txHash });

  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({ 
      message: "An error occurred", 
      error: e.message 
    });
  }
  
  /* 
    try {
      if (!req.body.message) {
        return res.status(400).json({ error: 'SiweMessage is undefined' });
      }
      const message = req.body.message;

      const address = getAddressFromMessage(message);
      let chainId = getChainIdFromMessage(message);
      

// for the moment, the verifySignature is not working with social logins and emails  with non deployed smart accounts    

      const publicClient = createPublicClient(
        {
          transport: http(
            `https://rpc.walletconnect.org/v1/?chainId=${chainId}&projectId=${projectId}`
          )
        }
      );
      const isValid = await publicClient.verifyMessage({
        message,
        address,
        signature: req.body.signature
      });
// end o view verifyMessage      

      if (!isValid) {
        // throw an error if the signature is invalid
        throw new Error('Invalid signature');
      }
      if (chainId.includes(":")) {
        chainId = chainId.split(":")[1];
      }
      // Convert chainId to a number
      chainId = Number(chainId);

      if (isNaN(chainId)) {
          throw new Error("Invalid chainId");
      }
      
      // save the session with the address and chainId (SIWESession)
      req.session.siwe = { address, chainId };
      req.session.save(() => res.status(200).send(true));
    } catch (e) {
      // clean the session
      req.session.siwe = null;
      req.session.nonce = null;
      req.session.save(() => res.status(500).json({ message: e.message }));
    } */
  });


// start the server
const listener = app.listen(8080, () =>
	console.log('Listening on port ' + listener.address().port),
);