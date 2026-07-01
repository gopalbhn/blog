import React from "react";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    `
    inline-flex items-center justify-center whitespace-nowrap
    text-sm font-medium transition-colors outline-offset-2
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70
  
    [&_svg]:pointer-events-none [&_svg]:shrink-0
  `,
    {
        variants: {
            variant: {
                default:
                    "bg-primary px-8 py-2 text-background-light shadow-sm shadow-black/5 hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
                outline:
                    "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",

                // Existing custom variants
                shiny: `
          group relative overflow-hidden rounded-full border border-secondary
          bg-secondary-light font-medium uppercase tracking-wide text-primary
          transition-all duration-300
          hover:bg-secondary hover:text-white
          hover:shadow-[0_8px_25px_rgba(161,86,73,0.25)]
          hover:-translate-y-0.5
        `,

                gradient: `
          relative rounded-xl cursor-pointer
          hover:after:opacity-100
          after:content-['']
          after:block after:absolute
          after:bg-[var(--color-primary)]
          after:inset-[5px]
          after:rounded-xl
          after:z-[1]
          after:transition-opacity
          after:duration-300
          after:ease-linear
          flex items-center justify-center
        `,
                disabled: `
  relative rounded-xl
  flex items-center justify-center

  bg-[#E5E7EB]
  text-[#9CA3AF]
  border border-[#D1D5DB]

  cursor-not-allowed
  pointer-events-none
  shadow-none
`,
            },

            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-lg px-3 text-xs",
                lg: "h-10 rounded-lg px-8",
                icon: "h-9 w-9",
            },
        },

        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const shinyAnimationProps = {
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

export default function Button({
    children,
    variant = "default",
    size = "default",
    className,
    disabled,
    onClick,
    width,
    height,
    ...props
}) {
    if (variant === "gradient") {
        return (
            <div
                role="button"
                tabIndex={disabled ? -1 : 0}
                className={cn(buttonVariants({ variant, size }), "rotatingGradient", className)}
                style={{
                    "--r": "0deg",
                    width: width || "90px",
                    height: height || "40px",
                }}
                onClick={disabled ? undefined : onClick}
                aria-disabled={disabled}
                {...props}
            >
                <span className="relative z-10 text-white font-bold">
                    {children}
                </span>
            </div>
        );
    }

    if (variant === "shiny") {
        return (
            <motion.button
                {...shinyAnimationProps}
                disabled={disabled}
                onClick={onClick}
                className={cn(buttonVariants({ variant, size }), className)}
                style={{
                    width: width || "16rem",
                    height: height || "3.5rem",
                }}
                {...props}
            >
                <motion.span
                    className="absolute inset-y-0 -left-[150%] w-[60%] pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(120deg, transparent, rgba(255,255,255,0.65), transparent)",
                        transform: "skewX(-20deg) translateX(var(--x))",
                        width: "200%",
                    }}
                />

                <span className="relative z-10 font-bold">
                    {children}
                </span>
            </motion.button>
        );
    }

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        >
            {children}
        </button>
    );
}