'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 pt-16 pb-8" style={{ backgroundColor: '#C6FC7B' }}>
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 mt-[60px]" style={{ color: '#0D2818' }}>
            domaSEO — No-Code Domain NFT Sales Pages
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: '#0D2818' }}>
            Anyone can create a branded, SEO-optimized landing page for their domain NFT. Pulls real-time data from the Doma orderbook with Buy Now and Make Offer actions.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/domains" className="bg-[#6603BF] text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-colors">
              Explore Domains
            </Link>
            <Link href="/create" className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Build Landing Page
            </Link>
          </div>
        </div>

        <div className="mt-12 -mx-[100vw] px-[100vw]" style={{ backgroundColor: '#122B1B' }}>
          <div className="container mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl shadow-2xl border-2 bg-gradient-to-br from-purple-600 to-purple-700" style={{ borderColor: '#C6FC7B' }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#C6FC7B' }}>No-Code Builder</h3>
                <p className="text-sm" style={{ color: '#C6FC7B' }}>Customize brand, copy, and CTAs. Publish a beautiful domain page in minutes.</p>
              </div>
              <div className="p-6 rounded-2xl shadow-2xl bg-[#C6FC7B]">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0D2818' }}>SEO Optimized</h3>
                <p className="text-sm" style={{ color: '#0D2818' }}>Clean metadata, server-rendered content, and performance best-practices to rank faster.</p>
              </div>
              <div className="p-6 rounded-2xl shadow-2xl border-2 bg-gradient-to-br from-purple-600 to-purple-700" style={{ borderColor: '#C6FC7B' }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#C6FC7B' }}>Orderbook Powered</h3>
                <p className="text-sm" style={{ color: '#C6FC7B' }}>Live pricing and offers from Doma orderbook with Buy Now or Make Offer actions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="-mx-[100vw] px-[100vw] py-12" style={{ backgroundColor: '#6603BF' }}>
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#C6FC7B' }}>
              How domaSEO Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl shadow-2xl border-l-8 bg-[#C6FC7B]" style={{ borderColor: '#08130C' }}>
                <h4 className="text-lg font-bold mb-3" style={{ color: '#08130C' }}>Connect Domain</h4>
                <p className="text-sm" style={{ color: '#08130C' }}>Select your domain NFT and auto-import details from the Doma orderbook.</p>
              </div>
              <div className="p-6 rounded-2xl shadow-2xl border-l-8 bg-gradient-to-br from-green-300 to-green-400" style={{ borderColor: '#122B1B' }}>
                <h4 className="text-lg font-bold mb-3" style={{ color: '#122B1B' }}>Customize Page</h4>
                <p className="text-sm" style={{ color: '#122B1B' }}>Set brand, theme, sections, and SEO metadata with instant preview.</p>
              </div>
              <div className="p-6 rounded-2xl shadow-2xl border-l-8 bg-gradient-to-br from-gray-200 to-gray-300" style={{ borderColor: '#08130C' }}>
                <h4 className="text-lg font-bold mb-3" style={{ color: '#08130C' }}>Publish</h4>
                <p className="text-sm" style={{ color: '#08130C' }}>One-click deploy to a fast, globally cached page with your domain slug.</p>
              </div>
              <div className="p-6 rounded-2xl shadow-2xl border-l-8 bg-[#C6FC7B]" style={{ borderColor: '#08130C' }}>
                <h4 className="text-lg font-bold mb-3" style={{ color: '#08130C' }}>Sell</h4>
                <p className="text-sm" style={{ color: '#08130C' }}>Enable Buy Now or Make Offer and route orders via Doma.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 mt-[50px] w-[800px] h-[280px] mx-auto border-2 border-transparent rounded-2xl" style={{ backgroundColor: '#6603BF' }}>
          <div className="container mx-auto px-8">
            <div className="text-center">
              <div className="mb-12 mt-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6FC7B' }}>Launch your page today</h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#C6FC7B' }}>
                  Create a beautiful, SEO-first sales page for any domain NFT in minutes.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/domains" className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                    Browse Orderbook
                  </Link>
                  <Link href="/create" className="bg-[#C6FC7B] text-[#122B1B] px-6 py-3 rounded-md font-semibold hover:bg-[#B5E86A] transition-colors">
                    Open Builder
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px mx-4" style={{ backgroundColor: '#C6FC7B' }}></div>
    </div>
  );
}