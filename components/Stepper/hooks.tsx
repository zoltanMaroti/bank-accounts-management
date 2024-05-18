import { useState } from "react";
import { Steps } from "@/components/Stepper/types";

export const useStepper = ({
    steps,
    trigger,
    callback,
}: {
    steps: Steps;
    trigger: any;
    callback: () => void;
}) => {
    const [currentStep, setCurrentStep] = useState(0);

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    const nextStep = async () => {
        const fields = steps[currentStep].fields;
        const output = await trigger(fields, { shouldFocus: true });

        if (!output) {
            return;
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep((step) => step + 1);
        } else if (currentStep === steps.length - 1) {
            callback();
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep((step) => step - 1);
        }
    };

    return {
        currentStep,
        previousStep,
        nextStep,
        isFirstStep,
        isLastStep,
    };
};
