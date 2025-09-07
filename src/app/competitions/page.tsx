'use client';

import Link from 'next/link';

export default function Competitions() {
  const activeCompetitions = [
    {
      id: 1,
      title: "Crypto Domain Rush",
      description: "Predict price movements for top crypto domains",
      domain: "crypto.com",
      currentPrice: "$12,000,000",
      timeLeft: "2d 14h 32m",
      participants: 1247,
      prizePool: "50,000 SAMX",
      difficulty: "Expert",
      status: "active"
    },
    {
      id: 2,
      title: "Tech Giant Domains",
      description: "Predict movements for major tech company domains",
      domain: "apple.eth",
      currentPrice: "$8,500,000",
      timeLeft: "1d 8h 15m",
      participants: 892,
      prizePool: "30,000 SAMX",
      difficulty: "Intermediate",
      status: "active"
    },
    {
      id: 3,
      title: "NFT Domain Frenzy",
      description: "Predict NFT-related domain price movements",
      domain: "nft.eth",
      currentPrice: "$2,100,000",
      timeLeft: "5h 42m",
      participants: 634,
      prizePool: "15,000 SAMX",
      difficulty: "Beginner",
      status: "active"
    }
  ];

  const upcomingCompetitions = [
    {
      id: 4,
      title: "DeFi Domain Wars",
      description: "Predict DeFi protocol domain movements",
      domain: "uniswap.eth",
      currentPrice: "$5,200,000",
      startTime: "Tomorrow 12:00 UTC",
      participants: 0,
      prizePool: "40,000 SAMX",
      difficulty: "Expert",
      status: "upcoming"
    },
    {
      id: 5,
      title: "Gaming Domain Battle",
      description: "Predict gaming industry domain movements",
      domain: "gaming.eth",
      currentPrice: "$1,800,000",
      startTime: "Dec 15, 2024 18:00 UTC",
      participants: 0,
      prizePool: "25,000 SAMX",
      difficulty: "Intermediate",
      status: "upcoming"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#C6FC7B';
      case 'Intermediate': return '#F59E0B';
      case 'Expert': return '#EF4444';
      default: return '#C6FC7B';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'upcoming': return '#3B82F6';
      case 'ended': return '#6B7280';
      default: return '#C6FC7B';
    }
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#0D2818' }}>
            Prediction Competitions
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#0D2818' }}>
            Join active competitions or prepare for upcoming ones. Test your domain prediction skills and compete for amazing rewards.
          </p>
        </div>

        {/* Active Competitions */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: '#0D2818' }}>
              Active Competitions
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
              <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Live Now</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeCompetitions.map((competition) => (
              <div key={competition.id} className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 border-2" style={{ borderColor: '#C6FC7B' }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: getDifficultyColor(competition.difficulty), color: '#0D2818' }}>
                      {competition.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: getStatusColor(competition.status), color: 'white' }}>
                      {competition.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2" style={{ color: '#0D2818' }}>
                  {competition.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
                  {competition.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Domain:</span>
                    <span className="text-sm font-mono" style={{ color: '#0D2818' }}>{competition.domain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Current Price:</span>
                    <span className="text-sm font-bold" style={{ color: '#10B981' }}>{competition.currentPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Time Left:</span>
                    <span className="text-sm font-bold" style={{ color: '#EF4444' }}>{competition.timeLeft}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Participants:</span>
                    <span className="text-sm" style={{ color: '#0D2818' }}>{competition.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Prize Pool:</span>
                    <span className="text-sm font-bold" style={{ color: '#8B5CF6' }}>{competition.prizePool}</span>
                  </div>
                </div>

                <Link href={`/predict/${competition.id}`}>
                  <button className="w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg" style={{ backgroundColor: '#6603BF' }}>
                    Join Competition
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Competitions */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: '#0D2818' }}>
              Upcoming Competitions
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3B82F6' }}></div>
              <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Starting Soon</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingCompetitions.map((competition) => (
              <div key={competition.id} className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 border-2 opacity-90" style={{ borderColor: '#C6FC7B' }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: getDifficultyColor(competition.difficulty), color: '#0D2818' }}>
                      {competition.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: getStatusColor(competition.status), color: 'white' }}>
                      {competition.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2" style={{ color: '#0D2818' }}>
                  {competition.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
                  {competition.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Domain:</span>
                    <span className="text-sm font-mono" style={{ color: '#0D2818' }}>{competition.domain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Current Price:</span>
                    <span className="text-sm font-bold" style={{ color: '#10B981' }}>{competition.currentPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Starts:</span>
                    <span className="text-sm font-bold" style={{ color: '#3B82F6' }}>{competition.startTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium" style={{ color: '#0D2818' }}>Prize Pool:</span>
                    <span className="text-sm font-bold" style={{ color: '#8B5CF8' }}>{competition.prizePool}</span>
                  </div>
                </div>

                <button className="w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg opacity-75 cursor-not-allowed" style={{ backgroundColor: '#6B7280' }}>
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 rounded-2xl" style={{ backgroundColor: '#6603BF' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6FC7B' }}>
            Ready to Start Predicting?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#C6FC7B' }}>
            Join thousands of traders competing in domain prediction competitions
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/leaderboard">
              <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                View Leaderboard
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
