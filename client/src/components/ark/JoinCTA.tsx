import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function JoinCTA() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-ark-orange via-ark-orange to-ark-magenta relative overflow-hidden" data-testid="join-cta-section">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-ark-magenta/30 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Join the Movement Today
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Be part of the global kindness economy. Buy $ACT, support real missions, and earn rewards while making the world a better place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-ark-orange hover:bg-white/90 px-8 py-6 text-lg rounded-lg shadow-lg"
              data-testid="button-buy-cta"
            >
              Buy $ACT Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg backdrop-blur-sm"
              data-testid="button-join-community"
            >
              Join Community
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">24K+</p>
              <p className="text-sm text-white/80">Holders</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">$500K+</p>
              <p className="text-sm text-white/80">Donated</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">50+</p>
              <p className="text-sm text-white/80">Missions Funded</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
