import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import MagneticButton from "./MagneticButton";
import { easing } from "@/lib/motion";

const missions = [
  {
    id: 1,
    title: "Clean Water Initiative",
    location: "Kenya, Africa",
    date: "Dec 15, 2024",
    image:
      "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=400&h=250&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=250&fit=crop",
    raised: 62000,
    goal: 75000,
    supporters: 2103,
    status: "active",
  },
];

export default function MissionCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-gradient-to-b from-white to-ark-cream relative overflow-hidden"
      data-testid="missions-section"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-ark-orange/5 to-transparent blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: easing.cinematic }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: easing.overshoot }}
              className="inline-block px-4 py-1.5 rounded-full bg-ark-orange/10 text-ark-orange text-sm font-medium mb-6"
            >
              Live Impact
            </motion.span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-[-0.02em]">
              <motion.span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: "0%" } : { y: "100%" }}
                  transition={{
                    duration: 0.8,
                    ease: easing.cinematic,
                    delay: 0.1,
                  }}
                >
                  Active Missions
                </motion.span>
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: easing.smooth }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl"
            >
              Real impact, real communities. See where your $ACT tokens are
              making a difference.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: easing.smooth }}
          >
            <Link href="/impact">
              <MagneticButton
                variant="outline"
                className="border-foreground/20 text-foreground hover:border-ark-orange hover:text-ark-orange"
                data-testid="button-view-all-missions"
              >
                View All Missions
                <ArrowRight className="w-4 h-4 ml-2" />
              </MagneticButton>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              animate={
                isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.15,
                ease: easing.cinematic,
              }}
            >
              <Card
                className="overflow-hidden bg-white border-0 shadow-premium hover:shadow-premium-xl transition-all duration-500 group"
                data-testid={`card-mission-${mission.id}`}
              >
                <div className="relative h-52 overflow-hidden">
                  <motion.img
                    src={mission.image}
                    alt={mission.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: easing.smooth }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-ark-orange text-white border-0 shadow-lg">
                    Active
                  </Badge>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-ark-orange transition-colors duration-300">
                    {mission.title}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {mission.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {mission.date}
                    </span>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Raised</span>
                      <span className="font-bold text-foreground">
                        ${mission.raised.toLocaleString()}
                        <span className="font-normal text-muted-foreground">
                          {" "}
                          / ${mission.goal.toLocaleString()}
                        </span>
                      </span>
                    </div>
                    <Progress
                      value={(mission.raised / mission.goal) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {mission.supporters.toLocaleString()} supporters
                    </span>
                    {/*<MagneticButton
                      size="sm"
                      className="bg-ark-orange hover:bg-ark-orange text-white"
                      data-testid={`button-support-${mission.id}`}
                    >
                      Support
                    </MagneticButton>*/}
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
