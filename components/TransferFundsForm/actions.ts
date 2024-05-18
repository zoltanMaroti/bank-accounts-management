"use server";

import { TransferFundsFormValues } from "@/components/TransferFundsForm/types";
import { redirect } from "next/navigation";
import { fetchCreateTransaction } from "@/components/TransferFundsForm/services";

export const createTransaction = async (data: TransferFundsFormValues) => {
    const { sourceAccount, targetAccount, targetAmount, targetCurrency } = data;

    await fetchCreateTransaction({
        sourceAccountId: sourceAccount.id,
        targetAccountId: targetAccount.id,
        targetAmount,
        targetCurrency,
    });

    redirect("/");
};
