import React from 'react';
import { BookOpen, Play } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/providers/UserProvider';

const LearningProgressCard: React.FC = () => {
  const { user } = useUser();
  
  const { data: learningProgress, isLoading } = useQuery({
    queryKey: ['/api/learning/progress'],
  });
  
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Learning Progress</h2>
        <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
          Level {isLoading ? '...' : (learningProgress?.level || 6)}
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Current Quest */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-muted-foreground">Current Quest</span>
            <span className="text-sm font-medium">
              {isLoading ? '...' : (learningProgress?.currentQuestProgress || 65)}%
            </span>
          </div>
          <div className="progress bg-background">
            <div 
              className="progress-bar bg-accent" 
              style={{ width: `${isLoading ? 0 : (learningProgress?.currentQuestProgress || 65)}%` }}
            ></div>
          </div>
          <div className="mt-2 flex items-start space-x-2">
            <BookOpen className="text-accent" size={18} />
            <div>
              <p className="text-sm font-medium">
                {isLoading ? 'Loading...' : (learningProgress?.currentQuestName || 'Technical Analysis Fundamentals')}
              </p>
              <p className="text-xs text-muted-foreground">
                {isLoading ? '...' : (learningProgress?.completedLessons || 13)}/{isLoading ? '...' : (learningProgress?.totalLessons || 20)} lessons completed
              </p>
            </div>
          </div>
        </div>
        
        {/* Daily Streak */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-muted-foreground">Daily Tasks</span>
            <span className="text-sm font-medium">
              {isLoading ? '...' : (user?.completedTasks || 2)}/{isLoading ? '...' : (user?.totalTasks || 5)} completed
            </span>
          </div>
          <div className="progress bg-background">
            <div 
              className="progress-bar bg-green-500" 
              style={{ width: `${isLoading ? 0 : ((user?.completedTasks || 2) / (user?.totalTasks || 5) * 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Upcoming Quests */}
        <div>
          <h3 className="text-sm font-medium mb-2">Upcoming Quests</h3>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading quests...</p>
          ) : (
            <ul className="space-y-3">
              {(learningProgress?.upcomingQuests || [
                { name: 'Risk Management Strategies', status: 'next' },
                { name: 'Advanced Candlestick Patterns', status: 'future' },
                { name: 'Fundamental Analysis Deep Dive', status: 'future' }
              ]).map((quest, index) => (
                <li key={index} className="flex items-center text-sm">
                  <div 
                    className={`w-2 h-2 rounded-full mr-2 ${
                      quest.status === 'next' ? 'bg-amber-400' : 'bg-muted-foreground'
                    }`}
                  ></div>
                  <span>{quest.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <button className="w-full py-2 px-4 bg-accent hover:bg-accent/90 text-white rounded-lg glow-btn transition-all flex items-center justify-center">
          <span>Continue Learning</span>
          <Play className="ml-2" size={18} />
        </button>
      </div>
    </div>
  );
};

export default LearningProgressCard;
