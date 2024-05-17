import { Steps } from "@/components/Stepper/types";

export const steps: Steps = [
    {
        name: "Details",
        fields: ["amountToTransfer", "sourceAccountId", "targetAccountId"],
    },
    { name: "Review" },
];
