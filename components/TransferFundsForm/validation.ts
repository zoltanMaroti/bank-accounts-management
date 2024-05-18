import { MINIMUM_TRANSFER_AMOUNT } from "@/components/TransferFundsForm/constants";
import { formatCurrency } from "@/components/BankAccountCard/utils";
import { Currency } from "@/components/BankAccountCard/types";
import { hasSufficientFunds } from "@/components/TransferFundsForm/utils";

export const validateTargetAmount = (
    targetCurrency: Currency,
    currencyConvertedBalance: number
) => ({
    required: {
        value: true,
        message: "This field is required",
    },
    min: {
        value: MINIMUM_TRANSFER_AMOUNT,
        message: `The minimum transfer amount is ${formatCurrency(
            targetCurrency,
            MINIMUM_TRANSFER_AMOUNT
        )}`,
    },
    validate: hasSufficientFunds(currencyConvertedBalance, targetCurrency),
});
