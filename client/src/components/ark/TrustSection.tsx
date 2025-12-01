import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, FileCheck, Lock, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { easing } from "@/lib/motion";
import { array } from "zod";

const trustItems = [
  {
    icon: Shield,
    title: "Audited Smart Contract",
    description:
      "Our contract has been thoroughly audited by leading blockchain security firms.",
    badge: "SynqLabs Verified",
  },
  {
    icon: FileCheck,
    title: "KYC Verified Team",
    description:
      "Core team members have completed full identity verification for transparency.",
    badge: "Verified",
  },
  {
    icon: Lock,
    title: "Locked Liquidity",
    description:
      "Liquidity is locked for 2 years, ensuring long-term stability and trust.",
    badge: "2 Year Lock",
  },
  {
    icon: Eye,
    title: "On-Chain Transparency",
    description:
      "All treasury movements and mission funding are visible on the blockchain.",
    badge: "100% Traceable",
  },
];

const partners = [
  // { name: "CertiK", logo: "C" },
  // { name: "Binance", logo: "B" },
  // { name: "PancakeSwap", logo: "P" },
  // { name: "CoinGecko", logo: "CG" },
  // { name: "DexTools", logo: "D" },
];

export default function TrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
      data-testid="trust-section"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-ark-orange/5 to-transparent blur-[100px]" />
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
            Security First
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
                Why Trust ARK?
              </motion.span>
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: easing.smooth }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Security, transparency, and accountability are the pillars of the
            ARK ecosystem.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              animate={
                isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.1,
                ease: easing.cinematic,
              }}
            >
              <Card
                className="p-8 h-full text-center bg-white border-0 shadow-premium hover:shadow-premium-lg transition-all duration-500 group"
                data-testid={`card-trust-${index}`}
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ark-orange/10 to-ark-magenta/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ rotate: 5 }}
                >
                  <item.icon className="w-8 h-8 text-ark-orange" />
                </motion.div>
                <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-ark-cream text-ark-orange rounded-full mb-4">
                  {item.badge}
                </span>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: easing.cinematic }}
          className="text-center"
        >
          {/*<p className="text-sm text-muted-foreground mb-8 font-medium">
            Trusted by industry leaders
          </p>*/}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {partners &&
              Array.isArray(partners) &&
              partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 1 + index * 0.1,
                    ease: easing.overshoot,
                  }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-20 h-20 rounded-2xl bg-ark-cream/80 flex items-center justify-center shadow-sm hover:shadow-premium transition-all duration-300 cursor-pointer"
                  data-testid={`partner-${partner.name.toLowerCase()}`}
                >
                  <span className="text-2xl font-bold text-muted-foreground">
                    {partner.logo}
                  </span>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
