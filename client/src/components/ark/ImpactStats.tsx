import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, DollarSign, Users, Globe, Heart } from "lucide-react";
import { Link } from "wouter";

// todo: remove mock functionality
const stats = [
  { icon: DollarSign, value: "$523,450", label: "Total Donated" },
  { icon: Users, value: "15,234", label: "People Helped" },
  { icon: Globe, value: "28", label: "Countries Reached" },
  { icon: Heart, value: "52", label: "Missions Completed" },
];

// todo: remove mock functionality
const completedMissions = [
  {
    id: 1,
    title: "Clean Water Wells - Kenya",
    raised: 50000,
    peopleHelped: 2500,
    date: "Nov 2024",
    image: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    title: "School Supplies - Philippines",
    raised: 25000,
    peopleHelped: 1200,
    date: "Oct 2024",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Medical Supplies - Haiti",
    raised: 75000,
    peopleHelped: 3800,
    date: "Sep 2024",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    title: "Food Bank - Los Angeles",
    raised: 35000,
    peopleHelped: 4500,
    date: "Aug 2024",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=300&h=200&fit=crop",
  },
];

export default function ImpactStats() {
  return (
    <section className="py-20 md:py-28 bg-ark-cream" data-testid="impact-stats-section">
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
            Real numbers. Real change. Every $ACT transaction contributes to these results.
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
              <Card className="p-5 md:p-6 text-center" data-testid={`impact-stat-${index}`}>
                <div className="w-12 h-12 rounded-xl bg-ark-orange/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-ark-orange" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</p>
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
            <h3 className="text-2xl font-bold text-foreground mb-2">Completed Missions</h3>
            <p className="text-muted-foreground">See the tangible results of our community's generosity.</p>
          </div>
          <Link href="/nominate">
            <Button variant="outline" className="border-ark-orange text-ark-orange hover:bg-ark-orange/10" data-testid="button-nominate-cause">
              Nominate a Cause
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
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
              <Card className="overflow-hidden hover-elevate" data-testid={`completed-mission-${mission.id}`}>
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
                  <p className="text-xs text-muted-foreground mb-1">{mission.date}</p>
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
