import React from "react";

interface FormFieldProps {
    label: string;
    name: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}

export function FormField({ label, name, error, required, children }: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={name}
                className="text-sm font-medium text-[var(--color-primary-black)]"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
            {error && (
                <p className="text-sm text-red-600" role="alert" aria-live="polite">
                    {error}
                </p>
            )}
        </div>
    );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    required?: boolean;
}

export function Input({
    className = "",
    error,
    required,
    label,
    id,
    ...props
}: InputProps) {
    const baseStyles = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-colors";

    return (
        <div className="space-y-2">
            {label && (
                <label
                    htmlFor={id || props.name}
                    className="text-sm font-medium text-[var(--color-primary-black)]"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                id={id || props.name}
                className={`${baseStyles} ${error ? 'border-red-300 focus:ring-red-500' : ''} ${className}`}
                {...props}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id || props.name}-error` : undefined}
            />
            {error && (
                <p
                    id={`${id || props.name}-error`}
                    className="text-sm text-red-600"
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    required?: boolean;
}

export function Textarea({
    className = "",
    error,
    required,
    label,
    id,
    rows = 4,
    ...props
}: TextareaProps) {
    const baseStyles = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-colors resize-vertical";

    return (
        <div className="space-y-2">
            {label && (
                <label
                    htmlFor={id || props.name}
                    className="text-sm font-medium text-[var(--color-primary-black)]"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <textarea
                id={id || props.name}
                rows={rows}
                className={`${baseStyles} ${error ? 'border-red-300 focus:ring-red-500' : ''} ${className}`}
                {...props}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id || props.name}-error` : undefined}
            />
            {error && (
                <p
                    id={`${id || props.name}-error`}
                    className="text-sm text-red-600"
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    required?: boolean;
    options: { value: string; label: string }[];
}

export function Select({
    className = "",
    error,
    required,
    label,
    id,
    options,
    ...props
}: SelectProps) {
    const baseStyles = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-colors bg-white";

    return (
        <div className="space-y-2">
            {label && (
                <label
                    htmlFor={id || props.name}
                    className="text-sm font-medium text-[var(--color-primary-black)]"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <select
                id={id || props.name}
                className={`${baseStyles} ${error ? 'border-red-300 focus:ring-red-500' : ''} ${className}`}
                {...props}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id || props.name}-error` : undefined}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p
                    id={`${id || props.name}-error`}
                    className="text-sm text-red-600"
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export function Checkbox({
    className = "",
    error,
    label,
    id,
    ...props
}: CheckboxProps) {
    return (
        <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
                <input
                    id={id}
                    type="checkbox"
                    className={`w-4 h-4 text-[var(--color-primary-green)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--color-primary-green)] ${className}`}
                    {...props}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
                <span className="text-sm text-[var(--color-primary-black)]">{label}</span>
            </label>
            {error && (
                <p
                    id={`${id}-error`}
                    className="text-sm text-red-600"
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

interface RadioGroupProps {
    name: string;
    label?: string;
    options: { value: string; label: string }[];
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    required?: boolean;
}

export function RadioGroup({
    name,
    label,
    options,
    value,
    onChange,
    error,
    required
}: RadioGroupProps) {
    return (
        <div className="space-y-2">
            {label && (
                <legend className="text-sm font-medium text-[var(--color-primary-black)]">
                    {label} {required && <span className="text-red-500">*</span>}
                </legend>
            )}
            <div className="space-y-2">
                {options.map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange?.(option.value)}
                            className="w-4 h-4 text-[var(--color-primary-green)] bg-gray-100 border-gray-300 focus:ring-[var(--color-primary-green)]"
                            aria-describedby={error ? `${name}-error` : undefined}
                        />
                        <span className="text-sm text-[var(--color-primary-black)]">{option.label}</span>
                    </label>
                ))}
            </div>
            {error && (
                <p
                    id={`${name}-error`}
                    className="text-sm text-red-600"
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </p>
            )}
        </div>
    );
}