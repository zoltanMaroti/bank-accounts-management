import { Steps } from "@/components/Stepper/types";

export const steps: Steps = [
    {
        name: "Details",
        fields: ["amountToTransfer", "sourceAccountId", "destinationAccountId"],
    },
    { name: "Review" },
];
