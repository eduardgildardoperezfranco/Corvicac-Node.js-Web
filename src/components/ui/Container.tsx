import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "full";
    padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export default function Container({
    children,
    className = "",
    as: Component = "div",
    maxWidth = "7xl",
    padding = "md"
}: ContainerProps) {
    const maxWidthClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
        "8xl": "max-w-8xl",
        "9xl": "max-w-9xl",
        "full": "max-w-full",
    };

    const paddingClasses = {
        none: "px-0",
        sm: "px-2 sm:px-3",
        md: "px-3 sm:px-4",
        lg: "px-4 sm:px-6",
        xl: "px-6 sm:px-8",
    };

    return (
        <Component
            className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`}
            role="presentation"
        >
            {children}
        </Component>
    );
}
