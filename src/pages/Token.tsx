import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Copy,
  ExternalLink,
  Check,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Wallet,
} from "lucide-react";
import { useState, useEffect } from "react";
import useHolderCount from "@/hooks/useHolderCount";
import PancakeSwapButtonProvider from "@/components/ark/PancakeSwapButtonProvider";
import DexScreenerUrlProvider from "@/components/ark/DexScreenerUrlProvider";
import { tokenDistributionData } from "@/components/ark/TokenStats";

const DEX_API_URL =
  "https://api.dexscreener.com/latest/dex/tokens/0x345f6423cef697926c23dc010eb1b96f8268bcec";
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const CONTRACT_ADDRESS_FAKE = import.meta.env.VITE_CONTRACT_ADDRESS_FAKE;

const DEFAULT_DATA = {
  contractAddress: CONTRACT_ADDRESS,
  totalSupply: "500,000,000,000",
  circulatingSupply: "850,000,000",
  burned: "50,000,000",
  price: 0,
  marketCap: 0,
  holders: 0,
  volume24h: 0,
};

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  label = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label?: string;
}) {
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
    // For very small numbers (crypto prices)
    if (num < 1 && num > 0) {
      // Count leading zeros after decimal point
      const str = num.toFixed(20); // Get high precision
      const match = str.match(/^0\.0*[1-9]/); // Find first non-zero digit
      if (match) {
        const leadingZeros = match[0].split("0").length - 2;
        // Show at least 2 significant digits after leading zeros
        return num.toFixed(Math.max(leadingZeros + 2, 8));
      }
      return num.toFixed(8);
    }
    if (num === 0) return "0";
    return num.toLocaleString();
  };

  const formatTokenPrice = (price: number): string => {
    if (price >= 0.01) {
      return price.toFixed(2);
    }
    if (price === 0) {
      return "0.00";
    }
    const priceStr = price.toExponential();
    const [coefficient, exponent] = priceStr.split("e");
    const exp = Math.abs(parseInt(exponent));
    const decimalStr = price.toFixed(exp + 2);
    const match = decimalStr.match(/^0\.0+/);
    if (!match) {
      return price.toFixed(2);
    }
    const leadingZeros = match[0].length - 2;
    const significantDigits = decimalStr.replace(/^0\.0+/, "").slice(0, 4);
    const subscriptMap: { [key: string]: string } = {
      "0": "₀",
      "1": "₁",
      "2": "₂",
      "3": "₃",
      "4": "₄",
      "5": "₅",
      "6": "₆",
      "7": "₇",
      "8": "₈",
      "9": "₉",
    };
    const subscript = leadingZeros
      .toString()
      .split("")
      .map((d) => subscriptMap[d])
      .join("");
    return `0.0${subscript}${significantDigits}`;
  };

  const formattedValue =
    label === "price" ? formatTokenPrice(count) : formatNumber(count);

  return (
    <span className="font-mono font-bold text-foreground">
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

export default function Token() {
  const [copied, setCopied] = useState(false);
  const [tokenData, setTokenData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const {
    count,
    refetch,
    loading: HolderCountLoading,
  } = useHolderCount(CONTRACT_ADDRESS);

  // Fetch token data from DexScreener
  const fetchTokenData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(DEX_API_URL);
      if (!response.ok) throw new Error("Failed to fetch token data");

      const data = await response.json();

      if (data.pairs && data.pairs.length > 0) {
        const pair = data.pairs[0];

        setTokenData({
          contractAddress: CONTRACT_ADDRESS_FAKE,
          totalSupply: "500,000,000,000",
          circulatingSupply: "850,000,000",
          burned: "50,000,000",
          price: parseFloat(pair.priceUsd) || 0,
          marketCap: pair.marketCap || pair.fdv || 0,
          holders: await refetch(),
          volume24h: pair.volume?.h24 || 0,
        });

        setLastUpdated(new Date());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Error fetching token data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchTokenData();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTokenData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(tokenData.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      className="py-12 md:py-20 bg-gradient-to-b from-orange-50 to-white min-h-screen"
      data-testid="token-page"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
              $ACT
            </span>{" "}
            Token
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The heart of the ARK ecosystem. Hold, trade, and earn while making a
            difference.
          </p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
              {loading && (
                <span className="ml-2 animate-pulse">🔄 Updating...</span>
              )}
            </p>
          )}
          {error && (
            <p className="text-sm text-red-500 mt-2">
              ⚠️ Failed to fetch live data: {error}
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: TrendingUp,
              label: "Price",
              value: tokenData.price,
              prefix: "$",
            },
            {
              icon: DollarSign,
              label: "Market Cap",
              value: tokenData.marketCap,
              prefix: "$",
            },
            { icon: Users, label: "Holders", value: tokenData.holders },
            {
              icon: Activity,
              label: "24h Volume",
              value: tokenData.volume24h,
              prefix: "$",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="p-5 text-center hover:shadow-lg transition-shadow"
                data-testid={`token-stat-${stat.label.toLowerCase().replace(" ", "-")}`}
              >
                <stat.icon className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl">
                  <AnimatedCounter
                    label={stat.label.toLowerCase()}
                    target={stat.value}
                    prefix={stat.prefix}
                  />
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
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Contract Details
              </h2>

              <div className="mb-6">
                <label className="text-sm text-gray-600 mb-2 block">
                  Contract Address (BSC)
                </label>
                <div className="flex items-center gap-2 p-4 bg-orange-50 rounded-lg">
                  <code className="flex-1 font-mono text-sm text-gray-900 break-all">
                    {tokenData.contractAddress}
                  </code>
                  {/*<Button
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
                  </Button>*/}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Supply</p>
                  <p className="font-mono font-semibold">
                    {tokenData.totalSupply}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Circulating</p>
                  <p className="font-mono font-semibold">
                    {tokenData.circulatingSupply}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Burned</p>
                  <p className="font-mono font-semibold">{tokenData.burned}</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tokenomics
              </h3>
              <div className="space-y-4">
                {tokenDistributionData.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-semibold text-gray-900">
                        {item.percent}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <PancakeSwapButtonProvider>
                  <Button
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                    data-testid="button-buy-pancake"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Buy on PancakeSwap
                  </Button>
                </PancakeSwapButtonProvider>
                <DexScreenerUrlProvider>
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50"
                    data-testid="button-view-dextools"
                  >
                    View on DexScreener
                  </Button>
                </DexScreenerUrlProvider>
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Buy $ACT</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Connect your wallet to purchase
                </p>
              </div>

              <PancakeSwapButtonProvider>
                <Button
                  className="flex-1 w-full bg-orange-500 hover:bg-orange-600 mb-4"
                  data-testid="button-buy-pancake"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buy on PancakeSwap
                </Button>
              </PancakeSwapButtonProvider>

              <div className="p-4 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Holder Benefits
                </h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    Direct access to every project, mission and applications in
                    the ARK ecosystem
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    3% reflections on transactions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    Governance voting rights
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    Exclusive community access
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
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
