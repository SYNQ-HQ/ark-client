import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Gem, Globe, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { easing, heroContainer, staggerItem } from "@/lib/motion";
import heroImage from "@assets/generated_images/web3_community_impact_ecosystem_illustration.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    if (!containerRef.current) return;

    const orbs = containerRef.current.querySelectorAll(".floating-orb");
    const tweens: gsap.core.Tween[] = [];

    orbs.forEach((orb, index) => {
      const tween = gsap.to(orb, {
        y: index % 2 === 0 ? -20 : 20,
        x: index % 2 === 0 ? 10 : -10,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-ark-cream via-ark-cream to-white"
      data-testid="hero-section"
    >
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div className="floating-orb absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-ark-orange/8 to-ark-orange/3 blur-[80px]" />
        <div className="floating-orb absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-ark-magenta/8 to-ark-magenta/3 blur-[80px]" />
        <div className="floating-orb absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-ark-orange/5 to-ark-magenta/5 blur-[60px]" />
      </motion.div>

      <motion.div
        className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32"
        style={{ y: contentY }}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-10"
          >
            <motion.div variants={staggerItem} className="space-y-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ark-orange/10 text-ark-orange text-sm font-medium">
                {/*<Sparkles className="w-4 h-4" />*/}
                Web3 Social Impact
              </span>
            </motion.div>

            <motion.div variants={staggerItem} className="space-y-6">
              <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-bold text-foreground leading-[0.95] tracking-[-0.03em]">
                <motion.span
                  className="block overflow-hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
                  <motion.span
                    className="block"
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: "0%" } : { y: "100%" }}
                    transition={{
                      duration: 0.8,
                      ease: easing.cinematic,
                      delay: 0.3,
                    }}
                  >
                    Buy{" "}
                    <span className="bg-gradient-to-r from-ark-orange via-ark-magenta to-ark-orange bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                      $ACT
                    </span>
                  </motion.span>
                </motion.span>
                <motion.span
                  className="block overflowhidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
                  <motion.span
                    className="block text-muted-foreground/80"
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: "0%" } : { y: "100%" }}
                    transition={{
                      duration: 0.8,
                      ease: easing.cinematic,
                      delay: 0.45,
                    }}
                  >
                    Change Lives
                  </motion.span>
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              variants={staggerItem}
              className="text-lg md:text-xl text-muted-foreground max-w-[480px] leading-relaxed"
            >
              Join the global kindness economy. Every transaction fuels verified
              acts of compassion. Transparent. Rewarding. Scalable.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
              <MagneticButton
                size="lg"
                className="bg-ark-orange hover:bg-ark-orange text-white px-8 py-6 text-base font-medium rounded-xl"
                data-testid="button-buy-hero"
              >
                Buy $ACT
                <ArrowRight className="w-4 h-4 ml-2" />
              </MagneticButton>
              <Link href="/whitepaper">
                <MagneticButton
                  size="lg"
                  variant="outline"
                  className="border-2 border-foreground/20 text-foreground hover:border-ark-orange hover:text-ark-orange px-8 py-6 text-base font-medium rounded-xl transition-colors duration-300"
                  data-testid="button-whitepaper-hero"
                >
                  Read Whitepaper
                </MagneticButton>
              </Link>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="flex items-center gap-8 pt-6"
            >
              <div className="flex -space-x-3">
                {[
                  "bg-gradient-to-br from-ark-orange to-ark-orange/70",
                  "bg-gradient-to-br from-ark-magenta to-ark-magenta/70",
                  "bg-gradient-to-br from-ark-orange/80 to-ark-magenta/80",
                  "bg-gradient-to-br from-ark-magenta/70 to-ark-orange/70",
                ].map((bg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + i * 0.1,
                      ease: easing.overshoot,
                    }}
                    className={`w-10 h-10 rounded-full ${bg} border-2 border-white flex items-center justify-center shadow-sm`}
                  >
                    <span className="text-xs font-bold text-white">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  <motion.span
                    className="font-semibold text-foreground"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    24,500+
                  </motion.span>{" "}
                  community members
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.9, filter: "blur(20px)" }
            }
            transition={{ duration: 1.2, ease: easing.cinematic, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-ark-orange/10"
              style={{ scale: imageScale, opacity: imageOpacity }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ark-cream/20 to-transparent z-10 pointer-events-none" />
              <img
                src={"/hero.gif"}
                alt="ARK Web3 Community Ecosystem"
                className="w-full h-auto object-cover"
                data-testid="img-hero"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8, ease: easing.overshoot }}
              className="floating-orb absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-white shadow-xl shadow-black/5 flex items-center justify-center"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ark-orange to-ark-magenta flex items-center justify-center">
                <Gem className="w-5 h-5 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1, ease: easing.overshoot }}
              className="floating-orb absolute -bottom-6 -left-6 w-16 h-16 rounded-2xl bg-white shadow-xl shadow-black/5 flex items-center justify-center"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-ark-magenta to-ark-orange flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute -z-10 inset-0 bg-gradient-to-r from-ark-orange/20 to-ark-magenta/20 blur-[60px] scale-110"
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-foreground/40"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
