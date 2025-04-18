import React, { useState } from 'react';
import { useUser } from '@/providers/UserProvider';
import ModeTabs from './ModeTabs';
import LearningProgressCard from './LearningProgressCard';
import InvestmentStyleCard from './InvestmentStyleCard';
import SmartAlertsPanel from './SmartAlertsPanel';
import InvestmentSimulator from './InvestmentSimulator';
import AIInsightsCard from './AIInsightsCard';
import MarketOverviewCard from './MarketOverviewCard';
import SectorHeatmapCard from './SectorHeatmapCard';
import NewsAnalysisCard from './NewsAnalysisCard';

type DashboardMode = 'learn' | 'trade' | 'ai';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [activeMode, setActiveMode] = useState<DashboardMode>('learn');
  
  const handleModeChange = (mode: DashboardMode) => {
    setActiveMode(mode);
  };
  
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome back, <span className="text-accent">{user?.firstName || 'John'}</span>
        </h1>
        <p className="text-muted-foreground">
          Your daily investment journey awaits. You've completed {user?.completedTasks || 3}/{user?.totalTasks || 5} daily tasks.
        </p>
      </div>
      
      {/* Mode Selection Tabs */}
      <ModeTabs activeMode={activeMode} onModeChange={handleModeChange} />
      
      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <LearningProgressCard />
          <InvestmentStyleCard />
          <SmartAlertsPanel />
        </div>
        
        {/* Middle Column */}
        <div className="lg:col-span-1 space-y-6">
          <InvestmentSimulator />
          <AIInsightsCard />
        </div>
        
        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <MarketOverviewCard />
          <SectorHeatmapCard />
          <NewsAnalysisCard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
