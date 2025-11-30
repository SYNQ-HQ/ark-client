import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Check } from "lucide-react";

// todo: remove mock functionality
const tokenData = {
  contractAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  totalSupply: "1,000,000,000",
  circulatingSupply: "850,000,000",
  burned: "50,000,000",
  treasuryAllocation: "5%",
  liquidityPool: "10%",
  reflections: "3%",
};

const stats = [
  { label: "Total Supply", value: tokenData.totalSupply, suffix: " $ACT" },
  { label: "Circulating", value: tokenData.circulatingSupply, suffix: " $ACT" },
  { label: "Burned", value: tokenData.burned, suffix: " $ACT" },
  { label: "Reflections", value: tokenData.reflections, suffix: " per tx" },
];

export default function TokenStats() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(tokenData.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-white" data-testid="token-stats-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Token Utility & Stats
          </h2>
          <p className="text-lg text-muted-foreground">
            $ACT is the heart of the ARK ecosystem. Hold, trade, and earn while making a difference.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 md:p-8 h-full" data-testid="card-contract">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contract Address (BSC)</h3>
              <div className="flex items-center gap-2 p-4 bg-ark-cream rounded-lg mb-6">
                <code className="flex-1 font-mono text-sm text-foreground break-all">
                  {tokenData.contractAddress}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyAddress}
                  className="flex-shrink-0"
                  data-testid="button-copy-address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-4 bg-ark-cream/50 rounded-lg" data-testid={`stat-${stat.label.toLowerCase()}`}>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="font-mono font-semibold text-foreground">
                      {stat.value}
                      <span className="text-xs text-muted-foreground">{stat.suffix}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Button className="flex-1 bg-ark-orange hover:bg-ark-orange/90" data-testid="button-buy-token">
                  Buy $ACT
                </Button>
                <Button variant="outline" className="border-ark-orange text-ark-orange hover:bg-ark-orange/10" data-testid="button-view-chart">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Chart
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 md:p-8 h-full" data-testid="card-tokenomics">
              <h3 className="text-lg font-semibold text-foreground mb-6">Tokenomics</h3>
              
              <div className="space-y-4">
                {[
                  { label: "Treasury (Missions)", percent: 5, color: "bg-ark-orange" },
                  { label: "Liquidity Pool", percent: 10, color: "bg-ark-magenta" },
                  { label: "Holder Reflections", percent: 3, color: "bg-gradient-to-r from-ark-orange to-ark-magenta" },
                  { label: "Burn", percent: 2, color: "bg-gray-400" },
                ].map((item) => (
                  <div key={item.label} data-testid={`tokenomics-${item.label.toLowerCase().replace(' ', '-')}`}>
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

              <div className="mt-8 p-4 bg-gradient-to-br from-ark-orange/10 to-ark-magenta/10 rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">Why Hold $ACT?</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ark-orange" />
                    Earn passive reflections on every transaction
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ark-orange" />
                    Vote on community missions and proposals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ark-orange" />
                    Access exclusive holder events and rewards
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ark-orange" />
                    Direct impact on global social causes
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
