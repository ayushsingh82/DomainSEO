'use client';

export default function Oracles() {
  // Temporary JSON data for domains and current prices
  const domainPrices = [
    { domain: 'crypto.com', price: '$50' },
    { domain: 'apple.eth', price: '$55' },
    { domain: 'nft.eth', price: '$80' },
    { domain: 'ai.eth', price: '$17' },
    { domain: 'defi.eth', price: '$98' },
    { domain: 'gaming.eth', price: '$74' }
  ];

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold" style={{ color: '#0D2818' }}>Domain Prices</h1>
        <p className="text-sm mt-2" style={{ color: '#6B7280' }}>
          Showing temporary data while oracles are unavailable
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b-2" style={{ borderColor: '#C6FC7B' }}>
          <h3 className="text-lg font-bold" style={{ color: '#0D2818' }}>
            Current Market Snapshot
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#C6FC7B' }}>
                <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Domain</th>
                <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: '#0D2818' }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {domainPrices.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm" style={{ color: '#0D2818' }}>{item.domain}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-sm" style={{ color: '#10B981' }}>{item.price}</span>
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
