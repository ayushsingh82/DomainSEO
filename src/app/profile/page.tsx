'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    username: "CryptoOracle",
    avatar: "🔮",
    tier: "Gold",
    totalScore: 2847,
    rank: 1,
    accuracy: 94.2,
    predictions: 156,
    correct: 147,
    streak: 12,
    tokens: 12500,
    joinDate: "Jan 15, 2024"
  };

  const recentPredictions = [
    {
      id: 1,
      domain: "crypto.com",
      prediction: "+15%",
      actual: "+18%",
      accuracy: 85,
      timeframe: "24h",
      date: "2 hours ago",
      status: "correct"
    },
    {
      id: 2,
      domain: "nft.eth",
      prediction: "-5%",
      actual: "-3%",
      accuracy: 92,
      timeframe: "3d",
      date: "1 day ago",
      status: "correct"
    },
    {
      id: 3,
      domain: "ai.eth",
      prediction: "+25%",
      actual: "+12%",
      accuracy: 48,
      timeframe: "1w",
      date: "3 days ago",
      status: "incorrect"
    },
    {
      id: 4,
      domain: "defi.eth",
      prediction: "+8%",
      actual: "+11%",
      accuracy: 73,
      timeframe: "24h",
      date: "5 days ago",
      status: "correct"
    },
    {
      id: 5,
      domain: "gaming.eth",
      prediction: "-12%",
      actual: "+5%",
      accuracy: 0,
      timeframe: "3d",
      date: "1 week ago",
      status: "incorrect"
    }
  ];

  const achievements = [
    { name: "First Prediction", icon: "🎯", unlocked: true, date: "Jan 15, 2024" },
    { name: "Streak Master", icon: "🔥", unlocked: true, date: "Feb 3, 2024" },
    { name: "Accuracy King", icon: "👑", unlocked: true, date: "Mar 12, 2024" },
    { name: "Domain Oracle", icon: "🔮", unlocked: false, date: null },
    { name: "Competition Champion", icon: "🏆", unlocked: false, date: null },
    { name: "Perfect Week", icon: "⭐", unlocked: false, date: null }
  ];

  const competitions = [
    {
      name: "Crypto Domain Rush",
      position: 1,
      prize: "5,000 SAMX",
      date: "Dec 1, 2024",
      status: "won"
    },
    {
      name: "Tech Giant Domains",
      position: 3,
      prize: "1,500 SAMX",
      date: "Nov 28, 2024",
      status: "completed"
    },
    {
      name: "NFT Domain Frenzy",
      position: 7,
      prize: "500 SAMX",
      date: "Nov 25, 2024",
      status: "completed"
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return '#CD7F32';
      case 'Silver': return '#C0C0C0';
      case 'Gold': return '#FFD700';
      case 'Platinum': return '#E5E4E2';
      case 'Diamond': return '#B9F2FF';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'correct': return '#10B981';
      case 'incorrect': return '#EF4444';
      case 'won': return '#10B981';
      case 'completed': return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <div className="text-6xl">{userStats.avatar}</div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#0D2818' }}>
                {userStats.username}
              </h1>
              <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                <span 
                  className="px-4 py-2 rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: getTierColor(userStats.tier) }}
                >
                  {userStats.tier} Tier
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: '#C6FC7B', color: '#0D2818' }}>
                  Rank #{userStats.rank}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold" style={{ color: '#0D2818' }}>
                    {userStats.totalScore.toLocaleString()}
                  </div>
                  <div className="text-sm" style={{ color: '#6B7280' }}>Total Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: '#0D2818' }}>
                    {userStats.accuracy}%
                  </div>
                  <div className="text-sm" style={{ color: '#6B7280' }}>Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: '#0D2818' }}>
                    {userStats.streak}
                  </div>
                  <div className="text-sm" style={{ color: '#6B7280' }}>Current Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: '#0D2818' }}>
                    {userStats.tokens.toLocaleString()}
                  </div>
                  <div className="text-sm" style={{ color: '#6B7280' }}>SAMX Tokens</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
          <div className="flex space-x-1" style={{ backgroundColor: '#F3F4F6' }}>
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'predictions', label: 'Predictions' },
              { id: 'achievements', label: 'Achievements' },
              { id: 'competitions', label: 'Competitions' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-gray-100'
                }`}
                style={{ color: activeTab === tab.id ? '#0D2818' : '#6B7280' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Chart Placeholder */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0D2818' }}>
                Performance Over Time
              </h3>
              <div className="h-64 flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <div className="text-sm" style={{ color: '#6B7280' }}>
                    Performance chart would be displayed here
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0D2818' }}>
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                  <span className="font-medium" style={{ color: '#0D2818' }}>Best Streak:</span>
                  <span className="font-bold" style={{ color: '#0D2818' }}>18 predictions</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                  <span className="font-medium" style={{ color: '#0D2818' }}>Competitions Won:</span>
                  <span className="font-bold" style={{ color: '#0D2818' }}>3</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                  <span className="font-medium" style={{ color: '#0D2818' }}>Total Earnings:</span>
                  <span className="font-bold" style={{ color: '#10B981' }}>12,500 SAMX</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                  <span className="font-medium" style={{ color: '#0D2818' }}>Member Since:</span>
                  <span className="font-bold" style={{ color: '#0D2818' }}>{userStats.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b-2" style={{ borderColor: '#C6FC7B' }}>
              <h3 className="text-xl font-bold" style={{ color: '#0D2818' }}>
                Recent Predictions
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2" style={{ borderColor: '#C6FC7B' }}>
                    <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Domain</th>
                    <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Prediction</th>
                    <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Actual</th>
                    <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Accuracy</th>
                    <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Timeframe</th>
                    <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPredictions.map((prediction) => (
                    <tr key={prediction.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm" style={{ color: '#0D2818' }}>
                          {prediction.domain}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold" style={{ color: '#0D2818' }}>
                          {prediction.prediction}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold" style={{ color: '#0D2818' }}>
                          {prediction.actual}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${prediction.accuracy}%`, 
                                backgroundColor: prediction.accuracy >= 80 ? '#10B981' : prediction.accuracy >= 60 ? '#F59E0B' : '#EF4444'
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold" style={{ color: '#0D2818' }}>
                            {prediction.accuracy}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm" style={{ color: '#0D2818' }}>
                          {prediction.timeframe}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm" style={{ color: '#6B7280' }}>
                          {prediction.date}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-bold"
                          style={{ 
                            backgroundColor: getStatusColor(prediction.status) === '#10B981' ? '#D1FAE5' : '#FEE2E2',
                            color: getStatusColor(prediction.status)
                          }}
                        >
                          {prediction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
                achievement.unlocked ? 'opacity-100' : 'opacity-60'
              }`}>
                <div className="text-center">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#0D2818' }}>
                    {achievement.name}
                  </h3>
                  {achievement.unlocked ? (
                    <div>
                      <div className="text-sm mb-2" style={{ color: '#10B981' }}>
                        ✓ Unlocked
                      </div>
                      <div className="text-xs" style={{ color: '#6B7280' }}>
                        {achievement.date}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm" style={{ color: '#6B7280' }}>
                      Locked
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'competitions' && (
          <div className="space-y-6">
            {competitions.map((competition, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#0D2818' }}>
                      {competition.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm" style={{ color: '#6B7280' }}>
                      <span>Position: #{competition.position}</span>
                      <span>Prize: {competition.prize}</span>
                      <span>Date: {competition.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-bold"
                      style={{ 
                        backgroundColor: getStatusColor(competition.status) === '#10B981' ? '#D1FAE5' : '#F3F4F6',
                        color: getStatusColor(competition.status)
                      }}
                    >
                      {competition.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center py-12 mt-12 rounded-2xl" style={{ backgroundColor: '#6603BF' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6FC7B' }}>
            Keep Improving Your Skills
          </h2>
          <p className="text-lg mb-8" style={{ color: '#C6FC7B' }}>
            Continue making predictions and climb higher in the rankings
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/competitions">
              <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Join Competition
              </button>
            </Link>
            <Link href="/predict">
              <button className="bg-[#C6FC7B] text-[#122B1B] px-6 py-3 rounded-md font-semibold hover:bg-[#B5E86A] transition-colors">
                Make Prediction
              </button>
            </Link>
          </div>
        </div>
    </div>
  );
}
