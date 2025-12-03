import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Check,
  DollarSign,
  Users,
  Globe,
  Heart,
} from "lucide-react";

// todo: remove mock functionality
const stats = [
  { icon: DollarSign, value: "$53,450", label: "Total Donated" },
  { icon: Users, value: "5,237", label: "People Helped" },
  { icon: Globe, value: "4", label: "Countries Reached" },
  { icon: Heart, value: "17", label: "Missions Completed" },
];

// todo: remove mock functionality
const completedMissions = [
  {
    id: 1,
    title: "Solar Borehole – Téra, Niger",
    raised: 4_800, // USDC on Celo
    peopleHelped: 160, // 40 households × 4
    date: "Nov 2024",
    image:
      "https://images.unsplash.com/photo-1596895307394-1d15bf597744?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMyfHxSZWZ1Z2VlJTIwV2F0ZXIlMjBCbGFkZGVycyUyMGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww",
    // on-chain: 40 NFT receipts, one per household wallet
  },
  {
    id: 2,
    title: "Girl’s Hygiene Kits – Maradi, Niger",
    raised: 6_000, // Quadratic grant
    peopleHelped: 300, // 3 rural schools × 100 girls
    date: "Oct 2024",
    image:
      "https://images.unsplash.com/photo-1582308512302-f7a223fb5582?q=80&w=714&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // on-chain: 300 soul-bound “Dignity” tokens via SMS
  },
  {
    id: 3,
    title: "Sesame Seed Packs – Dori, Burkina Faso",
    raised: 3_200, // Superfluid stream
    peopleHelped: 80, // 20 farmers × 4 family members
    date: "Sep 2024",
    image:
      "https://images.unsplash.com/photo-1457414104202-9d4b4908f285?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIzfHxTZXNhbWUlMjBTZWVkJTIwaW4lMjBkaXJ0eSUyMGJpZyUyMGJhZ3N8ZW58MHx8MHx8fDA%3D",
    // on-chain: attested yield oracle
  },
  {
    id: 4,
    title: "Refugee Water Bladders – N’Djamena, Chad",
    raised: 5_500, // Giveth round
    peopleHelped: 275, // 55 Sudanese-refugee families
    date: "Aug 2024",
    image:
      "https://images.unsplash.com/photo-1749584550229-c9aa8dd1a374?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFJlZnVnZWUlMjBXYXRlciUyMEJsYWRkZXJzJTIwYmxhY2slMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
    // on-chain: 55 ERC-1155 tokens
  },
  // {
  //   id: 5,
  //   title: "Solar Study Lamps – Katsina, Nigeria",
  //   raised: 4_100, // Gitcoin Beta-round
  //   peopleHelped: 205, // 205 primary-school pupils
  //   date: "Jul 2024",
  //   image:
  //     "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop",
  //   // on-chain: 205 POAPs claimed via USSD wallet
  // },
];

export default function ImpactStats() {
  return (
    <section
      className="py-20 md:py-28 bg-ark-cream"
      data-testid="impact-stats-section"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real numbers. Real change. Every $ACT transaction contributes to
            these results.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="p-5 md:p-6 text-center"
                data-testid={`impact-stat-${index}`}
              >
                <div className="w-12 h-12 rounded-xl bg-ark-orange/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-ark-orange" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Completed Missions
            </h3>
            <p className="text-muted-foreground">
              See the tangible results of our community's generosity.
            </p>
          </div>
          {/*<Link href="/nominate">
            <Button variant="outline" className="border-ark-orange text-ark-orange hover:bg-ark-orange/10" data-testid="button-nominate-cause">
              Nominate a Cause
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>*/}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {completedMissions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden hover-elevate"
                data-testid={`completed-mission-${mission.id}`}
              >
                <div className="relative h-36">
                  <img
                    src={mission.image}
                    alt={mission.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white border-0">
                    <Check className="w-3 h-3 mr-1" />
                    Complete
                  </Badge>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    {mission.date}
                  </p>
                  <h4 className="font-semibold text-foreground text-sm mb-2 line-clamp-2">
                    {mission.title}
                  </h4>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${mission.raised.toLocaleString()} raised</span>
                    <span>{mission.peopleHelped.toLocaleString()} helped</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
