import { Currency } from "../BankAccountCard/types";
import { formatCurrency } from "../BankAccountCard/utils";
import { CurrencyConversion } from "../TransferFundsForm/types";

export const hasSufficientFunds = (
    currencyConvertedSourceBalance: number,
    selectedCurrency: Currency
) => {
    return (value: number) => {
        if (currencyConvertedSourceBalance >= value) {
            return true;
        }
        return `You do not have enough funds to transfer ${formatCurrency(
            selectedCurrency,
            value
        )}`;
    };
};

export const getCurrencyMultiplier = (
    currencyConversion: CurrencyConversion,
    sourceCurrency: Currency | undefined,
    selectedCurrency: Currency
) => {
    if (!sourceCurrency) {
        return 1;
    }

    return currencyConversion[sourceCurrency][selectedCurrency];
};

export const convertBalanceToCurrency = (
    sourceBalance: number | undefined,
    currencyMultiplier: number
) => {
    if (!sourceBalance) {
        return 0;
    }

    return sourceBalance * currencyMultiplier;
};
