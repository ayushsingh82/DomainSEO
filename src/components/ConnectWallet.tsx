/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { getChainInfo, formatAddress, supportedChains } from '@/utils/wallet';

const ConnectWallet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getChainName = (chainId: number) => {
    const chainInfo = getChainInfo(chainId);
    return chainInfo.name;
  };

  // Prevent hydration mismatch by not rendering wallet-dependent content until mounted
  if (!isMounted) {
    return (
      <button
        className="font-medium py-1.5 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:opacity-80 text-sm"
        style={{ backgroundColor: '#C6FC7B', color: '#171717' }}
        disabled
      >
        Loading...
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-medium py-1.5 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:opacity-80 text-sm flex items-center gap-2"
          style={{ backgroundColor: '#C6FC7B', color: '#171717' }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          {formatAddress(address)}
          {chain && (
            <span className="text-xs opacity-70">({getChainName(chain.id)})</span>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border p-4 shadow-lg z-50" 
               style={{ backgroundColor: '#171717', borderColor: '#C6FC7B' }}>
            {/* Account Info */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: '#C6FC7B' }}>
                Connected Account
              </p>
              <p className="text-xs break-all" style={{ color: '#C6FC7B' }}>
                {address}
              </p>
              {chain && (
                <p className="text-xs mt-1 opacity-70" style={{ color: '#C6FC7B' }}>
                  Network: {getChainName(chain.id)} (ID: {chain.id})
                </p>
              )}
            </div>

            {/* Network Switching */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: '#C6FC7B' }}>
                Switch Network
              </p>
              <div className="space-y-2">
                {supportedChains.map((supportedChain) => (
                  <button
                    key={supportedChain.id}
                    onClick={() => switchChain({ chainId: supportedChain.id })}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                      chain?.id === supportedChain.id
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-800'
                    }`}
                    style={{ color: '#C6FC7B' }}
                    disabled={chain?.id === supportedChain.id}
                  >
                    {supportedChain.name}
                    {chain?.id === supportedChain.id && ' (Current)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Disconnect Button */}
            <button
              onClick={() => {
                disconnect();
                setIsOpen(false);
              }}
              className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
              style={{ backgroundColor: '#ff4444', color: 'white' }}
            >
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="font-medium py-1.5 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:opacity-80 text-sm"
        style={{ backgroundColor: '#C6FC7B', color: '#171717' }}
      >
        Connect Wallet
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border p-4 shadow-lg z-50"
             style={{ backgroundColor: '#171717', borderColor: '#C6FC7B' }}>
          <h3 className="text-lg font-medium mb-4" style={{ color: '#C6FC7B' }}>
            Connect Your Wallet
          </h3>
          
          <div className="space-y-3">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => {
                  connect({ connector });
                  setIsOpen(false);
                }}
                disabled={isPending}
                className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-800 disabled:opacity-50"
                style={{ color: '#C6FC7B', border: '1px solid #C6FC7B' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: '#C6FC7B', color: '#171717' }}>
                  {connector.name.charAt(0)}
                </div>
                <span className="font-medium">{connector.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t" style={{ borderColor: '#C6FC7B' }}>
            <p className="text-xs mb-2" style={{ color: '#C6FC7B' }}>
              Supported Networks:
            </p>
            <div className="space-y-1">
              {supportedChains.map((supportedChain) => (
                <div key={supportedChain.id} className="text-xs opacity-70" style={{ color: '#C6FC7B' }}>
                  • {supportedChain.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ConnectWallet;
