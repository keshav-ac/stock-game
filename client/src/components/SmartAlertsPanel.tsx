import React from 'react';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';

const SmartAlertsPanel: React.FC = () => {
  const { data: alerts, isLoading } = useQuery({
    queryKey: ['/api/alerts'],
  });
  
  const getAlertBorderColor = (type: string) => {
    switch (type) {
      case 'price_drop':
        return 'border-amber-400';
      case 'sentiment_shift':
        return 'border-green-500';
      case 'news_impact':
        return 'border-accent';
      default:
        return 'border-muted';
    }
  };
  
  const getAlertBadgeStyle = (type: string) => {
    switch (type) {
      case 'price_drop':
        return 'bg-amber-400/20 text-amber-400';
      case 'sentiment_shift':
        return 'bg-green-500/20 text-green-500';
      case 'news_impact':
        return 'bg-accent/20 text-accent';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };
  
  const getAlertLabel = (type: string) => {
    switch (type) {
      case 'price_drop':
        return 'Price Drop';
      case 'sentiment_shift':
        return 'Sentiment Shift';
      case 'news_impact':
        return 'News Impact';
      default:
        return 'Alert';
    }
  };

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Smart Alerts</h2>
        <button className="bg-accent/20 hover:bg-accent/30 text-accent rounded-full p-1">
          <Plus size={18} />
        </button>
      </div>
      
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading alerts...</p>
        ) : alerts?.length === 0 ? (
          <p className="text-muted-foreground text-sm">No alerts to display</p>
        ) : (
          (alerts || [
            { id: 1, symbol: 'TSLA', type: 'price_drop', message: 'Drop of 5.2% below your threshold of 4%', createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
            { id: 2, symbol: 'AAPL', type: 'sentiment_shift', message: 'Positive sentiment increase from 65% to 78%', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
            { id: 3, symbol: 'Tech Sector', type: 'news_impact', message: 'Major policy announcement affecting semiconductor stocks', createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() }
          ]).map(alert => (
            <div 
              key={alert.id} 
              className={`bg-background/50 rounded-lg p-3 border-l-4 ${getAlertBorderColor(alert.type)}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{alert.symbol}</span>
                    <span className={`ml-2 text-xs ${getAlertBadgeStyle(alert.type)} px-2 py-0.5 rounded-full`}>
                      {getAlertLabel(alert.type)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          ))
        )}
        
        <button className="w-full py-2 text-accent text-sm hover:underline">
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default SmartAlertsPanel;
