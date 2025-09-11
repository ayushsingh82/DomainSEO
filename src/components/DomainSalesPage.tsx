'use client';

import { useState, useEffect } from 'react';
import domaAPI, { DomainData, DomainAnalytics, DomainOffer, DomainListing } from '@/lib/doma-api';
import Image from 'next/image';
import Link from 'next/link';

interface DomainSalesPageProps {
  domainName: string;
  customization?: {
    brandName?: string;
    headline?: string;
    description?: string;
    themeColor?: string;
    accentColor?: string;
    logoUrl?: string;
    backgroundImage?: string;
    showStats?: boolean;
    showOffers?: boolean;
    customCTA?: string;
  };
}

export default function DomainSalesPage({ domainName, customization }: DomainSalesPageProps) {
  const [domainData, setDomainData] = useState<DomainData | null>(null);
  const [domainAnalytics, setDomainAnalytics] = useState<DomainAnalytics | null>(null);
  const [domainOffers, setDomainOffers] = useState<DomainOffer[]>([]);
  const [domainListings, setDomainListings] = useState<DomainListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Default customization
  const config = {
    brandName: 'Doma Sales',
    headline: `Own ${domainName}`,
    description: 'Premium domain NFT available for purchase',
    themeColor: '#6603BF',
    accentColor: '#C6FC7B',
    logoUrl: '',
    backgroundImage: '',
    showStats: true,
    showOffers: true,
    customCTA: 'Get This Domain',
    ...customization,
  };

  useEffect(() => {
    async function fetchDomainData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch domain info
        const data = await domaAPI.getDomainInfo(domainName);

        if (!data) {
          setError('Domain not found');
          return;
        }

        // Convert NameData to DomainData format for compatibility
        const compatibleData: DomainData = {
          name: data.name,
          tld: data.name.split('.').pop() || '',
          tokenId: undefined,
          owner: data.claimedBy,
          contractAddress: undefined,
          chainId: undefined,
          description: `Premium domain ${data.name} available on Doma Network`,
          image: '/globe.svg', // Default image
          listings: [],
          offers: [],
          floorPrice: '0',
          lastSale: '0',
          registrar: data.registrar,
          nameServers: data.nameservers?.map(ns => ns.ldhName) || [],
          expiryDate: data.expiresAt,
          statistics: {
            totalSales: 0,
            totalVolume: '0',
            averagePrice: '0',
          },
        };

        setDomainData(compatibleData);

        // Fetch real analytics data
        try {
          const analytics = await domaAPI.getDomainAnalytics();
          setDomainAnalytics(analytics);
        } catch (analyticsError) {
          console.log('Analytics data not available for', domainName, analyticsError);
        }

        // Fetch real offers data
        try {
          const offers = await domaAPI.getDomainOffers();
          setDomainOffers(offers);
        } catch (offersError) {
          console.log('Offers data not available for', domainName, offersError);
        }

        // Fetch real listings data
        try {
          const listings = await domaAPI.getDomainListings();
          setDomainListings(listings);
        } catch (listingsError) {
          console.log('Listings data not available for', domainName, listingsError);
        }

      } catch (err) {
        console.error('Error fetching domain data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load domain data');
      } finally {
        setLoading(false);
      }
    }

    fetchDomainData();
  }, [domainName]);

  const handleBuyNow = async () => {
    if (!domainData || !domainData.listings.length) {
      alert('No listings available for this domain');
      return;
    }

    const listing = domainData.listings[0]; // Get the first listing
    
    // In a real implementation, this would integrate with wallet connection
    // and execute the blockchain transaction
    alert(`Initiating purchase for ${domainName}\nPrice: ${listing.price} ${listing.currency}\nOrderbook: ${listing.orderbook}\n\nThis would redirect to wallet connection and transaction signing.`);
  };

  const handleMakeOffer = () => {
    // In a real implementation, this would open an offer modal
    // with price input and wallet connection
    const offerAmount = prompt(`Make an offer for ${domainName}\nEnter amount in ETH:`);
    if (offerAmount) {
      alert(`Offer submitted: ${offerAmount} ETH for ${domainName}\n\nThis would create a signed offer via the Doma API.`);
    }
  };

  const formatPrice = (price: string | undefined, currency: string = 'ETH') => {
    if (!price) return 'N/A';
    return `${parseFloat(price).toFixed(2)} ${currency}`;
  };

  const formatAddress = (address: string | undefined) => {
    if (!address) return 'N/A';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: config.accentColor }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: config.themeColor }}></div>
          <p className="text-lg font-medium" style={{ color: config.themeColor }}>Loading {domainName}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: config.accentColor }}>
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4" style={{ color: config.themeColor }}>Error Loading Domain</h1>
          <p className="text-lg mb-6" style={{ color: '#0D2818' }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg text-white font-medium"
            style={{ backgroundColor: config.themeColor }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!domainData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: config.accentColor }}>
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-4" style={{ color: config.themeColor }}>Domain Not Found</h1>
          <p className="text-lg mb-6" style={{ color: '#0D2818' }}>
            The domain &quot;{domainName}&quot; could not be found in the Doma registry.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="block w-full px-6 py-3 rounded-lg text-white font-medium"
              style={{ backgroundColor: config.themeColor }}
            >
              Go Back
            </button>
            <a
              href="/domains"
              className="block w-full px-6 py-3 rounded-lg border-2 font-medium text-center"
              style={{ borderColor: config.themeColor, color: config.themeColor }}
            >
              Browse Domains
            </a>
          </div>
        </div>
      </div>
    );
  }

  const bestListing = domainListings.length > 0 ? domainListings[0] : (domainData.listings.length > 0 ? domainData.listings[0] : null);
  const bestOffer = domainOffers.length > 0 ? domainOffers.sort((a: { price: string }, b: { price: string }) => parseFloat(b.price) - parseFloat(a.price))[0] : (domainData.offers.length > 0 ? domainData.offers.sort((a: { price: string }, b: { price: string }) => parseFloat(b.price) - parseFloat(a.price))[0] : null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: config.accentColor }}>
      {/* Header */}
      <header className="py-6 px-4 border-b" style={{ borderColor: config.themeColor }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {config.logoUrl ? (
              <Image src={config.logoUrl} alt={config.brandName} width={40} height={40} className="rounded" />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: config.themeColor }}>
                <span className="text-white font-bold">{config.brandName.charAt(0)}</span>
              </div>
            )}
            <span className="text-xl font-bold" style={{ color: config.themeColor }}>{config.brandName}</span>
          </div>
          <Link href="/create" className="text-sm px-4 py-2 rounded-lg border" style={{ color: config.themeColor, borderColor: config.themeColor }}>
            Create Your Own
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Domain Info */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              {domainData.image && (
                <Image src={domainData.image} alt={domainName} width={64} height={64} className="rounded-lg" />
              )}
              <h1 className="text-6xl md:text-8xl font-extrabold" style={{ color: config.themeColor }}>
                {domainName}
              </h1>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0D2818' }}>
              {config.headline}
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color: '#0D2818' }}>
              {domainData.description || config.description}
            </p>

            {/* Price and Action Buttons */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl mb-8 border-2" style={{ borderColor: config.themeColor }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {bestListing && (
                  <div className="text-center">
                    <div className="text-sm font-medium mb-2" style={{ color: '#6B7280' }}>Buy Now Price</div>
                    <div className="text-4xl font-bold" style={{ color: config.themeColor }}>
                      {formatPrice(bestListing.price, bestListing.currency)}
                    </div>
                    <div className="text-sm" style={{ color: '#6B7280' }}>on {bestListing.orderbook}</div>
                  </div>
                )}
                {bestOffer && config.showOffers && (
                  <div className="text-center">
                    <div className="text-sm font-medium mb-2" style={{ color: '#6B7280' }}>Top Offer</div>
                    <div className="text-4xl font-bold" style={{ color: '#16a34a' }}>
                      {formatPrice(bestOffer.price, bestOffer.currency)}
                    </div>
                    <div className="text-sm" style={{ color: '#6B7280' }}>from {formatAddress(bestOffer.buyer)}</div>
                  </div>
                )}
                {!bestListing && !bestOffer && (
                  <div className="col-span-2 text-center">
                    <div className="text-2xl font-bold mb-2" style={{ color: config.themeColor }}>Make an Offer</div>
                    <div className="text-lg" style={{ color: '#6B7280' }}>No active listings - be the first to make an offer!</div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {bestListing ? (
                  <button
                    onClick={handleBuyNow}
                    className="px-8 py-4 rounded-xl font-bold text-white text-lg shadow-lg hover:scale-105 transition-transform"
                    style={{ backgroundColor: config.themeColor }}
                  >
                    {config.customCTA}
                  </button>
                ) : (
                  <div className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-dashed" style={{ color: '#6B7280', borderColor: '#6B7280' }}>
                    Not Currently Listed
                  </div>
                )}
                <button
                  onClick={handleMakeOffer}
                  className="px-8 py-4 rounded-xl font-bold text-lg border-2 hover:scale-105 transition-transform"
                  style={{ 
                    color: config.themeColor, 
                    borderColor: config.themeColor,
                    backgroundColor: 'transparent'
                  }}
                >
                  Make Offer
                </button>
              </div>
            </div>
          </div>

          {/* Domain Stats */}
          {config.showStats && (domainAnalytics || domainData.statistics) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold mb-2" style={{ color: config.themeColor }}>
                  {domainAnalytics?.totalSales || domainData.statistics?.totalSales || 0}
                </div>
                <div className="text-sm font-medium" style={{ color: '#6B7280' }}>Total Sales</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold mb-2" style={{ color: config.themeColor }}>
                  {formatPrice(domainAnalytics?.totalVolume || domainData.statistics?.totalVolume)}
                </div>
                <div className="text-sm font-medium" style={{ color: '#6B7280' }}>Total Volume</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold mb-2" style={{ color: config.themeColor }}>
                  {formatPrice(domainAnalytics?.averagePrice || domainData.statistics?.averagePrice)}
                </div>
                <div className="text-sm font-medium" style={{ color: '#6B7280' }}>Average Price</div>
              </div>
            </div>
          )}

          {/* Domain Details */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-2" style={{ borderColor: config.themeColor }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: config.themeColor }}>Domain Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium" style={{ color: '#6B7280' }}>Owner</span>
                    <span style={{ color: '#0D2818' }}>{formatAddress(domainData.owner)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium" style={{ color: '#6B7280' }}>TLD</span>
                    <span style={{ color: '#0D2818' }}>.{domainData.tld}</span>
                  </div>
                  {domainData.registrar && (
                    <div className="flex justify-between">
                      <span className="font-medium" style={{ color: '#6B7280' }}>Registrar</span>
                      <span style={{ color: '#0D2818' }}>{domainData.registrar.name}</span>
                    </div>
                  )}
                  {domainData.expiryDate && (
                    <div className="flex justify-between">
                      <span className="font-medium" style={{ color: '#6B7280' }}>Expires</span>
                      <span style={{ color: '#0D2818' }}>
                        {new Date(domainData.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium" style={{ color: '#6B7280' }}>Chain ID</span>
                    <span style={{ color: '#0D2818' }}>{domainData.chainId}</span>
                  </div>
                  {domainData.tokenId && (
                    <div className="flex justify-between">
                      <span className="font-medium" style={{ color: '#6B7280' }}>Token ID</span>
                      <span style={{ color: '#0D2818' }}>{domainData.tokenId}</span>
                    </div>
                  )}
                  {domainData.floorPrice && (
                    <div className="flex justify-between">
                      <span className="font-medium" style={{ color: '#6B7280' }}>Floor Price</span>
                      <span style={{ color: '#0D2818' }}>{formatPrice(domainData.floorPrice)}</span>
                    </div>
                  )}
                  {domainData.lastSale && (
                    <div className="flex justify-between">
                      <span className="font-medium" style={{ color: '#6B7280' }}>Last Sale</span>
                      <span style={{ color: '#0D2818' }}>{formatPrice(domainData.lastSale)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Offers */}
          {config.showOffers && (domainOffers.length > 0 || domainData.offers.length > 0) && (
            <div className="mt-8 bg-white rounded-2xl p-8 shadow-2xl border-2" style={{ borderColor: config.themeColor }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: config.themeColor }}>Recent Offers</h3>
              <div className="space-y-4">
                {(domainOffers.length > 0 ? domainOffers : domainData.offers).slice(0, 5).map((offer, index) => (
                  <div key={offer.id || index} className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
                    <div>
                      <div className="font-semibold" style={{ color: '#0D2818' }}>
                        {formatPrice(offer.price, offer.currency)}
                      </div>
                      <div className="text-sm" style={{ color: '#6B7280' }}>
                        from {formatAddress(offer.buyer)}
                      </div>
                    </div>
                    <div className="text-sm" style={{ color: '#6B7280' }}>
                      {offer.expiry ? `Expires ${new Date(offer.expiry).toLocaleDateString()}` : 'Active'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link 
                  href="/offers" 
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                  style={{ color: config.themeColor, borderColor: config.themeColor }}
                >
                  View All Offers
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t mt-12" style={{ borderColor: config.themeColor }}>
        <div className="container mx-auto text-center">
          <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
            Powered by <Link href="/" className="font-semibold hover:underline" style={{ color: config.themeColor }}>domaSEO</Link> • 
            Real-time data from <a href="https://doma.xyz" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: config.themeColor }}>Doma Protocol</a>
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/create" className="hover:underline" style={{ color: config.themeColor }}>Create Your Page</Link>
            <Link href="/domains" className="hover:underline" style={{ color: config.themeColor }}>Browse Domains</Link>
            <a href="https://docs.doma.xyz" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: config.themeColor }}>API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
