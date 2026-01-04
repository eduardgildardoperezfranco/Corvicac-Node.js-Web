import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline";
    children: React.ReactNode;
}

export default function Badge({
    children,
    className = "",
    variant = "default",
    ...props
}: BadgeProps) {
    const baseStyles = "inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-semibold transition-colors";

    const variants = {
        default: "bg-[var(--color-primary-green)] text-white",
        secondary: "bg-gray-100 text-gray-800",
        destructive: "bg-red-100 text-red-800",
        outline: "border border-gray-200 text-gray-700"
    };

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${className}`}
            role="status"
            {...props}
        >
            {children}
        </div>
    );
}