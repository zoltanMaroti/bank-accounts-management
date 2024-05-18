import { BankAccount, Currency } from "@/components/BankAccountCard/types";

export type CurrencyConversion = {
    [key in Currency]: {
        [key in Currency]: number;
    };
};

export type TransferFundsFormValues = {
    sourceAccount: BankAccount;
    targetAccount: BankAccount;
    targetAmount: number;
    targetCurrency: Currency;
};

export type Transaction = {
    sourceAccountId: string;
    targetAccountId: string;
    targetAmount: number;
    targetCurrency: Currency;
};
