"use client";

import React, { useState, useMemo, ChangeEvent } from "react";
import MoneyIcon from "@/assets/icons/money.svg";
import CurrencySelector from "@/components/CurrencySelector/CurrencySelector";
import { BankAccount } from "@/components/BankAccountCard/types";
import Select from "@/components/Select/Select";

const TransferFundsForm = ({ accounts }: { accounts: BankAccount[] }) => {
    const [sourceAccountId, setSourceAccountId] = useState<string>();
    const [destinationAccountId, setDestinationAccountId] = useState<string>();

    const onChangeFromAccount = (e: ChangeEvent<HTMLSelectElement>) =>
        setSourceAccountId(e.target.value);

    const onChangeToAccount = (e: ChangeEvent<HTMLSelectElement>) =>
        setDestinationAccountId(e.target.value);

    const eligibleDestinationAccounts = useMemo(
        () => accounts.filter((account) => account.id !== sourceAccountId),
        [accounts, sourceAccountId]
    );

    return (
        <form className='relative bg-white rounded-md p-4 mt-6 w-full flex flex-col gap-3'>
            <h1 className='flex-1 text-xl font-bold text-center'>
                Transfer funds
            </h1>
            <p>Deposit funds into an account</p>
            <hr className='border mb-2' />

            <Select
                id='from'
                label='Transfer from'
                hasError={false}
                errorMessage={""}
                onChange={onChangeFromAccount}
            >
                <option value=''>Please choose an option</option>
                {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                        {account.currency}: {account.accountType} -{" "}
                        {account.description}
                    </option>
                ))}
            </Select>

            {sourceAccountId ? (
                <Select
                    id='from'
                    label='Transfer to'
                    hasError={false}
                    errorMessage={""}
                    onChange={onChangeToAccount}
                >
                    <option value=''>Please choose an option</option>
                    {eligibleDestinationAccounts.map((account) => (
                        <option key={account.id} value={account.id}>
                            {account.currency}: {account.accountType} -{" "}
                            {account.description}
                        </option>
                    ))}
                </Select>
            ) : null}

            <div className='w-full mx-auto flex'>
                <div className='relative w-full'>
                    <div className='absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none'>
                        <MoneyIcon className='w-4 h-4 text-gray-500' />
                    </div>
                    <input
                        type='number'
                        className='block p-2.5 w-full z-20 ps-10 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-50'
                        placeholder='Enter amount'
                    />
                </div>
                <CurrencySelector />
            </div>
        </form>
    );
};

export default TransferFundsForm;
