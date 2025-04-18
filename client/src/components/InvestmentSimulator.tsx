import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import Chart from 'chart.js/auto';

interface SimulatorFormData {
  symbol: string;
  date: string;
  amount: number;
}

interface SimulationResult {
  initialInvestment: number;
  currentValue: number;
  totalReturn: number;
  annualizedReturn: number;
  comparisonToBenchmark: number;
  comparisonBenchmarkName: string;
  chartData: {
    labels: string[];
    stockData: number[];
    benchmarkData: number[];
  };
}

const InvestmentSimulator: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [formData, setFormData] = useState<SimulatorFormData>({
    symbol: 'AAPL',
    date: '2020-03-20',
    amount: 1000
  });
  
  const simulationMutation = useMutation({
    mutationFn: async (data: SimulatorFormData) => {
      const response = await apiRequest('POST', '/api/simulator/calculate', data);
      return response.json() as Promise<SimulationResult>;
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      // Only positive numbers
      if (parseFloat(value) >= 0 || value === '') {
        setFormData({
          ...formData,
          [name]: value === '' ? '' : parseFloat(value)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate date is not in the future
    const selectedDate = new Date(formData.date);
    const today = new Date();
    
    if (selectedDate > today) {
      alert('Investment date cannot be in the future.');
      return;
    }
    
    // Validate symbol is not empty
    if (!formData.symbol.trim()) {
      alert('Please enter a valid stock symbol.');
      return;
    }
    
    // Validate amount is positive
    if (formData.amount <= 0) {
      alert('Investment amount must be greater than zero.');
      return;
    }
    
    simulationMutation.mutate(formData);
  };
  
  // Create or update chart when results change
  useEffect(() => {
    if (!chartRef.current || !simulationMutation.data) return;
    
    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    const { chartData } = simulationMutation.data;
    
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: formData.symbol,
            data: chartData.stockData,
            borderColor: '#a56eff',
            backgroundColor: 'rgba(155, 93, 229, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: simulationMutation.data.comparisonBenchmarkName,
            data: chartData.benchmarkData,
            borderColor: '#9e9ea7',
            backgroundColor: 'rgba(158, 158, 167, 0.1)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#9e9ea7',
              font: {
                size: 8
              },
              maxRotation: 0
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#9e9ea7',
              font: {
                size: 10
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(59, 47, 99, 0.9)',
            titleColor: '#E1E1E6',
            bodyColor: '#E1E1E6',
            borderColor: 'rgba(165, 110, 255, 0.3)',
            borderWidth: 1,
            mode: 'index',
            intersect: false
          }
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      }
    });
    
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [simulationMutation.data, formData.symbol]);
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };
  
  // Format percentage values
  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="glass-card rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-4">If I Had Invested...</h2>
      
      <div className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Stock Symbol</label>
              <input 
                type="text" 
                name="symbol"
                value={formData.symbol} 
                onChange={handleInputChange}
                className="w-full bg-background border border-accent/30 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Investment Date</label>
              <input 
                type="date" 
                name="date"
                value={formData.date} 
                onChange={handleInputChange}
                max={new Date().toISOString().split('T')[0]}
                className="w-full bg-background border border-accent/30 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm text-muted-foreground mb-1">Investment Amount ($)</label>
            <input 
              type="number" 
              name="amount"
              value={formData.amount} 
              onChange={handleInputChange}
              min="0" 
              step="1"
              className="w-full bg-background border border-accent/30 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          
          <button 
            type="submit"
            disabled={simulationMutation.isPending}
            className="w-full mt-4 py-2 px-4 bg-accent hover:bg-accent/90 text-white rounded-lg glow-btn transition-all disabled:opacity-70"
          >
            {simulationMutation.isPending ? 'Calculating...' : 'Calculate Returns'}
          </button>
        </form>
        
        {simulationMutation.data && (
          <div className="bg-background/50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Initial Investment</p>
                <p className="text-xl font-mono font-medium">
                  {formatCurrency(simulationMutation.data.initialInvestment)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className={`text-xl font-mono font-medium ${simulationMutation.data.totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatCurrency(simulationMutation.data.currentValue)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Return</p>
                <p className={`text-xl font-mono font-medium ${simulationMutation.data.totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatPercentage(simulationMutation.data.totalReturn)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annualized Return</p>
                <p className={`text-xl font-mono font-medium ${simulationMutation.data.annualizedReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatPercentage(simulationMutation.data.annualizedReturn)}
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Comparison to {simulationMutation.data.comparisonBenchmarkName}: 
                <span className={simulationMutation.data.comparisonToBenchmark >= 0 ? ' text-green-500' : ' text-red-500'}>
                  {' '}{formatPercentage(simulationMutation.data.comparisonToBenchmark)} {simulationMutation.data.comparisonToBenchmark >= 0 ? 'better' : 'worse'}
                </span>
              </p>
              <div className="h-40 bg-background rounded-lg p-2 mb-2">
                <canvas ref={chartRef} className="w-full h-full" />
              </div>
              <div className="flex items-center text-xs justify-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-accent mr-1"></div>
                  <span>{formData.symbol}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground mr-1"></div>
                  <span>{simulationMutation.data.comparisonBenchmarkName}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentSimulator;
