import { Metadata } from 'next';
import { domaAPI } from '@/lib/doma-api';
import DomainSalesPage from '@/components/DomainSalesPage';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    domain: string;
  };
  searchParams: {
    brand?: string;
    theme?: string;
    accent?: string;
    headline?: string;
    description?: string;
    logo?: string;
    bg?: string;
    stats?: string;
    offers?: string;
    cta?: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const domainName = decodeURIComponent(params.domain);
  
  try {
    // Try to get domain data for metadata
    const domainData = await domaAPI.getDomainInfo(domainName);

    const brandName = searchParams.brand || 'Doma Sales';
    const headline = searchParams.headline || `Own ${domainName}`;
    const description = searchParams.description || domainData?.description || `Premium domain ${domainName} available for purchase. SEO-optimized sales page with real-time pricing from Doma orderbook.`;

    const bestListing = domainData?.listings?.[0];
    const price = bestListing ? `${bestListing.price} ${bestListing.currency}` : 'Make Offer';

    return {
      title: `${domainName} - ${headline} | ${brandName}`,
      description,
      keywords: [
        domainName,
        'domain NFT',
        'domain for sale',
        'blockchain domain',
        'ENS domain',
        'web3 domain',
        'cryptocurrency domain',
        'doma protocol',
        brandName,
      ],
      openGraph: {
        title: `${domainName} - ${price}`,
        description,
        type: 'website',
        images: domainData?.image ? [
          {
            url: domainData.image,
            width: 400,
            height: 400,
            alt: domainName,
          }
        ] : [
          {
            url: '/globe.svg',
            width: 400,
            height: 400,
            alt: domainName,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${domainName} - ${price}`,
        description,
        images: domainData?.image ? [domainData.image] : ['/globe.svg'],
      },
      alternates: {
        canonical: `/domain/${encodeURIComponent(domainName)}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    return {
      title: `${domainName} - Domain Sales Page`,
      description: `Domain sales page for ${domainName}. Check pricing and availability.`,
    };
  }
}

export default async function DomainPage({ params, searchParams }: PageProps) {
  const domainName = decodeURIComponent(params.domain);

  // Validate domain name format
  if (!domainName || !domainName.includes('.')) {
    notFound();
  }

  // Parse customization from search params
  const customization = {
    brandName: searchParams.brand,
    headline: searchParams.headline,
    description: searchParams.description,
    themeColor: searchParams.theme,
    accentColor: searchParams.accent,
    logoUrl: searchParams.logo,
    backgroundImage: searchParams.bg,
    showStats: searchParams.stats !== 'false',
    showOffers: searchParams.offers !== 'false',
    customCTA: searchParams.cta,
  };

  // Remove undefined values
  const cleanCustomization = Object.fromEntries(
    Object.entries(customization).filter(([, value]) => value !== undefined)
  );

  return (
    <DomainSalesPage 
      domainName={domainName} 
      customization={cleanCustomization}
    />
  );
}
