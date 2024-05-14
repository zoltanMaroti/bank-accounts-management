import { BankAccount } from "@/components/BankAccountCard/types";

export const fetchDeleteBankAccount = async (
    id: string
): Promise<BankAccount> => {
    return fetch(`${process.env.API_URL}/accounts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .catch((error) => {
            // Handle error, log to Sentry etc.
            console.error("Failed to delete bank account");
        });
};
