import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, DollarSign, Activity, Flame } from "lucide-react";
import { easing, transitions } from "@/lib/motion";
import useHolderCount from "@/hooks/useHolderCount";

const DEX_API_URL =
  "https://api.dexscreener.com/latest/dex/tokens/0x345f6423cef697926c23dc010eb1b96f8268bcec";
// const CONTRACT_ADDRESS = "0x345F6423cEf697926C23dC010Eb1B96f8268bcec";
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const CONTRACT_ADDRESS_FAKE = import.meta.env.CONTRACT_ADDRESS_FAKE;

interface StatItem {
  label: string;
  value: string;
  numericValue: number;
  icon: typeof TrendingUp;
  prefix?: string;
  suffix?: string;
  trend?: "up" | "down";
  trendValue?: number;
}

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  label = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, value);
      setDisplayValue(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, isInView]);

  const formatNumber = (num: number) => {
    if (num === 0) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    if (num >= 1) return num.toFixed(2);
    if (num >= 0.01) return num.toFixed(4);
    if (num >= 0.000001) return num.toFixed(8);
    if (num > 0) return num.toExponential(2);
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
    label === "price"
      ? formatTokenPrice(displayValue)
      : formatNumber(displayValue);

  return (
    <span ref={ref} className="font-mono font-bold text-foreground">
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

export default function TokenStatsBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState<StatItem[]>([
    {
      label: "Price",
      value: "$0",
      numericValue: 0,
      icon: TrendingUp,
      prefix: "$",
      trend: "up",
      trendValue: 0,
    },
    {
      label: "Market Cap",
      value: "$0",
      numericValue: 0,
      icon: DollarSign,
      prefix: "$",
      trend: "up",
      trendValue: 0,
    },
    {
      label: "24h Volume",
      value: "$0",
      numericValue: 0,
      icon: Activity,
      prefix: "$",
    },
    { label: "Holders", value: "0", numericValue: 0, icon: Users, trend: "up" },
  ]);
  const [loading, setLoading] = useState(true);
  const {
    count,
    refetch,
    loading: HolderCountLoading,
  } = useHolderCount(CONTRACT_ADDRESS);

  // Fetch token data from DexScreener
  const fetchTokenData = async () => {
    try {
      setLoading(true);

      // Fetch price data and holder count in parallel
      const [dexResponse, holderCount] = await Promise.all([
        fetch(DEX_API_URL),
        refetch(),
      ]);

      if (!dexResponse.ok) throw new Error("Failed to fetch");

      const data = await dexResponse.json();

      if (data.pairs && data.pairs.length > 0) {
        const pair = data.pairs[0];

        setStats([
          {
            label: "Price",
            value: `$${pair.priceUsd}`,
            numericValue: parseFloat(pair.priceUsd) || 0,
            icon: TrendingUp,
            prefix: "$",
            trend: pair.priceChange?.h24 > 0 ? "up" : "down",
            trendValue: pair.priceChange?.h24 || 0,
          },
          {
            label: "Market Cap",
            value: `$${pair.marketCap || pair.fdv}`,
            numericValue: pair.marketCap || pair.fdv || 0,
            icon: DollarSign,
            prefix: "$",
            trend: "up",
            trendValue: 0,
          },
          {
            label: "24h Volume",
            value: `$${pair.volume?.h24}`,
            numericValue: pair.volume?.h24 || 0,
            icon: Activity,
            prefix: "$",
          },
          {
            label: "Holders",
            value: holderCount.toString(),
            numericValue: holderCount, // ✅ Real holder count
            icon: Users,
            trend: "up",
          },
        ]);
      }
    } catch (err) {
      console.error("Error fetching token stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    fetchTokenData();

    // Auto-refresh every 60 seconds (holder count changes less frequently)
    const interval = setInterval(fetchTokenData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-full bg-gradient-to-r from-ark-cream via-white to-ark-cream border-b border-gray-100/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
      transition={{ ...transitions.smooth, delay: 0.2 }}
      data-testid="token-stats-bar"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between py-3 overflow-x-auto gap-8 scrollbar-hidden">
          <motion.div
            className="flex items-center gap-2 min-w-fit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Flame className="w-4 h-4 text-ark-orange animate-pulse" />
            <span className="text-xs font-semibold text-ark-orange">
              {loading ? "LOADING..." : "LIVE"}
            </span>
          </motion.div>

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-2 min-w-fit group"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.08,
                ease: easing.smooth,
              }}
              data-testid={`stat-${stat.label.toLowerCase().replace(" ", "-")}`}
            >
              <stat.icon className="w-4 h-4 text-ark-orange/70 group-hover:text-ark-orange transition-colors flex-shrink-0" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {stat.label}:
              </span>

              <AnimatedNumber
                label={stat.label.toLowerCase()}
                value={stat.numericValue}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
              {stat.trend &&
                stat.trendValue !== undefined &&
                stat.trendValue !== 0 && (
                  <span
                    className={`text-[10px] font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {stat.trend === "up" ? "+" : ""}
                    {stat.trendValue.toFixed(2)}%
                  </span>
                )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
