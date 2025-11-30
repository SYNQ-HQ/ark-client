import { lazy, Suspense, ComponentType } from "react";
import { motion } from "framer-motion";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ark-cream">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-ark-orange to-ark-magenta"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.p
          className="text-sm text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}

export function lazyLoad<T extends ComponentType<{}>>(
  importFn: () => Promise<{ default: T }>
) {
  const LazyComponent = lazy(importFn);
  
  return function LazyLoadedComponent(props: any) {
    return (
      <Suspense fallback={<PageLoader />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export const LazyHome = lazyLoad(() => import("@/pages/Home"));
export const LazyToken = lazyLoad(() => import("@/pages/Token"));
export const LazyImpact = lazyLoad(() => import("@/pages/Impact"));
export const LazyCalendar = lazyLoad(() => import("@/pages/Calendar"));
export const LazyAbout = lazyLoad(() => import("@/pages/About"));
export const LazyWhitepaper = lazyLoad(() => import("@/pages/Whitepaper"));
export const LazyDonate = lazyLoad(() => import("@/pages/Donate"));
export const LazyNominate = lazyLoad(() => import("@/pages/Nominate"));
export const LazyContact = lazyLoad(() => import("@/pages/Contact"));
export const LazyPrivacy = lazyLoad(() => import("@/pages/Privacy"));
export const LazyTerms = lazyLoad(() => import("@/pages/Terms"));
