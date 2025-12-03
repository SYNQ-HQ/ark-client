import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easing } from "@/lib/motion";

/*  add the actual logo files to /public/images/partners/  */
const partners = [
  // { name: "Trust Wallet", logo: "/images/partners/trustwallet.svg" },
  { name: "PeniWallet", logo: "/partners/peniwallet.svg" },
  // { name: "Binance Charity", logo: "/images/partners/binance-charity.svg" },
  // { name: "Giveth", logo: "/images/partners/giveth.svg" },
  // { name: "The Giving Block", logo: "/images/partners/tgb.svg" },
  // { name: "Celo", logo: "/images/partners/celo.svg" },
];

export default function PartnerStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-b from-ark-cream to-white"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: easing.overshoot }}
        className="inlineblock w-fit block mx-auto textcenter px-4 py-1.5 rounded-full bg-ark-orange/10 text-ark-magenta text-sm font-medium mb-6"
      >
        Our Partners
      </motion.span>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: easing.cinematic }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-[-0.02em]">
            Backed by Industry Leaders
          </h3>
          <p className="mt-3 text-muted-foreground">
            The wallets, chains & charities that make every mission possible.
          </p>
        </motion.div>

        {/*<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">*/}
        <div className="flex justify-center gap-8 items-center">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.08,
                ease: easing.overshoot,
              }}
              className="group relative flex flex-col items-center gap-3"
            >
              <div className="h-12 w-full flex items-center justify-center">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-20 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
