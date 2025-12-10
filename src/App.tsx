import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/ark/Navbar";
import TokenStatsBar from "@/components/ark/TokenStatsBar";
import Footer from "@/components/ark/Footer";
import Home from "@/pages/Home";
import Token from "@/pages/Token";
import Impact from "@/pages/Impact";
import Calendar from "@/pages/Calendar";
import About from "@/pages/About";
import Whitepaper from "@/pages/Whitepaper";
import Donate from "@/pages/Donate";
import Nominate from "@/pages/Nominate";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/token" component={Token} />
      <Route path="/impact" component={Impact} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/about" component={About} />
      <Route path="/whitepaper" component={Whitepaper} />
      <Route path="/donate" component={Donate} />
      <Route path="/nominate" component={Nominate} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [language, setLanguage] = useState("EN");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar language={language} onLanguageChange={setLanguage} />
          <TokenStatsBar />
          <div className="flex-1">
            <Router />
          </div>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
