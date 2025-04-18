import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import AIAssistantButton from '@/components/AIAssistantButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/providers/UserProvider';
import { 
  MessageSquare, 
  ThumbsUp, 
  BarChart2, 
  Award, 
  Users, 
  TrendingUp,
  MessagesSquare,
  Search,
  Filter,
  Zap,
  Flag,
  ArrowUp,
  MessageCircle,
  Heart
} from 'lucide-react';

const CommunityPage: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('discussions');
  
  // Mock community data
  const discussions = [
    {
      id: 1,
      title: "What's your strategy for high inflation periods?",
      author: "michael_trader",
      avatar: null,
      level: 12,
      tags: ["strategy", "inflation", "macroeconomics"],
      replies: 24,
      views: 186,
      likes: 42,
      lastActivity: "2h ago"
    },
    {
      id: 2,
      title: "Technical analysis of NVDA's recent breakout pattern",
      author: "chart_master",
      avatar: null,
      level: 21,
      tags: ["technical", "NVDA", "breakout"],
      replies: 18,
      views: 133,
      likes: 37,
      lastActivity: "4h ago"
    },
    {
      id: 3,
      title: "Bond yields vs. tech stocks: historical correlation analysis",
      author: "dataScientist443",
      avatar: null,
      level: 17,
      tags: ["bonds", "correlation", "tech"],
      replies: 15,
      views: 98,
      likes: 29,
      lastActivity: "6h ago"
    },
    {
      id: 4,
      title: "Beginner question: How to start building a balanced portfolio?",
      author: "new_investor22",
      avatar: null,
      level: 3,
      tags: ["beginner", "portfolio", "advice"],
      replies: 32,
      views: 245,
      likes: 56,
      lastActivity: "12h ago"
    },
    {
      id: 5,
      title: "Thoughts on upcoming Fed meeting and rate decisions?",
      author: "econoWatcher",
      avatar: null,
      level: 19,
      tags: ["fed", "rates", "prediction"],
      replies: 27,
      views: 210,
      likes: 38,
      lastActivity: "1d ago"
    }
  ];
  
  const challenges = [
    {
      id: 1,
      title: "Beat the S&P 500 Challenge",
      description: "Create a portfolio that outperforms the S&P 500 over 3 months",
      participants: 487,
      startDate: "Mar 23, 2025",
      endDate: "Jun 23, 2025",
      prize: "500 XP + Gold Badge",
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Options Strategy Showdown",
      description: "Develop an options strategy with the best risk-adjusted returns",
      participants: 256,
      startDate: "Apr 01, 2025",
      endDate: "Jun 30, 2025",
      prize: "750 XP + Expert Certificate",
      difficulty: "Advanced"
    },
    {
      id: 3,
      title: "Beginner's Bull Run",
      description: "Learn the basics while building your first diversified portfolio",
      participants: 921,
      startDate: "Apr 15, 2025",
      endDate: "May 15, 2025",
      prize: "250 XP + Silver Badge",
      difficulty: "Beginner"
    }
  ];
  
  const events = [
    {
      id: 1,
      title: "Market Outlook 2025: Expert Panel",
      type: "Webinar",
      date: "Apr 22, 2025",
      time: "7:00 PM EST",
      host: "TradeCraft Team",
      participants: 342,
      registered: true
    },
    {
      id: 2,
      title: "Technical Analysis Masterclass",
      type: "Workshop",
      date: "Apr 25, 2025",
      time: "6:30 PM EST",
      host: "chart_master",
      participants: 186,
      registered: false
    },
    {
      id: 3,
      title: "Ask Me Anything: Retired Wall Street Analyst",
      type: "Live Q&A",
      date: "Apr 30, 2025",
      time: "8:00 PM EST",
      host: "ex_wallstreet",
      participants: 425,
      registered: false
    }
  ];
  
  const topContributors = [
    { username: "chart_master", level: 21, contributions: 847, specialty: "Technical Analysis" },
    { username: "value_investor", level: 24, contributions: 782, specialty: "Fundamental Analysis" },
    { username: "econoWatcher", level: 19, contributions: 653, specialty: "Macroeconomics" },
    { username: "options_guru", level: 26, contributions: 621, specialty: "Options Strategies" },
    { username: "risk_manager", level: 22, contributions: 592, specialty: "Risk Assessment" }
  ];
  
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return <span className="bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded-full">Beginner</span>;
      case 'Medium':
        return <span className="bg-amber-400/20 text-amber-400 text-xs px-2 py-0.5 rounded-full">Medium</span>;
      case 'Advanced':
        return <span className="bg-red-500/20 text-red-500 text-xs px-2 py-0.5 rounded-full">Advanced</span>;
      default:
        return <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full">{difficulty}</span>;
    }
  };
  
  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case 'Webinar':
        return <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full">Webinar</span>;
      case 'Workshop':
        return <span className="bg-amber-400/20 text-amber-400 text-xs px-2 py-0.5 rounded-full">Workshop</span>;
      case 'Live Q&A':
        return <span className="bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded-full">Live Q&A</span>;
      default:
        return <span className="bg-blue-500/20 text-blue-500 text-xs px-2 py-0.5 rounded-full">{type}</span>;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">
            TradeCraft Community
          </h1>
          <p className="text-muted-foreground">
            Connect with fellow traders, share strategies, and participate in challenges
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content Area - 2/3 Width */}
          <div className="w-full md:w-2/3 space-y-6">
            <div className="glass-card rounded-xl p-5">
              <Tabs defaultValue="discussions" onValueChange={setActiveTab}>
                <div className="flex justify-between items-center mb-4">
                  <TabsList className="bg-card/30">
                    <TabsTrigger value="discussions" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                      <MessageSquare className="mr-1" size={16} />
                      Discussions
                    </TabsTrigger>
                    <TabsTrigger value="challenges" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                      <BarChart2 className="mr-1" size={16} />
                      Challenges
                    </TabsTrigger>
                    <TabsTrigger value="events" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                      <Users className="mr-1" size={16} />
                      Events
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex space-x-2">
                    <button className="bg-accent text-white px-4 py-2 rounded-lg text-sm flex items-center">
                      {activeTab === 'discussions' ? (
                        <>
                          <MessageSquare className="mr-1" size={16} />
                          New Post
                        </>
                      ) : activeTab === 'challenges' ? (
                        <>
                          <TrendingUp className="mr-1" size={16} />
                          Join Challenge
                        </>
                      ) : (
                        <>
                          <Users className="mr-1" size={16} />
                          Create Event
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mb-4 flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <input 
                      type="text" 
                      placeholder={`Search ${activeTab}...`}
                      className="w-full pl-9 pr-4 py-2 bg-card/30 border border-accent/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <button className="px-3 py-2 rounded-lg border border-accent/20 text-muted-foreground hover:text-foreground">
                    <Filter size={16} />
                  </button>
                </div>
                
                <TabsContent value="discussions" className="space-y-4">
                  {discussions.map(discussion => (
                    <div key={discussion.id} className="p-4 border border-accent/10 rounded-lg hover:border-accent/30 cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={discussion.avatar || ''} alt={discussion.author} />
                          <AvatarFallback className="bg-accent/20 text-accent">
                            {discussion.author.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{discussion.title}</h3>
                          
                          <div className="flex items-center mt-1 text-sm">
                            <span className="text-accent mr-1">{discussion.author}</span>
                            <span className="text-xs bg-accent/10 text-accent px-1 rounded ml-1">Lvl {discussion.level}</span>
                            <span className="mx-2 text-muted-foreground">·</span>
                            <span className="text-muted-foreground">{discussion.lastActivity}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {discussion.tags.map((tag, idx) => (
                              <span key={idx} className="bg-card px-2 py-0.5 rounded-full text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                          <div className="flex items-center">
                            <MessageCircle size={14} className="mr-1" />
                            <span>{discussion.replies}</span>
                          </div>
                          <div className="flex items-center">
                            <Heart size={14} className="mr-1" />
                            <span>{discussion.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center">
                    <button className="text-accent hover:underline mt-2">
                      Load More Discussions
                    </button>
                  </div>
                </TabsContent>
                
                <TabsContent value="challenges" className="space-y-4">
                  {challenges.map(challenge => (
                    <Card key={challenge.id} className="p-5">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-lg">{challenge.title}</h3>
                        {getDifficultyBadge(challenge.difficulty)}
                      </div>
                      
                      <p className="text-muted-foreground my-2">{challenge.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Start Date</p>
                          <p className="font-medium">{challenge.startDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">End Date</p>
                          <p className="font-medium">{challenge.endDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Participants</p>
                          <p className="font-medium">{challenge.participants}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Prize</p>
                          <p className="font-medium">{challenge.prize}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <button className="bg-accent text-white px-4 py-1 rounded text-sm">
                          Join Challenge
                        </button>
                      </div>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="events" className="space-y-4">
                  {events.map(event => (
                    <Card key={event.id} className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-lg">{event.title}</h3>
                            {getEventTypeBadge(event.type)}
                          </div>
                          <p className="text-accent text-sm mt-1">Hosted by {event.host}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium">{event.date}</p>
                          <p className="text-sm text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-muted-foreground">{event.participants} participants</p>
                        
                        <button className={`px-4 py-1 rounded text-sm ${
                          event.registered 
                            ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                            : 'bg-accent text-white'
                        }`}>
                          {event.registered ? 'Registered' : 'Register Now'}
                        </button>
                      </div>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Sidebar - 1/3 Width */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="glass-card rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-4">Your Community Profile</h2>
              
              <div className="flex items-center mb-4">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src="" alt={user?.username || ''} />
                  <AvatarFallback className="bg-accent text-white text-xl">
                    {user?.username ? user.username.substring(0, 2).toUpperCase() : 'JD'}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-lg font-medium">{user?.username || 'johnsmith'}</h3>
                  <div className="flex items-center">
                    <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded mr-2">
                      Level {user?.level || 6}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Member since Apr 2025
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-xl font-semibold text-accent">27</div>
                  <div className="text-xs text-muted-foreground">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-accent">12</div>
                  <div className="text-xs text-muted-foreground">Challenges</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-accent">4</div>
                  <div className="text-xs text-muted-foreground">Badges</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Reputation</span>
                  <span className="text-sm font-medium">432</span>
                </div>
                <div className="w-full bg-card/30 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 bg-card/50 rounded-lg text-sm text-accent hover:bg-card/70 transition-colors">
                View Full Profile
              </button>
            </div>
            
            <div className="glass-card rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-4">Top Contributors</h2>
              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 w-8 h-8 flex items-center justify-center">
                        {index === 0 && (
                          <div className="text-amber-400">
                            <Award size={24} />
                          </div>
                        )}
                        {index === 1 && (
                          <div className="text-gray-400">
                            <Award size={24} />
                          </div>
                        )}
                        {index === 2 && (
                          <div className="text-amber-700">
                            <Award size={24} />
                          </div>
                        )}
                        {index > 2 && (
                          <span className="text-muted-foreground font-medium">
                            #{index + 1}
                          </span>
                        )}
                      </div>
                      
                      <div>
                        <div className="font-medium">{contributor.username}</div>
                        <div className="text-xs text-muted-foreground">
                          {contributor.specialty}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm">Lvl {contributor.level}</div>
                      <div className="text-xs text-muted-foreground">
                        {contributor.contributions} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-4">Community Guidelines</h2>
              <div className="space-y-3 text-sm">
                <div className="flex">
                  <Zap className="text-accent mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <p>Share knowledge and help others grow their trading skills.</p>
                </div>
                <div className="flex">
                  <Flag className="text-accent mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <p>Keep discussions civil and constructive, even during disagreements.</p>
                </div>
                <div className="flex">
                  <ArrowUp className="text-accent mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <p>Upvote quality content that adds value to the community.</p>
                </div>
                <div className="flex">
                  <MessagesSquare className="text-accent mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <p>Provide thoughtful analysis backed by research when possible.</p>
                </div>
              </div>
              <button className="w-full mt-4 px-3 py-1 text-accent text-xs hover:underline">
                View Full Guidelines
              </button>
            </div>
          </div>
        </div>
      </main>
      <AIAssistantButton />
    </div>
  );
};

export default CommunityPage;