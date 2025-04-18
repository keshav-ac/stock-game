import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import AIAssistantButton from '@/components/AIAssistantButton';
import MarketOverviewCard from '@/components/MarketOverviewCard';
import SectorHeatmapCard from '@/components/SectorHeatmapCard';
import InvestmentSimulator from '@/components/InvestmentSimulator';
import NewsAnalysisCard from '@/components/NewsAnalysisCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { Search, Calendar, Filter, ChevronDown } from 'lucide-react';
import { StockData } from '@/lib/types';

const TradeAnalysisPage: React.FC = () => {
  const [activeStock, setActiveStock] = useState('AAPL');
  
  // Mock stock data query
  const { data: stockData, isLoading } = useQuery<StockData>({
    queryKey: ['/api/stock', activeStock],
  });
  
  // Mock sentiment query
  const { data: sentimentData } = useQuery({
    queryKey: ['/api/stock', activeStock, 'sentiment'],
  });
  
  // Simulated stock data
  const priceData = [
    { date: '2025-01-01', price: 180.27, volume: 82.5 },
    { date: '2025-01-08', price: 178.95, volume: 75.2 },
    { date: '2025-01-15', price: 182.83, volume: 89.7 },
    { date: '2025-01-22', price: 186.49, volume: 92.1 },
    { date: '2025-01-29', price: 188.75, volume: 105.4 },
    { date: '2025-02-05', price: 190.22, volume: 98.6 },
    { date: '2025-02-12', price: 194.38, volume: 110.2 },
    { date: '2025-02-19', price: 192.74, volume: 88.9 },
    { date: '2025-02-26', price: 196.55, volume: 94.5 },
    { date: '2025-03-05', price: 201.32, volume: 118.7 },
    { date: '2025-03-12', price: 205.76, volume: 125.3 },
    { date: '2025-03-19', price: 209.93, volume: 135.8 },
    { date: '2025-03-26', price: 208.41, volume: 120.1 },
    { date: '2025-04-02', price: 214.57, volume: 142.6 },
    { date: '2025-04-09', price: 219.28, volume: 156.9 },
    { date: '2025-04-16', price: 221.43, volume: 145.2 },
  ];
  
  // Technical indicators
  const technicalData = [
    { indicator: 'Moving Average (50-day)', value: 205.62, signal: 'bullish', strength: 8 },
    { indicator: 'Moving Average (200-day)', value: 187.25, signal: 'bullish', strength: 9 },
    { indicator: 'Relative Strength Index (RSI)', value: 62.4, signal: 'neutral', strength: 5 },
    { indicator: 'MACD', value: 3.85, signal: 'bullish', strength: 7 },
    { indicator: 'Bollinger Bands', value: 'Upper', signal: 'neutral', strength: 4 },
    { indicator: 'Stochastic Oscillator', value: 75.2, signal: 'neutral', strength: 6 }
  ];
  
  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 221.43, change: 0.95 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 417.88, change: 1.23 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 925.66, change: 2.38 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 202.64, change: -0.76 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 182.30, change: 0.42 },
  ];
  
  const renderSignalStrength = (strength: number) => {
    const dots = [];
    for (let i = 0; i < 10; i++) {
      dots.push(
        <div 
          key={i} 
          className={`w-1.5 h-1.5 rounded-full mx-0.5 ${i < strength ? 
            (strength >= 7 ? 'bg-green-500' : strength >= 4 ? 'bg-amber-400' : 'bg-red-500') : 
            'bg-card'}`}
        ></div>
      );
    }
    return <div className="flex">{dots}</div>;
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">
            Advanced Trade Analysis
          </h1>
          <p className="text-muted-foreground">
            Research stocks, analyze trends, and make informed trading decisions
          </p>
        </div>
        
        <div className="mb-6">
          <div className="relative w-full max-w-3xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-muted-foreground" size={18} />
            </div>
            <input
              type="text"
              className="bg-card/30 border border-accent/30 rounded-xl pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-accent/50"
              placeholder="Search stocks, indices, or crypto..."
              defaultValue={activeStock}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {stockData?.name || 'Apple Inc.'} ({activeStock})
                  </h2>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold mr-2">
                      ${stockData?.price || 221.43}
                    </span>
                    <span className={`flex items-center ${stockData?.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stockData?.change > 0 ? '+' : ''}{stockData?.change || 0.95}%
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-1 rounded-lg border border-accent/30 text-sm">
                    <Calendar className="mr-1" size={16} />
                    1M
                    <ChevronDown className="ml-1" size={16} />
                  </button>
                  <button className="flex items-center px-3 py-1 rounded-lg border border-accent/30 text-sm">
                    <Filter className="mr-1" size={16} />
                    Indicators
                    <ChevronDown className="ml-1" size={16} />
                  </button>
                </div>
              </div>
              
              <Tabs defaultValue="price">
                <TabsList className="bg-card/30 mb-4">
                  <TabsTrigger value="price">Price</TabsTrigger>
                  <TabsTrigger value="technicals">Technicals</TabsTrigger>
                  <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
                  <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
                </TabsList>
                
                <TabsContent value="price" className="space-y-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={priceData}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                        <XAxis dataKey="date" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e1e2e', borderColor: '#7c3aed' }} />
                        <Area type="monotone" dataKey="price" stroke="#7c3aed" fillOpacity={1} fill="url(#colorPrice)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="technicals">
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-card/30 text-left">
                          <tr>
                            <th className="px-4 py-2 rounded-l-lg">Indicator</th>
                            <th className="px-4 py-2">Value</th>
                            <th className="px-4 py-2">Signal</th>
                            <th className="px-4 py-2 rounded-r-lg">Strength</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-accent/10">
                          {technicalData.map((item, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 font-medium">{item.indicator}</td>
                              <td className="px-4 py-3">{item.value}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  item.signal === 'bullish' ? 'bg-green-500/20 text-green-500' :
                                  item.signal === 'bearish' ? 'bg-red-500/20 text-red-500' :
                                  'bg-amber-400/20 text-amber-400'
                                }`}>
                                  {item.signal}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                {renderSignalStrength(item.strength)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={priceData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                          <XAxis dataKey="date" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip contentStyle={{ backgroundColor: '#1e1e2e', borderColor: '#7c3aed' }} />
                          <Bar dataKey="volume" fill="#7c3aed" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="fundamentals">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <h3 className="text-sm text-muted-foreground mb-1">Market Cap</h3>
                      <p className="text-lg font-semibold">$3.42T</p>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="text-sm text-muted-foreground mb-1">P/E Ratio</h3>
                      <p className="text-lg font-semibold">32.75</p>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="text-sm text-muted-foreground mb-1">Dividend Yield</h3>
                      <p className="text-lg font-semibold">0.48%</p>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="text-sm text-muted-foreground mb-1">Revenue (TTM)</h3>
                      <p className="text-lg font-semibold">$405.37B</p>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="text-sm text-muted-foreground mb-1">EPS</h3>
                      <p className="text-lg font-semibold">$6.77</p>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="text-sm text-muted-foreground mb-1">Profit Margin</h3>
                      <p className="text-lg font-semibold">25.3%</p>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="text-sm text-muted-foreground mb-1">52-Week Range</h3>
                      <p className="text-lg font-semibold">$167.02 - $227.45</p>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="text-sm text-muted-foreground mb-1">Avg. Volume</h3>
                      <p className="text-lg font-semibold">58.25M</p>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="text-sm text-muted-foreground mb-1">Beta</h3>
                      <p className="text-lg font-semibold">1.28</p>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="sentiment">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">Overall Sentiment</h3>
                        <div className="flex items-center gap-3">
                          <div className="w-full bg-card/30 rounded-full h-3">
                            <div className="bg-green-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                          <span className="text-green-500 font-medium">78% Bullish</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Sentiment by Source</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Twitter</span>
                              <span>82% Positive</span>
                            </div>
                            <div className="w-full bg-card/30 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Reddit</span>
                              <span>74% Positive</span>
                            </div>
                            <div className="w-full bg-card/30 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '74%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>StockTwits</span>
                              <span>80% Positive</span>
                            </div>
                            <div className="w-full bg-card/30 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>News</span>
                              <span>76% Positive</span>
                            </div>
                            <div className="w-full bg-card/30 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Recent Sentiment Posts</h3>
                      <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                        <div className="bg-card/30 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">Positive</span>
                            <span className="text-xs text-muted-foreground">1h ago</span>
                          </div>
                          <p className="text-sm">"{activeStock} is a strong buy right now! Their latest earnings exceeded expectations."</p>
                          <p className="text-xs text-muted-foreground mt-1">Source: Twitter</p>
                        </div>
                        
                        <div className="bg-card/30 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">Positive</span>
                            <span className="text-xs text-muted-foreground">3h ago</span>
                          </div>
                          <p className="text-sm">"I'm very bullish on {activeStock}, the fundamentals are solid and the chart looks great."</p>
                          <p className="text-xs text-muted-foreground mt-1">Source: Reddit</p>
                        </div>
                        
                        <div className="bg-card/30 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full">Neutral</span>
                            <span className="text-xs text-muted-foreground">5h ago</span>
                          </div>
                          <p className="text-sm">"Holding my {activeStock} position for now. Need more data before making a move."</p>
                          <p className="text-xs text-muted-foreground mt-1">Source: StockTwits</p>
                        </div>
                        
                        <div className="bg-card/30 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">Positive</span>
                            <span className="text-xs text-muted-foreground">8h ago</span>
                          </div>
                          <p className="text-sm">"{activeStock} has great growth potential in this market. Adding to my position."</p>
                          <p className="text-xs text-muted-foreground mt-1">Source: Financial News</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <InvestmentSimulator />
            <NewsAnalysisCard />
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-4">Popular Stocks</h2>
              <div className="space-y-3">
                {popularStocks.map((stock, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex items-center justify-between cursor-pointer
                      ${stock.symbol === activeStock ? 'bg-accent/10 border border-accent/30' : 'hover:bg-card/50'}`}
                    onClick={() => setActiveStock(stock.symbol)}
                  >
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div>${stock.price}</div>
                      <div className={stock.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <MarketOverviewCard />
            <SectorHeatmapCard />
          </div>
        </div>
      </main>
      <AIAssistantButton />
    </div>
  );
};

export default TradeAnalysisPage;