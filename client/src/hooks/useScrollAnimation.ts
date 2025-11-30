import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
}

// Hook for parallax effects
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    gsap.to(element, {
      yPercent: speed * 50,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return ref;
}

// Hook for fade-in-up on scroll
export function useScrollReveal(options: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 60,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: options.start || "top 85%",
          end: options.end || "top 20%",
          toggleActions: options.once !== false ? "play none none none" : "play reverse play reverse",
          ...options,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [options.start, options.end, options.once]);

  return ref;
}

// Hook for staggered children reveal
export function useStaggerReveal(staggerAmount: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const children = element.children;
    
    gsap.fromTo(
      children,
      {
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: staggerAmount,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [staggerAmount]);

  return ref;
}

// Hook for horizontal scroll progress
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(scrolled / scrollHeight);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
}

// Hook for element visibility with threshold
export function useInView(threshold: number = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Hook for smooth scroll to element
export function useSmoothScroll() {
  const scrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power3.inOut",
      });
    }
  };

  return scrollTo;
}

// Initialize GSAP defaults
export function initGSAP() {
  gsap.config({
    force3D: true,
  });
  
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });
}
