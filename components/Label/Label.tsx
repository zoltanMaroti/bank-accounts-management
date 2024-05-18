import React from "react";
import { twMerge } from "tailwind-merge";

const Label = ({
    htmlFor,
    label,
    hasError,
    className,
}: {
    htmlFor?: string;
    label: string;
    hasError?: boolean;
    className?: string;
}) => {
    return (
        <label
            htmlFor={htmlFor}
            className={twMerge(
                "block mb-2 text-sm text-gray-900",
                hasError && "text-red-700",
                className
            )}
        >
            {label}
        </label>
    );
};

export default Label;
