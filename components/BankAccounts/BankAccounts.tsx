"use client";

import React from "react";
import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import HorizontalScroll from "@/components/HorizontalScroll/HorizontalScroll";
import CreateBankAccountButton from "@/components/CreateBankAccountButton/CreateBankAccountButton";
import SearchBankAccount from "@/components/SearchBankAccount/SearchBankAccount";
import { BankAccount } from "@/components/BankAccountCard/types";
import { useSearch } from "@/components/BankAccounts/hooks";

const BankAccounts = ({
    initialAccounts,
}: {
    initialAccounts: BankAccount[];
}) => {
    const { searchResult, isPending, onChangeSearchTerm } = useSearch();

    return (
        <section className='flex flex-col gap-4 m-2'>
            <div className='flex justify-between items-center'>
                <h1 className='flex-1 text-2xl font-bold'>Your accounts</h1>
                <SearchBankAccount onChange={onChangeSearchTerm} />
            </div>

            {searchResult.length ? (
                <HorizontalScroll>
                    {searchResult.map(
                        ({
                            id,
                            ownerId,
                            currency,
                            balance,
                            accountType,
                            description,
                        }) => (
                            <BankAccountCard
                                key={id}
                                id={id}
                                ownerId={ownerId}
                                currency={currency}
                                balance={balance}
                                accountType={accountType}
                                description={description}
                            />
                        )
                    )}
                </HorizontalScroll>
            ) : (
                <div className='flex gap-2'>
                    <CreateBankAccountButton />
                    <HorizontalScroll>
                        {initialAccounts.map(
                            ({
                                id,
                                ownerId,
                                currency,
                                balance,
                                accountType,
                                description,
                            }) => (
                                <BankAccountCard
                                    key={id}
                                    id={id}
                                    ownerId={ownerId}
                                    currency={currency}
                                    balance={balance}
                                    accountType={accountType}
                                    description={description}
                                />
                            )
                        )}
                    </HorizontalScroll>
                </div>
            )}
        </section>
    );
};

export default BankAccounts;
