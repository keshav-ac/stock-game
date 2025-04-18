import { 
  users, type User, type InsertUser,
  alerts, type Alert, type InsertAlert,
  learningProgress, type LearningProgress, type InsertLearningProgress,
  investmentStyles, type InvestmentStyle, type InsertInvestmentStyle,
  simulationHistory, type SimulationHistory, type InsertSimulationHistory,
  watchlistItems, type WatchlistItem, type InsertWatchlistItem
} from "@shared/schema";

export interface IStorage {
  // User Methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getMockUser(): Promise<User>;
  
  // Learning Progress Methods
  getLearningProgress(userId: number): Promise<LearningProgress | undefined>;
  updateLearningProgress(progress: InsertLearningProgress): Promise<LearningProgress>;
  
  // Investment Style Methods
  getInvestmentStyle(userId: number): Promise<InvestmentStyle | undefined>;
  updateInvestmentStyle(style: InsertInvestmentStyle): Promise<InvestmentStyle>;
  
  // Alert Methods
  getAlerts(userId: number): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  markAlertAsRead(alertId: number): Promise<Alert | undefined>;
  
  // Simulation History Methods
  getSimulationHistory(userId: number): Promise<SimulationHistory[]>;
  saveSimulation(simulation: InsertSimulationHistory): Promise<SimulationHistory>;
  
  // Watchlist Methods
  getWatchlistItems(userId: number): Promise<WatchlistItem[]>;
  addToWatchlist(item: InsertWatchlistItem): Promise<WatchlistItem>;
  removeFromWatchlist(userId: number, symbol: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private learningProgressMap: Map<number, LearningProgress>;
  private investmentStylesMap: Map<number, InvestmentStyle>;
  private alertsMap: Map<number, Alert[]>;
  private simulationHistoryMap: Map<number, SimulationHistory[]>;
  private watchlistMap: Map<number, WatchlistItem[]>;
  
  private userIdCounter: number;
  private learningProgressIdCounter: number;
  private investmentStyleIdCounter: number;
  private alertIdCounter: number;
  private simulationIdCounter: number;
  private watchlistIdCounter: number;

  constructor() {
    this.users = new Map();
    this.learningProgressMap = new Map();
    this.investmentStylesMap = new Map();
    this.alertsMap = new Map();
    this.simulationHistoryMap = new Map();
    this.watchlistMap = new Map();
    
    this.userIdCounter = 1;
    this.learningProgressIdCounter = 1;
    this.investmentStyleIdCounter = 1;
    this.alertIdCounter = 1;
    this.simulationIdCounter = 1;
    this.watchlistIdCounter = 1;
    
    // Initialize with a mock user for demo purposes
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Create a mock user
    const mockUser: User = {
      id: 1,
      username: "johnsmith",
      password: "hashed_password",
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      xp: 1450,
      level: 6,
      completedTasks: 3,
      totalTasks: 5,
      investmentStyle: "Growth Investor",
      createdAt: new Date().toISOString()
    };
    this.users.set(mockUser.id, mockUser);
    
    // Create mock learning progress
    const mockProgress: LearningProgress = {
      id: 1,
      userId: 1,
      currentQuestName: "Technical Analysis Fundamentals",
      currentQuestProgress: 65,
      completedLessons: 13,
      totalLessons: 20,
      upcomingQuests: [
        { name: "Risk Management Strategies", status: "next" },
        { name: "Advanced Candlestick Patterns", status: "future" },
        { name: "Fundamental Analysis Deep Dive", status: "future" }
      ],
      updatedAt: new Date().toISOString()
    };
    this.learningProgressMap.set(mockUser.id, mockProgress);
    
    // Create mock investment style
    const mockStyle: InvestmentStyle = {
      id: 1,
      userId: 1,
      styleName: "Growth Investor",
      styleDescription: "You focus on companies with high growth potential, even at higher valuations.",
      timeHorizon: "Medium-Long Term",
      riskTolerance: "Moderate-High",
      recommendedSectors: ["Technology", "Healthcare", "Clean Energy"],
      radarData: {
        labels: ["Growth", "Value", "Risk", "Timing", "Research"],
        values: [85, 45, 65, 50, 70]
      },
      updatedAt: new Date().toISOString()
    };
    this.investmentStylesMap.set(mockUser.id, mockStyle);
    
    // Create mock alerts
    const mockAlerts: Alert[] = [
      {
        id: 1,
        userId: 1,
        symbol: "TSLA",
        type: "price_drop",
        message: "Drop of 5.2% below your threshold of 4%",
        isRead: false,
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        userId: 1,
        symbol: "AAPL",
        type: "sentiment_shift",
        message: "Positive sentiment increase from 65% to 78%",
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        userId: 1,
        symbol: "Tech Sector",
        type: "news_impact",
        message: "Major policy announcement affecting semiconductor stocks",
        isRead: false,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
      }
    ];
    this.alertsMap.set(mockUser.id, mockAlerts);
    this.alertIdCounter = 4;
  }

  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date().toISOString();
    
    const user: User = {
      id,
      ...userData,
      xp: 0,
      level: 1,
      completedTasks: 0,
      totalTasks: 5,
      createdAt: now
    };
    
    this.users.set(id, user);
    return user;
  }

