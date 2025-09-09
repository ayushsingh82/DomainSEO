'use client';

import { useRef, useState } from 'react';

export default function BuilderPage() {
  const [form, setForm] = useState({
    domain: '',
    brandName: 'domaSEO',
    headline: 'Own the web. Sell your domain NFT.',
    description: 'SEO-optimized, branded landing page powered by Doma orderbook data.',
    themeColor: '#6603BF',
    accentColor: '#C6FC7B'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePublish = () => {
    alert(`Publishing page for ${form.domain || 'your domain'} (demo).\nBrand: ${form.brandName}\nTheme: ${form.themeColor}\nAccent: ${form.accentColor}`);
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: '#0D2818' }}>Landing Page Builder</h1>
        <p className="text-base mt-3" style={{ color: '#6B7280' }}>Customize and preview your SEO-ready domain sales page.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={(e) => e.preventDefault()} className="bg-white rounded-2xl shadow-2xl p-6 space-y-5 border-2" style={{ borderColor: '#0D2818' }}>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Domain</label>
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
              rows={4}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none"
              style={{ borderColor: '#0D2818', color: '#0D2818', backgroundColor: '#FFFFFF' }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Theme Color</label>
              <input type="color" name="themeColor" value={form.themeColor} onChange={handleChange} className="w-full h-12 border rounded-lg" style={{ borderColor: '#0D2818' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Accent Color</label>
              <input type="color" name="accentColor" value={form.accentColor} onChange={handleChange} className="w-full h-12 border rounded-lg" style={{ borderColor: '#0D2818' }} />
            </div>
          </div>

          <div className="pt-2">
            <button type="button" onClick={handlePublish} className="w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg" style={{ backgroundColor: '#6603BF' }}>
              Publish (Demo)
            </button>
          </div>
        </form>

        <div className="rounded-2xl shadow-2xl p-6 border-2" style={{ borderColor: '#0D2818', backgroundColor: form.accentColor }}>
          <div className="text-center">
            <div className="text-3xl font-bold mb-3" style={{ color: '#0D2818' }}>{form.brandName}</div>
            <div className="text-5xl font-extrabold mb-4 leading-tight" style={{ color: '#0D2818' }}>{form.headline}</div>
            <div className="text-base mb-8 max-w-xl mx-auto" style={{ color: '#0D2818' }}>{form.description}</div>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 rounded-md font-semibold text-white" style={{ backgroundColor: form.themeColor }}>Buy Now</button>
              <button className="px-6 py-3 rounded-md font-semibold border" style={{ color: '#0D2818', backgroundColor: '#FFFFFF', borderColor: '#0D2818' }}>Make Offer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


