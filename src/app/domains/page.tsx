'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { domaAPI } from '@/lib/doma-api';

interface OrderbookItem {
  name: string;
  tld: string;
  imageUrl?: string;
  description?: string;
  registrar?: string;
  owner?: string;
  listings?: number;
  offers?: number;
  fullApiData?: Record<string, unknown>; // Store the full API response data
}

export default function DomainsPage() {
  const [domains, setDomains] = useState<OrderbookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [showFullData, setShowFullData] = useState(false);
  const [apiResponse, setApiResponse] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    async function fetchDomains() {
      try {
        setLoading(true);
        setError(null);

        const result = await domaAPI.getDomains(50, 0, query);
        
        console.log('Full API Result:', result);
        
        // Store the full API response for debugging
        setApiResponse(result as Record<string, unknown>);
        
        const domainItems: OrderbookItem[] = result.domains.map((domain: {
          name: string;
          tld: string;
          image?: string;
          description?: string;
          registrar?: string;
          owner?: string;
          fullApiData?: Record<string, unknown>;
        }) => ({
          name: domain.name,
          tld: domain.tld,
          imageUrl: domain.image,
          description: domain.description,
          registrar: domain.registrar,
          owner: domain.owner,
          fullApiData: domain.fullApiData,
        }));
        
        setDomains(domainItems);
      } catch (err) {
        console.error('Error fetching domains:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch domains');
        setDomains([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDomains();
  }, [query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return domains;
    return domains.filter((item) => item.name.toLowerCase().includes(q));
  }, [domains, query]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Explore Domains</h1>
          <p className="text-base mt-3" style={{ color: '#6B7280' }}>
            Live data sourced from the Doma orderbook. Use Buy Now or Make Offer.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-64"></div>
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
          <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Explore Domains</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
            <p className="text-red-600 font-medium">Error loading domains</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Explore Domains</h1>
        <p className="text-base mt-3" style={{ color: '#6B7280' }}>
          Live data sourced from the Doma orderbook. Use Buy Now or Make Offer.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search domains..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6603BF] focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Toggle for showing full API data */}
        <div className="mt-4 flex items-center justify-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showFullData}
              onChange={(e) => setShowFullData(e.target.checked)}
              className="rounded border-gray-300 text-[#6603BF] focus:ring-[#6603BF]"
            />
            <span className="text-sm text-gray-600">Show Full API Data</span>
          </label>
        </div>
        
        {/* Display API Response Summary */}
        {apiResponse && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">API Response Summary</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Total Domains: {Array.isArray(apiResponse.domains) ? (apiResponse.domains as unknown[]).length : 'N/A'}</div>
              <div>Total Count: {(apiResponse.totalCount as number) || 'N/A'}</div>
              <div>Has Next: {(apiResponse.hasNext as boolean) ? 'Yes' : 'No'}</div>
              {apiResponse.error && typeof apiResponse.error === 'string' ? (
                <div className="text-red-600">Error: {apiResponse.error}</div>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No domains found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {query ? 'Try adjusting your search criteria' : 'No domains available at this time'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <Link
              key={item.name}
              href={`/domain/${item.name}`}
              className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{ backgroundColor: '#6603BF' }}>
                    <span className="text-white font-bold text-lg">{item.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">.{item.tld}</p>
                  </div>
                </div>

                {item.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                )}

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{item.registrar || 'Unknown Registry'}</span>
                  {item.owner && (
                    <span className="font-mono text-xs">
                      {item.owner.length > 10 ? `${item.owner.slice(0, 6)}...${item.owner.slice(-4)}` : item.owner}
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Listings: {item.listings || 0}</span>
                    <span className="text-gray-600">Offers: {item.offers || 0}</span>
                  </div>
                </div>

                {/* Show full API data if toggle is enabled */}
                {showFullData && item.fullApiData && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <details className="text-xs">
                      <summary className="cursor-pointer text-[#6603BF] font-medium">
                        Full API Data
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-x-auto max-h-40 overflow-y-auto">
                        {JSON.stringify(item.fullApiData, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}

                <div className="mt-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-[#C6FC7B] text-[#0D2818] text-xs font-medium rounded-full">
                      View Details
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      Create Sales Page
                    </span>
                    {showFullData && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        API Data
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Show full API response when toggle is enabled */}
      {showFullData && apiResponse && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Complete API Response</h2>
          <details>
            <summary className="cursor-pointer text-[#6603BF] font-medium mb-2">
              Click to view full API response data
            </summary>
            <pre className="text-xs bg-white p-4 rounded border overflow-x-auto max-h-96 overflow-y-auto">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </details>
          
          {apiResponse.schemaInfo && typeof apiResponse.schemaInfo === 'object' ? (
            <details className="mt-4">
              <summary className="cursor-pointer text-[#6603BF] font-medium mb-2">
                GraphQL Schema Information
              </summary>
              <pre className="text-xs bg-white p-4 rounded border overflow-x-auto max-h-96 overflow-y-auto">
                {JSON.stringify(apiResponse.schemaInfo, null, 2)}
              </pre>
            </details>
          ) : null}
        </div>
      )}

      <div className="text-center mt-12">
        <Link
          href="/create"
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#6603BF' }}
        >
          Create Sales Page
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
