import { BankAccount } from "@/components/BankAccountCard/types";

export const fetchBankAccounts = async (): Promise<BankAccount[]> => {
    const response = await fetch(`${process.env.API_URL}/accounts`);

    if (!response.ok) {
        // Handle error, log to Sentry etc.
        console.error("Failed to fetch bank accounts");
    }

    return response.json();
};
