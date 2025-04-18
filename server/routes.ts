import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { stockService } from "./services/stockService";
import { newsService } from "./services/newsService";
import { sentimentService } from "./services/sentimentService";
import { insertAlertSchema, insertUserSchema, insertInvestmentStyleSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User Routes
  app.get("/api/user/current", async (req: Request, res: Response) => {
    try {
      // For demo purposes, return a mock user
      // In a real app, this would use authentication and session
      const user = await storage.getMockUser();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  });

  app.post("/api/user/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Error creating user" });
      }
    }
  });

  // Learning Routes
  app.get("/api/learning/progress", async (req: Request, res: Response) => {
    try {
      const progress = await storage.getLearningProgress(1); // Mock user ID
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Error fetching learning progress" });
    }
  });

  // Investment Style Routes
  app.get("/api/user/investment-style", async (req: Request, res: Response) => {
    try {
      const style = await storage.getInvestmentStyle(1); // Mock user ID
      res.json(style);
    } catch (error) {
      res.status(500).json({ message: "Error fetching investment style" });
    }
  });

  app.post("/api/user/investment-style", async (req: Request, res: Response) => {
    try {
      const styleData = insertInvestmentStyleSchema.parse(req.body);
      const style = await storage.updateInvestmentStyle(styleData);
      res.json(style);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid style data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Error updating investment style" });
      }
    }
  });

  // Alert Routes
  app.get("/api/alerts", async (req: Request, res: Response) => {
    try {
      const alerts = await storage.getAlerts(1); // Mock user ID
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching alerts" });
    }
  });

  app.post("/api/alerts", async (req: Request, res: Response) => {
    try {
      const alertData = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(alertData);
      res.json(alert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid alert data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Error creating alert" });
      }
    }
  });

  // Stock Data Routes
  app.get("/api/stock/:symbol", async (req: Request, res: Response) => {
    try {
      const { symbol } = req.params;
      const stockData = await stockService.getStockData(symbol);
      res.json(stockData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching stock data" });
    }
  });

  // Sentiment Analysis Routes
  app.get("/api/stock/:symbol/sentiment", async (req: Request, res: Response) => {
    try {
      const { symbol } = req.params;
      const sentiment = await sentimentService.getSentiment(symbol);
      res.json(sentiment);
    } catch (error) {
      res.status(500).json({ message: "Error fetching sentiment data" });
    }
  });

  // News Analysis Routes
  app.get("/api/news/analysis", async (req: Request, res: Response) => {
    try {
      const filter = req.query.filter as string || 'all';
      const news = await newsService.getNewsWithAnalysis(filter);
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Error fetching news analysis" });
    }
  });

  // Market Overview Routes
  app.get("/api/market/overview", async (req: Request, res: Response) => {
    try {
      const overview = await stockService.getMarketOverview();
      res.json(overview);
    } catch (error) {
      res.status(500).json({ message: "Error fetching market overview" });
    }
  });

  // Sector Heatmap Routes
  app.get("/api/market/sectors", async (req: Request, res: Response) => {
    try {
      const timeframe = req.query.timeframe as string || '1w';
      const sectors = await stockService.getSectorPerformance(timeframe);
      res.json(sectors);
    } catch (error) {
      res.status(500).json({ message: "Error fetching sector data" });
    }
  });

  // AI Insights Routes
  app.get("/api/insights", async (req: Request, res: Response) => {
    try {
      const period = req.query.period as string || 'monthly';
      const insights = await stockService.getAIInsights(period);
      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: "Error fetching AI insights" });
    }
  });

  // Investment Simulator Routes
  app.post("/api/simulator/calculate", async (req: Request, res: Response) => {
    try {
      const { symbol, date, amount } = req.body;
      const simulationResult = await stockService.calculateInvestmentReturns(symbol, date, amount);
      res.json(simulationResult);
    } catch (error) {
      res.status(500).json({ message: "Error running investment simulator" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
