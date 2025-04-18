import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown } from 'lucide-react';

type InsightPeriod = 'daily' | 'weekly' | 'monthly';

const AIInsightsCard: React.FC = () => {
  const [period, setPeriod] = useState<InsightPeriod>('monthly');
  
  const { data: insights, isLoading } = useQuery({
    queryKey: ['/api/insights', period],
  });
  
  const getOpportunityStatusBadge = (status: string) => {
    switch (status) {
      case 'buy':
        return 'bg-green-500/20 text-green-500';
      case 'watch':
        return 'bg-amber-400/20 text-amber-400';
      case 'sell':
        return 'bg-red-500/20 text-red-500';
      case 'hold':
        return 'bg-amber-400/20 text-amber-400';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };
  
  const getPercentageTextColor = (percentage: number) => {
    return percentage >= 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">AI Trading Insights</h2>
        <select 
          className="bg-background border border-accent/30 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          value={period}
          onChange={(e) => setPeriod(e.target.value as InsightPeriod)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">Loading insights...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-background/50 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Opportunities</h3>
                <p className="text-sm text-muted-foreground">Based on your investment style</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {(insights?.opportunities || [
                { symbol: 'AMD', name: 'Advanced Micro Devices', status: 'buy', percentage: 4.2 },
                { symbol: 'MSFT', name: 'Microsoft Corp.', status: 'buy', percentage: 2.7 },
                { symbol: 'NVDA', name: 'NVIDIA Corp.', status: 'watch', percentage: 1.8 }
              ]).map((opportunity, index) => (
                <div key={index} className="flex justify-between items-center p-2 hover:bg-background rounded transition-colors">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{opportunity.symbol}</span>
                    <span className="text-xs text-muted-foreground">{opportunity.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs ${getOpportunityStatusBadge(opportunity.status)} px-2 py-0.5 rounded-full mr-2`}>
                      {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                    </span>
                    <span className={getPercentageTextColor(opportunity.percentage) + ' font-medium'}>
                      {opportunity.percentage >= 0 ? '+' : ''}{opportunity.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-background/50 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                <TrendingDown className="text-red-500" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Risk Alerts</h3>
                <p className="text-sm text-muted-foreground">Recommendations to avoid or reduce</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {(insights?.risks || [
                { symbol: 'NFLX', name: 'Netflix Inc.', status: 'sell', percentage: -5.8 },
                { symbol: 'INTC', name: 'Intel Corp.', status: 'hold', percentage: -1.3 }
              ]).map((risk, index) => (
                <div key={index} className="flex justify-between items-center p-2 hover:bg-background rounded transition-colors">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{risk.symbol}</span>
                    <span className="text-xs text-muted-foreground">{risk.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs ${getOpportunityStatusBadge(risk.status)} px-2 py-0.5 rounded-full mr-2`}>
                      {risk.status.charAt(0).toUpperCase() + risk.status.slice(1)}
                    </span>
                    <span className={getPercentageTextColor(risk.percentage) + ' font-medium'}>
                      {risk.percentage >= 0 ? '+' : ''}{risk.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">AI Analysis Note</h3>
            <p className="text-sm text-muted-foreground">
              {insights?.analysisNote || 'Tech sector shows strong growth potential despite recent volatility. Focus on companies with solid cash reserves and market leadership. Consider reducing exposure to streaming services facing increased competition.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsightsCard;
