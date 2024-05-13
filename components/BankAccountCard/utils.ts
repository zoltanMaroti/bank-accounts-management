import { Currency } from "@/components/BankAccountCard/types";

export const formatCurrency = (
    currency: Currency,
    amount: number,
    options?: Intl.NumberFormatOptions
) => {
    if (!currency || !amount) {
        return;
    }

    return new Intl.NumberFormat("en", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
        ...options,
    }).format(amount);
};
