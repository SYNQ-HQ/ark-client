import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";

// todo: remove mock functionality
const missions = [
  {
    id: 1,
    title: "Clean Water Initiative",
    location: "Kenya, Africa",
    date: "Dec 15, 2024",
    image: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=400&h=250&fit=crop",
    raised: 45000,
    goal: 50000,
    supporters: 1234,
    status: "active",
  },
  {
    id: 2,
    title: "Community Food Bank",
    location: "Los Angeles, USA",
    date: "Dec 20, 2024",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop",
    raised: 28000,
    goal: 35000,
    supporters: 856,
    status: "active",
  },
  {
    id: 3,
    title: "Youth Education Program",
    location: "Mumbai, India",
    date: "Jan 5, 2025",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=250&fit=crop",
    raised: 62000,
    goal: 75000,
    supporters: 2103,
    status: "active",
  },
];

export default function MissionCards() {
  return (
    <section className="py-20 md:py-28 bg-ark-cream" data-testid="missions-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Active Missions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Real impact, real communities. See where your $ACT tokens are making a difference.
            </p>
          </div>
          <Link href="/impact">
            <Button variant="outline" className="border-ark-orange text-ark-orange hover:bg-ark-orange/10" data-testid="button-view-all-missions">
              View All Missions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover-elevate group" data-testid={`card-mission-${mission.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={mission.image}
                    alt={mission.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 right-3 bg-ark-orange text-white border-0">
                    Active
                  </Badge>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{mission.title}</h3>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {mission.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {mission.date}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Raised</span>
                      <span className="font-semibold text-foreground">
                        ${mission.raised.toLocaleString()} / ${mission.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(mission.raised / mission.goal) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-3.5 h-3.5" />
                      {mission.supporters.toLocaleString()} supporters
                    </span>
                    <Button size="sm" className="bg-ark-orange hover:bg-ark-orange/90" data-testid={`button-support-${mission.id}`}>
                      Support
                    </Button>
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
