import React from "react";

const ErrorMessage = ({
    htmlFor,
    hasError,
    message,
}: {
    htmlFor?: string;
    hasError: boolean;
    message?: string;
}) => {
    if (!hasError || !message) {
        return;
    }

    return (
        <label htmlFor={htmlFor} className='block mt-2 text-sm text-red-700'>
            {message}
        </label>
    );
};

export default ErrorMessage;
