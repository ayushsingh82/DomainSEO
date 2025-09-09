'use client';

import { useRef, useState } from 'react';

export default function CreatePrediction() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    minPrice: '',
    maxPrice: '',
    domain: '',
    startDate: '',
    endDate: ''
  });

  const startRef = useRef<HTMLInputElement | null>(null);
  const endRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder submit action
    alert(`Created prediction:\nName: ${form.name}\nDesc: ${form.description}\nRange: $${form.minPrice} - $${form.maxPrice}\nDomain: ${form.domain}\nStart: ${form.startDate}\nEnd: ${form.endDate}`);
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold" style={{ color: '#0D2818' }}>Create Prediction</h1>
        <p className="text-sm mt-2" style={{ color: '#6B7280' }}>Fill the form to create a new prediction box</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-6 space-y-5">
        {/* Line 1: Name + Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Crypto Domain Rush"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none placeholder-gray-400"
              style={{ borderColor: '#C6FC7B', color: '#0D2818', backgroundColor: '#FFFFFF', caretColor: '#0D2818' }}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none placeholder-gray-400"
              style={{ borderColor: '#C6FC7B', color: '#0D2818', backgroundColor: '#FFFFFF', caretColor: '#0D2818' }}
              required
            />
          </div>
        </div>

        {/* Line 2: Price Range (Min + Max) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Min Price ($)</label>
            <input
              type="number"
              min="0"
              name="minPrice"
              value={form.minPrice}
              onChange={handleChange}
              placeholder="20"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none placeholder-gray-400"
              style={{ borderColor: '#C6FC7B', color: '#0D2818', backgroundColor: '#FFFFFF', caretColor: '#0D2818' }}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Max Price ($)</label>
            <input
              type="number"
              min="0"
              name="maxPrice"
              value={form.maxPrice}
              onChange={handleChange}
              placeholder="60"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none placeholder-gray-400"
              style={{ borderColor: '#C6FC7B', color: '#0D2818', backgroundColor: '#FFFFFF', caretColor: '#0D2818' }}
              required
            />
          </div>
        </div>

        {/* Line 3: Domain + Timeframe (Start/End) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Domain</label>
            <input
              type="text"
              name="domain"
              value={form.domain}
              onChange={handleChange}
              placeholder="e.g., crypto.com or nft.eth"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none placeholder-gray-400"
              style={{ borderColor: '#C6FC7B', color: '#0D2818', backgroundColor: '#FFFFFF', caretColor: '#0D2818' }}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#0D2818' }}>Timeframe</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <input
                  ref={startRef}
                  type="datetime-local"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                  style={{ borderColor: '#C6FC7B', color: '#0D2818', backgroundColor: '#FFFFFF', caretColor: '#0D2818' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => startRef.current?.showPicker?.()}
                  className="px-3 py-2 rounded-lg border"
                  style={{ borderColor: '#C6FC7B', color: '#0D2818' }}
                >
                  📅
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  ref={endRef}
                  type="datetime-local"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                  style={{ borderColor: '#C6FC7B', color: '#0D2818', backgroundColor: '#FFFFFF', caretColor: '#0D2818' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => endRef.current?.showPicker?.()}
                  className="px-3 py-2 rounded-lg border"
                  style={{ borderColor: '#C6FC7B', color: '#0D2818' }}
                >
                  📅
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" className="w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg" style={{ backgroundColor: '#6603BF' }}>
            Create Prediction
          </button>
        </div>
      </form>
    </div>
  );
}


