import { motion } from "framer-motion";
import { Heart, Users, Globe, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

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
  return (
    <section className="py-20 md:py-28 bg-white" data-testid="what-is-ark-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What is{" "}
            <span className="bg-gradient-to-r from-ark-orange to-ark-magenta bg-clip-text text-transparent">
              ARK
            </span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground">
            ARK is a Web3 social impact ecosystem that transforms cryptocurrency into kindness.
            Buy $ACT tokens, fund real missions, and create lasting change—all while earning rewards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover-elevate border border-gray-100 hover:border-ark-orange/20 transition-colors" data-testid={`card-feature-${index}`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ark-orange/10 to-ark-magenta/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-ark-orange" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
