import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, DollarSign, Activity, Flame } from "lucide-react";
import { easing, transitions } from "@/lib/motion";

interface StatItem {
  label: string;
  value: string;
  numericValue: number;
  icon: typeof TrendingUp;
  prefix?: string;
  suffix?: string;
  trend?: "up" | "down";
}

const mockStats: StatItem[] = [
  { label: "Holders", value: "24,582", numericValue: 24582, icon: Users, trend: "up" },
  { label: "Market Cap", value: "$2.4M", numericValue: 2400000, icon: DollarSign, prefix: "$", trend: "up" },
  { label: "24h Volume", value: "$142K", numericValue: 142000, icon: Activity, prefix: "$" },
  { label: "Price", value: "$0.0024", numericValue: 0.0024, icon: TrendingUp, prefix: "$", trend: "up" },
];

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
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
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    if (num < 1) return num.toFixed(4);
    return num.toLocaleString();
  };

  return (
    <span ref={ref} className="font-mono font-bold text-foreground">
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
}

export default function TokenStatsBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
            <span className="text-xs font-semibold text-ark-orange">LIVE</span>
          </motion.div>
          
          {mockStats.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="flex items-center gap-2 min-w-fit group"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.08, ease: easing.smooth }}
              data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}
            >
              <stat.icon className="w-4 h-4 text-ark-orange/70 group-hover:text-ark-orange transition-colors flex-shrink-0" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">{stat.label}:</span>
              <AnimatedNumber value={stat.numericValue} prefix={stat.prefix} suffix={stat.suffix} />
              {stat.trend === "up" && (
                <span className="text-[10px] text-green-500 font-medium">+2.4%</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
