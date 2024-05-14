import { BankAccount } from "../BankAccountCard/types";

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
