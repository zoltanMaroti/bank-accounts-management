import React from "react";
import dynamic from "next/dynamic";
import { fetchBankAccounts } from "@/components/BankAccounts/services";

const BankAccounts = dynamic(
    () => import("@/components/BankAccounts/BankAccounts")
);

export default async function Home() {
    const accounts = await fetchBankAccounts();

    if (!accounts) {
        // TODO: show no accounts found message
    }

    return (
        <div>
            <BankAccounts initialAccounts={accounts} />
        </div>
    );
}