  async getMockUser(): Promise<User> {
    return this.users.get(1) as User;
  }

  // Learning Progress Methods
  async getLearningProgress(userId: number): Promise<LearningProgress | undefined> {
    return this.learningProgressMap.get(userId);
  }

  async updateLearningProgress(progressData: InsertLearningProgress): Promise<LearningProgress> {
    const id = this.learningProgressIdCounter++;
    const now = new Date().toISOString();
    
    const progress: LearningProgress = {
      id,
      ...progressData,
      updatedAt: now
    };
    
    this.learningProgressMap.set(progressData.userId, progress);
    return progress;
  }

  // Investment Style Methods
  async getInvestmentStyle(userId: number): Promise<InvestmentStyle | undefined> {
    return this.investmentStylesMap.get(userId);
  }

  async updateInvestmentStyle(styleData: InsertInvestmentStyle): Promise<InvestmentStyle> {
    const id = this.investmentStyleIdCounter++;
    const now = new Date().toISOString();
    
    const style: InvestmentStyle = {
      id,
      ...styleData,
      updatedAt: now
    };
    
    this.investmentStylesMap.set(styleData.userId, style);
    
    // Also update the user's investment style field
    const user = this.users.get(styleData.userId);
    if (user) {
      user.investmentStyle = styleData.styleName;
      this.users.set(styleData.userId, user);
    }
    
    return style;
  }

  // Alert Methods
  async getAlerts(userId: number): Promise<Alert[]> {
    return this.alertsMap.get(userId) || [];
  }

  async createAlert(alertData: InsertAlert): Promise<Alert> {
    const id = this.alertIdCounter++;
    const now = new Date().toISOString();
    
    const alert: Alert = {
      id,
      ...alertData,
      isRead: false,
      createdAt: now
    };
    
    const userAlerts = this.alertsMap.get(alertData.userId) || [];
    userAlerts.push(alert);
    this.alertsMap.set(alertData.userId, userAlerts);
    
    return alert;
  }

  async markAlertAsRead(alertId: number): Promise<Alert | undefined> {
    for (const [userId, alerts] of this.alertsMap.entries()) {
      const alertIndex = alerts.findIndex(a => a.id === alertId);
      if (alertIndex !== -1) {
        alerts[alertIndex].isRead = true;
        this.alertsMap.set(userId, alerts);
        return alerts[alertIndex];
      }
    }
    return undefined;
  }

  // Simulation History Methods
  async getSimulationHistory(userId: number): Promise<SimulationHistory[]> {
    return this.simulationHistoryMap.get(userId) || [];
  }

  async saveSimulation(simulationData: InsertSimulationHistory): Promise<SimulationHistory> {
    const id = this.simulationIdCounter++;
    const now = new Date().toISOString();
    
    const simulation: SimulationHistory = {
      id,
      ...simulationData,
      createdAt: now
    };
    
    const userSimulations = this.simulationHistoryMap.get(simulationData.userId) || [];
    userSimulations.push(simulation);
    this.simulationHistoryMap.set(simulationData.userId, userSimulations);
    
    return simulation;
  }

  // Watchlist Methods
  async getWatchlistItems(userId: number): Promise<WatchlistItem[]> {
    return this.watchlistMap.get(userId) || [];
  }

  async addToWatchlist(itemData: InsertWatchlistItem): Promise<WatchlistItem> {
    const id = this.watchlistIdCounter++;
    const now = new Date().toISOString();
    
    const item: WatchlistItem = {
      id,
      ...itemData,
      addedAt: now
    };
    
    const userWatchlist = this.watchlistMap.get(itemData.userId) || [];
    userWatchlist.push(item);
    this.watchlistMap.set(itemData.userId, userWatchlist);
    
    return item;
  }

  async removeFromWatchlist(userId: number, symbol: string): Promise<void> {
    const userWatchlist = this.watchlistMap.get(userId) || [];
    const filteredWatchlist = userWatchlist.filter(item => item.symbol !== symbol);
    this.watchlistMap.set(userId, filteredWatchlist);
  }
}

export const storage = new MemStorage();
