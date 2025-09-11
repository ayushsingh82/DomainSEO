'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { domaAPI } from '@/lib/doma-api';

interface MarketAnalytics {
  totalVolume: string;
  totalSales: number;
  averagePrice: string;
  topDomains: Array<{
    name: string;
    price: string;
    volume: string;
  }>;
  recentSales: Array<{
    domain: string;
    price: string;
    currency: string;
    timestamp: number;
    buyer: string;
    seller: string;
  }>;
  priceDistribution: Array<{
    range: string;
    count: number;
  }>;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<MarketAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        setError(null);
        const data = await domaAPI.getMarketAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Market Analytics</h1>
          <p className="text-base mt-3" style={{ color: '#6B7280' }}>
            Real-time insights from the Doma marketplace
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-48"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Market Analytics</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
            <p className="text-red-600 font-medium">Error loading analytics</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Market Analytics</h1>
          <p className="text-gray-500 mt-4">No analytics data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Market Analytics</h1>
        <p className="text-base mt-3" style={{ color: '#6B7280' }}>
          Real-time insights from the Doma marketplace
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Volume</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.totalVolume}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6603BF' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.totalSales.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C6FC7B' }}>
              <svg className="w-6 h-6" style={{ color: '#0D2818' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Price</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.averagePrice}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Domains */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Top Domains by Volume</h3>
          <div className="space-y-4">
            {analytics.topDomains.map((domain, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3" style={{ backgroundColor: '#6603BF' }}>
                    {index + 1}
                  </div>
                  <Link href={`/domain/${domain.name}`} className="font-medium text-gray-900 hover:text-purple-600">
                    {domain.name}
                  </Link>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{domain.price}</p>
                  <p className="text-sm text-gray-500">{domain.volume} volume</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Sales</h3>
          <div className="space-y-4">
            {analytics.recentSales.map((sale, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <Link href={`/domain/${sale.domain}`} className="font-medium text-gray-900 hover:text-purple-600">
                    {sale.domain}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {new Date(sale.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{sale.price}</p>
                  <p className="text-sm text-gray-500">
                    {sale.buyer.slice(0, 6)}...{sale.buyer.slice(-4)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Price Distribution</h3>
          <div className="space-y-3">
            {analytics.priceDistribution.map((range, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">{range.range}</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        backgroundColor: '#6603BF',
                        width: `${(range.count / Math.max(...analytics.priceDistribution.map(r => r.count))) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-gray-900 font-semibold">{range.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link 
              href="/domains" 
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="font-medium text-gray-700">Browse All Domains</span>
            </Link>
            
            <Link 
              href="/offers" 
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium text-gray-700">View All Offers</span>
            </Link>
            
            <Link 
              href="/orderbook" 
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="font-medium text-gray-700">Doma Orderbook</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
