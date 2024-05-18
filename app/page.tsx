import React from "react";
import dynamic from "next/dynamic";
import { fetchBankAccounts } from "@/components/BankAccounts/services";
import NoBankAccountMessage from "@/components/NoBankAccountMessage/NoBankAccountMessage";

const BankAccounts = dynamic(
    () => import("@/components/BankAccounts/BankAccounts")
);

export default async function Home() {
    const accounts = await fetchBankAccounts();

    if (!accounts || !accounts.length) {
        return <NoBankAccountMessage />;
    }

    return (
        <div>
            <BankAccounts initialAccounts={accounts} />
        </div>
    );
}
