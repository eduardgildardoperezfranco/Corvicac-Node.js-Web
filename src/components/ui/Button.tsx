'use client';

import React from "react";

interface BaseButtonProps {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

interface ButtonElementProps extends BaseButtonProps {
    href?: never;
}

interface AnchorElementProps extends BaseButtonProps {
    href: string;
}

type ButtonProps = ButtonElementProps | AnchorElementProps;

const ButtonContent = React.forwardRef<
    HTMLButtonElement | HTMLAnchorElement,
    ButtonProps & { forwardedRef?: React.Ref<any> }
>(({ variant = "primary", size = "md", children, className = "", disabled = false, href, onClick, forwardedRef, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary-green)] disabled:opacity-50 disabled:cursor-not-allowed";

    const sizes = {
        sm: "px-3 py-2 text-sm rounded-lg",
        md: "px-4 py-2.5 text-base rounded-lg",
        lg: "px-6 py-3 text-lg rounded-xl"
    };

    const variants = {
        primary: "bg-[var(--color-primary-green)] text-white hover:bg-[var(--color-primary-deep)] shadow-sm hover:shadow-md",
        secondary: "bg-[var(--color-primary-gold)] text-[var(--color-primary-black)] hover:bg-[var(--color-primary-gold)]/90 shadow-sm hover:shadow-md",
        outline: "border-2 border-[var(--color-primary-green)] text-[var(--color-primary-green)] hover:bg-[var(--color-secondary-soft-gray)] hover:border-[var(--color-primary-deep)]",
        ghost: "bg-transparent text-[var(--color-primary-black)] hover:bg-gray-100 hover:text-[var(--color-primary-green)]"
    };

    const activeStyles = {
        primary: "active:scale-95",
        secondary: "active:scale-95",
        outline: "active:scale-95",
        ghost: "active:scale-95"
    };

    const combinedRef = React.useMemo(() => {
        return (node: HTMLButtonElement | HTMLAnchorElement) => {
            if (typeof forwardedRef === 'function') {
                forwardedRef(node);
            } else if (forwardedRef) {
                (forwardedRef as React.MutableRefObject<HTMLButtonElement | HTMLAnchorElement | null>).current = node;
            }
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLButtonElement | HTMLAnchorElement | null>).current = node;
            }
        };
    }, [forwardedRef, ref]);

    // If href is provided, render as anchor tag
    if (href) {
        return (
            <a
                ref={combinedRef}
                href={href}
                className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${activeStyles[variant]} ${className}`}
                aria-disabled={disabled}
                onClick={onClick}
                {...(props as any)}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            ref={combinedRef}
            className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${activeStyles[variant]} ${className}`}
            disabled={disabled}
            aria-disabled={disabled}
            onClick={onClick}
            {...(props as any)}
        >
            {children}
        </button>
    );
});

ButtonContent.displayName = 'ButtonContent';

export default function Button(props: ButtonProps) {
    return <ButtonContent {...props} />;
}
