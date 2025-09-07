'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const leaderboardData = [
    {
      rank: 1,
      username: "CryptoOracle",
      avatar: "🔮",
      totalScore: 2847,
      accuracy: 94.2,
      predictions: 156,
      correct: 147,
      streak: 12,
      badges: ["🏆", "🎯", "⚡"],
      change: "+3"
    },
    {
      rank: 2,
      username: "DomainMaster",
      avatar: "👑",
      totalScore: 2634,
      accuracy: 91.8,
      predictions: 142,
      correct: 130,
      streak: 8,
      badges: ["🥈", "🎯"],
      change: "-1"
    },
    {
      rank: 3,
      username: "PriceProphet",
      avatar: "🔮",
      totalScore: 2456,
      accuracy: 89.5,
      predictions: 128,
      correct: 115,
      streak: 5,
      badges: ["🥉", "🎯"],
      change: "+2"
    },
    {
      rank: 4,
      username: "Web3Wizard",
      avatar: "🧙",
      totalScore: 2234,
      accuracy: 87.3,
      predictions: 134,
      correct: 117,
      streak: 3,
      badges: ["🎯"],
      change: "+5"
    },
    {
      rank: 5,
      username: "BlockchainBard",
      avatar: "🎭",
      totalScore: 2156,
      accuracy: 85.9,
      predictions: 119,
      correct: 102,
      streak: 1,
      badges: ["🎯"],
      change: "-2"
    },
    {
      rank: 6,
      username: "EthereumEagle",
      avatar: "🦅",
      totalScore: 1987,
      accuracy: 83.2,
      predictions: 98,
      correct: 82,
      streak: 4,
      badges: ["🎯"],
      change: "+1"
    },
    {
      rank: 7,
      username: "NFTNinja",
      avatar: "🥷",
      totalScore: 1876,
      accuracy: 81.7,
      predictions: 87,
      correct: 71,
      streak: 2,
      badges: ["🎯"],
      change: "-3"
    },
    {
      rank: 8,
      username: "DeFiDragon",
      avatar: "🐉",
      totalScore: 1754,
      accuracy: 79.8,
      predictions: 92,
      correct: 73,
      streak: 1,
      badges: ["🎯"],
      change: "+4"
    },
    {
      rank: 9,
      username: "CryptoCrusader",
      avatar: "⚔️",
      totalScore: 1634,
      accuracy: 77.5,
      predictions: 76,
      correct: 59,
      streak: 0,
      badges: ["🎯"],
      change: "-1"
    },
    {
      rank: 10,
      username: "WebWarrior",
      avatar: "🛡️",
      totalScore: 1523,
      accuracy: 75.2,
      predictions: 68,
      correct: 51,
      streak: 1,
      badges: ["🎯"],
      change: "+2"
    }
  ];

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return '#0D2818';
  };

  const getChangeColor = (change: string) => {
    return change.startsWith('+') ? '#10B981' : '#EF4444';
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#0D2818' }}>
            Global Leaderboard
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#0D2818' }}>
            Compete with the best domain predictors worldwide. Climb the rankings and earn recognition for your prediction skills.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium" style={{ color: '#0D2818' }}>Time Period:</label>
              <select 
                value={timeFilter} 
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border-2" 
                style={{ borderColor: '#C6FC7B', backgroundColor: 'white' }}
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
                <option value="day">Today</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium" style={{ color: '#0D2818' }}>Category:</label>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border-2" 
                style={{ borderColor: '#C6FC7B', backgroundColor: 'white' }}
              >
                <option value="all">All Categories</option>
                <option value="crypto">Crypto Domains</option>
                <option value="tech">Tech Domains</option>
                <option value="nft">NFT Domains</option>
                <option value="defi">DeFi Domains</option>
              </select>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {leaderboardData.slice(0, 3).map((user, index) => (
            <div key={user.rank} className={`p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 ${
              index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'
            }`} style={{ 
              backgroundColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
              color: '#0D2818'
            }}>
              <div className="text-center">
                <div className="text-6xl mb-4">{user.avatar}</div>
                <div className="text-4xl font-bold mb-2">#{user.rank}</div>
                <h3 className="text-xl font-bold mb-2">{user.username}</h3>
                <div className="text-2xl font-bold mb-2">{user.totalScore.toLocaleString()}</div>
                <div className="text-sm mb-4">Total Score</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-bold">{user.accuracy}%</div>
                    <div>Accuracy</div>
                  </div>
                  <div>
                    <div className="font-bold">{user.streak}</div>
                    <div>Streak</div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  {user.badges.map((badge, i) => (
                    <span key={i} className="text-2xl mx-1">{badge}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b-2" style={{ borderColor: '#C6FC7B' }}>
            <h2 className="text-2xl font-bold" style={{ color: '#0D2818' }}>Complete Rankings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2" style={{ borderColor: '#C6FC7B' }}>
                  <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Player</th>
                  <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Total Score</th>
                  <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Accuracy</th>
                  <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Predictions</th>
                  <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Streak</th>
                  <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Change</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user) => (
                  <tr key={user.rank} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold mr-2" style={{ color: getRankColor(user.rank) }}>
                          #{user.rank}
                        </span>
                        {user.rank <= 3 && (
                          <span className="text-2xl">
                            {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{user.avatar}</span>
                        <div>
                          <div className="font-bold" style={{ color: '#0D2818' }}>{user.username}</div>
                          <div className="flex">
                            {user.badges.map((badge, i) => (
                              <span key={i} className="text-sm mr-1">{badge}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-lg" style={{ color: '#0D2818' }}>
                        {user.totalScore.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${user.accuracy}%`, 
                              backgroundColor: user.accuracy >= 90 ? '#10B981' : user.accuracy >= 80 ? '#F59E0B' : '#EF4444'
                            }}
                          ></div>
                        </div>
                        <span className="font-bold" style={{ color: '#0D2818' }}>{user.accuracy}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span style={{ color: '#0D2818' }}>
                        {user.correct}/{user.predictions}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-lg mr-1">🔥</span>
                        <span className="font-bold" style={{ color: '#0D2818' }}>{user.streak}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="font-bold" 
                        style={{ color: getChangeColor(user.change) }}
                      >
                        {user.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 mt-12 rounded-2xl" style={{ backgroundColor: '#6603BF' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6FC7B' }}>
            Want to Join the Competition?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#C6FC7B' }}>
            Start making predictions and climb the leaderboard today
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/competitions">
              <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                View Competitions
              </button>
            </Link>
            <Link href="/predict">
              <button className="bg-[#C6FC7B] text-[#122B1B] px-6 py-3 rounded-md font-semibold hover:bg-[#B5E86A] transition-colors">
                Start Predicting
              </button>
            </Link>
          </div>
        </div>
    </div>
  );
}
