import React from "react";

interface SkeletonProps {
    className?: string;
    variant?: "rectangular" | "circular" | "text";
    width?: number | string;
    height?: number | string;
    animation?: "pulse" | "wave" | false;
}

export default function Skeleton({
    className = "",
    variant = "rectangular",
    width,
    height,
    animation = "pulse"
}: SkeletonProps) {
    const baseStyles = "bg-gray-200 rounded-md";
    const variants = {
        rectangular: "rounded-md",
        circular: "rounded-full",
        text: "rounded-md h-4"
    };

    const animationClass = animation === "pulse" ? "animate-pulse" :
        animation === "wave" ? "animate-[shimmer_2s_infinite]" : "";

    const style = {
        width,
        height,
    };

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${animationClass} ${className}`}
            style={style}
            role="presentation"
            aria-hidden="true"
        />
    );
}

// Keyframes for shimmer animation
const shimmerKeyframes = `
@keyframes shimmer {
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
}
`;

// Add shimmer animation to document
if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
        .animate-shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200px 100%;
            animation: shimmer 2s infinite;
        }
    `;
    document.head.appendChild(style);
}