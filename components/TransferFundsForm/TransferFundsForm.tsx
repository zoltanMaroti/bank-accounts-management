"use client";

import React, { useState, useMemo, ChangeEvent } from "react";
import MoneyIcon from "@/assets/icons/money.svg";
import CurrencySelector from "@/components/CurrencySelector/CurrencySelector";
import { BankAccount, Currency } from "@/components/BankAccountCard/types";
import Select from "@/components/Select/Select";
import { CurrencyConversion } from "@/components/TransferFundsForm/types";
import { DEFAULT_CURRENCY } from "@/components/CurrencySelector/constants";

const TransferFundsForm = ({
    accounts,
    currencyConversion,
}: {
    accounts: BankAccount[];
    currencyConversion: CurrencyConversion;
}) => {
    const [sourceAccountId, setSourceAccountId] = useState<string>();
    const [destinationAccountId, setDestinationAccountId] = useState<string>();
    const [selectedCurrency, setSelectedCurrency] =
        useState<Currency>(DEFAULT_CURRENCY);

    const onChangeSourceAccount = (e: ChangeEvent<HTMLSelectElement>) =>
        setSourceAccountId(e.target.value);

    const onChangeDestinationAccount = (e: ChangeEvent<HTMLSelectElement>) =>
        setDestinationAccountId(e.target.value);

    const onChangeCurrency = (currency: Currency) =>
        setSelectedCurrency(currency);

    const eligibleDestinationAccounts = useMemo(
        () => accounts.filter((account) => account.id !== sourceAccountId),
        [accounts, sourceAccountId]
    );

    const sourceAccount = useMemo(
        () => accounts.find((account) => account.id === sourceAccountId),
        [accounts, sourceAccountId]
    );

    const showCurrencyConversion =
        selectedCurrency &&
        sourceAccount?.currency &&
        selectedCurrency !== sourceAccount?.currency;

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
                onChange={onChangeSourceAccount}
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
                    onChange={onChangeDestinationAccount}
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

            {destinationAccountId ? (
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
                    <CurrencySelector onChange={onChangeCurrency} />
                </div>
            ) : null}

            {showCurrencyConversion ? (
                <p>
                    1 {sourceAccount?.currency} ≈{" "}
                    {
                        currencyConversion[sourceAccount?.currency][
                            selectedCurrency
                        ]
                    }{" "}
                    {selectedCurrency}
                </p>
            ) : null}

            <button
                type='submit'
                className='mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
            >
                Continue
            </button>
        </form>
    );
};

export default TransferFundsForm;
