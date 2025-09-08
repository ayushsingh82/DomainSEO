import { createConfig, http } from 'wagmi';
import { sepolia, baseSepolia } from 'wagmi/chains';
import { metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors';

// Define Doma Testnet chain
export const domaTestnet = {
  id: 97476,
  name: 'Doma Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.doma.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Doma Explorer',
      url: 'https://explorer-doma-dev-ix58nm4rnd.t.conduit.xyz:443',
    },
  },
  testnet: true,
} as const;

export const config = createConfig({
  chains: [domaTestnet, sepolia, baseSepolia],
  connectors: [
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '2987b6292605d325403d9c0a4c2c3c80',
    }),
    coinbaseWallet({
      appName: 'samxdom',
    }),
  ],
  transports: {
    [domaTestnet.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
});
