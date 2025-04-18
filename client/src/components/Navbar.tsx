import React from 'react';
import { TrendingUp, Bell } from 'lucide-react';
import { useUser } from '@/providers/UserProvider';
import { Link } from 'wouter';

const Navbar: React.FC = () => {
  const { user } = useUser();
  
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-accent/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-accent" size={24} />
          <span className="text-xl font-semibold text-foreground">
            Trade<span className="text-accent">Craft</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <span className="text-foreground hover:text-accent transition-colors cursor-pointer">Dashboard</span>
          </Link>
          <Link href="/learn">
            <span className="text-foreground hover:text-accent transition-colors cursor-pointer">Learn</span>
          </Link>
          <Link href="/trade-analysis">
            <span className="text-foreground hover:text-accent transition-colors cursor-pointer">Trade Analysis</span>
          </Link>
          <Link href="/community">
            <span className="text-foreground hover:text-accent transition-colors cursor-pointer">Community</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-card/50 rounded-full px-2 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="text-sm font-medium">{user?.xp || 0} XP</span>
          </div>
          
          <button className="p-2 rounded-full hover:bg-card/50 transition-colors">
            <Bell size={20} />
          </button>
          
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-sm font-medium text-white">
            {user?.username ? user.username.substring(0, 2).toUpperCase() : 'JD'}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
