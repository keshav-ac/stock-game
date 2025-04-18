import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';

type NewsFilter = 'all' | 'market' | 'watchlist';

interface NewsItem {
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

const NewsAnalysisCard: React.FC = () => {
  const [filter, setFilter] = useState<NewsFilter>('all');
  
  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['/api/news/analysis', filter],
  });
  
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'positive':
        return { class: 'bg-green-500/20 text-green-500', icon: '✅', text: 'Boosting' };
      case 'neutral':
        return { class: 'bg-amber-400/20 text-amber-400', icon: '⚠', text: 'Risky' };
      case 'negative':
        return { class: 'bg-red-500/20 text-red-500', icon: '❌', text: 'Negative' };
      default:
        return { class: 'bg-muted/20 text-muted-foreground', icon: '•', text: 'Unknown' };
    }
  };
  
  const renderImpactScore = (score: number) => {
    const dots = [];
    
    for (let i = 0; i < 5; i++) {
      dots.push(
        <div 
          key={i} 
          className={`w-2 h-2 rounded-full mx-0.5 ${i < score ? 
            (score >= 4 ? 'bg-green-500' : score >= 2 ? 'bg-amber-400' : 'bg-red-500') : 
            'bg-muted-foreground'}`}
        ></div>
      );
    }
    
    return <div className="flex">{dots}</div>;
  };

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">News Analysis</h2>
        <div className="flex space-x-2">
          <button 
            className={`rounded-full px-3 py-1 text-xs ${filter === 'all' ? 'bg-accent text-white' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`rounded-full px-3 py-1 text-xs ${filter === 'market' ? 'bg-accent text-white' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setFilter('market')}
          >
            Market
          </button>
          <button 
            className={`rounded-full px-3 py-1 text-xs ${filter === 'watchlist' ? 'bg-accent text-white' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setFilter('watchlist')}
          >
            Watchlist
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading news analysis...</p>
        ) : (
          (newsItems as NewsItem[] || [
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
          ]).map(news => {
            const impact = getImpactBadge(news.impact);
            
            return (
              <div key={news.id} className="bg-background/50 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <span className={`text-xs ${impact.class} px-2 py-0.5 rounded-full mr-2`}>
                      {impact.icon} {impact.text}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(news.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium">{news.symbol}</span>
                    <span className={`text-xs ${news.change >= 0 ? 'text-green-500' : news.change < 0 ? 'text-red-500' : 'text-amber-400'}`}>
                      {news.change >= 0 ? '+' : ''}{news.change}%
                    </span>
                  </div>
                </div>
                <h3 className="font-medium mb-1">{news.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Source: {news.source}</span>
                  <div className="flex items-center">
                    <span className="text-xs mr-1">Impact Score:</span>
                    {renderImpactScore(news.impactScore)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        
        <button className="w-full py-2 text-accent text-sm hover:underline">
          View More News
        </button>
      </div>
    </div>
  );
};

export default NewsAnalysisCard;
