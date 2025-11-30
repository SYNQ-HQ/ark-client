import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Heart, Globe, Users, Zap } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Kindness First",
    description: "Every decision we make centers on creating positive impact for communities in need.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "We believe in breaking down barriers to make charitable giving accessible worldwide.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Our holders shape the future. Every voice matters in deciding where funds go.",
  },
  {
    icon: Zap,
    title: "Transparent Action",
    description: "On-chain tracking means you always know exactly where your contribution went.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-white" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-ark-orange mb-4 block">Our Story</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why ARK Exists
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                ARK was born from a simple observation: the cryptocurrency space has incredible
                potential for positive change, yet that potential largely remains untapped.
              </p>
              <p>
                We saw billions of dollars flowing through blockchain networks daily, and we asked
                ourselves: what if we could redirect even a fraction of that wealth toward causes
                that truly matter?
              </p>
              <p>
                That's why we created the ARK Movement—a Web3 ecosystem where every transaction
                contributes to real-world impact. Where holding a token isn't just about financial
                returns, but about being part of something bigger.
              </p>
              <p>
                Our mission is simple: prove that cryptocurrency can be a force for good. That
                profits and purpose don't have to be mutually exclusive. That together, we can
                build a global kindness economy.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="p-5 hover-elevate"
                data-testid={`card-value-${index}`}
              >
                <div className="w-10 h-10 rounded-lg bg-ark-orange/10 flex items-center justify-center mb-3">
                  <value.icon className="w-5 h-5 text-ark-orange" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                <p className="text-xs text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Our Vision
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A world where Web3 technology bridges the gap between those who have and those who need.
            Where blockchain transparency ensures every donation reaches its destination.
            Where a global community of holders comes together to fund missions that change lives.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
