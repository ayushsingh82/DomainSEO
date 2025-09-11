'use client';

import { useEffect, useState } from 'react';
import { getAnalyticsData } from '@/lib/doma-api-validated';

interface AnalyticsData {
  totalDomains: number;
  totalListings: number;
  totalVolume: string;
  averagePrice: string;
  floorPrice: string;
  listings: Array<{
    id: string;
    name: string;
    price: string;
    currency: {
      symbol: string;
      decimals: number;
    };
    createdAt: string;
  }>;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAnalyticsData();
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const formatPrice = (price: string, currency: { symbol: string; decimals: number }) => {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return price;
    
    const formatted = (numPrice / Math.pow(10, currency.decimals)).toFixed(4);
    return `${formatted} ${currency.symbol}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-black">Domain Analytics</h1>
        <div className="text-center text-black dark:text-black">Loading analytics data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-black">Domain Analytics</h1>
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">Domain Analytics</h1>
        <div className="text-center text-black dark:text-white">No analytics data available</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-black">Domain Analytics</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Domains</h3>
          <p className="text-3xl font-bold text-blue-600">
            {analytics.totalDomains.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Total Listings</h3>
          <p className="text-3xl font-bold text-green-600">
            {analytics.totalListings.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Total Volume</h3>
          <p className="text-3xl font-bold text-purple-600">
            {analytics.totalVolume}
          </p>
          <p className="text-sm text-purple-500">ETH + USDC</p>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">Average Price</h3>
          <p className="text-3xl font-bold text-orange-600">
            {analytics.averagePrice}
          </p>
          <p className="text-sm text-orange-500">Normalized</p>
        </div>
        
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Floor Price</h3>
          <p className="text-3xl font-bold text-red-600">
            {analytics.floorPrice}
          </p>
          <p className="text-sm text-red-500">Lowest Listed</p>
        </div>
      </div>

      {/* Recent Listings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-black">Recent Listings</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-600">
                <th className="px-4 py-3 text-left font-semibold">Domain</th>
                <th className="px-4 py-3 text-left font-semibold">Price</th>
                <th className="px-4 py-3 text-left font-semibold">Currency</th>
                <th className="px-4 py-3 text-left font-semibold">Listed Date</th>
              </tr>
            </thead>
            <tbody>
              {analytics.listings.map((listing, index) => (
                <tr key={listing.id} className={index % 2 === 0 ? 'bg-gray-400' : 'bg-gray-300'}>
                  <td className="px-4 py-3 font-medium">{listing.name}</td>
                  <td className="px-4 py-3 text-green-600 font-bold">
                    {formatPrice(listing.price, listing.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-gray-600 rounded text-sm">
                      {listing.currency.symbol}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(listing.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {analytics.listings.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No recent listings available
          </div>
        )}
      </div>

      {/* Market Insights */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-black dark:text-black">Market Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Listing Rate:</span>
              <span className="font-semibold text-green-600">
                {((analytics.totalListings / analytics.totalDomains) * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Marketplace:</span>
              <span className="font-semibold text-green-600">Doma Network</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Network:</span>
              <span className="font-semibold text-green-600">Testnet</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-black dark:text-black">Price Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Price Range:</span>
              <span className="font-semibold text-green-600">
                {analytics.floorPrice} - {analytics.averagePrice}+
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Market Depth:</span>
              <span className="font-semibold text-green-600">{analytics.totalListings} listings</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Liquidity:</span>
              <span className="font-semibold text-blue-600">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
