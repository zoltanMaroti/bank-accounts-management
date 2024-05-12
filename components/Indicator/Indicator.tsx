import React from "react";
import { twMerge } from "tailwind-merge";

const Indicator = ({
    value,
    className,
}: {
    value: number | string;
    className?: string;
}) => {
    return (
        <span
            className={twMerge(
                "inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full",
                className
            )}
        >
            {value}
        </span>
    );
};

export default Indicator;
