import { z } from 'zod';

// Simulated fetch function for stock data in development/testing
async function fetchStockData(symbol: string) {
  // In a real application, this would call Yahoo Finance API or similar
  // For now, return mock data based on the symbol
  const stockPrices: Record<string, number> = {
    'AAPL': 172.40,
    'MSFT': 322.28,
    'GOOGL': 133.95,
    'AMZN': 141.23,
    'TSLA': 176.54,
    'NVDA': 432.89,
    'META': 330.55,
    'AMD': 142.76,
    'NFLX': 575.42,
    'INTC': 35.21,
  };
  
  // Generate random change percentage (-8% to +8%)
  const change = symbol === 'AAPL' ? 1.2 : 
                 symbol === 'MSFT' ? 2.7 : 
                 symbol === 'NVDA' ? 1.8 : 
                 symbol === 'AMD' ? 4.2 : 
                 symbol === 'NFLX' ? -3.2 : 
                 symbol === 'INTC' ? -1.3 : 
                 (Math.random() * 16 - 8).toFixed(2);
  
  const price = stockPrices[symbol] || 100 + (Math.random() * 200);
  
  // Create a mock chart data (last 30 days)
  const chartData = [];
  const changePerDay = Number(change) / 30;
  const currentDate = new Date();
  const basePrice = price / (1 + Number(change) / 100);
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    
    const dayPrice = basePrice * (1 + (changePerDay * (30 - i) / 100));
    chartData.push({
      timestamp: date.toISOString(),
      price: dayPrice
    });
  }
  
  return {
    symbol,
    name: getStockName(symbol),
    price,
    change: Number(change),
    changePercent: Number(change),
    volume: Math.floor(Math.random() * 10000000) + 1000000,
    marketCap: Math.floor(Math.random() * 1000000000000) + 10000000000,
    high52Week: price * 1.3,
    low52Week: price * 0.7,
    pe: Math.floor(Math.random() * 30) + 10,
    dividend: Math.random() * 2,
    chartData
  };
}

function getStockName(symbol: string): string {
  const stockNames: Record<string, string> = {
    'AAPL': 'Apple Inc.',
    'MSFT': 'Microsoft Corp.',
    'GOOGL': 'Alphabet Inc.',
    'AMZN': 'Amazon.com Inc.',
    'TSLA': 'Tesla Inc.',
    'NVDA': 'NVIDIA Corp.',
    'META': 'Meta Platforms Inc.',
    'AMD': 'Advanced Micro Devices',
    'NFLX': 'Netflix Inc.',
    'INTC': 'Intel Corp.',
  };
  
  return stockNames[symbol] || 'Unknown Company';
}

async function generateHistoricalReturnData(symbol: string, startDate: string, amount: number) {
  // Fetch historical stock data
  const stock = await fetchStockData(symbol);
  
  // Create past data points for simulation
  const startDateObj = new Date(startDate);
  const endDateObj = new Date();
  
  // Calculate days between dates
  const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  // Generate a more realistic growth curve
  const labels = [];
  const stockData = [];
  const benchmarkData = [];
  
  // Start price (randomly chosen between 50-80% of current price)
  const priceMultiplier = Math.random() * 0.3 + 0.5; // 50-80% of current price
  const startPrice = stock.price * priceMultiplier;
  
  // S&P benchmark start (about 60-70% of current value which is around 4500)
  const benchmarkStart = 4500 * (Math.random() * 0.1 + 0.6);
  
  // Add data points - we'll use quarterly points for readability
  const quarters = Math.max(Math.floor(daysDiff / 90), 1);
  
  // Function to add some volatility to the growth curve
  const addVolatility = (baseValue: number) => {
    const volatility = baseValue * (Math.random() * 0.1 - 0.05); // ±5% random volatility
    return baseValue + volatility;
  };
  
  for (let i = 0; i <= quarters; i++) {
    const pointDate = new Date(startDateObj);
    pointDate.setDate(startDateObj.getDate() + (i * 90));
    
    // Don't go beyond current date
    if (pointDate > endDateObj) break;
    
    const label = pointDate.toISOString().split('T')[0];
    
    // Calculate growth with some randomness
    const progressPercent = i / quarters;
    const stockValue = startPrice + ((stock.price - startPrice) * progressPercent);
    const benchmarkValue = benchmarkStart + ((4500 - benchmarkStart) * progressPercent);
    
    labels.push(label);
    stockData.push(addVolatility(stockValue));
    benchmarkData.push(addVolatility(benchmarkValue));
  }
  
  // Ensure the last point matches current values
  if (labels.length > 0) {
    labels[labels.length - 1] = endDateObj.toISOString().split('T')[0];
    stockData[stockData.length - 1] = stock.price;
    benchmarkData[benchmarkData.length - 1] = 4500;
  }
  
  // Calculate returns
  const sharesBought = amount / stockData[0];
  const currentValue = sharesBought * stock.price;
  const totalReturn = ((currentValue / amount) - 1) * 100;
  
  // Calculate annualized return
  const years = daysDiff / 365;
  const annualizedReturn = (Math.pow((currentValue / amount), (1 / years)) - 1) * 100;
  
  // Benchmark comparison
  const benchmarkReturn = ((benchmarkData[benchmarkData.length - 1] / benchmarkData[0]) - 1) * 100;
  const comparisonToBenchmark = totalReturn - benchmarkReturn;
  
  return {
    initialInvestment: amount,
    currentValue,
    totalReturn,
    annualizedReturn,
    comparisonToBenchmark,
    comparisonBenchmarkName: 'S&P 500',
    chartData: {
      labels,
      stockData,
      benchmarkData
    }
  };
}

