import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useUser } from '@/providers/UserProvider';
import LearningProgressCard from '@/components/LearningProgressCard';
import AIAssistantButton from '@/components/AIAssistantButton';
import { Tab } from '@headlessui/react';
import { Book, Award, GraduationCap, HeartHandshake } from 'lucide-react';

const LearnPage: React.FC = () => {
  const { user } = useUser();
  
  const lessons = [
    {
      title: "Introduction to Stock Markets",
      category: "fundamentals",
      level: 1,
      duration: "15 min",
      xp: 25,
      completed: true
    },
    {
      title: "Understanding Market Capitalization",
      category: "fundamentals",
      level: 1,
      duration: "20 min",
      xp: 30,
      completed: true
    },
    {
      title: "Technical Analysis Basics",
      category: "technical",
      level: 2,
      duration: "25 min",
      xp: 40,
      completed: false
    },
    {
      title: "Fundamental Analysis Deep Dive",
      category: "fundamentals",
      level: 3,
      duration: "30 min",
      xp: 50,
      completed: false
    },
    {
      title: "Candlestick Patterns",
      category: "technical",
      level: 2,
      duration: "25 min",
      xp: 45,
      completed: false
    },
    {
      title: "Risk Management Strategies",
      category: "strategies",
      level: 3,
      duration: "35 min",
      xp: 60,
      completed: false
    },
    {
      title: "Long-term Investing Principles",
      category: "strategies",
      level: 4,
      duration: "30 min",
      xp: 55,
      completed: false
    },
    {
      title: "Portfolio Diversification",
      category: "strategies",
      level: 3,
      duration: "20 min",
      xp: 40,
      completed: false
    },
  ];
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fundamentals':
        return <Book className="text-blue-500" />;
      case 'technical':
        return <Award className="text-amber-500" />;
      case 'strategies':
        return <HeartHandshake className="text-green-500" />;
      default:
        return <GraduationCap className="text-accent" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">
            Learning Center
          </h1>
          <p className="text-muted-foreground">
            Master the art of investing with our comprehensive learning materials
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Progress Tracking */}
          <div className="lg:col-span-1 space-y-6">
            <LearningProgressCard />
            
            <div className="glass-card rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-4">Learning Achievements</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                      <Book className="text-accent" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Market Maven</p>
                      <p className="text-xs text-muted-foreground">Complete all market basics</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    2/5
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mr-3">
                      <Award className="text-amber-500" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Chart Wizard</p>
                      <p className="text-xs text-muted-foreground">Master 10 candlestick patterns</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    0/10
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                      <HeartHandshake className="text-green-500" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Strategy Pro</p>
                      <p className="text-xs text-muted-foreground">Create 3 diverse portfolios</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    1/3
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 text-sm text-accent hover:underline">
                View All Achievements
              </button>
            </div>
          </div>
          
          {/* Middle and Right Columns - Learning Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-xl p-5">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-lg bg-card/30 p-1 mb-6">
                  <Tab className={({ selected }: { selected: boolean }) => 
                    `w-full rounded-lg py-2 text-sm font-medium leading-5 
                    ${selected 
                      ? 'bg-accent text-white shadow' 
                      : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'
                    }`
                  }>
                    All Lessons
                  </Tab>
                  <Tab className={({ selected }: { selected: boolean }) => 
                    `w-full rounded-lg py-2 text-sm font-medium leading-5 
                    ${selected 
                      ? 'bg-accent text-white shadow' 
                      : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'
                    }`
                  }>
                    Fundamentals
                  </Tab>
                  <Tab className={({ selected }: { selected: boolean }) => 
                    `w-full rounded-lg py-2 text-sm font-medium leading-5 
                    ${selected 
                      ? 'bg-accent text-white shadow' 
                      : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'
                    }`
                  }>
                    Technical
                  </Tab>
                  <Tab className={({ selected }: { selected: boolean }) => 
                    `w-full rounded-lg py-2 text-sm font-medium leading-5 
                    ${selected 
                      ? 'bg-accent text-white shadow' 
                      : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'
                    }`
                  }>
                    Strategies
                  </Tab>
                </Tab.List>
                
                <Tab.Panels>
                  <Tab.Panel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lessons.map((lesson, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${lesson.completed ? 'border-green-500/30 bg-green-500/5' : 'border-accent/20 bg-background/60'}`}>
                          <div className="flex justify-between">
                            <div className="flex items-center mb-2">
                              {getCategoryIcon(lesson.category)}
                              <span className="text-xs text-muted-foreground ml-2 capitalize">{lesson.category}</span>
                            </div>
                            <div className="text-xs bg-card/50 px-2 py-1 rounded-full">
                              Level {lesson.level}
                            </div>
                          </div>
                          <h3 className="font-medium mb-2">{lesson.title}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span className="mr-2">{lesson.duration}</span>
                              <span>+{lesson.xp} XP</span>
                            </div>
                            <button className={`text-xs px-3 py-1 rounded-full ${lesson.completed ? 'bg-green-500/20 text-green-500' : 'bg-accent/80 text-white'}`}>
                              {lesson.completed ? 'Completed' : 'Start'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                  
                  <Tab.Panel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lessons.filter(l => l.category === 'fundamentals').map((lesson, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${lesson.completed ? 'border-green-500/30 bg-green-500/5' : 'border-accent/20 bg-background/60'}`}>
                          <div className="flex justify-between">
                            <div className="flex items-center mb-2">
                              {getCategoryIcon(lesson.category)}
                              <span className="text-xs text-muted-foreground ml-2 capitalize">{lesson.category}</span>
                            </div>
                            <div className="text-xs bg-card/50 px-2 py-1 rounded-full">
                              Level {lesson.level}
                            </div>
                          </div>
                          <h3 className="font-medium mb-2">{lesson.title}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span className="mr-2">{lesson.duration}</span>
                              <span>+{lesson.xp} XP</span>
                            </div>
                            <button className={`text-xs px-3 py-1 rounded-full ${lesson.completed ? 'bg-green-500/20 text-green-500' : 'bg-accent/80 text-white'}`}>
                              {lesson.completed ? 'Completed' : 'Start'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                  
                  <Tab.Panel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lessons.filter(l => l.category === 'technical').map((lesson, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${lesson.completed ? 'border-green-500/30 bg-green-500/5' : 'border-accent/20 bg-background/60'}`}>
                          <div className="flex justify-between">
                            <div className="flex items-center mb-2">
                              {getCategoryIcon(lesson.category)}
                              <span className="text-xs text-muted-foreground ml-2 capitalize">{lesson.category}</span>
                            </div>
                            <div className="text-xs bg-card/50 px-2 py-1 rounded-full">
                              Level {lesson.level}
                            </div>
                          </div>
                          <h3 className="font-medium mb-2">{lesson.title}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span className="mr-2">{lesson.duration}</span>
                              <span>+{lesson.xp} XP</span>
                            </div>
                            <button className={`text-xs px-3 py-1 rounded-full ${lesson.completed ? 'bg-green-500/20 text-green-500' : 'bg-accent/80 text-white'}`}>
                              {lesson.completed ? 'Completed' : 'Start'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                  
                  <Tab.Panel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lessons.filter(l => l.category === 'strategies').map((lesson, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${lesson.completed ? 'border-green-500/30 bg-green-500/5' : 'border-accent/20 bg-background/60'}`}>
                          <div className="flex justify-between">
                            <div className="flex items-center mb-2">
                              {getCategoryIcon(lesson.category)}
                              <span className="text-xs text-muted-foreground ml-2 capitalize">{lesson.category}</span>
                            </div>
                            <div className="text-xs bg-card/50 px-2 py-1 rounded-full">
                              Level {lesson.level}
                            </div>
                          </div>
                          <h3 className="font-medium mb-2">{lesson.title}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span className="mr-2">{lesson.duration}</span>
                              <span>+{lesson.xp} XP</span>
                            </div>
                            <button className={`text-xs px-3 py-1 rounded-full ${lesson.completed ? 'bg-green-500/20 text-green-500' : 'bg-accent/80 text-white'}`}>
                              {lesson.completed ? 'Completed' : 'Start'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            
            <div className="glass-card rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-4">Recommended Learning Path</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-accent/30"></div>
                
                <div className="space-y-6">
                  <div className="relative pl-10">
                    <div className="absolute left-2 top-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-xs text-white">
                      ✓
                    </div>
                    <h3 className="font-medium">Beginner: Understanding Markets</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Learn the basics of market structure, participants, and terminology.
                      Completed on Apr 10, 2025.
                    </p>
                  </div>
                  
                  <div className="relative pl-10">
                    <div className="absolute left-2 top-0 w-5 h-5 rounded-full bg-accent flex items-center justify-center text-xs text-white">
                      2
                    </div>
                    <h3 className="font-medium">Intermediate: Technical Analysis</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Master chart patterns, indicators, and price action techniques.
                      In progress - 2/5 modules completed.
                    </p>
                  </div>
                  
                  <div className="relative pl-10">
                    <div className="absolute left-2 top-0 w-5 h-5 rounded-full bg-card border border-accent/30 flex items-center justify-center text-xs text-muted-foreground">
                      3
                    </div>
                    <h3 className="font-medium text-muted-foreground">Advanced: Portfolio Construction</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Learn asset allocation, diversification strategies, and risk management.
                      Unlocks after completing Technical Analysis.
                    </p>
                  </div>
                  
                  <div className="relative pl-10">
                    <div className="absolute left-2 top-0 w-5 h-5 rounded-full bg-card border border-accent/30 flex items-center justify-center text-xs text-muted-foreground">
                      4
                    </div>
                    <h3 className="font-medium text-muted-foreground">Expert: Advanced Trading Strategies</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Master advanced concepts including options, futures, and algorithmic trading.
                      Unlocks at Level 8.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AIAssistantButton />
    </div>
  );
};

export default LearnPage;