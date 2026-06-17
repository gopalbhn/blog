import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "-100%" },
  animate: { "--x": "250%" },
  whileTap: { scale: 0.97 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    duration: 3,
    ease: "linear",
  },
};

const ShinyButton = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      {...animationProps}
      {...props}
      className={cn(
        `
        group
        relative
        overflow-hidden
        rounded-[50px]
        hover:cursor-pointer
        border

        border-primary
        bg-background-light
        h-14
        w-64
        font-medium
        uppercase
        tracking-wide
        text-primary
        transition-all
        duration-300
        hover:bg-primary
        hover:text-white
        hover:shadow-[0_8px_25px_rgba(161,86,73,0.25)]
        hover:-translate-y-0.5
        `,
        className
      )}
    >
      {/* White Moving Shine */}
      <motion.span
        className="absolute inset-y-0 -left-[150%] w-[60%] pointer-events-none "
        style={{
          background:
            "linear-gradient(120deg, transparent, rgba(255,255,255,0.65), transparent)",
          transform: "skewX(-20deg) translateX(var(--x))",
          width:"200%",
        }}
      />

      <span className="relative z-10 transition-colors duration-300 group-hover:text-white font-bold">
        {children}
      </span>
    </motion.button>
  );
};

export default ShinyButton;