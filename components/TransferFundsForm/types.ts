import { Currency } from "@/components/BankAccountCard/types";

export type CurrencyConversion = {
    [key in Currency]: {
        [key in Currency]: number;
    };
};

export type TransferFundsFormValues = {
    amountToTransfer: number;
    sourceAccountId: string;
    destinationAccountId: string;
};
