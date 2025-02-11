"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";

interface DockVariantProps extends VariantProps<typeof dockVariants> {
  className?: string;
}

interface DockIconProps {
  children: React.ReactNode;
  mousex?: MotionValue<number>;
  magnification?: number;
  distance?: number;
  className?: string;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full border",
  {
    variants: {},
    defaultVariants: {},
  }
);

export function Dock({ className, children }: DockVariantProps & { children: React.ReactNode }) {
  const mousex = useMotionValue<number>(Infinity);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          mousex,
          magnification: DEFAULT_MAGNIFICATION,
          distance: DEFAULT_DISTANCE,
        } as DockIconProps);
      }
      return child;
    });
  };

  return (
    <motion.div
      onMouseMove={(e) => mousex.set(e.pageX)}
      onMouseLeave={() => mousex.set(Infinity)}
      className={cn(dockVariants({ className }))}
    >
      {renderChildren()}
    </motion.div>
  );
}

Dock.displayName = "Dock";

export function DockIcon({ 
  children, 
  mousex, 
  magnification = DEFAULT_MAGNIFICATION, 
  distance = DEFAULT_DISTANCE, 
  className 
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionX = mousex ?? useMotionValue(Infinity); // ← Corrección aquí

  const distanceCalc = useTransform(motionX, (val: number) => {
    if (!ref.current) return 0;
    const bounds = ref.current.getBoundingClientRect();
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [40, magnification, 40]);

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
