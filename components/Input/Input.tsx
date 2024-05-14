import React, { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hasError?: boolean;
    errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ name, type, label, hasError, errorMessage, ...props }, ref) => {
        return (
            <div>
                <label
                    htmlFor={name}
                    className={twMerge(
                        "block mb-2 text-sm text-gray-900",
                        hasError && "text-red-700"
                    )}
                >
                    {label}
                </label>
                <input
                    name={name}
                    type={type}
                    className={twMerge(
                        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
                        hasError &&
                            "bg-red-50 border-red-500 text-red-900 outline-none"
                    )}
                    ref={ref}
                    {...props}
                />
                {hasError && errorMessage ? (
                    <label
                        htmlFor={name}
                        className='block mt-2 text-sm text-red-700'
                    >
                        {errorMessage}
                    </label>
                ) : null}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
