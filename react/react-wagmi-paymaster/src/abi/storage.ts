export const storageABI = [
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

export const storageAddress = "0x87f97d5Fa060eEB945eb24bB5035DACfB27682A2" // on base mainnet
export const storageAddressSepolia = "0xEe6D291CC60d7CeD6627fA4cd8506912245c8cA4" // on base sepolia
export const storageChainId = 8453 // hex chain id for base 8453