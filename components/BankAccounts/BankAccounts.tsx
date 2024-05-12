import React from "react";
import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import { fetchBankAccounts } from "@/components/BankAccounts/services";
import HorizontalScroll from "@/components/HorizontalScroll/HorizontalScroll";
import CreateBankAccount from "@/components/CreateBankAccount/CreateBankAccount";

const BankAccounts = async () => {
    const accounts = await fetchBankAccounts();

    return (
        <section className='m-2'>
            <h1 className='text-xl mb-2'>My accounts</h1>
            <div className='flex gap-2'>
                <CreateBankAccount />
                <HorizontalScroll>
                    {accounts.map(
                        ({ id, ownerId, currency, balance, type }) => (
                            <BankAccountCard
                                key={id}
                                id={id}
                                ownerId={ownerId}
                                currency={currency}
                                balance={balance}
                                type={type}
                            />
                        )
                    )}
                </HorizontalScroll>
            </div>
        </section>
    );
};

export default BankAccounts;
