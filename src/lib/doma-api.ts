// Main DOMA API exports using validated GraphQL queries
export * from './doma-api-validated';

// Re-export with original function names for compatibility
export {
  getDomainOffers as getOffers,
  getOrderbookData,
  getAnalyticsData,
  getListings as getAllListings,
  getDomainInfo,
  getAllNames as searchDomains,
} from './doma-api-validated';

// Legacy interface compatibility
export interface DomainListing {
  id: string;
  price: string;
  currency: string;
  orderbook: string;
  chainId: string;
  orderId: string;
  seller: string;
  expiry: string;
}

export interface DomainOffer {
  id: string;
  price: string;
  currency: string;
  orderbook: string;
  chainId: string;
  orderId: string;
  buyer: string;
  expiry: string;
  status?: string;
}

export interface DomainAnalytics {
  totalSales: number;
  totalVolume: string;
  averagePrice: string;
  priceHistory: Array<{
    price: string;
    currency: string;
    timestamp: number;
    type: string;
  }>;
  viewCount: number;
  offerCount: number;
  listingCount: number;
}

export interface DomainData {
  name: string;
  tld: string;
  tokenId?: string;
  owner?: string;
  contractAddress?: string;
  chainId?: string;
  description?: string;
  image?: string;
  listings: DomainListing[];
  offers: DomainOffer[];
  floorPrice?: string;
  lastSale?: string;
  registrar?: {
    name: string;
    url?: string;
  };
  nameServers?: string[];
  expiryDate?: string;
  statistics?: {
    totalSales: number;
    totalVolume: string;
    averagePrice: string;
  };
}

// Legacy API class for backwards compatibility
export class DomaAPI {
  async getOffers() {
    const { getOrderbookData } = await import('./doma-api-validated');
    return getOrderbookData();
  }

  async getAnalytics() {
    const { getAnalyticsData } = await import('./doma-api-validated');
    return getAnalyticsData();
  }

  async getListings() {
    const { getListings } = await import('./doma-api-validated');
    return getListings();
  }

  async getDomainInfo(name: string) {
    const { getDomainInfo } = await import('./doma-api-validated');
    return getDomainInfo(name);
  }

  // Legacy method names for compatibility
  async getDomains(limit: number, offset: number) {
    const { getAllNames } = await import('./doma-api-validated');
    const result = await getAllNames(limit, offset);
    return {
      domains: result.names.items.map((nameItem) => ({
        name: nameItem.name,
        tld: nameItem.name.split('.').pop() || '',
        tokenId: undefined,
        owner: undefined,
        contractAddress: undefined,
        chainId: undefined,
        registrar: undefined,
        nameServers: [],
        expiryDate: undefined,
      })),
      totalCount: result.names.totalCount,
      hasNextPage: false, // Not available in current API
    };
  }

  async getDomainAnalytics() {
    // Return mock analytics for compatibility
    return {
      totalSales: 0,
      totalVolume: '0',
      averagePrice: '0',
      priceHistory: [],
      viewCount: 0,
      offerCount: 0,
      listingCount: 0,
    };
  }

  async getDomainOffers() {
    // Return empty offers for compatibility
    return [];
  }

  async getDomainListings() {
    // Return empty listings for compatibility
    return [];
  }

  async getOrderbookData() {
    const { getOrderbookData } = await import('./doma-api-validated');
    return getOrderbookData();
  }
}

// Default export
const domaAPI = new DomaAPI();
export default domaAPI;
