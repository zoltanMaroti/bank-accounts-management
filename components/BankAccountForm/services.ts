import { BankAccount } from "@/components/BankAccountCard/types";
import { BankAccountFormValues } from "./types";

export const fetchCreateBankAccount = (data: BankAccount) => {
    return fetch(`${process.env.API_URL}/accounts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => {
            // Handle error, log to Sentry etc.
            console.error("Failed to create bank account");
        });
};

export const fetchUpdateBankAccount = async (
    data: BankAccountFormValues,
    id: string
): Promise<BankAccount> => {
    return fetch(`${process.env.API_URL}/accounts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => {
            // Handle error, log to Sentry etc.
            console.error("Failed to update bank account");
        });
};
