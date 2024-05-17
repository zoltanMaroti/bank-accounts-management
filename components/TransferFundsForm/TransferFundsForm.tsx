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
import Label from "@/components/Label/Label";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import CurrencyConversionInfo from "@/components/TransferFundsForm/components/CurrencyConversionInfo";
import Title from "@/components/Title/Title";
import Button from "@/components/Button/Button";

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
    const [targetAccountId, setTargetAccountId] = useState<string>();
    const [targetCurrency, setTargetCurrency] =
        useState<Currency>(DEFAULT_CURRENCY);

    const onChangeSourceAccount = useCallback(
        (id: string) => {
            setSourceAccountId(id);
            setTargetAccountId(undefined);
            setFormValue("destinationAccountId", "");
        },
        [setFormValue]
    );

    const onChangeDestinationAccount = useCallback((id: string) => {
        setTargetAccountId(id);
    }, []);

    const onChangeCurrency = useCallback((currency: Currency) => {
        setTargetCurrency(currency);
    }, []);

    const onSubmit: SubmitHandler<TransferFundsFormValues> = (data) => {
        startTransition(() => {
            console.log(data);
        });
    };

    const eligibleTargetAccounts = useMemo(
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
        targetCurrency
    );

    const currencyConvertedBalance = convertBalanceToCurrency(
        sourceAccount?.balance,
        currencyMultiplier
    );

    const showCurrencyConversion =
        sourceAccount &&
        targetCurrency &&
        targetCurrency !== sourceAccount.currency;

    return (
        <section className='relative bg-white rounded-md p-4 mt-6 w-full flex flex-col gap-3'>
            <Title
                title='Transfer funds'
                subTitle='Deposit funds into an account'
            />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-3'
            >
                <BankAccountSelector
                    label='Transfer from'
                    name='sourceAccountId'
                    control={control}
                    accounts={accounts}
                    hasError={!!errors?.sourceAccountId}
                    onChange={onChangeSourceAccount}
                />

                {sourceAccountId && (
                    <BankAccountSelector
                        id={sourceAccountId}
                        label='Transfer to'
                        name='destinationAccountId'
                        control={control}
                        accounts={eligibleTargetAccounts}
                        hasError={!!errors?.destinationAccountId}
                        onChange={onChangeDestinationAccount}
                    />
                )}

                {targetAccountId && (
                    <div>
                        <Label
                            htmlFor='amountToTransfer'
                            label='Enter amount'
                            hasError={!!errors?.amountToTransfer}
                        />
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
                                            targetCurrency
                                        ),
                                    })}
                                />
                            </div>
                            <CurrencySelector onChange={onChangeCurrency} />
                        </div>

                        <ErrorMessage
                            htmlFor='amountToTransfer'
                            hasError={!!errors?.amountToTransfer}
                            message={errors?.amountToTransfer?.message}
                        />
                    </div>
                )}

                {showCurrencyConversion && (
                    <CurrencyConversionInfo
                        sourceCurrency={sourceAccount?.currency}
                        targetCurrency={targetCurrency}
                        multiplier={currencyMultiplier}
                    />
                )}

                <Button type='submit'>Continue</Button>
            </form>
        </section>
    );
};

export default TransferFundsForm;
