import { Currency } from "@/components/BankAccountCard/types";

export type BankAccountFormValues = {
    accountType: string;
    currency: string;
    description: string;
};

export type CurrencyOption = { value: Currency; label: Currency };
