import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Users, Globe, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { easing, staggerContainer, staggerItem } from "@/lib/motion";

const features = [
  {
    icon: Heart,
    title: "Acts of Kindness",
    description: "Every token purchase funds real-world missions that create positive change in communities worldwide.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Decisions are made by the community. Nominate causes, vote on missions, and see your impact grow.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "From local food drives to international relief efforts, ARK missions span the globe.",
  },
  {
    icon: Sparkles,
    title: "Transparent Impact",
    description: "Every donation is tracked on-chain. See exactly where your contribution goes and the lives it touches.",
  },
];

export default function WhatIsArk() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="py-24 md:py-32 bg-white relative overflow-hidden" 
      data-testid="what-is-ark-section"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-ark-orange/5 to-transparent blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-ark-magenta/5 to-transparent blur-[80px]" />
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
            The Movement
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 tracking-[-0.02em]">
            <motion.span
              className="block overflow-hidden"
            >
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : { y: "100%" }}
                transition={{ duration: 0.8, ease: easing.cinematic, delay: 0.1 }}
              >
                What is{" "}
                <span className="bg-gradient-to-r from-ark-orange via-ark-magenta to-ark-orange bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                  ARK
                </span>
                ?
              </motion.span>
            </motion.span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: easing.smooth }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            ARK is a Web3 social impact ecosystem that transforms cryptocurrency into kindness.
            Buy $ACT tokens, fund real missions, and create lasting change—all while earning rewards.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.6,
                    delay: 0.4 + index * 0.1,
                    ease: easing.cinematic,
                  },
                },
              }}
            >
              <Card 
                className="p-8 h-full bg-white/80 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-lg transition-all duration-500 group" 
                data-testid={`card-feature-${index}`}
              >
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ark-orange/10 to-ark-magenta/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ rotate: 5 }}
                >
                  <feature.icon className="w-7 h-7 text-ark-orange" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
