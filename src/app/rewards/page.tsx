'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Rewards() {
  const rewardTiers = [
    {
      tier: "Bronze",
      minScore: 0,
      maxScore: 999,
      color: "#CD7F32",
      rewards: [
        "10 SAMX tokens per correct prediction",
        "Bronze prediction badge",
        "Access to beginner competitions",
        "Basic analytics dashboard"
      ]
    },
    {
      tier: "Silver",
      minScore: 1000,
      maxScore: 2499,
      color: "#C0C0C0",
      rewards: [
        "25 SAMX tokens per correct prediction",
        "Silver prediction badge",
        "Access to intermediate competitions",
        "Advanced analytics dashboard",
        "Priority customer support"
      ]
    },
    {
      tier: "Gold",
      minScore: 2500,
      maxScore: 4999,
      color: "#FFD700",
      rewards: [
        "50 SAMX tokens per correct prediction",
        "Gold prediction badge",
        "Access to expert competitions",
        "Premium analytics dashboard",
        "Exclusive NFT rewards",
        "Early access to new features"
      ]
    },
    {
      tier: "Platinum",
      minScore: 5000,
      maxScore: 9999,
      color: "#E5E4E2",
      rewards: [
        "100 SAMX tokens per correct prediction",
        "Platinum prediction badge",
        "Access to all competitions",
        "Master analytics dashboard",
        "Rare NFT rewards",
        "VIP community access",
        "Personal prediction coach"
      ]
    },
    {
      tier: "Diamond",
      minScore: 10000,
      maxScore: Infinity,
      color: "#B9F2FF",
      rewards: [
        "200 SAMX tokens per correct prediction",
        "Diamond prediction badge",
        "Access to exclusive competitions",
        "Elite analytics dashboard",
        "Legendary NFT rewards",
        "Founder's circle access",
        "Custom prediction tools",
        "Revenue sharing program"
      ]
    }
  ];

  const achievements = [
    {
      id: 1,
      name: "First Prediction",
      description: "Make your first domain price prediction",
      icon: "🎯",
      points: 10,
      rarity: "Common",
      unlocked: true
    },
    {
      id: 2,
      name: "Streak Master",
      description: "Achieve a 10-prediction winning streak",
      icon: "🔥",
      points: 100,
      rarity: "Rare",
      unlocked: false
    },
    {
      id: 3,
      name: "Accuracy King",
      description: "Maintain 90%+ accuracy over 50 predictions",
      icon: "👑",
      points: 250,
      rarity: "Epic",
      unlocked: false
    },
    {
      id: 4,
      name: "Domain Oracle",
      description: "Correctly predict 100 domain price movements",
      icon: "🔮",
      points: 500,
      rarity: "Legendary",
      unlocked: false
    },
    {
      id: 5,
      name: "Competition Champion",
      description: "Win first place in any competition",
      icon: "🏆",
      points: 1000,
      rarity: "Legendary",
      unlocked: false
    },
    {
      id: 6,
      name: "Perfect Week",
      description: "Achieve 100% accuracy for 7 consecutive days",
      icon: "⭐",
      points: 750,
      rarity: "Epic",
      unlocked: false
    }
  ];

  const nftRewards = [
    {
      name: "Prediction Master NFT",
      description: "Exclusive NFT for top 100 predictors",
      image: "🎨",
      rarity: "Legendary",
      value: "2.5 ETH",
      requirements: "Top 100 global ranking"
    },
    {
      name: "Domain Oracle Badge",
      description: "Rare badge for 90%+ accuracy achievers",
      image: "🏅",
      rarity: "Epic",
      value: "1.2 ETH",
      requirements: "90%+ accuracy over 50 predictions"
    },
    {
      name: "Streak Champion",
      description: "Unique NFT for 20+ prediction streaks",
      image: "⚡",
      rarity: "Rare",
      value: "0.8 ETH",
      requirements: "20+ consecutive correct predictions"
    },
    {
      name: "Competition Winner",
      description: "Exclusive NFT for competition winners",
      image: "🥇",
      rarity: "Legendary",
      value: "3.0 ETH",
      requirements: "Win any competition"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return '#6B7280';
      case 'Rare': return '#3B82F6';
      case 'Epic': return '#8B5CF6';
      case 'Legendary': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#C6FC7B' }}>
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 pt-16 pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#0D2818' }}>
            Rewards & Achievements
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#0D2818' }}>
            Earn tokens, unlock achievements, and collect exclusive NFTs as you master the art of domain price prediction.
          </p>
        </div>

        {/* Reward Tiers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#0D2818' }}>
            Reward Tiers
          </h2>
          <div className="space-y-6">
            {rewardTiers.map((tier, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-4"
                      style={{ backgroundColor: tier.color }}
                    >
                      {tier.tier.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: '#0D2818' }}>
                        {tier.tier} Tier
                      </h3>
                      <p className="text-sm" style={{ color: '#6B7280' }}>
                        {tier.minScore === 0 ? `0 - ${tier.maxScore} points` : 
                         tier.maxScore === Infinity ? `${tier.minScore}+ points` : 
                         `${tier.minScore} - ${tier.maxScore} points`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: tier.color }}>
                      {tier.tier}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tier.rewards.map((reward, i) => (
                    <div key={i} className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
                      <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#C6FC7B' }}></span>
                      <span className="text-sm" style={{ color: '#0D2818' }}>{reward}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#0D2818' }}>
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
                achievement.unlocked ? 'opacity-100' : 'opacity-60'
              }`}>
                <div className="text-center">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#0D2818' }}>
                    {achievement.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
                    {achievement.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{ 
                        backgroundColor: getRarityColor(achievement.rarity), 
                        color: 'white' 
                      }}
                    >
                      {achievement.rarity}
                    </span>
                    <span className="text-sm font-bold" style={{ color: '#0D2818' }}>
                      {achievement.points} pts
                    </span>
                  </div>
                  {achievement.unlocked && (
                    <div className="mt-3 text-sm font-bold" style={{ color: '#10B981' }}>
                      ✓ Unlocked
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NFT Rewards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#0D2818' }}>
            Exclusive NFT Rewards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nftRewards.map((nft, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="text-6xl mb-4">{nft.image}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#0D2818' }}>
                    {nft.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
                    {nft.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs font-medium" style={{ color: '#0D2818' }}>Rarity:</span>
                      <span 
                        className="text-xs font-bold px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: getRarityColor(nft.rarity), 
                          color: 'white' 
                        }}
                      >
                        {nft.rarity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-medium" style={{ color: '#0D2818' }}>Value:</span>
                      <span className="text-xs font-bold" style={{ color: '#10B981' }}>
                        {nft.value}
                      </span>
                    </div>
                    <div className="text-xs" style={{ color: '#6B7280' }}>
                      {nft.requirements}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Economics */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#0D2818' }}>
              SAMX Token Economics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0D2818' }}>
                  Earning Tokens
                </h3>
                <ul className="text-sm space-y-1" style={{ color: '#6B7280' }}>
                  <li>• Correct predictions</li>
                  <li>• Achievement unlocks</li>
                  <li>• Competition wins</li>
                  <li>• Referral bonuses</li>
                  <li>• Daily login rewards</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0D2818' }}>
                  Using Tokens
                </h3>
                <ul className="text-sm space-y-1" style={{ color: '#6B7280' }}>
                  <li>• Competition entry fees</li>
                  <li>• Premium features</li>
                  <li>• NFT marketplace</li>
                  <li>• Staking rewards</li>
                  <li>• Governance voting</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0D2818' }}>
                  Token Utility
                </h3>
                <ul className="text-sm space-y-1" style={{ color: '#6B7280' }}>
                  <li>• Platform governance</li>
                  <li>• Fee discounts</li>
                  <li>• Exclusive access</li>
                  <li>• Revenue sharing</li>
                  <li>• Cross-platform use</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 rounded-2xl" style={{ backgroundColor: '#6603BF' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6FC7B' }}>
            Start Earning Rewards Today
          </h2>
          <p className="text-lg mb-8" style={{ color: '#C6FC7B' }}>
            Join competitions, make predictions, and unlock amazing rewards
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

      <Footer />
    </div>
  );
}
