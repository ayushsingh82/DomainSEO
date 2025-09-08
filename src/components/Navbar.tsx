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
                <span className="text-xl font-bold" style={{ color: '#C6FC7B' }}>samxdom</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/competitions" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                Competitions
              </Link>
              <Link href="/leaderboard" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                Leaderboard
              </Link>
              <Link href="/predict" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                Predict
              </Link>
              <Link href="/oracles" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                Oracles
              </Link>
              <Link href="/rewards" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                Rewards
              </Link>
              <Link href="/profile" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                Profile
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
