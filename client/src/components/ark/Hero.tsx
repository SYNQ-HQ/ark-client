import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/web3_community_impact_ecosystem_illustration.png";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-ark-cream overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-ark-orange/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-ark-magenta/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight"
              >
                Buy{" "}
                <span className="bg-gradient-to-r from-ark-orange to-ark-magenta bg-clip-text text-transparent">
                  $ACT
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-lg"
              >
                Join the global kindness economy. Transparent, rewarding, scalable.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-ark-orange hover:bg-ark-orange/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
                data-testid="button-buy-hero"
              >
                Buy $ACT
              </Button>
              <Link href="/whitepaper">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-ark-orange text-ark-orange hover:bg-ark-orange/10 px-8 py-6 text-lg rounded-lg"
                  data-testid="button-whitepaper-hero"
                >
                  Whitepaper
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-ark-orange/20 to-ark-magenta/20 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-ark-orange">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">24,500+</span> community members
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={heroImage}
                alt="ARK Web3 Community Ecosystem"
                className="w-full h-auto object-cover"
                data-testid="img-hero"
              />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center"
            >
              <span className="text-3xl">💎</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center"
            >
              <span className="text-2xl">🌍</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
