export interface User {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  xp: number;
  level: number;
  completedTasks: number;
  totalTasks: number;
  investmentStyle?: string;
}

export interface LearningProgress {
  currentQuestName: string;
  currentQuestProgress: number;
  completedLessons: number;
  totalLessons: number;
  level: number;
  upcomingQuests: {
    name: string;
    status: 'next' | 'future';
  }[];
}

export interface InvestmentStyle {
  styleName: string;
  styleDescription: string;
  timeHorizon: string;
  riskTolerance: string;
  recommendedSectors: string[];
  radarData: {
    labels: string[];
    values: number[];
  };
}

export interface Alert {
  id: number;
  symbol: string;
  type: 'price_drop' | 'sentiment_shift' | 'news_impact';
  message: string;
  createdAt: string;
}

export interface SimulatorInput {
  symbol: string;
  date: string;
  amount: number;
}

export interface SimulationResult {
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

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high52Week: number;
  low52Week: number;
  pe: number;
  dividend: number;
  chartData: {
    timestamp: string;
    price: number;
  }[];
}

export interface StockInsight {
  symbol: string;
  name: string;
  status: 'buy' | 'sell' | 'hold' | 'watch';
  percentage: number;
}

export interface AIInsights {
  opportunities: StockInsight[];
  risks: StockInsight[];
  analysisNote: string;
}

export interface MarketOverview {
  lastUpdated: string;
  indices: {
    name: string;
    value: number;
    change: number;
  }[];
  topMovers: {
    symbol: string;
    name: string;
    change: number;
  }[];
  sentiment: {
    status: 'Bullish' | 'Neutral' | 'Bearish';
    bullish: number;
    neutral: number;
    bearish: number;
  };
}

export interface Sector {
  name: string;
  change: number;
  topStocks: {
    symbol: string;
    change: number;
  }[];
}

export interface NewsItem {
  id: number;
  impact: 'positive' | 'negative' | 'neutral';
  symbol: string;
  change: number;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  impactScore: number;
}
