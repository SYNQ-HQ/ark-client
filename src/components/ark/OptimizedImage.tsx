import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { easing } from "@/lib/motion";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
}

export default function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  aspectRatio = "video",
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  const shouldLoad = priority || isInView;

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-ark-cream/50",
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-ark-cream via-white to-ark-cream"
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 100%" }}
        />
      )}
      
      {shouldLoad && !hasError && (
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          animate={isLoaded ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: easing.cinematic }}
        />
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-ark-cream">
          <span className="text-muted-foreground text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

export function BackgroundImage({
  src,
  children,
  className,
  overlayOpacity = 0.5,
}: {
  src: string;
  children?: React.ReactNode;
  className?: string;
  overlayOpacity?: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  useEffect(() => {
    if (isInView) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    }
  }, [src, isInView]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: easing.cinematic }}
      />
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
