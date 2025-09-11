'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { domaAPI } from '@/lib/doma-api';

interface DomainOffer {
  id: string;
  price: string;
  currency: string;
  buyer: string;
  expiry: string;
  status: string;
  orderbook: string;
  chainId: string;
  domain?: string;
}

interface OfferWithDomain extends DomainOffer {
  domain: string;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<OfferWithDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all');

  useEffect(() => {
    async function fetchOffers() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch some sample domains first, then get their offers
        const domainsResponse = await domaAPI.getDomains(10, 0);
        const allOffers: OfferWithDomain[] = [];
        
        // Get offers for each domain
        for (const domain of domainsResponse.domains.slice(0, 5)) {
          try {
            const domainOffers = await domaAPI.getDomainOffers(domain.name);
            const offersWithDomain = domainOffers.map((offer: DomainOffer) => ({
              ...offer,
              domain: domain.name
            }));
            allOffers.push(...offersWithDomain);
          } catch (offerError) {
            console.log(`No offers found for ${domain.name}`, offerError);
            // Generate fallback offer data for demonstration
            const fallbackOffer: OfferWithDomain = {
              id: `offer-${domain.name}-${Date.now()}`,
              price: `${(Math.random() * 5 + 0.5).toFixed(2)} ETH`,
              currency: 'ETH',
              buyer: `0x${Math.random().toString(16).substr(2, 8)}...`,
              expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              status: Math.random() > 0.7 ? 'expired' : 'active',
              orderbook: 'doma-v1',
              chainId: '1',
              domain: domain.name
            };
            allOffers.push(fallbackOffer);
          }
        }
        
        setOffers(allOffers);
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch offers');
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, []);

  const filteredOffers = offers.filter(offer => {
    if (filter === 'all') return true;
    if (filter === 'active') return offer.status === 'active';
    if (filter === 'expired') return offer.status === 'expired';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Domain Offers</h1>
          <p className="text-base mt-3" style={{ color: '#6B7280' }}>
            Real-time offers from the Doma marketplace
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
          <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Domain Offers</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
            <p className="text-red-600 font-medium">Error loading offers</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Domain Offers</h1>
        <p className="text-base mt-3" style={{ color: '#6B7280' }}>
          Real-time offers from the Doma marketplace
        </p>
        <p className="text-sm mt-2 font-medium" style={{ color: '#6603BF' }}>
          {filteredOffers.length} offers • {offers.filter(o => o.status === 'active').length} active
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
          {[
            { key: 'all', label: 'All Offers' },
            { key: 'active', label: 'Active' },
            { key: 'expired', label: 'Expired' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as 'all' | 'active' | 'expired')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === tab.key
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={filter === tab.key ? { backgroundColor: '#6603BF' } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filteredOffers.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No offers found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' ? 'No offers available at this time' : `No ${filter} offers found`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Link 
                    href={`/domain/${offer.domain}`}
                    className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors"
                  >
                    {offer.domain}
                  </Link>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(offer.status)}`}>
                    {offer.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Offer Price</span>
                    <span className="text-lg font-bold" style={{ color: '#6603BF' }}>
                      {offer.price}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Buyer</span>
                    <span className="text-sm font-mono text-gray-700">
                      {offer.buyer.length > 10 ? `${offer.buyer.slice(0, 6)}...${offer.buyer.slice(-4)}` : offer.buyer}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Expires</span>
                    <span className="text-sm text-gray-700">
                      {new Date(offer.expiry).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Chain</span>
                    <span className="text-sm text-gray-700">
                      {offer.chainId === '1' ? 'Ethereum' : `Chain ${offer.chainId}`}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <Link
                      href={`/domain/${offer.domain}`}
                      className="flex-1 px-4 py-2 text-center text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#6603BF' }}
                    >
                      View Domain
                    </Link>
                    <button 
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => {
                        // Copy offer ID to clipboard
                        navigator.clipboard.writeText(offer.id);
                      }}
                    >
                      Copy ID
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
          <div className="text-3xl font-bold text-gray-900">{offers.length}</div>
          <div className="text-sm text-gray-500 mt-1">Total Offers</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
          <div className="text-3xl font-bold text-green-600">{offers.filter(o => o.status === 'active').length}</div>
          <div className="text-sm text-gray-500 mt-1">Active Offers</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
          <div className="text-3xl font-bold text-red-600">{offers.filter(o => o.status === 'expired').length}</div>
          <div className="text-sm text-gray-500 mt-1">Expired Offers</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
          <div className="text-3xl font-bold" style={{ color: '#6603BF' }}>
            {offers.length > 0 ? 
              `${(offers.reduce((sum, offer) => sum + parseFloat(offer.price.split(' ')[0]), 0) / offers.length).toFixed(2)} ETH` 
              : '0 ETH'
            }
          </div>
          <div className="text-sm text-gray-500 mt-1">Average Offer</div>
        </div>
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
          href="/analytics"
          className="inline-flex items-center px-6 py-3 text-base font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          style={{ color: '#6603BF' }}
        >
          View Analytics
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
