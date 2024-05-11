import React from "react";
import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import { fetchBankAccounts } from "@/components/BankAccounts/services";

const BankAccounts = async () => {
    const accounts = await fetchBankAccounts();

    return (
        <section className='flex gap-2'>
            {accounts.map(({ id, ownerId, currency, balance, type }) => (
                <BankAccountCard
                    key={id}
                    id={id}
                    ownerId={ownerId}
                    currency={currency}
                    balance={balance}
                    type={type}
                />
            ))}
        </section>
    );
};

export default BankAccounts;
