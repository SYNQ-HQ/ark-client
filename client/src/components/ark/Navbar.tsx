import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, X } from "lucide-react";

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

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ark-orange to-ark-magenta flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-xl text-foreground">ARK</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium ${
                    location === link.href
                      ? "text-ark-orange"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-20 h-9 text-xs" data-testid="select-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EN">EN</SelectItem>
                <SelectItem value="ES">ES</SelectItem>
                <SelectItem value="FR">FR</SelectItem>
              </SelectContent>
            </Select>

            <Button
              className="hidden sm:flex bg-ark-orange hover:bg-ark-orange/90 text-white"
              data-testid="button-buy-nav"
            >
              Buy $ACT
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-base ${
                          location === link.href
                            ? "text-ark-orange bg-ark-orange/10"
                            : "text-foreground"
                        }`}
                        onClick={() => setMobileOpen(false)}
                        data-testid={`link-mobile-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                  <Button
                    className="mt-4 bg-ark-orange hover:bg-ark-orange/90 text-white"
                    data-testid="button-buy-mobile"
                  >
                    Buy $ACT
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
