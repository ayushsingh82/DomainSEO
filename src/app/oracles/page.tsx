'use client';

import Link from 'next/link';

export default function Oracles() {
  const oracleFeatures = [
    {
      title: "Real-time Price Analysis",
      description: "Continuously monitors domain market data from multiple sources including major exchanges, auction houses, and private sales.",
      icon: "📊",
      details: [
        "Live price feeds from 50+ sources",
        "Historical data analysis",
        "Market sentiment tracking",
        "Volume and liquidity metrics"
      ]
    },
    {
      title: "Machine Learning Validation",
      description: "Advanced ML algorithms analyze prediction patterns and verify accuracy against actual market movements.",
      icon: "🤖",
      details: [
        "Neural network prediction models",
        "Pattern recognition algorithms",
        "Anomaly detection systems",
        "Continuous learning and adaptation"
      ]
    },
    {
      title: "Fair Scoring System",
      description: "Transparent and unbiased scoring mechanism that rewards accurate predictions while penalizing manipulation attempts.",
      icon: "⚖️",
      details: [
        "Weighted accuracy scoring",
        "Confidence level adjustments",
        "Anti-manipulation measures",
        "Transparent calculation methods"
      ]
    },
    {
      title: "Automated Verification",
      description: "Instant verification of predictions against actual market outcomes with no human intervention required.",
      icon: "⚡",
      details: [
        "Sub-second verification times",
        "Automated result processing",
        "Real-time leaderboard updates",
        "Instant reward distribution"
      ]
    }
  ];

  const oracleStats = [
    { label: "Prediction Accuracy", value: "99.7%", color: "#10B981" },
    { label: "Verification Speed", value: "< 1s", color: "#3B82F6" },
    { label: "Data Sources", value: "50+", color: "#8B5CF6" },
    { label: "Uptime", value: "99.9%", color: "#F59E0B" }
  ];

  const verificationProcess = [
    {
      step: 1,
      title: "Data Collection",
      description: "Oracle collects real-time domain price data from multiple verified sources including major marketplaces, exchanges, and auction platforms.",
      icon: "📡"
    },
    {
      step: 2,
      title: "Prediction Analysis",
      description: "ML algorithms analyze submitted predictions, checking for patterns, anomalies, and potential manipulation attempts.",
      icon: "🔍"
    },
    {
      step: 3,
      title: "Market Comparison",
      description: "Compare predictions against actual market movements at the specified timeframe, accounting for market volatility and external factors.",
      icon: "📈"
    },
    {
      step: 4,
      title: "Score Calculation",
      description: "Calculate accuracy scores based on prediction closeness, confidence levels, and market conditions. Apply weighted scoring for fairness.",
      icon: "🧮"
    },
    {
      step: 5,
      title: "Result Verification",
      description: "Final verification and validation of results before updating leaderboards and distributing rewards to participants.",
      icon: "✅"
    }
  ];

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#0D2818' }}>
            AI Valuation Oracles
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#0D2818' }}>
            Our advanced AI-powered oracles ensure fair, accurate, and transparent verification of all domain price predictions.
          </p>
        </div>

        {/* Oracle Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {oracleStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm font-medium" style={{ color: '#0D2818' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Oracle Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#0D2818' }}>
            Oracle Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {oracleFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold" style={{ color: '#0D2818' }}>
                    {feature.title}
                  </h3>
                </div>
                <p className="text-lg mb-6" style={{ color: '#6B7280' }}>
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-sm" style={{ color: '#0D2818' }}>
                      <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#C6FC7B' }}></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#0D2818' }}>
            Verification Process
          </h2>
          <div className="space-y-8">
            {verificationProcess.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg" style={{ backgroundColor: '#6603BF' }}>
                    {step.step}
                  </div>
                </div>
                <div className="flex-grow bg-white rounded-2xl shadow-2xl p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-4">{step.icon}</span>
                    <h3 className="text-xl font-bold" style={{ color: '#0D2818' }}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-lg" style={{ color: '#6B7280' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Transparency */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#0D2818' }}>
              Security & Transparency
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0D2818' }}>
                  Secure Infrastructure
                </h3>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  All oracle data is encrypted and stored on secure, decentralized infrastructure with multiple backup systems.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0D2818' }}>
                  Open Source
                </h3>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  Oracle algorithms and verification methods are open source, allowing community review and verification.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0D2818' }}>
                  Real-time Updates
                </h3>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  Live updates and transparent reporting ensure all participants can verify oracle accuracy and fairness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#0D2818' }}>
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0D2818' }}>
                Data Sources
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: '#6B7280' }}>
                <li>• Major domain marketplaces (GoDaddy, Namecheap, etc.)</li>
                <li>• NFT marketplaces (OpenSea, Rarible, etc.)</li>
                <li>• Auction platforms (Flippa, Sedo, etc.)</li>
                <li>• Private sale databases</li>
                <li>• Blockchain domain registries</li>
                <li>• Social sentiment analysis</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0D2818' }}>
                ML Models
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: '#6B7280' }}>
                <li>• LSTM neural networks for price prediction</li>
                <li>• Random Forest for pattern recognition</li>
                <li>• Support Vector Machines for classification</li>
                <li>• Ensemble methods for accuracy improvement</li>
                <li>• Reinforcement learning for adaptation</li>
                <li>• Natural language processing for sentiment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 rounded-2xl" style={{ backgroundColor: '#6603BF' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6FC7B' }}>
            Trust in AI-Powered Accuracy
          </h2>
          <p className="text-lg mb-8" style={{ color: '#C6FC7B' }}>
            Experience fair, transparent, and accurate prediction verification
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/competitions">
              <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Start Competing
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