export const stockService = {
  async getStockData(symbol: string) {
    return fetchStockData(symbol);
  },
  
  async getMarketOverview() {
    return {
      lastUpdated: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) + ' EST',
      indices: [
        { name: 'S&P 500', value: 4587.33, change: 1.23 },
        { name: 'NASDAQ', value: 14265.86, change: 1.73 },
        { name: 'DOW', value: 35405.24, change: 0.68 }
      ],
      topMovers: [
        { symbol: 'SHOP', name: 'Shopify Inc.', change: 8.4 },
        { symbol: 'PYPL', name: 'PayPal Holdings', change: 6.2 },
        { symbol: 'DIS', name: 'Walt Disney Co.', change: -5.7 }
      ],
      sentiment: {
        status: 'Bullish',
        bullish: 65,
        neutral: 25,
        bearish: 10
      }
    };
  },
  
  async getSectorPerformance(timeframe: string) {
    return [
      { name: 'Tech', change: 5.2, topStocks: [{ symbol: 'NVDA', change: 8.4 }, { symbol: 'AAPL', change: 4.7 }, { symbol: 'MSFT', change: 4.1 }] },
      { name: 'Healthcare', change: 3.7, topStocks: [{ symbol: 'JNJ', change: 5.2 }, { symbol: 'PFE', change: 4.8 }] },
      { name: 'Financial', change: 1.8, topStocks: [{ symbol: 'JPM', change: 3.1 }, { symbol: 'BAC', change: 2.2 }] },
      { name: 'Energy', change: 1.2, topStocks: [{ symbol: 'XOM', change: 2.4 }, { symbol: 'CVX', change: 1.8 }] },
      { name: 'Cons. Disc.', change: 0.7, topStocks: [{ symbol: 'AMZN', change: 2.1 }, { symbol: 'HD', change: 0.9 }] },
      { name: 'Materials', change: 0.5, topStocks: [{ symbol: 'LIN', change: 1.2 }, { symbol: 'APD', change: 0.7 }] },
      { name: 'Utilities', change: 0.1, topStocks: [{ symbol: 'NEE', change: 0.6 }, { symbol: 'DUK', change: 0.3 }] },
      { name: 'Industrial', change: -0.8, topStocks: [{ symbol: 'HON', change: -1.2 }, { symbol: 'UNP', change: -0.6 }] },
      { name: 'Real Estate', change: -2.4, topStocks: [{ symbol: 'AMT', change: -3.5 }, { symbol: 'EQIX', change: -2.1 }] }
    ];
  },
  
  async getAIInsights(period: string) {
    return {
      opportunities: [
        { symbol: 'AMD', name: 'Advanced Micro Devices', status: 'buy', percentage: 4.2 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', status: 'buy', percentage: 2.7 },
        { symbol: 'NVDA', name: 'NVIDIA Corp.', status: 'watch', percentage: 1.8 }
      ],
      risks: [
        { symbol: 'NFLX', name: 'Netflix Inc.', status: 'sell', percentage: -5.8 },
        { symbol: 'INTC', name: 'Intel Corp.', status: 'hold', percentage: -1.3 }
      ],
      analysisNote: 'Tech sector shows strong growth potential despite recent volatility. Focus on companies with solid cash reserves and market leadership. Consider reducing exposure to streaming services facing increased competition.'
    };
  },
  
  async calculateInvestmentReturns(symbol: string, date: string, amount: number) {
    const amountValidator = z.number().positive("Investment amount must be positive");
    const dateValidator = z.string().refine(val => {
      const selectedDate = new Date(val);
      const today = new Date();
      return selectedDate <= today;
    }, "Investment date cannot be in the future");
    
    // Validate input
    amountValidator.parse(amount);
    dateValidator.parse(date);
    
    return generateHistoricalReturnData(symbol, date, amount);
  }
};
