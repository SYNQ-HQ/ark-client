import { motion } from "framer-motion";
import { Shield, FileCheck, Lock, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

const trustItems = [
  {
    icon: Shield,
    title: "Audited Smart Contract",
    description: "Our contract has been thoroughly audited by leading blockchain security firms.",
    badge: "CertiK Verified",
  },
  {
    icon: FileCheck,
    title: "KYC Verified Team",
    description: "Core team members have completed full identity verification for transparency.",
    badge: "Verified",
  },
  {
    icon: Lock,
    title: "Locked Liquidity",
    description: "Liquidity is locked for 2 years, ensuring long-term stability and trust.",
    badge: "2 Year Lock",
  },
  {
    icon: Eye,
    title: "On-Chain Transparency",
    description: "All treasury movements and mission funding are visible on the blockchain.",
    badge: "100% Traceable",
  },
];

// todo: remove mock functionality
const partners = [
  { name: "CertiK", logo: "C" },
  { name: "Binance", logo: "B" },
  { name: "PancakeSwap", logo: "P" },
  { name: "CoinGecko", logo: "CG" },
  { name: "DexTools", logo: "D" },
];

export default function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-white" data-testid="trust-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Trust ARK?
          </h2>
          <p className="text-lg text-muted-foreground">
            Security, transparency, and accountability are the pillars of the ARK ecosystem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full text-center hover-elevate" data-testid={`card-trust-${index}`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ark-orange/10 to-ark-magenta/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-ark-orange" />
                </div>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-ark-cream text-ark-orange rounded-full mb-3">
                  {item.badge}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="w-16 h-16 rounded-xl bg-ark-cream flex items-center justify-center"
                data-testid={`partner-${partner.name.toLowerCase()}`}
              >
                <span className="text-xl font-bold text-muted-foreground">{partner.logo}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
