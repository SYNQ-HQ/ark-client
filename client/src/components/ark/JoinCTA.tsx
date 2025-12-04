import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Users, DollarSign, Heart } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { easing } from "@/lib/motion";
import PancakeSwapButtonProvider from "./PancakeSwapButtonProvider";
import CommunityUrlProvider from "./CommunityUrlProvider";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, target);
      setCount(Math.floor(current));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, isInView]);

  // const formatNumber = (num: number) => {
  //   if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  //   return num.toString();
  // };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      // keep one decimal for 2.1 K, but drop it for 5 K
      const k = num / 1000;
      return k === Math.floor(k) ? `${k}K` : `${k.toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="font-bold">
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: Users, value: 2100, suffix: "+", label: "Holders" },
  { icon: DollarSign, value: 13, suffix: "K+", label: "Donated" },
  { icon: Heart, value: 17, suffix: "+", label: "Missions Funded" },
];

export default function JoinCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      data-testid="join-cta-section"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ark-orange via-ark-orange to-ark-magenta" />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-white/10 blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-ark-magenta/40 blur-[120px]"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easing.cinematic }}
          className="space-y-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: easing.overshoot }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm"
          >
            Join the Movement
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.02em]">
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
                Be Part of Something
              </motion.span>
            </motion.span>
            <motion.span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : { y: "100%" }}
                transition={{
                  duration: 0.8,
                  ease: easing.cinematic,
                  delay: 0.2,
                }}
              >
                Bigger Than Yourself
              </motion.span>
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: easing.smooth }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            Join the global kindness economy. Buy $ACT, support real missions,
            and earn rewards while making the world a better place.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: easing.smooth }}
          >
            <PancakeSwapButtonProvider>
              <MagneticButton
                size="lg"
                className="bg-white text-ark-orange hover:bg-white px-10 py-7 text-lg rounded-xl shadow-xl shadow-black/10"
                data-testid="button-buy-cta"
              >
                Buy $ACT Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </MagneticButton>
            </PancakeSwapButtonProvider>

            <CommunityUrlProvider>
              <MagneticButton
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-xl backdrop-blur-sm"
                data-testid="button-join-community"
              >
                Join Community
              </MagneticButton>
            </CommunityUrlProvider>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-12 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: easing.smooth }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.7 + index * 0.1,
                  ease: easing.overshoot,
                }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="w-6 h-6 text-white/70" />
                  <p className="text-4xl md:text-5xl font-bold text-white">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                </div>
                <p className="text-sm text-white/70 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
