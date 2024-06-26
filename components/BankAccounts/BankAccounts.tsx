"use client";

import React from "react";
import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import HorizontalScroll from "@/components/HorizontalScroll/HorizontalScroll";
import CreateBankAccountButton from "@/components/CreateBankAccountButton/CreateBankAccountButton";
import SearchBankAccount from "@/components/SearchBankAccount/SearchBankAccount";
import { BankAccount } from "@/components/BankAccountCard/types";
import { useSearch } from "@/components/BankAccounts/hooks";
import FileIcon from "@/assets/icons/file.svg";

const BankAccounts = ({
    initialAccounts,
}: {
    initialAccounts: BankAccount[];
}) => {
    const { searchResult, debouncedSearchTerm, onChangeSearchTerm } =
        useSearch();

    const showCreateAccountButton = !debouncedSearchTerm;
    const hasSearchResult = searchResult.length > 0;
    const noResult = debouncedSearchTerm && !hasSearchResult;
    const accounts = hasSearchResult ? searchResult : initialAccounts;

    return (
        <section className='flex flex-col gap-4 m-2 min-h-64'>
            <div className='flex justify-between items-center'>
                <h1 className='flex-1 text-2xl font-bold'>Your accounts</h1>
                <SearchBankAccount
                    onChange={onChangeSearchTerm}
                    searchTerm={debouncedSearchTerm}
                />
            </div>

            {noResult ? (
                <div className='flex flex-col items-center text-center mt-4'>
                    <FileIcon className='h-14 w-14 mb-2 text-gray-400' />
                    <p className='text-lg font-bold'>
                        No results found for &quot;{debouncedSearchTerm}&quot;
                    </p>
                    <p className='text-gray-600'>
                        Please try again with another keyword
                    </p>
                </div>
            ) : (
                <div className='flex gap-2 w-full'>
                    {showCreateAccountButton ? (
                        <div className='flex-shrink-0'>
                            <CreateBankAccountButton />
                        </div>
                    ) : null}

                    <div className='flex-grow overflow-hidden'>
                        <HorizontalScroll>
                            {accounts.map(
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
                </div>
            )}
        </section>
    );
};

export default BankAccounts;
