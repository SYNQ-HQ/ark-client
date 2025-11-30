import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, staggerItem, easing } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fadeUp" | "stagger" | "parallax" | "scale";
  delay?: number;
  id?: string;
}

export default function AnimatedSection({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  id,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: easing.cinematic, delay },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: easing.cinematic, delay },
      },
    },
    parallax: {
      hidden: { opacity: 0, y: 100 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: easing.cinematic, delay },
      },
    },
  };

  if (variant === "stagger") {
    return (
      <motion.section
        ref={ref}
        id={id}
        className={className}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: delay + 0.2,
            },
          },
        }}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant] || variants.fadeUp}
    >
      {children}
    </motion.section>
  );
}

// Stagger item component for use inside stagger sections
export function AnimatedItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

// Full-bleed section with parallax background
interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundClassName?: string;
  speed?: number;
  id?: string;
}

export function ParallaxSection({
  children,
  className,
  backgroundClassName,
  speed = 0.3,
  id,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !backgroundRef.current) return;

    const background = backgroundRef.current;

    gsap.to(background, {
      yPercent: speed * 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return (
    <section ref={containerRef} id={id} className={cn("relative overflow-hidden", className)}>
      <div
        ref={backgroundRef}
        className={cn("absolute inset-0 -top-[20%] -bottom-[20%]", backgroundClassName)}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

// Text reveal animation
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  return (
    <span ref={ref} className={cn("inline-block overflow-hidden", className)}>
      <motion.span
        className="inline-block"
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: easing.cinematic,
          delay,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Blur reveal for images
interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BlurReveal({ children, className, delay = 0 }: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)", scale: 1 }
          : { opacity: 0, filter: "blur(20px)", scale: 1.05 }
      }
      transition={{
        duration: 1.2,
        ease: easing.cinematic,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
