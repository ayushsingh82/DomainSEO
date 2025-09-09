'use client';

export default function Profile() {
  // Minimal recent bets data
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
  const totalBets = recentPredictions.length;
  const totalWins = recentPredictions.filter(p => p.status === 'correct').length;
  const totalLosses = recentPredictions.filter(p => p.status === 'incorrect').length;

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold" style={{ color: '#0D2818' }}>Your Profile</h1>
        <p className="text-sm mt-2" style={{ color: '#6B7280' }}>Overview of your betting activity</p>
      </div>

      {/* Simple Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
          <div className="text-3xl font-bold" style={{ color: '#0D2818' }}>{totalBets}</div>
          <div className="text-sm" style={{ color: '#6B7280' }}>Total Bets</div>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
          <div className="text-3xl font-bold" style={{ color: '#10B981' }}>{totalWins}</div>
          <div className="text-sm" style={{ color: '#6B7280' }}>Wins</div>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
          <div className="text-3xl font-bold" style={{ color: '#EF4444' }}>{totalLosses}</div>
          <div className="text-sm" style={{ color: '#6B7280' }}>Losses</div>
        </div>
      </div>

      {/* Bets Table */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b-2" style={{ borderColor: '#C6FC7B' }}>
          <h3 className="text-lg font-bold" style={{ color: '#0D2818' }}>Your Bets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#C6FC7B' }}>
                <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Domain</th>
                <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Result</th>
                <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Timeframe</th>
                <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPredictions.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm" style={{ color: '#0D2818' }}>{p.domain}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${p.status === 'correct' ? 'text-green-600' : 'text-red-600'}`}>{p.status === 'correct' ? 'Win' : 'Loss'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm" style={{ color: '#0D2818' }}>{p.timeframe}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm" style={{ color: '#6B7280' }}>{p.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
