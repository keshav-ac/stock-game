import React from 'react';
import { Star, Activity, CircleCheck } from 'lucide-react';

type DashboardMode = 'learn' | 'trade' | 'ai';

interface ModeTabsProps {
  activeMode: DashboardMode;
  onModeChange: (mode: DashboardMode) => void;
}

const ModeTabs: React.FC<ModeTabsProps> = ({ activeMode, onModeChange }) => {
  return (
    <div className="flex space-x-4 mb-6 border-b border-accent/20 pb-1">
      <button 
        className={`px-4 py-2 font-medium transition-all ${activeMode === 'learn' ? 'text-accent tab-active' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={() => onModeChange('learn')}
      >
        <div className="flex items-center">
          <Star className="mr-2" size={18} />
          Learn
        </div>
      </button>
      
      <button 
        className={`px-4 py-2 font-medium transition-all ${activeMode === 'trade' ? 'text-accent tab-active' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={() => onModeChange('trade')}
      >
        <div className="flex items-center">
          <Activity className="mr-2" size={18} />
          Trade
        </div>
      </button>
      
      <button 
        className={`px-4 py-2 font-medium transition-all ${activeMode === 'ai' ? 'text-accent tab-active' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={() => onModeChange('ai')}
      >
        <div className="flex items-center">
          <CircleCheck className="mr-2" size={18} />
          AI Assistant
        </div>
      </button>
    </div>
  );
};

export default ModeTabs;
