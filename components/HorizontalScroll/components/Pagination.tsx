import React from "react";
import { twMerge } from "tailwind-merge";

const Pagination = ({
    pages,
    scrollPosition,
    onClick,
}: {
    pages: number;
    scrollPosition: number;
    onClick: (index: number) => void;
}) => {
    return (
        <div className='flex justify-center'>
            {[...Array(pages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onClick(index)}
                    className={twMerge(
                        "h-2 w-2 rounded-full mx-1",
                        scrollPosition === index ? "bg-gray-800" : "bg-gray-400"
                    )}
                />
            ))}
        </div>
    );
};

export default Pagination;
