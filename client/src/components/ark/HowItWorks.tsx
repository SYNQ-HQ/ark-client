import { motion } from "framer-motion";
import { Wallet, Heart, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Buy $ACT Tokens",
    description: "Purchase $ACT on BSC using your favorite crypto wallet. A portion of every transaction funds community missions.",
  },
  {
    number: "02",
    icon: Heart,
    title: "Fund Missions",
    description: "Your tokens directly support vetted social impact missions. Nominate causes you care about or vote on community proposals.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Earn & Grow",
    description: "Hold $ACT to earn reflections. As the ecosystem grows, so does your impact and potential rewards.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-ark-cream" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to join the kindness economy and start making a difference.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-ark-orange/30 to-transparent -translate-x-1/2" />
              )}
              
              <div className="text-center" data-testid={`step-${step.number}`}>
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-ark-orange" />
                  </div>
                  <span className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-ark-orange to-ark-magenta flex items-center justify-center text-white font-bold text-sm">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
