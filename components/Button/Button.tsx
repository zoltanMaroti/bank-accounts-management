import React, { forwardRef, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { className, type, children, ...rest } = props;

    return (
        <button
            ref={ref}
            type={type}
            className={twMerge(
                "mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
