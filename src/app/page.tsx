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
            <div className="w-full md:w-2/3 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3 p-6 rounded-2xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 border-2 bg-gradient-to-br from-purple-600 to-purple-700" style={{ borderColor: '#C6FC7B', minHeight: '260px' }}>
                  <div className="p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#C6FC7B' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6603BF' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#C6FC7B' }}>
                    No-Code Builder
                  </h3>
                  <p className="text-LG leading-relaxed" style={{ color: '#C6FC7B' }}>
                    Customize brand, copy, and CTAs. Publish a beautiful domain page in minutes.
                  </p>
                </div>
                
                {/* Middle Box - AI Valuation Oracles */}
                <div className="md:col-span-6 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 bg-[#C6FC7B]" style={{ backgroundColor: '#C6FC7B', minHeight: '260px' }}>
                  <div className="p-4 rounded-full w-16 h-16 flex items-center justify-center mb-5 shadow-lg transform hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#6603BF' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#C6FC7B' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#0D2818' }}>
                    SEO Optimized
                  </h3>
                  <p className="text-base leading-relaxed mb-4" style={{ color: '#0D2818' }}>
                    Clean metadata, server-rendered content, and performance best-practices to rank faster.
                  </p>
                  <div className="mt-6">
                    <Link href="/launch" className="inline-flex items-center text-base font-bold px-4 py-2 rounded-xl hover:scale-110 transform transition-all duration-300 shadow-lg" style={{ color: '#C6FC7B', backgroundColor: '#6603BF' }}>
                      Start Building 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                {/* Right Box - Leaderboards & Rewards */}
                <div className="md:col-span-3 p-6 rounded-2xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 border-2 bg-gradient-to-br from-purple-600 to-purple-700" style={{ borderColor: '#C6FC7B', minHeight: '260px' }}>
                  <div className="p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#C6FC7B' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6603BF' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#C6FC7B' }}>
                    Orderbook Powered
                  </h3>
                  <p className="text-md leading-relaxed" style={{ color: '#C6FC7B' }}>
                    Live pricing and offers from Doma orderbook with Buy Now or Make Offer actions.
                  </p>
                </div>
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
              <div className="p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border-l-8 bg-[#C6FC7B]" style={{ borderColor: '#08130C', minHeight: '220px' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg transform hover:rotate-360 transition-transform duration-700" style={{ backgroundColor: '#08130C', color: '#7CE8A5' }}>1</div>
                <h4 className="text-lg font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#08130C' }}>
                Connect Domain
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>
                Select your domain NFT and auto-import details from the Doma orderbook.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 mt-4 md:mt-8 border-l-8 bg-gradient-to-br from-green-300 to-green-400" style={{ borderColor: '#122B1B', minHeight: '220px' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg transform hover:rotate-360 transition-transform duration-700" style={{ backgroundColor: '#122B1B', color: '#C6FC7B' }}>2</div>
                <h4 className="text-lg font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#122B1B' }}>
                Customize Page
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#122B1B' }}>
                Set brand, theme, sections, and SEO metadata with instant preview.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 mt-4 md:mt-16 border-l-8 bg-gradient-to-br from-gray-200 to-gray-300" style={{ borderColor: '#08130C', minHeight: '220px' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg transform hover:rotate-360 transition-transform duration-700" style={{ backgroundColor: '#08130C', color: '#ECEFEC' }}>3</div>
                <h4 className="text-lg font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#08130C' }}>
                Publish
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>
                One-click deploy to a fast, globally cached page with your domain slug.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 mt-4 md:mt-24 border-l-8 bg-[#C6FC7B]" style={{ borderColor: '#08130C', minHeight: '220px' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg transform hover:rotate-360 transition-transform duration-700" style={{ backgroundColor: '#08130C', color: '#7CE8A5' }}>4</div>
                <h4 className="text-lg font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#08130C' }}>
                Sell
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>
                Enable Buy Now or Make Offer and route orders via Doma.
                </p>
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