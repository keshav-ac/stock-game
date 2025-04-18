// This service would normally use real NLP models or APIs for sentiment analysis
// In a production app, we would integrate with Twitter API, StockTwits, or financial news APIs
// and use VADER or BERT models to analyze sentiment

import { z } from 'zod';

interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
  overallSentiment: 'bullish' | 'bearish' | 'neutral';
  trendDirection: 'improving' | 'declining' | 'stable';
  sources: {
    twitter: SentimentBreakdown;
    reddit: SentimentBreakdown;
    stocktwits: SentimentBreakdown;
    news: SentimentBreakdown;
  };
  recentPosts: SentimentPost[];
}

interface SentimentBreakdown {
  positive: number;
  neutral: number;
  negative: number;
}

interface SentimentPost {
  source: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: string;
}

// Validate input symbol
const symbolValidator = z.string().min(1, "Symbol is required");

export const sentimentService = {
  async getSentiment(symbol: string): Promise<SentimentData> {
    // Validate input
    symbolValidator.parse(symbol);
    
    // In a real implementation, this would:
    // 1. Fetch tweets containing the stock symbol using Twitter API
    // 2. Fetch Reddit posts from r/wallstreetbets, r/investing, etc.
    // 3. Fetch StockTwits messages for the symbol
    // 4. Run the text through VADER or BERT sentiment analysis models
    // 5. Calculate aggregate sentiment scores
    
    // Sentiment varies by stock symbol for demo realism
    let positive = 0;
    let negative = 0;
    let neutral = 0;
    
    switch(symbol.toUpperCase()) {
      case 'AAPL':
        positive = 78;
        neutral = 15;
        negative = 7;
        break;
      case 'TSLA':
        positive = 45;
        neutral = 25;
        negative = 30;
        break;
      case 'MSFT':
        positive = 82;
        neutral = 12;
        negative = 6;
        break;
      case 'NFLX':
        positive = 35;
        neutral = 30;
        negative = 35;
        break;
      case 'AMZN':
        positive = 68;
        neutral = 22;
        negative = 10;
        break;
      case 'AMD':
        positive = 85;
        neutral = 10;
        negative = 5;
        break;
      case 'NVDA':
        positive = 90;
        neutral = 8;
        negative = 2;
        break;
      case 'INTC':
        positive = 42;
        neutral = 33;
        negative = 25;
        break;
      default:
        // For unknown symbols, generate reasonable ranges
        positive = 50 + Math.floor(Math.random() * 30);
        negative = Math.floor(Math.random() * 20);
        neutral = 100 - positive - negative;
    }
    
    // Determine overall sentiment
    let overallSentiment: 'bullish' | 'bearish' | 'neutral';
    if (positive - negative > 15) {
      overallSentiment = 'bullish';
    } else if (negative - positive > 15) {
      overallSentiment = 'bearish';
    } else {
      overallSentiment = 'neutral';
    }
    
    // Determine trend direction
    let trendDirection: 'improving' | 'declining' | 'stable';
    // In a real implementation, we would compare with historical sentiment data
    if (positive > 70) {
      trendDirection = 'improving';
    } else if (negative > 30) {
      trendDirection = 'declining';
    } else {
      trendDirection = 'stable';
    }
    
    // Create source breakdowns with slight variations
    const twitterVariation = Math.floor(Math.random() * 10) - 5;
    const redditVariation = Math.floor(Math.random() * 10) - 5;
    const stocktwitsVariation = Math.floor(Math.random() * 10) - 5;
    const newsVariation = Math.floor(Math.random() * 10) - 5;
    
    function adjustSentiment(base: number, variation: number): number {
      let adjusted = base + variation;
      if (adjusted < 0) adjusted = 0;
      if (adjusted > 100) adjusted = 100;
      return adjusted;
    }
    
    function createBreakdown(posBase: number, negBase: number, neuBase: number, variation: number): SentimentBreakdown {
      let pos = adjustSentiment(posBase, variation);
      let neg = adjustSentiment(negBase, -variation);
      let neu = 100 - pos - neg;
      
      // Ensure we don't have negative values
      if (neu < 0) {
        // Redistribute the negative neutral value proportionally
        const total = pos + neg;
        pos = Math.round((pos / total) * 100);
        neg = 100 - pos;
        neu = 0;
      }
      
      return {
        positive: pos,
        neutral: neu,
        negative: neg
      };
    }
    
    const sources = {
      twitter: createBreakdown(positive, negative, neutral, twitterVariation),
      reddit: createBreakdown(positive, negative, neutral, redditVariation),
      stocktwits: createBreakdown(positive, negative, neutral, stocktwitsVariation),
      news: createBreakdown(positive, negative, neutral, newsVariation)
    };
    
    // Generate sample recent posts
    const positiveTexts = [
      `${symbol} is a strong buy right now! Their latest earnings exceeded expectations.`,
      `I'm very bullish on ${symbol}, the fundamentals are solid and the chart looks great.`,
      `${symbol} has great growth potential in this market. Adding to my position.`,
      `${symbol}'s new product lineup looks promising. Expecting positive market reaction.`
    ];
    
    const neutralTexts = [
      `${symbol} seems fairly valued at current levels. Watching for a better entry point.`,
      `Holding my ${symbol} position for now. Need more data before making a move.`,
      `${symbol} has both positives and negatives right now. Market conditions will determine the direction.`,
      `Not sure about ${symbol} in the short term, but long-term prospects look reasonable.`
    ];
    
    const negativeTexts = [
      `${symbol} is overvalued at current levels. Considering taking profits.`,
      `Bearish on ${symbol} due to increasing competition and margin pressure.`,
      `${symbol}'s latest quarterly results were concerning. Watch for further deterioration.`,
      `${symbol} faces significant headwinds in this market environment. Approaching cautiously.`
    ];
    
    const recentPosts: SentimentPost[] = [];
    
    // Add some positive posts
    for (let i = 0; i < Math.ceil(positive / 25); i++) {
      recentPosts.push({
        source: ['Twitter', 'Reddit', 'StockTwits', 'Financial News'][Math.floor(Math.random() * 4)],
        text: positiveTexts[Math.floor(Math.random() * positiveTexts.length)],
        sentiment: 'positive',
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 48 * 60 * 60 * 1000)).toISOString()
      });
    }
    
    // Add some neutral posts
    for (let i = 0; i < Math.ceil(neutral / 25); i++) {
      recentPosts.push({
        source: ['Twitter', 'Reddit', 'StockTwits', 'Financial News'][Math.floor(Math.random() * 4)],
        text: neutralTexts[Math.floor(Math.random() * neutralTexts.length)],
        sentiment: 'neutral',
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 48 * 60 * 60 * 1000)).toISOString()
      });
    }
    
    // Add some negative posts
    for (let i = 0; i < Math.ceil(negative / 25); i++) {
      recentPosts.push({
        source: ['Twitter', 'Reddit', 'StockTwits', 'Financial News'][Math.floor(Math.random() * 4)],
        text: negativeTexts[Math.floor(Math.random() * negativeTexts.length)],
        sentiment: 'negative',
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 48 * 60 * 60 * 1000)).toISOString()
      });
    }
    
    // Sort posts by timestamp, most recent first
    recentPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return {
      positive,
      neutral,
      negative,
      overallSentiment,
      trendDirection,
      sources,
      recentPosts: recentPosts.slice(0, 10) // Return only the 10 most recent posts
    };
  },
  
  async getSectorSentiment(sector: string): Promise<SentimentData> {
    // This would fetch and analyze sentiment for an entire sector
    // Very similar to stock sentiment but would aggregate across multiple stocks
    
    // Placeholder implementation similar to stock sentiment
    return this.getSentiment(sector);
  }
};
