import React from 'react';
import { useQuery } from '@tanstack/react-query';

const MarketOverviewCard: React.FC = () => {
  const { data: marketOverview, isLoading } = useQuery({
    queryKey: ['/api/market/overview'],
  });
  
  const getPercentageTextColor = (percentage: number) => {
    return percentage >= 0 ? 'text-green-500' : 'text-red-500';
  };
  
  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Market Overview</h2>
        <div className="text-xs text-muted-foreground">
          Last updated: {isLoading ? 'Loading...' : (marketOverview?.lastUpdated || '10:45 AM EST')}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <div className="bg-background/50 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Loading...</p>
              </div>
              <div className="bg-background/50 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Loading...</p>
              </div>
              <div className="bg-background/50 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Loading...</p>
              </div>
            </>
          ) : (
            (marketOverview?.indices || [
              { name: 'S&P 500', value: 4587.33, change: 1.23 },
              { name: 'NASDAQ', value: 14265.86, change: 1.73 },
              { name: 'DOW', value: 35405.24, change: 0.68 }
            ]).map((index, i) => (
              <div key={i} className="bg-background/50 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">{index.name}</p>
                <p className="font-mono font-medium">{index.value.toLocaleString()}</p>
                <p className={`text-sm font-medium ${getPercentageTextColor(index.change)}`}>
                  {formatPercentage(index.change)}
                </p>
              </div>
            ))
          )}
        </div>
        
        <div className="bg-background/50 rounded-lg p-3">
          <p className="text-sm font-medium mb-2">Top Movers Today</p>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading top movers...</p>
          ) : (
            <div className="space-y-2">
              {(marketOverview?.topMovers || [
                { symbol: 'SHOP', name: 'Shopify Inc.', change: 8.4 },
                { symbol: 'PYPL', name: 'PayPal Holdings', change: 6.2 },
                { symbol: 'DIS', name: 'Walt Disney Co.', change: -5.7 }
              ]).map((mover, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{mover.symbol}</span>
                    <span className="text-xs text-muted-foreground">{mover.name}</span>
                  </div>
                  <span className={getPercentageTextColor(mover.change) + ' font-medium'}>
                    {formatPercentage(mover.change)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Market Sentiment</p>
            <div className={`bg-${marketOverview?.sentiment.status === 'Bullish' ? 'green' : marketOverview?.sentiment.status === 'Bearish' ? 'red' : 'amber'}-500/20 text-${marketOverview?.sentiment.status === 'Bullish' ? 'green' : marketOverview?.sentiment.status === 'Bearish' ? 'red' : 'amber'}-500 px-2 py-0.5 rounded-full text-xs`}>
              {isLoading ? 'Loading...' : (marketOverview?.sentiment.status || 'Bullish')}
            </div>
          </div>
          <div className="h-10 bg-background rounded-lg overflow-hidden">
            <div className="flex h-full">
              <div 
                className="bg-green-500 h-full" 
                style={{ width: `${isLoading ? 0 : (marketOverview?.sentiment.bullish || 65)}%` }}
              ></div>
              <div 
                className="bg-amber-400 h-full" 
                style={{ width: `${isLoading ? 0 : (marketOverview?.sentiment.neutral || 25)}%` }}
              ></div>
              <div 
                className="bg-red-500 h-full" 
                style={{ width: `${isLoading ? 0 : (marketOverview?.sentiment.bearish || 10)}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-green-500">
              Bullish ({isLoading ? '...' : (marketOverview?.sentiment.bullish || 65)}%)
            </span>
            <span className="text-amber-400">
              Neutral ({isLoading ? '...' : (marketOverview?.sentiment.neutral || 25)}%)
            </span>
            <span className="text-red-500">
              Bearish ({isLoading ? '...' : (marketOverview?.sentiment.bearish || 10)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverviewCard;
