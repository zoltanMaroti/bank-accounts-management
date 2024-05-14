"use server";

import { redirect } from "next/navigation";
import { BankAccount } from "@/components/BankAccountCard/types";
import { fetchDeleteBankAccount } from "@/components/DeleteBankAccountButton/services";
import { verifyBalance } from "@/components/DeleteBankAccountButton/utils";

export const deleteBankAccount = async (account: BankAccount) => {
    if (!account.id) {
        return;
    }
    const { id, balance } = account;
    // Protection against deleting account with balance
    verifyBalance(balance);

    await fetchDeleteBankAccount(id!);
    redirect("/");
};
