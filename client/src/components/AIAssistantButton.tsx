import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const AIAssistantButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 glass-card rounded-xl overflow-hidden shadow-lg flex flex-col mb-2">
          <div className="flex items-center justify-between bg-accent p-3">
            <h3 className="text-white font-medium">TradeCraft Assistant</h3>
            <button 
              onClick={toggleChat}
              className="text-white hover:bg-accent/80 rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto bg-background/80">
            <div className="space-y-2">
              <div className="bg-card/50 rounded-lg p-2 max-w-[80%]">
                <p className="text-sm">
                  Hello! I'm your TradeCraft AI Assistant. How can I help you today?
                </p>
              </div>
              <div className="bg-card/50 rounded-lg p-2 max-w-[80%]">
                <p className="text-sm">
                  You can ask me about stocks, technical analysis, or trading strategies.
                </p>
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-accent/20 bg-background/80">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask something..." 
                className="w-full bg-card/30 border border-accent/30 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-accent pr-10"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-accent shadow-glow flex items-center justify-center glow-btn"
      >
        <MessageSquare className="text-white" size={24} />
      </button>
    </div>
  );
};

export default AIAssistantButton;
