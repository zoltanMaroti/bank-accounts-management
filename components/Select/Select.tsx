import React, { forwardRef, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    hasError?: boolean;
    errorMessage?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ name, label, hasError, errorMessage, ...props }, ref) => {
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
                <select
                    name={name}
                    className={twMerge(
                        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
                        hasError &&
                            "bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 outline-none"
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

Select.displayName = "Select";

export default Select;
