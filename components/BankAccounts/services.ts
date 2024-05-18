import { BankAccount } from "@/components/BankAccountCard/types";

export const fetchBankAccounts = async (): Promise<BankAccount[]> => {
    const response = await fetch(`${process.env.API_URL}/accounts`);

    if (!response.ok) {
        // Handle error, log to Sentry etc.
        console.error("Failed to fetch bank accounts");
    }

    return response.json();
};

export const fetchBankAccount = async (id: string | string[]) => {
    const response = await fetch(`${process.env.API_URL}/accounts/${id}`);

    if (!response.ok) {
        // Handle error, log to Sentry etc.
        console.error("Failed to fetch bank account", id);
        return;
    }

    return response.json();
};

export const fetchSearchBankAccount = async (searchTerm: string) => {
    const response = await fetch(
        `${process.env.API_URL}/accounts?q=${searchTerm}`
    );

    if (!response.ok) {
        // Handle error, log to Sentry etc.
        console.error("Failed to search bank account", searchTerm);
    }

    return response.json();
};
