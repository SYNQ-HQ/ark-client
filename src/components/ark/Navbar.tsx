import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, ArrowRight } from "lucide-react";
import { easing } from "@/lib/motion";
import PancakeSwapButtonProvider from "./PancakeSwapButtonProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/token", label: "Token" },
  { href: "/impact", label: "Impact" },
  { href: "/calendar", label: "Calendar" },
  { href: "/about", label: "About" },
  { href: "/whitepaper", label: "Whitepaper" },
];

interface NavbarProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

export default function Navbar({ language, onLanguageChange }: NavbarProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-premium-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: easing.cinematic }}
      data-testid="navbar"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="link-logo"
            >
              {/*<div className="w11 h-10 lg:h-20 roundedxl bg-gradient-to-br from-ark-orange to-ark-magenta flex items-center justify-center shadow-lg shadow-ark-orange/20">*/}
              <div className="w11 h-9 lg:h-16 roundedxl bg-transparent flex items-center ">
                {/*<span className="text-white font-bold text-xl">A</span>*/}
                <img
                  src="/logo.png"
                  alt="ARK Logo"
                  className="w-full h-full bg-transparent"
                />
              </div>
              {/*<span className="font-bold text-xl text-foreground tracking-tight">
                <img src="/BOLT/Group 2085665132.svg" alt="ARK Logo" />
              </span>*/}
            </motion.div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  className="relative px-4 py-2"
                  onHoverStart={() => setHoveredLink(link.href)}
                  onHoverEnd={() => setHoveredLink(null)}
                >
                  <span
                    className={`relative z-10 text-sm font-medium transition-colors duration-300 ${
                      location === link.href
                        ? "text-ark-orange"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </span>
                  <AnimatePresence>
                    {hoveredLink === link.href && (
                      <motion.div
                        className="absolute inset-0 bg-ark-orange/5 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: easing.smooth }}
                        layoutId="navHover"
                      />
                    )}
                  </AnimatePresence>
                  {location === link.href && (
                    <motion.div
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-ark-orange rounded-full"
                      layoutId="navIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/*<Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger
                className="w-20 h-9 text-xs border-foreground/10 bg-transparent hover:bg-ark-cream/50 transition-colors"
                data-testid="select-language"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EN">EN</SelectItem>
                <SelectItem value="ES">ES</SelectItem>
                <SelectItem value="FR">FR</SelectItem>
              </SelectContent>
            </Select>*/}

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <PancakeSwapButtonProvider>
                <Button
                  className="hidden sm:flex bg-ark-orange hover:bg-ark-orange text-white shadow-lg shadow-ark-orange/20 gap-2"
                  data-testid="button-buy-nav"
                >
                  Buy $ACT
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </PancakeSwapButtonProvider>
            </motion.div>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-white/95 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-2 mt-8">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link href={link.href}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-base py-6 ${
                            location === link.href
                              ? "text-ark-orange bg-ark-orange/10"
                              : "text-foreground hover:bg-ark-cream/50"
                          }`}
                          onClick={() => setMobileOpen(false)}
                          data-testid={`link-mobile-${link.label.toLowerCase()}`}
                        >
                          {link.label}
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Button
                      className="mt-6 w-full bg-ark-orange hover:bg-ark-orange/90 text-white py-6"
                      data-testid="button-buy-mobile"
                    >
                      Buy $ACT
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
