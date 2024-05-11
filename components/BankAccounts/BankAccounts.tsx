import React from "react";
import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import { fetchBankAccounts } from "@/components/BankAccounts/services";
import HorizontalScroll from "@/components/HorizontalScroll/HorizontalScroll";

const BankAccounts = async () => {
    const accounts = await fetchBankAccounts();

    return (
        <HorizontalScroll>
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
        </HorizontalScroll>
    );
};

export default BankAccounts;
