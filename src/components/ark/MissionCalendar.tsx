import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";

// todo: remove mock functionality
const missions = [
  {
    id: 1,
    title: "Solar Borehole – Zinder, Niger",
    location: "Niger",
    date: "Dec 15, 2024",
    month: "12",
    year: "2024",
    supporters: 1234,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Girl’s Hygiene Kits – Maradi, Niger",
    location: "Niger",
    date: "Dec 20, 2024",
    month: "12",
    year: "2024",
    supporters: 856,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Sesame Seed Packs – Dori, Burkina Faso",
    location: "Burkina Faso",
    date: "Jan 5, 2025",
    month: "01",
    year: "2025",
    supporters: 2103,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Refugee Water Bladders – N’Djamena, Chad",
    location: "Chad",
    date: "Jan 12, 2025",
    month: "01",
    year: "2025",
    supporters: 543,
    status: "upcoming",
  },
  {
    id: 5,
    title: "Solar Study Lamps – Katsina, Nigeria",
    location: "Nigeria",
    date: "Jan 20, 2025",
    month: "01",
    year: "2025",
    supporters: 789,
    status: "upcoming",
  },
  {
    id: 6,
    title: "Cataract Surgeries – Kano, Nigeria",
    location: "Nigeria",
    date: "Feb 3, 2025",
    month: "02",
    year: "2025",
    supporters: 1567,
    status: "upcoming",
  },
];

const months = [
  { value: "all", label: "All Months" },
  { value: "12", label: "December" },
  { value: "01", label: "January" },
  { value: "02", label: "February" },
];

const years = [
  { value: "all", label: "All Years" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
];

export default function MissionCalendar() {
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const filteredMissions = missions.filter((mission) => {
    const matchMonth =
      selectedMonth === "all" || mission.month === selectedMonth;
    const matchYear = selectedYear === "all" || mission.year === selectedYear;
    return matchMonth && matchYear;
  });

  return (
    <section
      className="py-20 md:py-28 bg-white"
      data-testid="mission-calendar-section"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mission Calendar
          </h2>
          <p className="text-lg text-muted-foreground">
            See all upcoming missions and plan your participation in the
            kindness economy.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40" data-testid="select-month">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32" data-testid="select-year">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card
                className="p-5 hover-elevate group"
                data-testid={`calendar-mission-${mission.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-ark-orange text-white flex flex-col items-center justify-center">
                    <span className="text-xs uppercase">
                      {new Date(mission.date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-xl font-bold">
                      {new Date(mission.date).getDate()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 truncate">
                      {mission.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {mission.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {mission.supporters} joined
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-ark-cream text-ark-orange"
                  >
                    Upcoming
                  </Badge>
                  {/*<Button
                    size="sm"
                    variant="ghost"
                    className="text-ark-orange hover:text-ark-orange"
                    data-testid={`button-learn-more-${mission.id}`}
                  >
                    Learn More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>*/}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredMissions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No missions found for the selected filters.
          </div>
        )}
      </div>
    </section>
  );
}
