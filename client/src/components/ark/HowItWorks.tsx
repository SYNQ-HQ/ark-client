import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { Wallet, Heart, TrendingUp } from "lucide-react";
import { easing } from "@/lib/motion";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Buy $ACT Tokens",
    description:
      "Purchase $ACT on Pancake Swap using your favorite BSC crypto wallet. A portion of every transaction funds community missions.",
  },
  {
    number: "02",
    icon: Heart,
    title: "Fund Missions",
    description:
      "Your tokens directly support vetted social impact missions. Nominate causes you care about or vote on community proposals.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Earn & Grow",
    description:
      "Hold $ACT to earn reflections. As the ecosystem grows, so does your impact and potential rewards.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !lineRef.current) return;

    const tween = gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        delay: 0.6,
        ease: "power2.out",
      },
    );

    return () => {
      tween.kill();
    };
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-gradient-to-b from-ark-cream to-white relative overflow-hidden"
      data-testid="how-it-works-section"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-ark-orange/5 to-transparent blur-[100px]" />
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
            className="inline-block px-4 py-1.5 rounded-full bg-ark-magenta/10 text-ark-magenta text-sm font-medium mb-6"
          >
            Simple Process
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
                How It Works
              </motion.span>
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: easing.smooth }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Three simple steps to join the kindness economy and start making a
            difference.
          </motion.p>
        </motion.div>

        <div className="relative">
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-ark-orange via-ark-magenta to-ark-orange origin-left"
            style={{ transform: "scaleX(0)" }}
          />

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                animate={
                  isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
                }
                transition={{
                  duration: 0.8,
                  delay: 0.4 + index * 0.15,
                  ease: easing.cinematic,
                }}
                className="relative"
              >
                <div
                  className="text-center"
                  data-testid={`step-${step.number}`}
                >
                  <motion.div
                    className="relative inline-block mb-8"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-28 h-28 rounded-3xl bg-white shadow-premium-lg flex items-center justify-center relative z-10">
                      <step.icon className="w-12 h-12 text-ark-orange" />
                    </div>
                    <motion.span
                      className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-ark-orange to-ark-magenta flex items-center justify-center text-white font-bold text-lg shadow-lg z-20"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.7 + index * 0.15,
                        ease: easing.overshoot,
                      }}
                    >
                      {step.number}
                    </motion.span>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ark-orange/20 to-ark-magenta/20 blur-2xl scale-150 opacity-50" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
