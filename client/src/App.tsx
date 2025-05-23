import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "./providers/UserProvider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import LearnPage from "@/pages/LearnPage";
import TradeAnalysisPage from "@/pages/TradeAnalysisPage";
import CommunityPage from "@/pages/CommunityPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/learn" component={LearnPage} />
      <Route path="/trade-analysis" component={TradeAnalysisPage} />
      <Route path="/community" component={CommunityPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <Toaster />
          <Router />
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
