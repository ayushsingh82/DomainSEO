'use client';

import { useEffect, useState } from 'react';
import { getOrderbookData } from '@/lib/doma-api-validated';

interface Listing {
  id: string;
  tokenId: string;
  name: string;
  price: string;
  offererAddress: string;
  orderbook: string;
  expiresAt: string;
  createdAt: string;
  currency: {
    symbol: string;
    decimals: number;
  };
  registrar: {
    name: string;
  };
  chain: {
    name: string;
    networkId: string;
  };
}

interface Activity {
  __typename: string;
  domainName?: string;
  tokenId?: string;
  createdAt?: string;
  buyer?: string;
  seller?: string;
  payment?: {
    price: string;
    currencySymbol: string;
  };
}

export default function OrderbookPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalListings, setTotalListings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderbookData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrderbookData();
        setListings(data.listings);
        setActivities(data.activities);
        setTotalListings(data.totalListings);
      } catch (err) {
        console.error('Error fetching orderbook data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch orderbook data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderbookData();
  }, []);

  const formatPrice = (price: string, currency: { symbol: string; decimals: number }) => {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return price;
    
    const formatted = (numPrice / Math.pow(10, currency.decimals)).toFixed(4);
    return `${formatted} ${currency.symbol}`;
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatActivityPrice = (activity: Activity) => {
    if (activity.__typename === 'TokenPurchasedActivity' && activity.payment) {
      const numPrice = parseFloat(activity.payment.price);
      if (isNaN(numPrice)) return activity.payment.price;
      
      // Assume 18 decimals for ETH, 6 for USDC
      const decimals = activity.payment.currencySymbol === 'USDC' ? 6 : 18;
      const formatted = (numPrice / Math.pow(10, decimals)).toFixed(4);
      return `${formatted} ${activity.payment.currencySymbol}`;
    }
    return '';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Doma Orderbook</h1>
        <div className="text-center">Loading orderbook data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Doma Orderbook</h1>
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Doma Orderbook</h1>
      
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Total Listings</h3>
          <p className="text-2xl font-bold text-blue-600">{totalListings.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Active Listings</h3>
          <p className="text-2xl font-bold text-green-600">{listings.length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800">Recent Activities</h3>
          <p className="text-2xl font-bold text-purple-600">{activities.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Listings */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Active Listings</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {listings.map((listing) => (
              <div key={listing.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{listing.name}</h3>
                  <span className="text-green-600 font-bold">
                    {formatPrice(listing.price, listing.currency)}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Seller: {formatAddress(listing.offererAddress)}</div>
                  <div>Chain: {listing.chain.name}</div>
                  <div>Registrar: {listing.registrar.name}</div>
                  <div>Expires: {formatDate(listing.expiresAt)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activities.map((activity, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-blue-600 font-medium">
                      {activity.__typename.replace('Token', '').replace('Activity', '')}
                    </span>
                    {activity.domainName && (
                      <div className="font-semibold">{activity.domainName}</div>
                    )}
                  </div>
                  {activity.__typename === 'TokenPurchasedActivity' && activity.payment && (
                    <span className="text-green-600 font-bold">
                      {formatActivityPrice(activity)}
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  {activity.__typename === 'TokenPurchasedActivity' && (
                    <>
                      <div>Buyer: {formatAddress(activity.buyer || '')}</div>
                      <div>Seller: {formatAddress(activity.seller || '')}</div>
                      <div>Price: {formatActivityPrice(activity)}</div>
                    </>
                  )}
                  {activity.__typename === 'TokenMintedActivity' && (
                    <div>Minted: {activity.createdAt ? formatDate(activity.createdAt) : ''}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
