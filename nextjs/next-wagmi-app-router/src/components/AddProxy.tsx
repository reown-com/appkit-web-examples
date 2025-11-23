'use client';

import { useAppKitAccount } from '@reown/appkit/react';
import type { JSX } from 'react';
import { useWriteContract } from 'wagmi';
import { dataHavenTestnet } from '../config';
import { defineChain } from 'viem';

export const ABI = [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'delegate',
          type: 'address',
        },
        {
          internalType: 'enum Proxy.ProxyType',
          name: 'proxyType',
          type: 'uint8',
        },
        {
          internalType: 'uint32',
          name: 'delay',
          type: 'uint32',
        },
      ],
      name: 'addProxy',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'real',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'delegate',
          type: 'address',
        },
        {
          internalType: 'enum Proxy.ProxyType',
          name: 'proxyType',
          type: 'uint8',
        },
        {
          internalType: 'uint32',
          name: 'delay',
          type: 'uint32',
        },
      ],
      name: 'isProxy',
      outputs: [
        {
          internalType: 'bool',
          name: 'exists',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'real',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'callTo',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'callData',
          type: 'bytes',
        },
      ],
      name: 'proxy',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'real',
          type: 'address',
        },
        {
          internalType: 'enum Proxy.ProxyType',
          name: 'forceProxyType',
          type: 'uint8',
        },
        {
          internalType: 'address',
          name: 'callTo',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'callData',
          type: 'bytes',
        },
      ],
      name: 'proxyForceType',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'removeProxies',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'delegate',
          type: 'address',
        },
        {
          internalType: 'enum Proxy.ProxyType',
          name: 'proxyType',
          type: 'uint8',
        },
        {
          internalType: 'uint32',
          name: 'delay',
          type: 'uint32',
        },
      ],
      name: 'removeProxy',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ] as const;

export const PROXY_CONTRACT_ADDRESS =
  '0x000000000000000000000000000000000000080b';


const viemDataHavenTestnet =defineChain({
  id: 55931,
  name: "DataHaven Testnet",
  chainNamespace: 'eip155',
  caipNetworkId: `eip155:55931`,
  testnet: true,
  nativeCurrency: {
    name: "MOCK",
    symbol: "MOCK",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://services.datahaven-testnet.network/testnet'] },
    public: { http: ['https://services.datahaven-testnet.network/testnet'] },
  },
  blockExplorers: {
    default: {
      name: "DataHaven Testnet",
      url: "https://polkadot.js.org/apps?rpc=wss://services.datahaven-testnet.network/testnet#/explorer/query/",
    },
  },
});

export const AddProxy = (): JSX.Element => {
  const { address, isConnected, status } = useAppKitAccount();

  console.count('--------------------------------');
  console.log('address', address);
  console.log('isConnected', isConnected);
  console.log('status', status);
  console.log('--------------------------------');

  const { writeContract, data, isPending, isError, error } = useWriteContract();

  const addProxy = async () => {
    writeContract({
      chain: viemDataHavenTestnet,
      address: PROXY_CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'addProxy',
      args: ['0xd693b7ed1f6d6e93983fdc3135f6b2ba771078ac', 0, 0],
      gas: 1000000n,
    });
  };

  return (
    <>
      <button onClick={() => addProxy()}>Add Proxy</button>
      {isPending && <div>Adding proxy...</div>}
      {isError && <div>Error: {error?.message}</div>}
      {data && <div>Proxy added: {data.toString()}</div>}
    </>
  );
};
