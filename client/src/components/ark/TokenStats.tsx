import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Copy, ExternalLink, Check, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { easing } from "@/lib/motion";
import { useLocation, Link } from "wouter";
import PancakeSwapButtonProvider from "./PancakeSwapButtonProvider";

const tokenData = {
  contractAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  totalSupply: "500,000,000,000",
  circulatingSupply: "75,000,000,000",
  burned: "50,000,000",
  treasuryAllocation: "5%",
  liquidityPool: "15%",
  reflections: "5%",
};

const stats = [
  { label: "Total Supply", value: tokenData.totalSupply, suffix: " $ACT" },
  { label: "Circulating", value: tokenData.circulatingSupply, suffix: " $ACT" },
  { label: "Burned", value: tokenData.burned, suffix: " $ACT" },
  // { label: "Reflections", value: tokenData.reflections, suffix: " per tx" },
  { label: "Reflections", value: tokenData.reflections, suffix: "" },
];

function AnimatedProgress({
  percent,
  color,
  delay,
}: {
  percent: number;
  color: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setWidth(percent), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, percent, delay]);

  return (
    <div ref={ref} className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${color} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 1, ease: easing.cinematic }}
      />
    </div>
  );
}

export default function TokenStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [navigate] = useLocation();

  const copyAddress = () => {
    navigator.clipboard.writeText(tokenData.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
      data-testid="token-stats-section"
    >
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-ark-magenta/5 to-transparent blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: easing.cinematic }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: easing.overshoot }}
            className="inline-block px-4 py-1.5 rounded-full bg-ark-orange/10 text-ark-orange text-sm font-medium mb-6"
          >
            Tokenomics
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 tracking-[-0.02em]">
            <motion.span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : { y: "100%" }}
                transition={{
                  duration: 0.8,
                  ease: easing.cinematic,
                  delay: 0.1,
                }}
              >
                Token Utility & Stats
              </motion.span>
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: easing.smooth }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            $ACT is the heart of the ARK ecosystem. Hold, trade, and earn while
            making a difference.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: easing.cinematic }}
          >
            <Card
              className="p-8 md:p-10 h-full bg-white shadow-premium-lg border-0"
              data-testid="card-contract"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                Contract Address (BSC)
              </h3>
              <div className="flex items-center gap-3 pl-0 p-5 bg-ark-cream/80 rounded-xl mb-8 group">
                <code className="flex-1 font-mono self-start bg-ark-orange p-5 text-sm text-foreground rounded-xs bg-current/90 break-all">
                  {tokenData.contractAddress}
                </code>
                <motion.button
                  onClick={copyAddress}
                  className="flex-shrink-0 p-2.5 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="button-copy-address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </motion.button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="p-5 bg-gradient-to-br from-ark-cream/50 to-white rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.1,
                      ease: easing.smooth,
                    }}
                    data-testid={`stat-${stat.label.toLowerCase()}`}
                  >
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="font-mono font-bold text-foreground">
                      {stat.value}
                      <span className="text-xs font-normal text-muted-foreground">
                        {stat.suffix}
                      </span>
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4">
                <PancakeSwapButtonProvider>
                  <MagneticButton
                    className="flex-1 bg-ark-orange hover:bg-ark-orange text-white"
                    data-testid="button-buy-token"
                  >
                    Buy $ACT
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </MagneticButton>
                </PancakeSwapButtonProvider>
                <MagneticButton
                  variant="outline"
                  className="border-foreground/20 text-foreground hover:border-ark-orange hover:text-ark-orange"
                  data-testid="button-view-chart"
                  // onClick={() =>
                  //   navigate(
                  //     "https://dexscreener.com/bsc/0x0318a2b3ba958b56fa67ef24485e22b101a004b7",
                  //   )
                  // }
                >
                  <a
                    href={
                      "https://dexscreener.com/bsc/0x0318a2b3ba958b56fa67ef24485e22b101a004b7"
                    }
                    target="_blank"
                    className="w-full flex"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Chart
                  </a>
                  {/*View Chart*/}
                </MagneticButton>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: easing.cinematic }}
          >
            <Card
              className="p-8 md:p-10 h-full bg-white shadow-premium-lg border-0"
              data-testid="card-tokenomics"
            >
              <h3 className="text-xl font-bold text-foreground mb-8">
                Tokenomics Distribution
              </h3>

              <div className="space-y-6">
                {[
                  {
                    label: "Treasury (Missions)",
                    percent: 10,
                    color: "bg-ark-orange",
                  },
                  {
                    label: "Liquidity Pool",
                    percent: 15,
                    color: "bg-ark-magenta",
                  },
                  {
                    label: "Holder Reflections",
                    percent: 5,
                    color: "bg-gradient-to-r from-ark-orange to-ark-magenta",
                  },
                  { label: "Burn", percent: 5, color: "bg-foreground/30" },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    data-testid={`tokenomics-${item.label.toLowerCase().replace(" ", "-")}`}
                  >
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-bold text-foreground">
                        {item.percent}%
                      </span>
                    </div>
                    <AnimatedProgress
                      percent={item.percent}
                      color={item.color}
                      delay={0.6 + index * 0.1}
                    />
                  </div>
                ))}
              </div>

              <motion.div
                className="mt-10 p-6 bg-gradient-to-br from-ark-orange/5 via-ark-cream/50 to-ark-magenta/5 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8, ease: easing.smooth }}
              >
                <h4 className="font-bold text-foreground mb-4">
                  Why Hold $ACT?
                </h4>
                <ul className="text-sm text-muted-foreground space-y-3">
                  {[
                    "Earn passive reflections on every transaction",
                    "Vote on community missions and proposals",
                    "Access exclusive holder events and rewards",
                    "Direct impact on global social causes",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                    >
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-ark-orange to-ark-magenta flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
