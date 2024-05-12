import React from "react";
import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import { fetchBankAccounts } from "@/components/BankAccounts/services";
import HorizontalScroll from "@/components/HorizontalScroll/HorizontalScroll";
import CreateBankAccount from "@/components/CreateBankAccount/CreateBankAccount";
import SearchBankAccount from "@/components/SearchBankAccount/SearchBankAccount";

const BankAccounts = async () => {
    const accounts = await fetchBankAccounts();

    return (
        <section className='flex flex-col gap-4 m-2'>
            <div className='flex justify-between items-center'>
                <h1 className='flex-1 text-2xl font-bold'>Your accounts</h1>
                <SearchBankAccount />
            </div>
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