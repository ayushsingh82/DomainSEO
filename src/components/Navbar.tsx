'use client';

import Link from 'next/link';
import ConnectWallet from '@/components/ConnectWallet';

const Navbar = () => {
  return (
    <nav className="p-4" style={{ backgroundColor: '#C6FC7B' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border p-3" style={{ backgroundColor: '#171717', borderColor: '#C6FC7B' }}>
          <div className="flex justify-between items-center h-12">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold" style={{ color: '#C6FC7B' }}>domaSEO</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/domains" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                Domains
              </Link>
              <Link href="/offers" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                Offers
              </Link>
              <Link href="/analytics" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                Analytics
              </Link>
              <Link href="/orderbook" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                Orderbook
              </Link>
              <Link href="/create" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                Builder
              </Link>
            </div>

     
            <div className="flex items-center">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
