'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Predict() {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [predictionType, setPredictionType] = useState('price');
  const [timeframe, setTimeframe] = useState('24h');
  const [predictionValue, setPredictionValue] = useState('');
  const [confidence, setConfidence] = useState(50);

  const availableDomains = [
    { name: 'crypto.com', currentPrice: '$12,000,000', change: '+2.3%', category: 'Crypto' },
    { name: 'apple.eth', currentPrice: '$8,500,000', change: '-1.2%', category: 'Tech' },
    { name: 'nft.eth', currentPrice: '$2,100,000', change: '+5.7%', category: 'NFT' },
    { name: 'defi.eth', currentPrice: '$3,200,000', change: '+0.8%', category: 'DeFi' },
    { name: 'gaming.eth', currentPrice: '$1,800,000', change: '-0.5%', category: 'Gaming' },
    { name: 'ai.eth', currentPrice: '$4,500,000', change: '+3.1%', category: 'AI' }
  ];

  const predictionTypes = [
    { value: 'price', label: 'Price Movement', description: 'Predict if price will go up or down' },
    { value: 'percentage', label: 'Percentage Change', description: 'Predict exact percentage change' },
    { value: 'range', label: 'Price Range', description: 'Predict price will be within a range' }
  ];

  const timeframes = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '3d', label: '3 Days' },
    { value: '1w', label: '1 Week' },
    { value: '1m', label: '1 Month' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle prediction submission
    console.log('Prediction submitted:', {
      domain: selectedDomain,
      type: predictionType,
      timeframe,
      value: predictionValue,
      confidence
    });
  };

  const selectedDomainData = availableDomains.find(d => d.name === selectedDomain);

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#0D2818' }}>
            Make Your Prediction
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#0D2818' }}>
            Use your domain knowledge to predict price movements and compete with other traders worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prediction Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0D2818' }}>
                Create New Prediction
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Domain Selection */}
                <div>
                  <label className="block text-sm font-bold mb-3" style={{ color: '#0D2818' }}>
                    Select Domain
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableDomains.map((domain) => (
                      <button
                        key={domain.name}
                        type="button"
                        onClick={() => setSelectedDomain(domain.name)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          selectedDomain === domain.name
                            ? 'border-[#6603BF] bg-purple-50'
                            : 'border-gray-200 hover:border-[#C6FC7B]'
                        }`}
                      >
                        <div className="font-bold" style={{ color: '#0D2818' }}>{domain.name}</div>
                        <div className="text-sm" style={{ color: '#6B7280' }}>
                          {domain.currentPrice} • {domain.change}
                        </div>
                        <div className="text-xs mt-1 px-2 py-1 rounded-full inline-block" style={{ backgroundColor: '#C6FC7B', color: '#0D2818' }}>
                          {domain.category}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prediction Type */}
                <div>
                  <label className="block text-sm font-bold mb-3" style={{ color: '#0D2818' }}>
                    Prediction Type
                  </label>
                  <div className="space-y-3">
                    {predictionTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setPredictionType(type.value)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          predictionType === type.value
                            ? 'border-[#6603BF] bg-purple-50'
                            : 'border-gray-200 hover:border-[#C6FC7B]'
                        }`}
                      >
                        <div className="font-bold" style={{ color: '#0D2818' }}>{type.label}</div>
                        <div className="text-sm" style={{ color: '#6B7280' }}>{type.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeframe */}
                <div>
                  <label className="block text-sm font-bold mb-3" style={{ color: '#0D2818' }}>
                    Timeframe
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full p-3 rounded-xl border-2" 
                    style={{ borderColor: '#C6FC7B', backgroundColor: 'white' }}
                  >
                    {timeframes.map((tf) => (
                      <option key={tf.value} value={tf.value}>{tf.label}</option>
                    ))}
                  </select>
                </div>

                {/* Prediction Value */}
                <div>
                  <label className="block text-sm font-bold mb-3" style={{ color: '#0D2818' }}>
                    Your Prediction
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={predictionValue}
                      onChange={(e) => setPredictionValue(e.target.value)}
                      placeholder={predictionType === 'price' ? 'Enter price' : predictionType === 'percentage' ? 'Enter %' : 'Enter range'}
                      className="flex-1 p-3 rounded-xl border-2" 
                      style={{ borderColor: '#C6FC7B', backgroundColor: 'white' }}
                    />
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>
                      {predictionType === 'price' ? 'USD' : predictionType === 'percentage' ? '%' : 'range'}
                    </span>
                  </div>
                </div>

                {/* Confidence Level */}
                <div>
                  <label className="block text-sm font-bold mb-3" style={{ color: '#0D2818' }}>
                    Confidence Level: {confidence}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={confidence}
                    onChange={(e) => setConfidence(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{ backgroundColor: '#C6FC7B' }}
                  />
                  <div className="flex justify-between text-xs mt-1" style={{ color: '#6B7280' }}>
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg"
                  style={{ backgroundColor: '#6603BF' }}
                >
                  Submit Prediction
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Domain Info */}
            {selectedDomainData && (
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: '#0D2818' }}>
                  Domain Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Domain:</span>
                    <span className="text-sm font-mono" style={{ color: '#0D2818' }}>{selectedDomainData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Current Price:</span>
                    <span className="text-sm font-bold" style={{ color: '#10B981' }}>{selectedDomainData.currentPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>24h Change:</span>
                    <span className={`text-sm font-bold ${selectedDomainData.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedDomainData.change}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Category:</span>
                    <span className="text-sm px-2 py-1 rounded-full" style={{ backgroundColor: '#C6FC7B', color: '#0D2818' }}>
                      {selectedDomainData.category}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Prediction Tips */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#0D2818' }}>
                Prediction Tips
              </h3>
              <div className="space-y-3 text-sm" style={{ color: '#6B7280' }}>
                <div className="flex items-start">
                  <span className="text-lg mr-2">💡</span>
                  <span>Research recent domain sales and market trends</span>
                </div>
                <div className="flex items-start">
                  <span className="text-lg mr-2">📊</span>
                  <span>Consider historical price patterns and volatility</span>
                </div>
                <div className="flex items-start">
                  <span className="text-lg mr-2">🎯</span>
                  <span>Higher confidence predictions earn more points</span>
                </div>
                <div className="flex items-start">
                  <span className="text-lg mr-2">⚡</span>
                  <span>Shorter timeframes are riskier but more rewarding</span>
                </div>
              </div>
            </div>

            {/* Recent Predictions */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#0D2818' }}>
                Your Recent Predictions
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#0D2818' }}>crypto.com</div>
                    <div className="text-xs" style={{ color: '#6B7280' }}>2 hours ago</div>
                  </div>
                  <div className="text-sm font-bold" style={{ color: '#10B981' }}>+85%</div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#0D2818' }}>nft.eth</div>
                    <div className="text-xs" style={{ color: '#6B7280' }}>1 day ago</div>
                  </div>
                  <div className="text-sm font-bold" style={{ color: '#EF4444' }}>-12%</div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#0D2818' }}>ai.eth</div>
                    <div className="text-xs" style={{ color: '#6B7280' }}>3 days ago</div>
                  </div>
                  <div className="text-sm font-bold" style={{ color: '#10B981' }}>+23%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 mt-12 rounded-2xl" style={{ backgroundColor: '#6603BF' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6FC7B' }}>
            Ready to Compete?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#C6FC7B' }}>
            Join active competitions and climb the leaderboard
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/competitions">
              <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                View Competitions
              </button>
            </Link>
            <Link href="/leaderboard">
              <button className="bg-[#C6FC7B] text-[#122B1B] px-6 py-3 rounded-md font-semibold hover:bg-[#B5E86A] transition-colors">
                View Leaderboard
              </button>
            </Link>
          </div>
        </div>
    </div>
  );
}
