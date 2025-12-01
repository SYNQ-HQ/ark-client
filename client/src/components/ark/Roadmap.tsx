import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { Check, Circle, ChevronRight } from "lucide-react";
import { easing } from "@/lib/motion";

const roadmapItems = [
  {
    quarter: "Phase 1",
    title: "Foundation",
    // status: "completed",
    status: "current",
    items: [
      "Token launch on BSC",
      "Community building",
      "First 10 missions funded",
      "CertiK audit complete",
    ],
  },
  {
    quarter: "Phase 2",
    title: "Growth",
    status: "upcoming",
    items: [
      "CEX listings",
      "Mobile app launch",
      "Governance voting system",
      "50 missions milestone",
    ],
  },
  {
    quarter: "Phase 3",
    title: "Expansion",
    status: "upcoming",
    items: [
      "Multi-chain deployment",
      "NFT impact certificates",
      "Corporate partnerships",
      "Global ambassador program",
    ],
  },
  {
    quarter: "Phase 4",
    title: "Scale",
    status: "upcoming",
    items: [
      "DAO full transition",
      "Impact tracking dashboard",
      "Major charity partnerships",
      "1M+ community goal",
    ],
  },
];

export default function Roadmap() {
  const ref = useRef(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !progressRef.current) return;

    const tween = gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      {
        width: "35%",
        duration: 1.2,
        delay: 0.4,
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
      data-testid="roadmap-section"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-ark-magenta/5 to-transparent blur-[100px]" />
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
            Our Journey
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
                Roadmap
              </motion.span>
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: easing.smooth }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Our journey to building the world's largest Web3 social impact
            ecosystem.
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[72px] left-[12.5%] right-[12.5%] h-[3px] bg-gray-100 rounded-full">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-ark-orange to-ark-magenta rounded-full"
              style={{ width: "0%" }}
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.quarter}
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
                data-testid={`roadmap-${item.quarter.toLowerCase().replace(" ", "-")}`}
              >
                <div className="hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + index * 0.15,
                      ease: easing.overshoot,
                    }}
                  >
                    {item.status === "completed" ? (
                      <div className="w-10 h-10 rounded-full bg-ark-orange flex items-center justify-center shadow-lg shadow-ark-orange/30">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    ) : item.status === "current" ? (
                      <div className="w-10 h-10 rounded-full bg-ark-magenta flex items-center justify-center shadow-lg shadow-ark-magenta/30 relative">
                        <Circle className="w-5 h-5 text-white fill-white" />
                        <div className="absolute inset-0 rounded-full bg-ark-magenta animate-ping opacity-30" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 shadow-sm" />
                    )}
                  </motion.div>
                </div>

                <motion.div
                  className={`mt-16 lg:mt-20 p-8 rounded-2xl bg-white border transition-all duration-500 ${
                    item.status === "current"
                      ? "border-ark-magenta/30 shadow-premium-lg"
                      : "border-gray-100 shadow-premium hover:shadow-premium-lg"
                  }`}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-sm font-bold ${
                        item.status === "completed"
                          ? "text-ark-orange"
                          : item.status === "current"
                            ? "text-ark-magenta"
                            : "text-muted-foreground"
                      }`}
                    >
                      {item.quarter}
                    </span>
                    {item.status === "current" && (
                      <span className="px-3 py-1 text-xs font-semibold bg-ark-magenta/10 text-ark-magenta rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-5">
                    {item.title}
                  </h3>
                  <ul className="space-y-3">
                    {item.items.map((listItem, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.8 + index * 0.15 + i * 0.05,
                        }}
                      >
                        <ChevronRight
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            item.status === "completed"
                              ? "text-ark-orange"
                              : "text-gray-300"
                          }`}
                        />
                        {listItem}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
