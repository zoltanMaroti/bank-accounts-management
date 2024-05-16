"use client";

import React, { useState, useMemo, useTransition, useCallback } from "react";
import MoneyIcon from "@/assets/icons/money.svg";
import CurrencySelector from "@/components/CurrencySelector/CurrencySelector";
import { BankAccount, Currency } from "@/components/BankAccountCard/types";
import {
    CurrencyConversion,
    TransferFundsFormValues,
} from "@/components/TransferFundsForm/types";
import { DEFAULT_CURRENCY } from "@/components/CurrencySelector/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    convertBalanceToCurrency,
    getCurrencyMultiplier,
    hasSufficientFunds,
} from "@/components/TransferFundsForm/utils";
import BankAccountSelector from "@/components/BankAccountSelector/BankAccountSelector";
import { twMerge } from "tailwind-merge";

const TransferFundsForm = ({
    accounts,
    currencyConversion,
}: {
    accounts: BankAccount[];
    currencyConversion: CurrencyConversion;
}) => {
    const {
        register,
        control,
        setValue: setFormValue,
        handleSubmit,
        formState: { errors },
    } = useForm<TransferFundsFormValues>();

    const [isPending, startTransition] = useTransition();
    const [sourceAccountId, setSourceAccountId] = useState<string>();
    const [destinationAccountId, setDestinationAccountId] = useState<string>();
    const [selectedCurrency, setSelectedCurrency] =
        useState<Currency>(DEFAULT_CURRENCY);

    const onChangeSourceAccount = useCallback(
        (id: string) => {
            setSourceAccountId(id);
            setDestinationAccountId(undefined);
            setFormValue("destinationAccountId", "");
        },
        [setFormValue]
    );

    const onChangeDestinationAccount = useCallback((id: string) => {
        setDestinationAccountId(id);
    }, []);

    const onChangeCurrency = useCallback((currency: Currency) => {
        setSelectedCurrency(currency);
    }, []);

    const onSubmit: SubmitHandler<TransferFundsFormValues> = (data) => {
        startTransition(() => {
            console.log(data);
        });
    };

    const eligibleDestinationAccounts = useMemo(
        () => accounts.filter((account) => account.id !== sourceAccountId),
        [accounts, sourceAccountId]
    );

    const sourceAccount = useMemo(
        () => accounts.find((account) => account.id === sourceAccountId),
        [accounts, sourceAccountId]
    );

    const currencyMultiplier = getCurrencyMultiplier(
        currencyConversion,
        sourceAccount?.currency,
        selectedCurrency
    );

    const currencyConvertedBalance = convertBalanceToCurrency(
        sourceAccount?.balance,
        currencyMultiplier
    );

    const showCurrencyConversion =
        selectedCurrency &&
        sourceAccount &&
        selectedCurrency !== sourceAccount.currency;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='relative bg-white rounded-md p-4 mt-6 w-full flex flex-col gap-3'
        >
            <h1 className='flex-1 text-xl font-bold text-center'>
                Transfer funds
            </h1>
            <p className='text-center'>Deposit funds into an account</p>
            <hr className='border mb-2' />

            <BankAccountSelector
                label='Transfer from'
                name='sourceAccountId'
                control={control}
                accounts={accounts}
                hasError={!!errors?.sourceAccountId}
                onChange={onChangeSourceAccount}
            />

            {sourceAccountId ? (
                <BankAccountSelector
                    id={sourceAccountId}
                    label='Transfer to'
                    name='destinationAccountId'
                    control={control}
                    accounts={eligibleDestinationAccounts}
                    hasError={!!errors?.destinationAccountId}
                    onChange={onChangeDestinationAccount}
                />
            ) : null}

            {destinationAccountId ? (
                <div>
                    <label
                        htmlFor='amountToTransfer'
                        className={twMerge(
                            "block mb-2 text-sm text-gray-900",
                            errors?.amountToTransfer && "text-red-700"
                        )}
                    >
                        Enter amount
                    </label>
                    <div className='w-full mx-auto flex'>
                        <div className='relative w-full'>
                            <div className='absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none'>
                                <MoneyIcon className='w-4 h-4 text-gray-500' />
                            </div>
                            <input
                                id='amountToTransfer'
                                type='number'
                                className={twMerge(
                                    "block p-2.5 w-full z-20 ps-10 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-r-0 border-gray-300 focus:ring-blue-500 focus:border-blue-50",
                                    errors?.amountToTransfer &&
                                        "border-red-700 border-r-1 focus:ring-red-700 focus:border-red-700 outline-none"
                                )}
                                placeholder='Enter amount'
                                {...register("amountToTransfer", {
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                    validate: hasSufficientFunds(
                                        currencyConvertedBalance,
                                        selectedCurrency
                                    ),
                                })}
                            />
                        </div>

                        <CurrencySelector onChange={onChangeCurrency} />
                    </div>

                    {errors?.amountToTransfer ? (
                        <label className='block mt-2 text-sm text-red-700'>
                            {errors?.amountToTransfer.message}
                        </label>
                    ) : null}
                </div>
            ) : null}

            {showCurrencyConversion ? (
                <p className='text-sm text-gray-500 text-center'>
                    <span>1 {sourceAccount?.currency} </span>
                    <span>
                        ~ {currencyMultiplier} {selectedCurrency}
                    </span>
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
