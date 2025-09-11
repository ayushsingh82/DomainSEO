'use client';

import { useEffect, useState } from 'react';
import { getDomainOffers } from '@/lib/doma-api-validated';

interface Offer {
  id: string;
  domainName: string;
  price: string;
  currency: string;
  decimals: number;
  offererAddress: string;
  expiresAt: string;
  createdAt: string;
  orderbook: string;
  registrar: string;
  chain: string;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDomainOffers();
        setOffers(data.offers);
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch offers');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const formatPrice = (price: string, currency: string, decimals: number) => {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return price;
    
    const formatted = (numPrice / Math.pow(10, decimals)).toFixed(4);
    return `${formatted} ${currency}`;
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-black">Domain Offers</h1>
        <div className="text-center text-black dark:text-black">Loading offers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">Domain Offers</h1>
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-black">Domain Offers</h1>
      
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-600">
          Total offers: {offers.length}
        </p>
      </div>

      {offers.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No offers available at the moment.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
          {offers.map((offer) => (
            <div key={offer.id} className="border bprder-green-300 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-gray-200 to-gray-300">
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-black">{offer.domainName}</h3>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-600">
                <div>
                  <span className="font-medium">Price:</span>{' '}
                  <span className="text-green-600 font-bold">
                    {formatPrice(offer.price, offer.currency, offer.decimals)}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium">Offerer:</span>{' '}
                  {formatAddress(offer.offererAddress)}
                </div>
                
                <div>
                  <span className="font-medium">Registrar:</span> {offer.registrar}
                </div>
                
                <div>
                  <span className="font-medium">Chain:</span> {offer.chain}
                </div>
                
                <div>
                  <span className="font-medium">Orderbook:</span> {offer.orderbook}
                </div>
                
                <div>
                  <span className="font-medium">Created:</span> {formatDate(offer.createdAt)}
                </div>
                
                <div>
                  <span className="font-medium">Expires:</span> {formatDate(offer.expiresAt)}
                </div>
              </div>
              
              <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}