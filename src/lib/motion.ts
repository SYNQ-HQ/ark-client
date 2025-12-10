import { Variants, Transition } from "framer-motion";

// Premium easing curves modeled after Apple/Tesla/Spotify
export const easing = {
  // Primary smooth curve - low friction, natural deceleration
  smooth: [0.25, 0.1, 0.25, 1] as const,
  // Slight overshoot for playful interactions
  overshoot: [0.34, 1.56, 0.64, 1] as const,
  // Micro-bounce for button clicks
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  // Cinematic entrance - slow start, smooth finish
  cinematic: [0.16, 1, 0.3, 1] as const,
  // Exit animations - quick start, gradual finish
  exit: [0.4, 0, 0.2, 1] as const,
  // Inertia-like deceleration
  inertia: [0.23, 1, 0.32, 1] as const,
};

// Transition presets
export const transitions = {
  // Default smooth transition
  smooth: {
    duration: 0.6,
    ease: easing.smooth,
  } as Transition,
  // Fast micro-interactions
  fast: {
    duration: 0.2,
    ease: easing.smooth,
  } as Transition,
  // Slow cinematic reveals
  cinematic: {
    duration: 1.2,
    ease: easing.cinematic,
  } as Transition,
  // Bouncy button interactions
  bounce: {
    duration: 0.4,
    ease: easing.bounce,
  } as Transition,
  // Stagger children
  stagger: {
    staggerChildren: 0.08,
    delayChildren: 0.1,
  },
  // Slow stagger for hero sections
  heroStagger: {
    staggerChildren: 0.15,
    delayChildren: 0.3,
  },
};

// Animation variants
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easing.cinematic,
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easing.smooth,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easing.overshoot,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easing.cinematic,
    },
  },
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easing.cinematic,
    },
  },
};

// Staggered container variants
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

// Stagger item variant
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easing.cinematic,
    },
  },
};

// Magnetic hover effect for buttons
export const magneticHover = {
  scale: 1.04,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 17,
  },
};

export const magneticTap = {
  scale: 0.97,
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 20,
  },
};

// Lift with shadow effect
export const liftWithShadow: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    transition: {
      duration: 0.3,
      ease: easing.smooth,
    },
  },
  hover: {
    y: -4,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
    transition: {
      duration: 0.3,
      ease: easing.smooth,
    },
  },
};

// Parallax layer configurations
export const parallaxConfig = {
  slow: { speed: 0.3 },
  medium: { speed: 0.5 },
  fast: { speed: 0.8 },
};

// Viewport settings for scroll animations
export const viewportSettings = {
  once: true,
  amount: 0.2,
  margin: "-100px 0px",
};

// Count-up animation configuration
export const countUpConfig = {
  duration: 2,
  ease: easing.cinematic,
};
