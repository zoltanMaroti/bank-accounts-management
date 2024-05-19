"use client";

import React, {
    useMemo,
    useTransition,
    useCallback,
    ChangeEventHandler,
} from "react";
import MoneyIcon from "@/assets/icons/money.svg";
import CurrencySelector from "@/components/CurrencySelector/CurrencySelector";
import { BankAccount } from "@/components/BankAccountCard/types";
import {
    CurrencyConversion,
    TransferFundsFormValues,
} from "@/components/TransferFundsForm/types";
import { DEFAULT_CURRENCY } from "@/components/CurrencySelector/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    convertBalanceToCurrency,
    getCurrencyMultiplier,
} from "@/components/TransferFundsForm/utils";
import BankAccountSelector from "@/components/BankAccountSelector/BankAccountSelector";
import { twMerge } from "tailwind-merge";
import Label from "@/components/Label/Label";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import CurrencyConversionInfo from "@/components/TransferFundsForm/components/CurrencyConversionInfo";
import Title from "@/components/Title/Title";
import Button from "@/components/Button/Button";
import Stepper from "@/components/Stepper/Stepper";
import { useStepper } from "@/components/Stepper/hooks";
import { steps } from "@/components/Stepper/constants";
import ReviewTransfer from "@/components/TransferFundsForm/components/ReviewTransfer";
import { MINIMUM_TRANSFER_AMOUNT } from "@/components/TransferFundsForm/constants";
import { validateTargetAmount } from "@/components/TransferFundsForm/validation";
import { createTransaction } from "@/components/TransferFundsForm/actions";

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
        watch,
        trigger,
        clearErrors,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm<TransferFundsFormValues>();

    const sourceAccount = watch("sourceAccount");
    const targetAccount = watch("targetAccount");
    const targetAmount = watch("targetAmount", 0);
    const targetCurrency = watch("targetCurrency", DEFAULT_CURRENCY);

    const [isPending, startTransition] = useTransition();

    const onSubmit: SubmitHandler<TransferFundsFormValues> = (data) => {
        startTransition(async () => {
            await createTransaction(data);
        });
    };

    const { currentStep, previousStep, nextStep, isFirstStep, isLastStep } =
        useStepper({
            steps,
            trigger,
            callback: handleSubmit(onSubmit),
        });

    const onChangeSourceAccount = useCallback(() => {
        clearErrors("sourceAccount");

        // Reset target account id to prevent selecting the source as target
        resetField("targetAccount");
    }, [clearErrors, resetField]);

    const onChangeTargetAccount = useCallback(
        () => clearErrors("targetAccount"),
        [clearErrors]
    );

    const onChangeTargetAmount: ChangeEventHandler<HTMLInputElement> =
        useCallback(() => clearErrors("targetAmount"), [clearErrors]);

    const eligibleTargetAccounts = useMemo(
        () => accounts.filter((account) => account.id !== sourceAccount?.id),
        [accounts, sourceAccount]
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

    const showReviewTransfer =
        isLastStep && sourceAccount && targetAccount && targetAmount;

    return (
        <section className='relative bg-white rounded-md p-4 mt-6 w-full flex flex-col gap-3'>
            <Stepper steps={steps} currentStep={currentStep} />
            <Title
                title='Transfer funds'
                subTitle='Deposit funds into an account'
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-3'
            >
                {isFirstStep && (
                    <>
                        <BankAccountSelector
                            label='Transfer from'
                            name='sourceAccount'
                            control={control}
                            accounts={accounts}
                            hasError={!!errors?.sourceAccount}
                            onChange={onChangeSourceAccount}
                            defaultValue={sourceAccount}
                            value={sourceAccount}
                        />

                        {sourceAccount && (
                            <BankAccountSelector
                                id={sourceAccount.id}
                                label='Transfer to'
                                name='targetAccount'
                                control={control}
                                accounts={eligibleTargetAccounts}
                                hasError={!!errors?.targetAccount}
                                onChange={onChangeTargetAccount}
                                value={targetAccount}
                                defaultValue={targetAccount}
                            />
                        )}

                        {targetAccount && (
                            <div>
                                <Label
                                    htmlFor='targetAmount'
                                    label='Enter amount'
                                    hasError={!!errors?.targetAmount}
                                />
                                <div className='w-full mx-auto flex'>
                                    <div className='relative w-full'>
                                        <div className='absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none'>
                                            <MoneyIcon className='w-4 h-4 text-gray-500' />
                                        </div>
                                        <input
                                            data-testid='target-amount'
                                            id='targetAmount'
                                            type='number'
                                            min={MINIMUM_TRANSFER_AMOUNT}
                                            className={twMerge(
                                                "block p-2.5 w-full z-20 ps-10 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-r-0 border-gray-300 focus:ring-blue-500 focus:border-blue-50",
                                                errors?.targetAmount &&
                                                    "border-red-700 border-r-1 focus:ring-red-700 focus:border-red-700 outline-none"
                                            )}
                                            placeholder='Enter amount'
                                            {...register(
                                                "targetAmount",
                                                validateTargetAmount(
                                                    targetCurrency,
                                                    currencyConvertedBalance
                                                )
                                            )}
                                            onChange={onChangeTargetAmount}
                                        />
                                    </div>
                                    <CurrencySelector
                                        control={control}
                                        name='targetCurrency'
                                    />
                                </div>

                                <ErrorMessage
                                    htmlFor='targetAmount'
                                    hasError={!!errors?.targetAmount}
                                    message={errors?.targetAmount?.message}
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
                    </>
                )}

                {showReviewTransfer && (
                    <ReviewTransfer
                        sourceAccount={sourceAccount}
                        targetAccount={targetAccount}
                        targetAmount={targetAmount}
                        targetCurrency={targetCurrency}
                    />
                )}

                <Button
                    data-testid='submit-button'
                    type='button'
                    onClick={nextStep}
                    disabled={isPending}
                >
                    {isLastStep
                        ? isPending
                            ? "Transferring..."
                            : "Transfer"
                        : "Continue"}
                </Button>

                {!isFirstStep && (
                    <button
                        data-testid='back-button'
                        type='button'
                        onClick={previousStep}
                        disabled={isPending}
                    >
                        Back
                    </button>
                )}
            </form>
        </section>
    );
};

export default TransferFundsForm;
