import { useEffect, useState } from "react";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  numericValue: number;
  icon: typeof TrendingUp;
  prefix?: string;
  suffix?: string;
}

// todo: remove mock functionality
const mockStats: StatItem[] = [
  { label: "Holders", value: "24,582", numericValue: 24582, icon: Users },
  { label: "Market Cap", value: "$2.4M", numericValue: 2400000, icon: DollarSign, prefix: "$" },
  { label: "24h Volume", value: "$142K", numericValue: 142000, icon: Activity, prefix: "$" },
  { label: "Price", value: "$0.0024", numericValue: 0.0024, icon: TrendingUp, prefix: "$" },
];

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
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
  }, [value]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    if (num < 1) return num.toFixed(4);
    return num.toLocaleString();
  };

  return (
    <span className="font-mono font-semibold text-foreground">
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
}

export default function TokenStatsBar() {
  return (
    <div className="w-full bg-ark-cream border-b border-gray-100" data-testid="token-stats-bar">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-3 overflow-x-auto gap-6">
          {mockStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 min-w-fit" data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
              <stat.icon className="w-4 h-4 text-ark-orange flex-shrink-0" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">{stat.label}:</span>
              <AnimatedNumber value={stat.numericValue} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
