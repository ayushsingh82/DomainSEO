import { domaTestnet } from '@/config/wagmi';
import { sepolia, baseSepolia } from 'wagmi/chains';

export const supportedChains = [domaTestnet, sepolia, baseSepolia];

export const getChainInfo = (chainId: number) => {
  switch (chainId) {
    case 97476:
      return {
        name: 'Doma Testnet',
        symbol: 'ETH',
        explorer: 'https://explorer-doma-dev-ix58nm4rnd.t.conduit.xyz:443',
        rpc: 'https://rpc-testnet.doma.xyz'
      };
    case 11155111:
      return {
        name: 'Sepolia',
        symbol: 'ETH',
        explorer: 'https://sepolia.etherscan.io',
        rpc: 'https://rpc.sepolia.org'
      };
    case 84532:
      return {
        name: 'Base Sepolia',
        symbol: 'ETH',
        explorer: 'https://sepolia.basescan.org',
        rpc: 'https://sepolia.base.org'
      };
    default:
      return {
        name: 'Unknown',
        symbol: 'ETH',
        explorer: '',
        rpc: ''
      };
  }
};

export const formatAddress = (address: string, startChars = 6, endChars = 4) => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

export const addNetworkToMetaMask = async (chainId: number) => {
  if (!window.ethereum) {
    throw new Error('MetaMask not found');
  }

  const chainInfo = getChainInfo(chainId);
  const supportedChain = supportedChains.find(chain => chain.id === chainId);
  
  if (!supportedChain) {
    throw new Error('Unsupported chain');
  }

  try {
    await (window.ethereum as { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> }).request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: `0x${chainId.toString(16)}`,
        chainName: chainInfo.name,
        nativeCurrency: {
          name: 'Ether',
          symbol: chainInfo.symbol,
          decimals: 18,
        },
        rpcUrls: [chainInfo.rpc],
        blockExplorerUrls: chainInfo.explorer ? [chainInfo.explorer] : undefined,
      }],
    });
  } catch (error) {
    console.error('Failed to add network:', error);
    throw error;
  }
};
