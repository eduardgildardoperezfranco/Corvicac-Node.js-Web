import React from "react";

interface AlertProps {
    variant?: "default" | "destructive" | "success" | "warning" | "info";
    title?: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
    onDismiss?: () => void;
    dismissible?: boolean;
}

export default function Alert({
    variant = "default",
    title,
    description,
    children,
    className = "",
    onDismiss,
    dismissible = false
}: AlertProps) {
    const variants = {
        default: "bg-blue-50 border-blue-200 text-blue-800",
        destructive: "bg-red-50 border-red-200 text-red-800",
        success: "bg-green-50 border-green-200 text-green-800",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        info: "bg-blue-50 border-blue-200 text-blue-800"
    };

    const iconVariants = {
        default: "text-blue-500",
        destructive: "text-red-500",
        success: "text-green-500",
        warning: "text-yellow-500",
        info: "text-blue-500"
    };

    const icons = {
        default: "ℹ",
        destructive: "✕",
        success: "✓",
        warning: "⚠",
        info: "ℹ"
    };

    return (
        <div
            className={`relative border rounded-lg p-4 ${variants[variant]} ${className}`}
            role="alert"
            aria-live={dismissible ? "polite" : "assertive"}
        >
            <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${iconVariants[variant]}`}>
                    {icons[variant]}
                </div>
                <div className="flex-1">
                    {title && (
                        <h4 className="font-semibold mb-1">{title}</h4>
                    )}
                    {description && (
                        <p className="text-sm opacity-90">{description}</p>
                    )}
                    {children && (
                        <div className="mt-2">{children}</div>
                    )}
                </div>
                {dismissible && (
                    <button
                        onClick={onDismiss}
                        className="absolute top-2 right-2 p-1 rounded-md hover:bg-black/10 transition-colors"
                        aria-label="Cerrar alerta"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}