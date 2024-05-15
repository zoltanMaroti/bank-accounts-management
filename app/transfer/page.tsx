import React from "react";
import TransferFundsForm from "@/components/TransferFundsForm/TransferFundsForm";
import { fetchBankAccounts } from "@/components/BankAccounts/services";

export default async function TransferPage() {
    const accounts = await fetchBankAccounts();

    if (!accounts) {
        // TODO show error message
    }

    return (
        <section className='m-2 flex flex-col items-center'>
            <div className='w-96'>
                <TransferFundsForm accounts={accounts} />
            </div>
        </section>
    );
}
