import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";


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

const Button = ({
    children,
    variant = "shiny",
    width,
    height,
    className,
    disabled = false,
    onClick,
    ...props
}) => {
    const isGradient = variant === "gradient";
    const isShiny = variant === "shiny";


    const handleKeyDown = (e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.(e);
        }
    };

    if (isGradient) {
        const commonGradientStyles = `
      relative rounded-xl cursor-pointer hover:after:opacity-100
      after:content-[""] after:block after:absolute after:bg-[var(--color-primary)]
      after:inset-[5px] after:rounded-xl after:z-[1]
      after:transition-opacity after:duration-300 after:ease-linear
      flex items-center justify-center
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `;

        return (
            <div className="text-[#eee] text-center">
                <div
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    className={cn(`${commonGradientStyles} rotatingGradient`, className)}
                    style={{
                        "--r": "0deg",
                        width: width || "90px",
                        height: height || "40px",
                    }}
                    onClick={disabled ? undefined : onClick}
                    onKeyDown={handleKeyDown}
                    aria-disabled={disabled}
                    {...props}
                >
                    <span className="relative z-10 text-white flex items-center justify-center label font-bold">
                        {children}
                    </span>
                </div>
            </div>
        );
    }


    return (
        <motion.button
            {...shinyAnimationProps}
            disabled={disabled}
            onClick={onClick}
            className={cn(
                `
        group
        relative
        overflow-hidden
        rounded-full
        hover:cursor-pointer
        border

        border-primary
        bg-background-light
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
        disabled:opacity-50
        disabled:cursor-not-allowed
        `,
                className
            )}
            style={{
                width: width || "16rem", // maps to w-64
                height: height || "3.5rem", // maps to h-14
            }}
            {...props}
        >
            {/* White Moving Shine */}
            <motion.span
                className="absolute inset-y-0 -left-[150%] w-[60%] pointer-events-none"
                style={{
                    background:
                        "linear-gradient(120deg, transparent, rgba(255,255,255,0.65), transparent)",
                    transform: "skewX(-20deg) translateX(var(--x))",
                    width: "200%",
                }}
            />

            <span className="relative z-10 transition-colors duration-300 group-hover:text-white font-bold">
                {children}
            </span>
        </motion.button>
    );
};

export default Button;