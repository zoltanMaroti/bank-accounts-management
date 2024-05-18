"use server";

import { fetchSearchBankAccount } from "@/components/BankAccounts/services";

export const searchAccount = async (searchTerm: string) => {
    return await fetchSearchBankAccount(searchTerm);
};
