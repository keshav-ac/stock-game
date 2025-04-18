import React, { useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Clock, RefreshCw } from 'lucide-react';
import Chart from 'chart.js/auto';

const InvestmentStyleCard: React.FC = () => {
  const radarChartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  
  const { data: investmentStyle, isLoading } = useQuery({
    queryKey: ['/api/user/investment-style'],
  });
  
  useEffect(() => {
    if (!radarChartRef.current || isLoading) return;
    
    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    
    // Create new chart instance
    const ctx = radarChartRef.current.getContext('2d');
    if (!ctx) return;
    
    const data = investmentStyle?.radarData || {
      labels: ['Growth', 'Value', 'Risk', 'Timing', 'Research'],
      values: [85, 45, 65, 50, 70]
    };
    
    chartInstanceRef.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Your Style',
          data: data.values,
          backgroundColor: 'rgba(155, 93, 229, 0.2)',
          borderColor: '#9b5de5',
          borderWidth: 2,
          pointBackgroundColor: '#a56eff'
        }]
      },
      options: {
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: '#9e9ea7',
              font: {
                size: 10
              }
            },
            ticks: {
              display: false,
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
    
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [isLoading, investmentStyle]);
  
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Investment Style</h2>
        <button className="text-accent text-sm hover:underline">Update</button>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="relative w-44 h-44">
            <canvas ref={radarChartRef} />
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium text-accent">
            {isLoading ? 'Loading...' : (investmentStyle?.styleName || 'Growth Investor')}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {isLoading ? 'Loading...' : (investmentStyle?.styleDescription || 'You focus on companies with high growth potential, even at higher valuations.')}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="bg-background/50 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <Clock className="mr-1 text-amber-400" size={16} />
              <span className="text-xs font-medium">Time Horizon</span>
            </div>
            <p className="text-sm font-medium">
              {isLoading ? 'Loading...' : (investmentStyle?.timeHorizon || 'Medium-Long Term')}
            </p>
          </div>
          <div className="bg-background/50 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <RefreshCw className="mr-1 text-red-400" size={16} />
              <span className="text-xs font-medium">Risk Tolerance</span>
            </div>
            <p className="text-sm font-medium">
              {isLoading ? 'Loading...' : (investmentStyle?.riskTolerance || 'Moderate-High')}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Recommended Sectors</h3>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading recommendations...</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(investmentStyle?.recommendedSectors || ['Technology', 'Healthcare', 'Clean Energy']).map((sector, index) => (
                <span key={index} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                  {sector}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentStyleCard;
