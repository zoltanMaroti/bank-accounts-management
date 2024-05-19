"use server";

import { TransferFundsFormValues } from "@/components/TransferFundsForm/types";
import { redirect } from "next/navigation";
import { fetchCreateTransaction } from "@/components/TransferFundsForm/services";
import { fetchUpdateBankAccount } from "@/components/BankAccountForm/services";
import { revalidatePath } from "next/cache";

export const createTransaction = async (data: TransferFundsFormValues) => {
    const { sourceAccount, targetAccount, targetAmount, targetCurrency } = data;

    const sourceAccountBalance = +sourceAccount.balance - +targetAmount;
    const targetAccountBalance = +targetAccount.balance + +targetAmount;
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
