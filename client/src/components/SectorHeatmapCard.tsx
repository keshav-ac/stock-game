import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type TimeFrame = '1d' | '1w' | '1m' | '3m';

interface SectorStock {
  symbol: string;
  change: number;
}

interface Sector {
  name: string;
  change: number;
  color: string;
  opacity: number;
  topStocks: SectorStock[];
}

const SectorHeatmapCard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1w');
  
  const { data: sectorData, isLoading } = useQuery({
    queryKey: ['/api/market/sectors', timeFrame],
  });
  
  const getSectorColorStyle = (change: number) => {
    if (change > 2) return 'bg-green-500';
    if (change > 0) return 'bg-amber-400';
    return 'bg-red-500';
  };
  
  const getSectorOpacity = (change: number, maxChange: number) => {
    // Normalize between 0.3 and 0.9 based on absolute change relative to max change
    const absChange = Math.abs(change);
    const absMaxChange = Math.abs(maxChange);
    return 0.3 + (absChange / absMaxChange) * 0.6;
  };
  
  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };
  
  // Get max change value for opacity scaling
  const maxChange = isLoading ? 5.2 : Math.max(
    ...((sectorData as Sector[]) || []).map(sector => Math.abs(sector.change))
  );
  
  const sectors: Sector[] = isLoading ? [] : (sectorData || [
    { name: 'Tech', change: 5.2, topStocks: [{ symbol: 'NVDA', change: 8.4 }, { symbol: 'AAPL', change: 4.7 }, { symbol: 'MSFT', change: 4.1 }] },
    { name: 'Healthcare', change: 3.7, topStocks: [{ symbol: 'JNJ', change: 5.2 }, { symbol: 'PFE', change: 4.8 }] },
    { name: 'Financial', change: 1.8, topStocks: [{ symbol: 'JPM', change: 3.1 }, { symbol: 'BAC', change: 2.2 }] },
    { name: 'Energy', change: 1.2, topStocks: [{ symbol: 'XOM', change: 2.4 }, { symbol: 'CVX', change: 1.8 }] },
    { name: 'Cons. Disc.', change: 0.7, topStocks: [{ symbol: 'AMZN', change: 2.1 }, { symbol: 'HD', change: 0.9 }] },
    { name: 'Materials', change: 0.5, topStocks: [{ symbol: 'LIN', change: 1.2 }, { symbol: 'APD', change: 0.7 }] },
    { name: 'Utilities', change: 0.1, topStocks: [{ symbol: 'NEE', change: 0.6 }, { symbol: 'DUK', change: 0.3 }] },
    { name: 'Industrial', change: -0.8, topStocks: [{ symbol: 'HON', change: -1.2 }, { symbol: 'UNP', change: -0.6 }] },
    { name: 'Real Estate', change: -2.4, topStocks: [{ symbol: 'AMT', change: -3.5 }, { symbol: 'EQIX', change: -2.1 }] }
  ]).map(sector => ({
    ...sector,
    color: getSectorColorStyle(sector.change),
    opacity: getSectorOpacity(sector.change, maxChange)
  }));
  
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Sector Heatmap</h2>
        <select 
          className="bg-background border border-accent/30 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value as TimeFrame)}
        >
          <option value="1d">1 Day</option>
          <option value="1w">1 Week</option>
          <option value="1m">1 Month</option>
          <option value="3m">3 Months</option>
        </select>
      </div>
      
      {isLoading ? (
        <div className="h-60 flex items-center justify-center">
          <p className="text-muted-foreground">Loading sector data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {sectors.map((sector, index) => (
            <div 
              key={index} 
              className={`sector-cell ${sector.color} rounded-lg p-3 relative cursor-pointer`}
              style={{ opacity: sector.opacity }}
            >
              <div className="flex justify-between">
                <span className="font-medium">{sector.name}</span>
                <span>{formatPercentage(sector.change)}</span>
              </div>
              
              {/* Tooltip */}
              {sector.topStocks.length > 0 && (
                <div className="stock-tooltip absolute left-0 right-0 top-full mt-2 bg-card rounded-lg p-3 z-10 shadow-lg">
                  <p className="text-sm font-medium mb-2">Top Performers</p>
                  <div className="space-y-1">
                    {sector.topStocks.map((stock, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span>{stock.symbol}</span>
                        <span className={stock.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {formatPercentage(stock.change)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mt-4 text-center">Hover over sectors to see top performing stocks</p>
    </div>
  );
};

export default SectorHeatmapCard;
