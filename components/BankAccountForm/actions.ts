"use server";

import { redirect } from "next/navigation";
import { fetchCreateBankAccount } from "@/components/BankAccountForm/services";
import { BankAccountFormValues } from "@/components/BankAccountForm/types";
import { AccountType, Currency } from "@/components/BankAccountCard/types";
import { generateBankAccountId } from "@/components/BankAccountCard/utils";

export const createBankAccount = async (data: BankAccountFormValues) => {
    const { currency, accountType, description } = data;
    /**
     * Normally id and balance should be generated on api level.
     * Only generating it on the client because of the mocked backend.
     */
    const id = generateBankAccountId();

    await fetchCreateBankAccount({
        id,
        ownerId: 1,
        balance: 0,
        currency: currency as Currency,
        type: accountType as AccountType,
        description,
    });

    redirect("/");
};
