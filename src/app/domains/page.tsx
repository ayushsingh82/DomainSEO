'use client';

import { useMemo, useState } from 'react';

type OrderbookItem = {
  id: string;
  domain: string;
  tld: string;
  imageUrl?: string;
  floorPriceEth: number;
  lastSaleEth?: number;
  buyNowEth?: number;
};

export default function DomainsPage() {
  const [query, setQuery] = useState('');

  const items: OrderbookItem[] = useMemo(
    () => [
      {
        id: '1',
        domain: 'crypto.eth',
        tld: 'eth',
        imageUrl: '/globe.svg',
        floorPriceEth: 1.2,
        lastSaleEth: 1.0,
        buyNowEth: 1.3,
      },
      {
        id: '2',
        domain: 'nft.eth',
        tld: 'eth',
        imageUrl: '/window.svg',
        floorPriceEth: 0.8,
        lastSaleEth: 0.75,
      },
      {
        id: '3',
        domain: 'ai.dom',
        tld: 'dom',
        imageUrl: '/file.svg',
        floorPriceEth: 2.4,
        lastSaleEth: 2.1,
        buyNowEth: 2.5,
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.domain.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Explore Domains</h1>
        <p className="text-base mt-3" style={{ color: '#6B7280' }}>
          Live data sourced from the Doma orderbook. Use Buy Now or Make Offer.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8 flex gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search domain (e.g., crypto.eth)"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
          style={{ borderColor: '#C6FC7B', color: '#0D2818', backgroundColor: '#FFFFFF' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-2xl p-6 border-2 transition-transform hover:scale-[1.01]" style={{ borderColor: '#0D2818' }}>
            <div className="flex items-center gap-3 mb-5">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt={item.domain} className="w-12 h-12 rounded" />
              ) : (
                <div className="w-12 h-12 rounded bg-gray-200" />
              )}
              <div>
                <div className="text-2xl font-bold" style={{ color: '#0D2818' }}>{item.domain}</div>
                <div className="text-xs uppercase tracking-wide" style={{ color: '#6B7280' }}>{item.tld}</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="font-medium" style={{ color: '#0D2818' }}>Floor</span>
                <span className="font-semibold" style={{ color: '#0D2818' }}>{item.floorPriceEth} ETH</span>
              </div>
              {item.lastSaleEth !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium" style={{ color: '#0D2818' }}>Last Sale</span>
                  <span style={{ color: '#0D2818' }}>{item.lastSaleEth} ETH</span>
                </div>
              )}
              {item.buyNowEth !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium" style={{ color: '#0D2818' }}>Buy Now</span>
                  <span className="font-semibold" style={{ color: '#0D2818' }}>{item.buyNowEth} ETH</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                className="py-3 px-4 rounded-xl font-bold text-white shadow"
                style={{ backgroundColor: '#6603BF' }}
                onClick={() => alert(`Buy Now flow for ${item.domain} coming soon`)}
              >
                Buy Now
              </button>
              <button
                className="py-3 px-4 rounded-xl font-bold border"
                style={{ color: '#0D2818', borderColor: '#C6FC7B' }}
                onClick={() => alert(`Offer flow for ${item.domain} coming soon`)}
              >
                Make Offer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


