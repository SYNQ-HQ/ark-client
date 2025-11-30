import { motion } from "framer-motion";
import { Check, Circle, ChevronRight } from "lucide-react";

// todo: remove mock functionality
const roadmapItems = [
  {
    quarter: "Q4 2024",
    title: "Foundation",
    status: "completed",
    items: [
      "Token launch on BSC",
      "Community building",
      "First 10 missions funded",
      "CertiK audit complete",
    ],
  },
  {
    quarter: "Q1 2025",
    title: "Growth",
    status: "current",
    items: [
      "CEX listings",
      "Mobile app launch",
      "Governance voting system",
      "50 missions milestone",
    ],
  },
  {
    quarter: "Q2 2025",
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
    quarter: "Q3 2025",
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
  return (
    <section className="py-20 md:py-28 bg-ark-cream" data-testid="roadmap-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Roadmap
          </h2>
          <p className="text-lg text-muted-foreground">
            Our journey to building the world's largest Web3 social impact ecosystem.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gray-200">
            <div className="h-full bg-gradient-to-r from-ark-orange to-ark-magenta" style={{ width: "35%" }} />
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.quarter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
                data-testid={`roadmap-${item.quarter.toLowerCase().replace(' ', '-')}`}
              >
                <div className="hidden lg:flex absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full items-center justify-center z-10">
                  {item.status === "completed" ? (
                    <div className="w-8 h-8 rounded-full bg-ark-orange flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : item.status === "current" ? (
                    <div className="w-8 h-8 rounded-full bg-ark-magenta flex items-center justify-center animate-pulse">
                      <Circle className="w-4 h-4 text-white fill-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300" />
                  )}
                </div>

                <div className={`mt-8 lg:mt-12 p-6 rounded-2xl bg-white border ${
                  item.status === "current" ? "border-ark-magenta shadow-lg" : "border-gray-100"
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-sm font-semibold ${
                      item.status === "completed" ? "text-ark-orange" : 
                      item.status === "current" ? "text-ark-magenta" : "text-muted-foreground"
                    }`}>
                      {item.quarter}
                    </span>
                    {item.status === "current" && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-ark-magenta/10 text-ark-magenta rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((listItem, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          item.status === "completed" ? "text-ark-orange" : "text-gray-300"
                        }`} />
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
