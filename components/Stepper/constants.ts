import { Steps } from "@/components/Stepper/types";

export const steps: Steps = [
    {
        name: "Details",
        fields: ["targetAmount", "sourceAccountId", "targetAccountId"],
    },
    { name: "Review" },
];
