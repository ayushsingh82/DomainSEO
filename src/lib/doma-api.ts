export const DOMA_API_KEY = 'v1.fa2d276a9752ed2ad4ffdd72344c4973af5051bbbeba1e4d393019cdf93bebbd';
export const DOMA_API_BASE_URL = 'https://api-testnet.doma.xyz';
export const DOMA_GRAPHQL_URL = 'https://api-testnet.doma.xyz/graphql';

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

class DomaAPI {
  private apiKey: string;
  private baseUrl: string;
  private graphqlUrl: string;

  constructor(apiKey: string = DOMA_API_KEY, baseUrl: string = DOMA_API_BASE_URL, graphqlUrl: string = DOMA_GRAPHQL_URL) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.graphqlUrl = graphqlUrl;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Api-Key': this.apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private async graphqlRequest(query: string, variables?: Record<string, unknown>) {
    try {
      console.log('GraphQL Request:', {
        url: this.graphqlUrl,
        query: query.substring(0, 200) + '...',
        variables
      });

      const response = await fetch(this.graphqlUrl, {
        method: 'POST',
        headers: {
          'Api-Key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      console.log('GraphQL Response Status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('GraphQL Error Response:', errorText);
        throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}. Response: ${errorText}`);
      }

      const result = await response.json();
      console.log('GraphQL Result:', result);
      
      if (result.errors) {
        console.error('GraphQL Query Errors:', result.errors);
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }

      return result.data;
    } catch (error) {
      console.error('GraphQL Request Error:', error);
      throw error;
    }
  }

  // Get domain information including listings and offers
  async getDomainInfo(domainName: string): Promise<DomainData | null> {
    try {
      // Start with a basic query to see if the domain exists
      const query = `
        query GetBasicDomainInfo($name: String!) {
          name(name: $name) {
            name
          }
        }
      `;

      console.log(`Fetching domain info for: ${domainName}`);
      
      const data = await this.graphqlRequest(query, { name: domainName });
      
      if (!data.name) {
        return null;
      }

      // Return basic domain data with real information from API
      const domainData: DomainData = {
        name: data.name.name,
        tld: data.name.name.split('.').pop() || 'unknown',
        description: `Premium domain ${data.name.name} available for purchase. Connect your wallet to make an offer or purchase directly.`,
        image: '/globe.svg',
        listings: [], // Will be populated when we can query listings
        offers: [], // Will be populated when we can query offers
        registrar: {
          name: 'Doma Registry',
          url: 'https://doma.xyz',
        },
      };

      return domainData;
    } catch (error) {
      console.error('Error fetching domain info:', error);
      return null;
    }
  }

  // Get all available domains with pagination
  async getDomains(limit: number = 20, offset: number = 0, search?: string) {
    try {
      console.log(`Fetching domains: limit=${limit}, offset=${offset}, search=${search}`);
      
      // Try to get comprehensive domain data
      const comprehensiveQuery = `
        query {
          names {
            items {
              name
            }
            totalCount
          }
        }
      `;

      console.log('Fetching comprehensive domain data...');
      
      try {
        const data = await this.graphqlRequest(comprehensiveQuery);
        console.log(`API returned ${data.names?.items?.length || 0} domains`);
        
        if (!data.names || !data.names.items) {
          console.log('No domain items found in response');
          return { domains: [], totalCount: 0, hasNext: false };
        }

        // Apply search filter first if provided
        let filteredItems = data.names.items;
        if (search) {
          const searchLower = search.toLowerCase();
          filteredItems = data.names.items.filter((item: { name: string }) => 
            item.name.toLowerCase().includes(searchLower)
          );
        }

        const totalCount = filteredItems.length;
        
        // Apply pagination to the filtered results
        const paginatedItems = filteredItems.slice(offset, offset + limit);
        
        console.log(`Applying pagination: offset=${offset}, limit=${limit}, total=${totalCount}, showing=${paginatedItems.length}`);

        // For each domain in the current page, try to get detailed information
        const domainPromises = paginatedItems.map(async (nameItem: { name: string }) => {
          try {
            // Try to get more details for each domain
            const detailQuery = `
              query GetDomainDetail($name: String!) {
                name(name: $name) {
                  name
                }
              }
            `;
            
            const detailData = await this.graphqlRequest(detailQuery, { name: nameItem.name });
            
            return {
              name: nameItem.name,
              tld: nameItem.name.split('.').pop() || 'unknown',
              description: `Premium domain ${nameItem.name} available for purchase`,
              image: '/globe.svg',
              registrar: 'Doma Registry',
              fullApiData: {
                originalResponse: nameItem,
                detailResponse: detailData,
                queryUsed: detailQuery
              }
            };
          } catch (error) {
            console.log(`Error getting details for ${nameItem.name}:`, error);
            return {
              name: nameItem.name,
              tld: nameItem.name.split('.').pop() || 'unknown',
              description: `Premium domain ${nameItem.name} available for purchase`,
              image: '/globe.svg',
              registrar: 'Doma Registry',
              fullApiData: {
                originalResponse: nameItem,
                error: error instanceof Error ? error.message : String(error)
              }
            };
          }
        });

        const domains = await Promise.all(domainPromises);

        const hasNext = (offset + limit) < totalCount;

        console.log(`Returning ${domains.length} domains for page, total available: ${totalCount}`);

        return {
          domains: domains,
          totalCount: totalCount, // Use the filtered total count
          hasNext: hasNext,
          fullApiResponse: data // Include the full original response
        };
      } catch (basicError) {
        console.error('Comprehensive query failed:', basicError);
        
        // Try introspection to show available schema
        try {
          const introspectionQuery = `
            query {
              __schema {
                queryType {
                  fields {
                    name
                    description
                    type {
                      name
                      kind
                    }
                  }
                }
              }
            }
          `;
          
          const introspection = await this.graphqlRequest(introspectionQuery);
          console.log('Available GraphQL fields:', JSON.stringify(introspection, null, 2));
          
          return {
            domains: [],
            totalCount: 0,
            hasNext: false,
            schemaInfo: introspection,
            error: basicError instanceof Error ? basicError.message : String(basicError)
          };
        } catch (introspectionError) {
          console.error('Schema introspection also failed:', introspectionError);
          throw basicError;
        }
      }
    } catch (error) {
      console.error('Error fetching domains:', error);
      throw error;
    }
  }

  // Create a new listing
  async createListing(listingData: {
    orderbook: string;
    chainId: string;
    parameters: Record<string, unknown>;
    signature: string;
  }) {
    return this.request('/v1/orderbook/list', {
      method: 'POST',
      body: JSON.stringify(listingData),
    });
  }

  // Create a new offer
  async createOffer(offerData: {
    orderbook: string;
    chainId: string;
    parameters: Record<string, unknown>;
    signature: string;
  }) {
    return this.request('/v1/orderbook/offer', {
      method: 'POST',
      body: JSON.stringify(offerData),
    });
  }

  // Get listing fulfillment data
  async getListingFulfillment(orderId: string, buyer: string) {
    return this.request(`/v1/orderbook/listing/${orderId}/${buyer}`);
  }

  // Get offer fulfillment data
  async getOfferFulfillment(orderId: string, fulfiller: string) {
    return this.request(`/v1/orderbook/offer/${orderId}/${fulfiller}`);
  }

  // Get supported currencies for an orderbook
  async getSupportedCurrencies(chainId: string, contractAddress: string, orderbook: string) {
    return this.request(`/v1/orderbook/currencies/${chainId}/${contractAddress}/${orderbook}`);
  }

  // Get marketplace fees
  async getMarketplaceFees(orderbook: string, chainId: string, contractAddress: string) {
    return this.request(`/v1/orderbook/fee/${orderbook}/${chainId}/${contractAddress}`);
  }
}

// Export singleton instance
export const domaAPI = new DomaAPI();
