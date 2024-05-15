import { CurrencyConversion } from "@/components/TransferFundsForm/types";

export const fetchCurrencyConversion =
    async (): Promise<CurrencyConversion> => {
        const response = await fetch(
            `${process.env.API_URL}/currencyConversion`
        );

        if (!response.ok) {
            // Handle error, log to Sentry etc.
            console.error("Failed to fetch currency conversion");
        }

        return response.json();
    };
