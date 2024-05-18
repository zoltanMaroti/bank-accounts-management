import { Steps } from "@/components/Stepper/types";

export const steps: Steps = [
    {
        name: "Details",
        fields: [
            "targetAmount",
            "sourceAccount",
            "targetAccount",
            "targetCurrency",
        ],
    },
    { name: "Review" },
];
