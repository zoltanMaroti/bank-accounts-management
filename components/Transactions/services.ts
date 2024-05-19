import { Transaction } from "@/components/TransferFundsForm/types";

export const fetchTransactions = async (): Promise<Transaction[]> => {
    const response = await fetch(`${process.env.API_URL}/transactions`);

    if (!response.ok) {
        // Handle error, log to Sentry etc.
        console.error("Failed to fetch transactions");
    }

    return response.json();
};
