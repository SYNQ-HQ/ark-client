import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonProps {
  magneticStrength?: number;
  scaleOnHover?: number;
  children: React.ReactNode;
}

export default function MagneticButton({
  magneticStrength = 0.3,
  scaleOnHover = 1.04,
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? scaleOnHover : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 15,
        mass: 0.5,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="inline-block"
    >
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-shadow duration-300",
          isHovered && "shadow-lg shadow-ark-orange/20",
          className
        )}
        {...props}
      >
        <motion.span
          className="relative z-10 flex items-center gap-2"
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-ark-orange to-ark-magenta opacity-0"
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Button>
    </motion.div>
  );
}

// Magnetic link variant
interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function MagneticLink({ href, children, className, external }: MagneticLinkProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setPosition({
      x: (e.clientX - centerX) * 0.15,
      y: (e.clientY - centerY) * 0.15,
    });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "relative inline-block transition-colors duration-300",
        className
      )}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
    >
      <span className="relative">
        {children}
        <motion.span
          className="absolute bottom-0 left-0 h-[1px] bg-current origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </span>
    </motion.a>
  );
}
