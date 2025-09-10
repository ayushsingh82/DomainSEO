'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FormData {
  domain: string;
  brandName: string;
  headline: string;
  description: string;
  themeColor: string;
  accentColor: string;
  logoUrl: string;
  showStats: boolean;
  showOffers: boolean;
  customCTA: string;
}

export default function BuilderPage() {
  const [form, setForm] = useState<FormData>({
    domain: '',
    brandName: 'My Domain Sales',
    headline: 'Own the web. Sell your domain NFT.',
    description: 'SEO-optimized, branded landing page powered by Doma orderbook data.',
    themeColor: '#6603BF',
    accentColor: '#C6FC7B',
    logoUrl: '',
    showStats: true,
    showOffers: true,
    customCTA: 'Buy Now',
  });

  const [isPublished, setIsPublished] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  const buildPageUrl = () => {
    if (!form.domain) return '';
    
    const params = new URLSearchParams();
    if (form.brandName !== 'My Domain Sales') params.set('brand', form.brandName);
    if (form.headline !== 'Own the web. Sell your domain NFT.') params.set('headline', form.headline);
    if (form.description !== 'SEO-optimized, branded landing page powered by Doma orderbook data.') params.set('description', form.description);
    if (form.themeColor !== '#6603BF') params.set('theme', form.themeColor);
    if (form.accentColor !== '#C6FC7B') params.set('accent', form.accentColor);
    if (form.logoUrl) params.set('logo', form.logoUrl);
    if (!form.showStats) params.set('stats', 'false');
    if (!form.showOffers) params.set('offers', 'false');
    if (form.customCTA !== 'Buy Now') params.set('cta', form.customCTA);

    const queryString = params.toString();
    return `/domain/${encodeURIComponent(form.domain)}${queryString ? `?${queryString}` : ''}`;
  };

  const handlePublish = () => {
    if (!form.domain) {
      alert('Please enter a domain name first');
      return;
    }
    setIsPublished(true);
  };

  const pageUrl = buildPageUrl();

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Landing Page Builder</h1>
        <p className="text-base mt-3" style={{ color: '#6B7280' }}>Create a custom, SEO-ready domain sales page in minutes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-5 border-2" style={{ borderColor: '#0D2818' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0D2818' }}>Customize Your Page</h2>
          
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Domain *</label>
            <input
              type="text"
              name="domain"
              value={form.domain}
              onChange={handleChange}
              placeholder="e.g., crypto.eth"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
              style={{ borderColor: '#0D2818', color: '#0D2818', backgroundColor: '#FFFFFF' }}
              required
            />
            <p className="text-xs mt-1" style={{ color: '#6B7280' }}>The domain you want to create a sales page for</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Brand Name</label>
            <input
              type="text"
              name="brandName"
              value={form.brandName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none"
              style={{ borderColor: '#0D2818', color: '#0D2818', backgroundColor: '#FFFFFF' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Headline</label>
            <input
              type="text"
              name="headline"
              value={form.headline}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none"
              style={{ borderColor: '#0D2818', color: '#0D2818', backgroundColor: '#FFFFFF' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none"
              style={{ borderColor: '#0D2818', color: '#0D2818', backgroundColor: '#FFFFFF' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Logo URL (optional)</label>
            <input
              type="url"
              name="logoUrl"
              value={form.logoUrl}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none"
              style={{ borderColor: '#0D2818', color: '#0D2818', backgroundColor: '#FFFFFF' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Custom CTA Button Text</label>
            <input
              type="text"
              name="customCTA"
              value={form.customCTA}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none"
              style={{ borderColor: '#0D2818', color: '#0D2818', backgroundColor: '#FFFFFF' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Theme Color</label>
              <input 
                type="color" 
                name="themeColor" 
                value={form.themeColor} 
                onChange={handleChange} 
                className="w-full h-12 border rounded-lg" 
                style={{ borderColor: '#0D2818' }} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Accent Color</label>
              <input 
                type="color" 
                name="accentColor" 
                value={form.accentColor} 
                onChange={handleChange} 
                className="w-full h-12 border rounded-lg" 
                style={{ borderColor: '#0D2818' }} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="showStats"
                checked={form.showStats}
                onChange={handleChange}
                className="rounded"
              />
              <span className="text-sm" style={{ color: '#0D2818' }}>Show Statistics</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="showOffers"
                checked={form.showOffers}
                onChange={handleChange}
                className="rounded"
              />
              <span className="text-sm" style={{ color: '#0D2818' }}>Show Offers</span>
            </label>
          </div>

          <div className="pt-4 space-y-3">
            <button 
              type="button" 
              onClick={handlePublish} 
              disabled={!form.domain}
              className="w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
              style={{ backgroundColor: '#6603BF' }}
            >
              Generate Page
            </button>
            
            {isPublished && pageUrl && (
              <div className="space-y-2">
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f9ff', borderColor: '#0ea5e9', border: '1px solid' }}>
                  <p className="text-sm font-medium" style={{ color: '#0369a1' }}>✅ Page Generated Successfully!</p>
                  <p className="text-xs mt-1" style={{ color: '#0369a1' }}>Your domain sales page is ready.</p>
                </div>
                <Link 
                  href={pageUrl}
                  target="_blank"
                  className="w-full inline-block text-center py-3 px-4 rounded-xl font-bold border-2 transition-all duration-300 hover:scale-105" 
                  style={{ color: '#6603BF', borderColor: '#6603BF' }}
                >
                  View Live Page →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-2xl shadow-2xl p-6 border-2 min-h-[600px]" style={{ borderColor: '#0D2818', backgroundColor: form.accentColor }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0D2818' }}>Live Preview</h2>
          
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'white', minHeight: '500px' }}>
            {/* Mock header */}
            <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: form.themeColor }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: form.themeColor }}>
                  {form.brandName.charAt(0)}
                </div>
                <span className="font-bold" style={{ color: form.themeColor }}>{form.brandName}</span>
              </div>
            </div>

            {/* Mock content */}
            <div className="p-6 text-center">
              <h1 className="text-4xl font-bold mb-3" style={{ color: form.themeColor }}>
                {form.domain || 'your-domain.eth'}
              </h1>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#0D2818' }}>
                {form.headline}
              </h2>
              <p className="text-sm mb-6" style={{ color: '#0D2818' }}>
                {form.description}
              </p>

              {/* Mock price section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>Buy Now Price</div>
                <div className="text-2xl font-bold" style={{ color: form.themeColor }}>1.5 ETH</div>
              </div>

              {/* Mock buttons */}
              <div className="flex gap-3 justify-center">
                <button 
                  className="px-6 py-2 rounded-lg font-semibold text-white text-sm"
                  style={{ backgroundColor: form.themeColor }}
                >
                  {form.customCTA}
                </button>
                <button 
                  className="px-6 py-2 rounded-lg font-semibold text-sm border"
                  style={{ color: form.themeColor, borderColor: form.themeColor }}
                >
                  Make Offer
                </button>
              </div>

              {/* Mock stats */}
              {form.showStats && (
                <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                  <div className="bg-gray-50 rounded p-2">
                    <div className="font-bold" style={{ color: form.themeColor }}>15</div>
                    <div style={{ color: '#6B7280' }}>Sales</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <div className="font-bold" style={{ color: form.themeColor }}>18.5 ETH</div>
                    <div style={{ color: '#6B7280' }}>Volume</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <div className="font-bold" style={{ color: form.themeColor }}>1.23 ETH</div>
                    <div style={{ color: '#6B7280' }}>Avg Price</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {pageUrl && (
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <p className="text-xs font-medium mb-2" style={{ color: '#0D2818' }}>Generated URL:</p>
              <code className="text-xs break-all p-2 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#0D2818' }}>
                {typeof window !== 'undefined' ? window.location.origin : ''}{pageUrl}
              </code>
            </div>
          )}
        </div>
      </div>

      {/* SEO Features */}
      <div className="mt-12 bg-white rounded-2xl shadow-2xl p-8 border-2" style={{ borderColor: '#0D2818' }}>
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#0D2818' }}>SEO Features Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#C6FC7B' }}>
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="font-bold mb-2" style={{ color: '#0D2818' }}>Meta Tags</h3>
            <p className="text-sm" style={{ color: '#6B7280' }}>Optimized title, description, and keywords</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#C6FC7B' }}>
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-bold mb-2" style={{ color: '#0D2818' }}>Social Cards</h3>
            <p className="text-sm" style={{ color: '#6B7280' }}>Twitter and OpenGraph preview cards</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#C6FC7B' }}>
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-bold mb-2" style={{ color: '#0D2818' }}>Fast Loading</h3>
            <p className="text-sm" style={{ color: '#6B7280' }}>Server-side rendering and optimization</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#C6FC7B' }}>
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-bold mb-2" style={{ color: '#0D2818' }}>Real-time Data</h3>
            <p className="text-sm" style={{ color: '#6B7280' }}>Live pricing from Doma orderbook</p>
          </div>
        </div>
      </div>
    </div>
  );
}
