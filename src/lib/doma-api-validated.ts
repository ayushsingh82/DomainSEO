// DOMA API Service with Terminal-Validated GraphQL Queries
const DOMA_API_URL = 'https://api-testnet.doma.xyz/graphql';
const API_KEY = 'v1.fa2d276a9752ed2ad4ffdd72344c4973af5051bbbeba1e4d393019cdf93bebbd';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

async function graphqlRequest<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(DOMA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: GraphQLResponse<T> = await response.json();
  
  if (result.errors && result.errors.length > 0) {
    console.error('GraphQL errors:', result.errors);
    const errorMessage = result.errors.map(err => `${err.message} (${err.locations ? `line ${err.locations[0]?.line}` : 'no location'})`).join(', ');
    throw new Error(`GraphQL error: ${errorMessage}`);
  }

  if (!result.data) {
    throw new Error('No data returned from GraphQL query');
  }

  return result.data;
}

// Interfaces based on validated schema
export interface NameData {
  name: string;
  expiresAt: string;
  tokenizedAt: string;
  registrar: {
    name: string;
    websiteUrl?: string;
  };
  nameservers: Array<{
    ldhName: string;
  }>;
  claimedBy: string;
}

export interface TokenData {
  tokenId: string;
  networkId: string;
  ownerAddress: string;
}

export interface ListingData {
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

export interface TokenActivity {
  __typename: string;
}

export interface TokenMintedActivity extends TokenActivity {
  __typename: 'TokenMintedActivity';
  createdAt: string;
}

export interface TokenPurchasedActivity extends TokenActivity {
  __typename: 'TokenPurchasedActivity';
  buyer: string;
  seller: string;
  payment: {
    price: string;
    currencySymbol: string;
  };
}

// API Functions with validated queries

// 1. Get all domain names (working - tested in terminal)
export async function getAllNames(take: number = 10, skip: number = 0) {
  const query = `
    query GetNames($take: Int!, $skip: Int!) {
      names(take: $take, skip: $skip) {
        items {
          name
        }
        totalCount
      }
    }
  `;
  
  return graphqlRequest<{
    names: {
      items: Array<{ name: string }>;
      totalCount: number;
    };
  }>(query, { take, skip });
}

// 2. Get domain info by name (working - tested in terminal)
export async function getDomainInfo(name: string): Promise<NameData | null> {
  const query = `
    query GetDomainInfo($name: String!) {
      name(name: $name) {
        name
        expiresAt
        tokenizedAt
        registrar {
          name
          websiteUrl
        }
        nameservers {
          ldhName
        }
        claimedBy
      }
    }
  `;
  
  try {
    const result = await graphqlRequest<{
      name: NameData | null;
    }>(query, { name });
    
    return result.name;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Name not found')) {
      return null;
    }
    throw error;
  }
}

// 3. Get tokens for a domain (working - tested in terminal)
export async function getDomainTokens(name: string) {
  const query = `
    query GetTokens($name: String!) {
      tokens(name: $name, take: 10) {
        items {
          tokenId
          networkId
          ownerAddress
        }
        totalCount
      }
    }
  `;
  
  return graphqlRequest<{
    tokens: {
      items: TokenData[];
      totalCount: number;
    };
  }>(query, { name });
}

// 4. Get marketplace listings (working - tested in terminal)
export async function getListings(take: number = 20, skip: number = 0) {
  const query = `
    query GetListings($take: Int!, $skip: Int!) {
      listings(take: $take, skip: $skip) {
        items {
          id
          tokenId
          name
          price
          offererAddress
          orderbook
          expiresAt
          createdAt
          currency {
            symbol
            decimals
          }
          registrar {
            name
          }
          chain {
            name
            networkId
          }
        }
        totalCount
      }
    }
  `;
  
  return graphqlRequest<{
    listings: {
      items: ListingData[];
      totalCount: number;
    };
  }>(query, { take, skip });
}

// 5. Get token activities for orderbook (working - simplified to avoid server errors)
export async function getTokenActivities(tokenId: string, take: number = 10) {
  const query = `
    query GetTokenActivities($tokenId: String!, $take: Int!) {
      tokenActivities(tokenId: $tokenId, take: $take) {
        items {
          __typename
          ... on TokenMintedActivity {
            createdAt
          }
          ... on TokenPurchasedActivity {
            buyer
            seller
            payment {
              price
              currencySymbol
            }
          }
        }
        totalCount
      }
    }
  `;
  
  return graphqlRequest<{
    tokenActivities: {
      items: Array<TokenMintedActivity | TokenPurchasedActivity>;
      totalCount: number;
    };
  }>(query, { tokenId, take });
}

// Helper functions for UI components

export async function getOrderbookData() {
  try {
    const listings = await getListings(20);
    
    // Get activities for recent listings with better error handling
    const activities = [];
    const sampleListings = listings.listings.items.slice(0, 3); // Reduce to 3 to avoid too many API calls
    
    for (const listing of sampleListings) {
      try {
        const tokenActivities = await getTokenActivities(listing.tokenId, 3);
        if (tokenActivities.tokenActivities.items.length > 0) {
          activities.push(...tokenActivities.tokenActivities.items.map(activity => ({
            ...activity,
            domainName: listing.name,
            tokenId: listing.tokenId,
          })));
        }
      } catch {
        // Log but don't fail - some tokens might not have activities
        console.log(`No activities found for ${listing.name}`);
      }
    }
    
    return {
      listings: listings.listings.items,
      activities: activities.slice(0, 10),
      totalListings: listings.listings.totalCount,
    };
  } catch (error) {
    console.error('Error in getOrderbookData:', error);
    throw error;
  }
}

export async function getDomainOffers() {
  // For now, return listings as "offers" since the offers query needs more investigation
  const listings = await getListings(50);
  
  return {
    offers: listings.listings.items.map(listing => ({
      id: listing.id,
      domainName: listing.name,
      price: listing.price,
      currency: listing.currency.symbol,
      decimals: listing.currency.decimals,
      offererAddress: listing.offererAddress,
      expiresAt: listing.expiresAt,
      createdAt: listing.createdAt,
      orderbook: listing.orderbook,
      registrar: listing.registrar.name,
      chain: listing.chain.name,
    })),
    totalCount: listings.listings.totalCount,
  };
}

export async function getAnalyticsData() {
  const names = await getAllNames(100);
  const listings = await getListings(50);
  
  // Calculate basic analytics from available data
  const totalDomains = names.names.totalCount;
  const totalListings = listings.listings.totalCount;
  
  // Calculate volume from listings
  let totalVolume = 0;
  const prices = [];
  
  for (const listing of listings.listings.items) {
    const price = parseFloat(listing.price);
    if (!isNaN(price)) {
      // Convert to ETH/USD equivalent based on decimals
      const normalizedPrice = price / Math.pow(10, listing.currency.decimals);
      totalVolume += normalizedPrice;
      prices.push(normalizedPrice);
    }
  }
  
  const averagePrice = prices.length > 0 ? totalVolume / prices.length : 0;
  const floorPrice = prices.length > 0 ? Math.min(...prices) : 0;
  
  return {
    totalDomains,
    totalListings,
    totalVolume: totalVolume.toFixed(2),
    averagePrice: averagePrice.toFixed(4),
    floorPrice: floorPrice.toFixed(4),
    listings: listings.listings.items.slice(0, 10), // Recent listings
  };
}
