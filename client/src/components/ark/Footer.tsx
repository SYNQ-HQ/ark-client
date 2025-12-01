import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Send, MessageCircle, Github, ArrowRight } from "lucide-react";
import { easing } from "@/lib/motion";

const footerLinks = {
  product: [
    { label: "Token", href: "/token" },
    { label: "Whitepaper", href: "/whitepaper" },
    { label: "Roadmap", href: "/#roadmap" },
    { label: "Buy $ACT", href: "/token" },
  ],
  community: [
    { label: "Impact", href: "/impact" },
    { label: "Calendar", href: "/calendar" },
    { label: "Nominate", href: "/nominate" },
    { label: "Donate", href: "/donate" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Media Kit", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://x.com/ArkCharityToken", label: "Twitter" },
  // { icon: Send, href: "#", label: "Telegram" },
  // { icon: MessageCircle, href: "#", label: "Discord" },
  // { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer
      className="bg-foreground text-white relative overflow-hidden"
      data-testid="footer"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-ark-orange/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-ark-magenta/5 blur-[80px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        <div className="py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          <div className="col-span-2 lg:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/*<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ark-orange to-ark-magenta flex items-center justify-center shadow-lg shadow-ark-orange/30">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <span className="font-bold text-2xl tracking-tight">ARK</span>*/}
              <div className="w11 h-8 lg:h-14 roundedxl bg-transparent flex items-center ">
                {/*<span className="text-white font-bold text-xl">A</span>*/}
                <img
                  src="/BOLT/Group 2085665131.svg"
                  alt="ARK Logo"
                  className="w-full h-full bg-transparent"
                />
              </div>
            </motion.div>
            <p className="text-gray-400 text-base mb-8 max-w-xs leading-relaxed">
              The global kindness economy. Building a better world through Web3
              social impact.
            </p>
            {/*<form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-ark-orange/50 rounded-xl h-12"
                data-testid="input-newsletter"
              />
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  type="submit"
                  className="bg-ark-orange hover:bg-ark-orange text-white flex-shrink-0 rounded-xl h-12 px-6"
                  data-testid="button-subscribe"
                >
                  {isSubscribed ? "Subscribed!" : "Subscribe"}
                  {!isSubscribed && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </motion.div>
            </form>*/}
          </div>

          {Object.entries({
            Product: footerLinks.product,
            Community: footerLinks.community,
            Company: footerLinks.company,
            Legal: footerLinks.legal,
          }).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold mb-5 text-base">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <motion.span
                        className="text-sm text-gray-400 hover:text-ark-orange transition-colors duration-300 cursor-pointer inline-block"
                        whileHover={{ x: 3 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                        data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ARK Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-ark-orange transition-colors duration-300"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                data-testid={`link-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
