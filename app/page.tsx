import React from "react";
import dynamic from "next/dynamic";

const BankAccounts = dynamic(
    () => import("@/components/BankAccounts/BankAccounts")
);

export default function Home() {
    return (
        <div>
            <BankAccounts />
        </div>
    );
}
