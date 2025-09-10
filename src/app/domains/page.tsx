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
}

export default function DomainsPage() {
  const [domains, setDomains] = useState<OrderbookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(24); // Show 24 domains per page for better grid layout

  useEffect(() => {
    async function fetchDomains() {
      try {
        setLoading(true);
        setError(null);

        // Calculate offset based on current page
        const offset = (currentPage - 1) * itemsPerPage;
        
        // Fetch domains with pagination
        const result = await domaAPI.getDomains(itemsPerPage, offset, query);
        
        const domainItems: OrderbookItem[] = result.domains.map((domain: {
          name: string;
          tld: string;
          image?: string;
          description?: string;
          registrar?: string;
          owner?: string;
        }) => ({
          name: domain.name,
          tld: domain.tld,
          imageUrl: domain.image,
          description: domain.description,
          registrar: domain.registrar,
          owner: domain.owner,
        }));
        
        setDomains(domainItems);
        setTotalCount(result.totalCount || domainItems.length);
      } catch (err) {
        console.error('Error fetching domains:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch domains');
        setDomains([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchDomains();
  }, [query, currentPage, itemsPerPage]);

  const filtered = useMemo(() => {
    // When searching, we get filtered results from the API
    // When not searching, we show the current page of results
    return domains;
  }, [domains]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Calculate pagination info
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Explore Domains</h1>
          <p className="text-base mt-3" style={{ color: '#6B7280' }}>
            Live data sourced from the Doma orderbook. Use Buy Now or Make Offer.
          </p>
          <p className="text-sm mt-2 font-medium" style={{ color: '#6603BF' }}>
            Loading all available domains...
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
        {totalCount > 0 && (
          <p className="text-sm mt-2 font-medium" style={{ color: '#6603BF' }}>
            {totalCount.toLocaleString()} domains available • Showing {startItem.toLocaleString()}-{endItem.toLocaleString()} • Page {currentPage} of {totalPages.toLocaleString()}
          </p>
        )}
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

                <div className="mt-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-[#C6FC7B] text-[#0D2818] text-xs font-medium rounded-full">
                      View Sales Page
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12 mb-8">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {(() => {
            const maxVisible = 7;
            const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
            const end = Math.min(totalPages, start + maxVisible - 1);
            const pages = [];

            // Add first page if not visible
            if (start > 1) {
              pages.push(1);
              if (start > 2) pages.push('...');
            }

            // Add visible pages
            for (let i = start; i <= end; i++) {
              pages.push(i);
            }

            // Add last page if not visible
            if (end < totalPages) {
              if (end < totalPages - 1) pages.push('...');
              pages.push(totalPages);
            }

            return pages.map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  page === currentPage
                    ? 'text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                } ${page === '...' ? 'cursor-not-allowed' : ''}`}
                style={page === currentPage ? { backgroundColor: '#6603BF' } : {}}
              >
                {page}
              </button>
            ));
          })()}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
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
