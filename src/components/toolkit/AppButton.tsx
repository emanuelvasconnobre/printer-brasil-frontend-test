import { ButtonHTMLAttributes, ReactNode } from "react";

export type AppButtonVariantOptions = {
    primary: string;
    secondary: string;
    borded: string;
};

type Props = ButtonHTMLAttributes<HTMLElement> & {
    children: ReactNode | string;
    className?: string;
    variant?: keyof AppButtonVariantOptions;
};

export function AppButton({ variant = "secondary", className = "", children, ...props }: Props) {
    const primaryClassName =
        "text-white border border-primary-light bg-primary px-3 py-2 hover:bg-primary-light active:bg-primary-dark";
    const secondaryClassName =
        "text-white border border-secondary-light bg-secondary px-3 py-2 hover:bg-secondary-light active:bg-secondary";
    const bordedClassName =
        "text-primary hover:text-white active:text-white border border-primary active:bg-primary px-3 py-2 hover:bg-secondary-light active:bg-secondary";

    const variantOptions: AppButtonVariantOptions = {
        primary: primaryClassName,
        secondary: secondaryClassName,
        borded: bordedClassName,
    };

    return (
        <button
            className={`${variantOptions[variant]} rounded-lg ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
