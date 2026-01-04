import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: "default" | "elevated" | "outlined" | "filled";
    hoverable?: boolean;
    clickable?: boolean;
}

export default function Card({
    children,
    className = "",
    variant = "default",
    hoverable = true,
    clickable = false,
    ...props
}: CardProps) {
    const baseStyles = "rounded-xl transition-all duration-300";

    const variants = {
        default: "bg-white border border-gray-100",
        elevated: "bg-white shadow-lg hover:shadow-xl",
        outlined: "bg-white border-2 border-gray-200",
        filled: "bg-gray-50 border border-gray-100"
    };

    const hoverStyles = hoverable
        ? "hover:-translate-y-1 hover:shadow-xl hover:border-gray-200"
        : "";

    const clickableStyles = clickable
        ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:ring-offset-2"
        : "";

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${clickableStyles} ${className}`}
            role={clickable ? "button" : "region"}
            tabIndex={clickable ? 0 : undefined}
            {...props}
        >
            {children}
        </div>
    );
}

// Card sub-components for better composition
export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`px-6 py-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`px-6 py-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`px-6 py-4 border-t border-gray-100 ${className}`}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <h3 className={`text-xl font-semibold text-[var(--color-primary-deep)] ${className}`}>
            {children}
        </h3>
    );
}

export function CardDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={`text-sm text-gray-600 ${className}`}>
            {children}
        </p>
    );
}