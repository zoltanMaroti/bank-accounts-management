"use server";

import { TransferFundsFormValues } from "@/components/TransferFundsForm/types";
import { redirect } from "next/navigation";
import { fetchCreateTransaction } from "@/components/TransferFundsForm/services";
import { fetchUpdateBankAccount } from "@/components/BankAccountForm/services";

export const createTransaction = async (data: TransferFundsFormValues) => {
    const { sourceAccount, targetAccount, targetAmount, targetCurrency } = data;

    const sourceAccountBalance = +sourceAccount.balance - +targetAmount;
    const targetAccountBalance = +targetAccount.balance + +targetAmount;

    /**
     * Updating bank account balance should only happen on api level.
     * It's only implemented here to demonstrate the integration with mocked BE.
     */
    await Promise.all([
        fetchCreateTransaction({
            sourceAccountId: sourceAccount.id,
            targetAccountId: targetAccount.id,
            targetAmount,
            targetCurrency,
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

    redirect("/");
};
