import { fetchNews } from "./newsFetcher";

export const newsService = {
  async getNewsWithAnalysis(filter: string = 'all') {
    // This would normally fetch real news from an API
    // and process it through NLP models
    
    // Mock data for demo purposes
    const mockNews = [
      {
        id: 1,
        impact: 'positive',
        symbol: 'AAPL',
        change: 1.2,
        title: 'Apple Announces New AI Features for iPhone Lineup',
        summary: 'Apple\'s new AI features are expected to drive significant upgrade cycles according to analysts.',
        source: 'Bloomberg',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        impactScore: 3
      },
      {
        id: 2,
        impact: 'neutral',
        symbol: 'TSLA',
        change: -0.8,
        title: 'Tesla Faces Production Challenges in New Berlin Factory',
        summary: 'Regulatory issues may cause delays in Tesla\'s European production timeline.',
        source: 'Reuters',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        impactScore: 2
      },
      {
        id: 3,
        impact: 'negative',
        symbol: 'NFLX',
        change: -3.2,
        title: 'Netflix Subscriber Growth Slows in Key Markets',
        summary: 'Streaming giant faces increased competition from new entrants in the market.',
        source: 'CNBC',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        impactScore: 3
      }
    ];
    
    if (filter === 'all') {
      return mockNews;
    } else if (filter === 'market') {
      // Filter for market news (more general market news)
      return mockNews.filter(item => ['SPY', 'QQQ', 'DIA'].includes(item.symbol));
    } else if (filter === 'watchlist') {
      // Mock user watchlist - in reality, this would come from user's watchlist
      const watchlist = ['AAPL', 'MSFT', 'TSLA'];
      return mockNews.filter(item => watchlist.includes(item.symbol));
    }
    
    return mockNews;
  },
  
  async getNewsForSymbol(symbol: string) {
    // This would fetch real news for a specific symbol
    // For now, return mock data for the requested symbol
    
    // For demo purposes
    if (symbol === 'AAPL') {
      return [
        {
          id: 1,
          impact: 'positive',
          symbol: 'AAPL',
          change: 1.2,
          title: 'Apple Announces New AI Features for iPhone Lineup',
          summary: 'Apple\'s new AI features are expected to drive significant upgrade cycles according to analysts.',
          source: 'Bloomberg',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          impactScore: 3
        }
      ];
    } else if (symbol === 'TSLA') {
      return [
        {
          id: 2,
          impact: 'neutral',
          symbol: 'TSLA',
          change: -0.8,
          title: 'Tesla Faces Production Challenges in New Berlin Factory',
          summary: 'Regulatory issues may cause delays in Tesla\'s European production timeline.',
          source: 'Reuters',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          impactScore: 2
        }
      ];
    }
    
    // For other symbols, return an empty array
    return [];
  }
};

// This would be a separate file, but including it here to keep things simple
export const fetchNews = async (symbol?: string) => {
  // In a real app, this would call NewsAPI or similar
  // For now, we'll pretend this function always succeeds with mock data
  
  // We would return real news data from an API here
  return [{
    id: 1,
    title: 'Sample news item',
    content: 'This is a sample news item for demonstration purposes.'
  }];
};
