import React from 'react';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import AIAssistantButton from '@/components/AIAssistantButton';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Dashboard />
      </main>
      <AIAssistantButton />
    </div>
  );
};

export default Home;
