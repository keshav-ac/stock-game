import { pgTable, text, serial, integer, boolean, timestamp, json, real, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").notNull(),
  xp: integer("xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  completedTasks: integer("completed_tasks").notNull().default(0),
  totalTasks: integer("total_tasks").notNull().default(5),
  investmentStyle: text("investment_style"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  email: true,
});

// Learning Progress
export const learningProgress = pgTable("learning_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  currentQuestName: text("current_quest_name").notNull(),
  currentQuestProgress: integer("current_quest_progress").notNull().default(0),
  completedLessons: integer("completed_lessons").notNull().default(0),
  totalLessons: integer("total_lessons").notNull().default(20),
  upcomingQuests: json("upcoming_quests").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertLearningProgressSchema = createInsertSchema(learningProgress).pick({
  userId: true,
  currentQuestName: true,
  currentQuestProgress: true,
  completedLessons: true,
  totalLessons: true,
  upcomingQuests: true,
});

// Investment Styles
export const investmentStyles = pgTable("investment_styles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  styleName: text("style_name").notNull(),
  styleDescription: text("style_description").notNull(),
  timeHorizon: text("time_horizon").notNull(),
  riskTolerance: text("risk_tolerance").notNull(),
  recommendedSectors: json("recommended_sectors").notNull(),
  radarData: json("radar_data").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertInvestmentStyleSchema = createInsertSchema(investmentStyles).pick({
  userId: true,
  styleName: true,
  styleDescription: true,
  timeHorizon: true,
  riskTolerance: true,
  recommendedSectors: true,
  radarData: true,
});

// Alerts
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  symbol: text("symbol").notNull(),
  type: text("type").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAlertSchema = createInsertSchema(alerts).pick({
  userId: true,
  symbol: true,
  type: true,
  message: true,
});

// Simulation History
export const simulationHistory = pgTable("simulation_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  symbol: text("symbol").notNull(),
  investmentDate: date("investment_date").notNull(),
  amount: real("amount").notNull(),
  currentValue: real("current_value").notNull(),
  totalReturn: real("total_return").notNull(),
  annualizedReturn: real("annualized_return").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSimulationHistorySchema = createInsertSchema(simulationHistory).pick({
  userId: true,
  symbol: true,
  investmentDate: true,
  amount: true,
  currentValue: true,
  totalReturn: true,
  annualizedReturn: true,
});

// Stock Watchlist
export const watchlistItems = pgTable("watchlist_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  symbol: text("symbol").notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export const insertWatchlistItemSchema = createInsertSchema(watchlistItems).pick({
  userId: true,
  symbol: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLearningProgress = z.infer<typeof insertLearningProgressSchema>;
export type LearningProgress = typeof learningProgress.$inferSelect;

export type InsertInvestmentStyle = z.infer<typeof insertInvestmentStyleSchema>;
export type InvestmentStyle = typeof investmentStyles.$inferSelect;

export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;

export type InsertSimulationHistory = z.infer<typeof insertSimulationHistorySchema>;
export type SimulationHistory = typeof simulationHistory.$inferSelect;

export type InsertWatchlistItem = z.infer<typeof insertWatchlistItemSchema>;
export type WatchlistItem = typeof watchlistItems.$inferSelect;
