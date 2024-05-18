import React from "react";
import { twMerge } from "tailwind-merge";
import ArrowsIcon from "@/assets/icons/arrows.svg";
import { Steps } from "@/components/Stepper/types";

const Stepper = ({
    steps,
    currentStep,
}: {
    steps: Steps;
    currentStep: number;
}) => {
    return (
        <ol className='flex items-center gap-4 justify-center w-full p-3 text-sm font-medium text-center cursor-default'>
            {steps.map((step, index) => {
                const isLastItem = index === steps.length - 1;

                return (
                    <React.Fragment key={step.name}>
                        <li
                            className={twMerge(
                                "flex items-center",
                                currentStep >= index
                                    ? "text-blue-800"
                                    : "text-gray-500"
                            )}
                        >
                            <span
                                className={twMerge(
                                    "flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full",
                                    currentStep >= index
                                        ? "border-blue-800"
                                        : "border-gray-500"
                                )}
                            >
                                {index + 1}
                            </span>
                            {step.name}
                        </li>

                        {!isLastItem && (
                            <li>
                                <ArrowsIcon
                                    className={twMerge(
                                        "w-3 h-3",
                                        currentStep > index
                                            ? "text-blue-800"
                                            : "text-gray-500"
                                    )}
                                />
                            </li>
                        )}
                    </React.Fragment>
                );
            })}
        </ol>
    );
};

export default Stepper;
