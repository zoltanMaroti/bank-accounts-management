"use server";

import { redirect } from "next/navigation";
import { BankAccount } from "@/components/BankAccountCard/types";
import { fetchDeleteBankAccount } from "@/components/DeleteBankAccountButton/services";
import { hasBalance } from "@/components/DeleteBankAccountButton/utils";
import { revalidatePath } from "next/cache";

export const deleteBankAccount = async (account: BankAccount) => {
    if (!account.id) {
        return;
    }
    const { id, balance } = account;
    // Protection against deleting account with balance
    if (hasBalance(balance)) {
        throw new Error("Can't delete account with balance");
    }

    await fetchDeleteBankAccount(id!);

    revalidatePath("/");
    redirect("/");
};
