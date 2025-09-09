'use client';

import Link from 'next/link';
import { useMemo } from 'react';

export default function ExampleBuild() {
  const offers = useMemo(
    () => [
      { id: 'o1', priceEth: 1.1, bidder: '0x9a...c3', time: '2h ago' },
      { id: 'o2', priceEth: 1.05, bidder: '0xb2...7e', time: '5h ago' },
      { id: 'o3', priceEth: 0.98, bidder: '0x41...aa', time: '1d ago' },
    ],
    []
  );

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      {/* HERO */}
      <div className="rounded-2xl p-8 mb-8 border-2" style={{ backgroundColor: '#6603BF', borderColor: '#C6FC7B' }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#C6FC7B' }}>Example Build</h1>
            <p className="text-sm max-w-2xl" style={{ color: '#C6FC7B' }}>
              SEO-ready sales page for a domain NFT. Auto-pulls data from the Doma orderbook and includes Buy Now and Make Offer actions.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/create" className="bg-white text-black px-5 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">Duplicate This</Link>
            <Link href="/domains" className="px-5 py-3 rounded-md font-semibold" style={{ color: '#0D2818', backgroundColor: '#C6FC7B' }}>Browse Domains</Link>
          </div>
        </div>
      </div>

      {/* DOMAIN CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xl p-6 border-2" style={{ borderColor: '#C6FC7B' }}>
          <div className="flex items-center gap-4 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/globe.svg" alt="domain" className="w-12 h-12 rounded" />
            <div>
              <div className="text-3xl font-bold" style={{ color: '#0D2818' }}>crypto.eth</div>
              <div className="text-sm" style={{ color: '#6B7280' }}>Premium ENS Domain</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Metric label="Floor" value="1.2 ETH" />
            <Metric label="Last Sale" value="1.0 ETH" />
            <Metric label="Offers" value={`${offers.length}`} />
            <Metric label="Buy Now" value="1.3 ETH" />
          </div>

          <div className="flex gap-3">
            <button className="py-3 px-4 rounded-xl font-bold text-white shadow" style={{ backgroundColor: '#6603BF' }} onClick={() => alert('Buy Now flow (demo)')}>
              Buy Now
            </button>
            <button className="py-3 px-4 rounded-xl font-bold border" style={{ color: '#0D2818', borderColor: '#C6FC7B' }} onClick={() => alert('Make Offer flow (demo)')}>
              Make Offer
            </button>
          </div>
        </div>

        {/* OFFERS TABLE */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 border-2" style={{ borderColor: '#C6FC7B' }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: '#0D2818' }}>Orderbook Offers</h3>
          <div className="space-y-3">
            {offers.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: '#C6FC7B' }}>
                <span className="font-semibold" style={{ color: '#0D2818' }}>{o.priceEth} ETH</span>
                <span className="text-sm" style={{ color: '#6B7280' }}>{o.bidder}</span>
                <span className="text-sm" style={{ color: '#6B7280' }}>{o.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ANALYTICS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl p-6 border-2" style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
          <h4 className="text-sm font-semibold mb-2" style={{ color: '#C6FC7B' }}>SEO Score</h4>
          <div className="text-3xl font-bold" style={{ color: '#C6FC7B' }}>92/100</div>
          <p className="text-xs mt-2" style={{ color: '#C6FC7B' }}>Optimized metadata, fast render, accessible content</p>
        </div>
        <div className="rounded-2xl p-6 border-2" style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
          <h4 className="text-sm font-semibold mb-2" style={{ color: '#C6FC7B' }}>Views (7d)</h4>
          <div className="text-3xl font-bold" style={{ color: '#C6FC7B' }}>1,247</div>
          <p className="text-xs mt-2" style={{ color: '#C6FC7B' }}>Demo analytics for preview</p>
        </div>
        <div className="rounded-2xl p-6 border-2" style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
          <h4 className="text-sm font-semibold mb-2" style={{ color: '#C6FC7B' }}>CTR</h4>
          <div className="text-3xl font-bold" style={{ color: '#C6FC7B' }}>5.3%</div>
          <p className="text-xs mt-2" style={{ color: '#C6FC7B' }}>From search impressions to clicks</p>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl border" style={{ borderColor: '#C6FC7B' }}>
      <div className="text-xs" style={{ color: '#6B7280' }}>{label}</div>
      <div className="text-lg font-bold" style={{ color: '#0D2818' }}>{value}</div>
    </div>
  );
}
