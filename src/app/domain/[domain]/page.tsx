import { Metadata } from 'next';
import domaAPI from '@/lib/doma-api';
import DomainSalesPage from '@/components/DomainSalesPage';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    domain: string;
  }>;
  searchParams: Promise<{
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
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const domainName = decodeURIComponent(resolvedParams.domain);
  
  try {
    // Try to get domain data for metadata - used for validation
    await domaAPI.getDomainInfo(domainName);

    const brandName = resolvedSearchParams.brand || 'Doma Sales';
    const headline = resolvedSearchParams.headline || `Own ${domainName}`;
    const description = resolvedSearchParams.description || `Premium domain ${domainName} available for purchase. SEO-optimized sales page with real-time pricing from Doma orderbook.`;

    // Since we're using NameData now, we can't access listings directly
    const price = 'Make Offer';

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
        images: [
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
        images: ['/globe.svg'],
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
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const domainName = decodeURIComponent(resolvedParams.domain);

  // Validate domain name format
  if (!domainName || !domainName.includes('.')) {
    notFound();
  }

  // Parse customization from search params
  const customization = {
    brandName: resolvedSearchParams.brand,
    headline: resolvedSearchParams.headline,
    description: resolvedSearchParams.description,
    themeColor: resolvedSearchParams.theme,
    accentColor: resolvedSearchParams.accent,
    logoUrl: resolvedSearchParams.logo,
    backgroundImage: resolvedSearchParams.bg,
    showStats: resolvedSearchParams.stats !== 'false',
    showOffers: resolvedSearchParams.offers !== 'false',
    customCTA: resolvedSearchParams.cta,
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
