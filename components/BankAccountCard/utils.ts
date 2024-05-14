import { Currency } from "@/components/BankAccountCard/types";
import { v4 as uuidv4 } from "uuid";

export const formatCurrency = (
    currency: Currency,
    amount: number,
    options?: Intl.NumberFormatOptions
) => {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
        ...options,
    }).format(amount);
};

export const generateBankAccountId = () => uuidv4();
