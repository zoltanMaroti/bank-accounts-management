import React from "react";
import dynamic from "next/dynamic";
import { fetchBankAccounts } from "@/components/BankAccounts/services";
import NoBankAccountMessage from "@/components/NoBankAccountMessage/NoBankAccountMessage";
import { fetchTransactions } from "@/components/Transactions/services";

const BankAccounts = dynamic(
    () => import("@/components/BankAccounts/BankAccounts")
);

const Transactions = dynamic(
    () => import("@/components/Transactions/Transactions")
);

export default async function Home() {
    const [accounts, transactions] = await Promise.all([
        fetchBankAccounts(),
        fetchTransactions(),
    ]);

    if (!accounts || !accounts.length) {
        return <NoBankAccountMessage />;
    }

    return (
        <div className='flex flex-col gap-3'>
            <BankAccounts initialAccounts={accounts} />
            <Transactions transactions={transactions} />
        </div>
    );
}
