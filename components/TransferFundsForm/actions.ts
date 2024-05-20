"use server";

import {
    CurrencyConversion,
    TransferFundsFormValues,
} from "@/components/TransferFundsForm/types";
import { redirect } from "next/navigation";
import { fetchCreateTransaction } from "@/components/TransferFundsForm/services";
import { fetchUpdateBankAccount } from "@/components/BankAccountForm/services";
import { getCurrencyMultiplier } from "@/components/TransferFundsForm/utils";
import { revalidatePath } from "next/cache";

export const createTransaction = async (
    data: TransferFundsFormValues,
    currencyConversion: CurrencyConversion
) => {
    const { sourceAccount, targetAccount, targetAmount, targetCurrency } = data;

    // Calculate target amount in source currency
    const sourceAccountMultiplier = getCurrencyMultiplier(
        currencyConversion,
        targetCurrency,
        sourceAccount.currency
    );
    const targetAmountInSourceCurrency = targetAmount * sourceAccountMultiplier;

    // Calculate target amount in target currency
    const targetAccountMultiplier = getCurrencyMultiplier(
        currencyConversion,
        targetCurrency,
        targetAccount.currency
    );
    const targetAmountInTargetCurrency = targetAmount * targetAccountMultiplier;

    // Update source account balance
    const sourceAccountBalance =
        +sourceAccount.balance - +targetAmountInSourceCurrency;

    // Update target account balance
    const targetAccountBalance =
        +targetAccount.balance + +targetAmountInTargetCurrency;

    const timestamp = Math.floor(Date.now() / 1000);

    /**
     * Updating bank account balance should only happen on api level.
     * It's only implemented here to demonstrate the integration with mocked BE.
     */
    await Promise.all([
        fetchCreateTransaction({
            targetAmount,
            targetCurrency,
            targetAccount,
            sourceAccount,
            timestamp,
        }),
        fetchUpdateBankAccount(
            { balance: sourceAccountBalance },
            sourceAccount.id
        ),
        fetchUpdateBankAccount(
            { balance: targetAccountBalance },
            targetAccount.id
        ),
    ]);
    revalidatePath("/");
    redirect("/");
};
