import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Check, TrendingUp, Users, DollarSign, Activity, Wallet } from "lucide-react";
import { useState, useEffect } from "react";

// todo: remove mock functionality
const tokenData = {
  contractAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  totalSupply: "1,000,000,000",
  circulatingSupply: "850,000,000",
  burned: "50,000,000",
  price: 0.0024,
  marketCap: 2400000,
  holders: 24582,
  volume24h: 142000,
};

function AnimatedCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, target);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    if (num < 1) return num.toFixed(4);
    return num.toLocaleString();
  };

  return (
    <span className="font-mono font-bold text-foreground">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

export default function Token() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(tokenData.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="py-12 md:py-20 bg-ark-cream min-h-screen" data-testid="token-page">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-ark-orange to-ark-magenta bg-clip-text text-transparent">
              $ACT
            </span>{" "}
            Token
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The heart of the ARK ecosystem. Hold, trade, and earn while making a difference.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: TrendingUp, label: "Price", value: tokenData.price, prefix: "$" },
            { icon: DollarSign, label: "Market Cap", value: tokenData.marketCap, prefix: "$" },
            { icon: Users, label: "Holders", value: tokenData.holders },
            { icon: Activity, label: "24h Volume", value: tokenData.volume24h, prefix: "$" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-5 text-center" data-testid={`token-stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
                <stat.icon className="w-6 h-6 text-ark-orange mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl">
                  <AnimatedCounter target={stat.value} prefix={stat.prefix} />
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Contract Details</h2>
              
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">Contract Address (BSC)</label>
                <div className="flex items-center gap-2 p-4 bg-ark-cream rounded-lg">
                  <code className="flex-1 font-mono text-sm text-foreground break-all">
                    {tokenData.contractAddress}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyAddress}
                    className="flex-shrink-0"
                    data-testid="button-copy-contract"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-ark-cream/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Supply</p>
                  <p className="font-mono font-semibold">{tokenData.totalSupply}</p>
                </div>
                <div className="p-4 bg-ark-cream/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Circulating</p>
                  <p className="font-mono font-semibold">{tokenData.circulatingSupply}</p>
                </div>
                <div className="p-4 bg-ark-cream/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Burned</p>
                  <p className="font-mono font-semibold">{tokenData.burned}</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-4">Tokenomics</h3>
              <div className="space-y-4">
                {[
                  { label: "Treasury (Missions)", percent: 5, color: "bg-ark-orange" },
                  { label: "Liquidity Pool", percent: 10, color: "bg-ark-magenta" },
                  { label: "Holder Reflections", percent: 3, color: "bg-gradient-to-r from-ark-orange to-ark-magenta" },
                  { label: "Burn", percent: 2, color: "bg-gray-400" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">{item.percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.percent * 5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <Button className="flex-1 bg-ark-orange hover:bg-ark-orange/90" data-testid="button-buy-pancake">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buy on PancakeSwap
                </Button>
                <Button variant="outline" className="border-ark-orange text-ark-orange hover:bg-ark-orange/10" data-testid="button-view-dextools">
                  View on DexTools
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6 md:p-8 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ark-orange to-ark-magenta flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Buy $ACT</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect your wallet to purchase
                </p>
              </div>

              <Button
                className="w-full bg-ark-orange hover:bg-ark-orange/90 mb-4"
                data-testid="button-connect-wallet"
              >
                Connect Wallet
              </Button>

              <div className="p-4 bg-gradient-to-br from-ark-orange/10 to-ark-magenta/10 rounded-xl">
                <h4 className="font-semibold text-foreground mb-3">Holder Benefits</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ark-orange" />
                    3% reflections on transactions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ark-orange" />
                    Governance voting rights
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ark-orange" />
                    Exclusive community access
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ark-orange" />
                    Direct social impact
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
