import React from "react";
import TransferFundsForm from "@/components/TransferFundsForm/TransferFundsForm";
import { fetchBankAccounts } from "@/components/BankAccounts/services";
import { fetchCurrencyConversion } from "@/components/TransferFundsForm/services";
import NoBankAccountMessage from "@/components/NoBankAccountMessage/NoBankAccountMessage";

export default async function TransferPage() {
    const [accounts, currencyConversion] = await Promise.all([
        fetchBankAccounts(),
        fetchCurrencyConversion(),
    ]);

    if (!accounts || !accounts.length) {
        return <NoBankAccountMessage />;
    }

    return (
        <section className='m-2 flex flex-col items-center'>
            <div className='w-96'>
                <TransferFundsForm
                    accounts={accounts}
                    currencyConversion={currencyConversion}
                />
            </div>
        </section>
    );
}
