"use server";

import { redirect } from "next/navigation";
import { fetchCreateBankAccount } from "@/components/BankAccountForm/services";
import { BankAccountFormValues } from "@/components/BankAccountForm/types";
import { AccountType, Currency } from "@/components/BankAccountCard/types";

export const createBankAccount = async (data: BankAccountFormValues) => {
    const { currency, accountType, description } = data;

    await fetchCreateBankAccount({
        // Normally id and balance should be generated on api level. Only passing it because of the mocked backend.
        id: 0,
        ownerId: 1,
        balance: 0,
        currency: currency as Currency,
        type: accountType as AccountType,
    });

    redirect("/");
};
