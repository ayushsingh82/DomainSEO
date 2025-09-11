'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { domaAPI } from '@/lib/doma-api';

interface OrderbookData {
  totalListings: number;
  totalOffers: number;
  totalVolume: string;
  recentActivity: Array<{
    type: 'listing' | 'offer' | 'sale';
    domain: string;
    price: string;
    currency: string;
    timestamp: number;
    participant: string;
  }>;
  topListings: Array<{
    domain: string;
    price: string;
    currency: string;
    seller: string;
  }>;
  topOffers: Array<{
    domain: string;
    price: string;
    currency: string;
    buyer: string;
  }>;
}

export default function OrderbookPage() {
  const [orderbook, setOrderbook] = useState<OrderbookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'activity' | 'listings' | 'offers'>('activity');

  useEffect(() => {
    async function fetchOrderbook() {
      try {
        setLoading(true);
        setError(null);
        const data = await domaAPI.getOrderbookData();
        setOrderbook(data);
      } catch (err) {
        console.error('Error fetching orderbook:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch orderbook data');
      } finally {
        setLoading(false);
      }
    }

    fetchOrderbook();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'listing':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        );
      case 'offer':
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        );
      case 'sale':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Doma Orderbook</h1>
          <p className="text-base mt-3" style={{ color: '#6B7280' }}>
            Real-time marketplace activity and order data
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
          <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Doma Orderbook</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
            <p className="text-red-600 font-medium">Error loading orderbook</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!orderbook) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Doma Orderbook</h1>
          <p className="text-gray-500 mt-4">No orderbook data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Doma Orderbook</h1>
        <p className="text-base mt-3" style={{ color: '#6B7280' }}>
          Real-time marketplace activity and order data
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Listings</p>
              <p className="text-3xl font-bold text-gray-900">{orderbook.totalListings.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-500">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Offers</p>
              <p className="text-3xl font-bold text-gray-900">{orderbook.totalOffers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-500">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Volume</p>
              <p className="text-3xl font-bold text-gray-900">{orderbook.totalVolume}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6603BF' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
          {[
            { key: 'activity', label: 'Recent Activity' },
            { key: 'listings', label: 'Top Listings' },
            { key: 'offers', label: 'Top Offers' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'activity' | 'listings' | 'offers')}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.key
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={activeTab === tab.key ? { backgroundColor: '#6603BF' } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {activeTab === 'activity' && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {orderbook.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {getActivityIcon(activity.type)}
                    <div className="ml-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 capitalize mr-2">{activity.type}</span>
                        <Link href={`/domain/${activity.domain}`} className="font-medium text-gray-900 hover:text-purple-600">
                          {activity.domain}
                        </Link>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{activity.price}</p>
                    <p className="text-sm text-gray-500">
                      {activity.participant.slice(0, 6)}...{activity.participant.slice(-4)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Top Listings</h3>
            <div className="space-y-4">
              {orderbook.topListings.map((listing, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mr-4" style={{ backgroundColor: '#6603BF' }}>
                      {index + 1}
                    </div>
                    <div>
                      <Link href={`/domain/${listing.domain}`} className="font-medium text-gray-900 hover:text-purple-600">
                        {listing.domain}
                      </Link>
                      <p className="text-sm text-gray-500">
                        Seller: {listing.seller.slice(0, 6)}...{listing.seller.slice(-4)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: '#6603BF' }}>{listing.price}</p>
                    <p className="text-sm text-gray-500">{listing.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Top Offers</h3>
            <div className="space-y-4">
              {orderbook.topOffers.map((offer, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mr-4 bg-green-500">
                      {index + 1}
                    </div>
                    <div>
                      <Link href={`/domain/${offer.domain}`} className="font-medium text-gray-900 hover:text-purple-600">
                        {offer.domain}
                      </Link>
                      <p className="text-sm text-gray-500">
                        Buyer: {offer.buyer.slice(0, 6)}...{offer.buyer.slice(-4)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{offer.price}</p>
                    <p className="text-sm text-gray-500">{offer.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-12 space-x-4">
        <Link
          href="/domains"
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#6603BF' }}
        >
          Browse Domains
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Link>
        
        <Link
          href="/offers"
          className="inline-flex items-center px-6 py-3 text-base font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          style={{ color: '#6603BF' }}
        >
          View All Offers
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </Link>
        
        <Link
          href="/analytics"
          className="inline-flex items-center px-6 py-3 text-base font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          style={{ color: '#6603BF' }}
        >
          Market Analytics
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
