"use client";

import React, {
    useState,
    useTransition,
    useCallback,
    ChangeEvent,
} from "react";
import Input from "@/components/Input/Input";
import { SingleValue } from "react-select";
import { useForm, SubmitHandler } from "react-hook-form";
import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import BankAccountTypeSelector from "@/components/BankAccountTypeSelector/BankAccountTypeSelector";
import {
    BankAccountFormValues,
    CurrencyOption,
} from "@/components/BankAccountForm/types";
import { AccountType, Currency } from "@/components/BankAccountCard/types";
import { BankAccount } from "@/components/BankAccountCard/types";
import { DEFAULT_BANK_ACCOUNT_TYPE } from "@/components/BankAccountForm/constants";
import DeleteBankAccountButton from "@/components/DeleteBankAccountButton/DeleteBankAccountButton";
import { hasBalance } from "@/components/DeleteBankAccountButton/utils";
import Title from "@/components/Title/Title";
import Button from "@/components/Button/Button";
import CurrencySelector from "@/components/BankAccountForm/components/CurrencySelector";

const BankAccountForm = ({
    title,
    bankAccount,
    callback,
}: {
    title: string;
    bankAccount?: BankAccount;
    callback: (
        data: BankAccountFormValues,
        id?: string
    ) => Promise<BankAccount | never>;
}) => {
    const [isPending, startTransition] = useTransition();
    const [description, setDescription] = useState(bankAccount?.description);
    const [currency, setCurrency] = useState<Currency>(
        bankAccount?.currency as Currency
    );
    const [accountType, setAccountType] = useState<AccountType>(
        bankAccount?.accountType || DEFAULT_BANK_ACCOUNT_TYPE
    );

    const {
        register,
        control,
        setValue: setFormValue,
        handleSubmit,
        formState: { errors },
    } = useForm<BankAccountFormValues>({
        defaultValues: {
            accountType: bankAccount?.accountType,
            currency: bankAccount?.currency,
            description: bankAccount?.description,
        },
    });

    const onSubmit: SubmitHandler<BankAccountFormValues> = (data) => {
        startTransition(() => {
            callback(data, bankAccount?.id);
        });
    };

    const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) =>
        setDescription(e.target.value);

    const onChangeAccountType = useCallback(
        (value: AccountType) => {
            setFormValue("accountType", value);
            setAccountType(value);
        },
        [setFormValue]
    );

    const onChangeCurrency = useCallback(
        (option: SingleValue<CurrencyOption>) => {
            setCurrency((option?.value as Currency) || "");
        },
        []
    );

    return (
        <>
            <BankAccountCard
                currency={currency}
                balance={bankAccount?.balance || 0}
                accountType={accountType}
                description={description}
                className='pointer-events-none'
            />
            <form
                className='relative bg-white rounded-md p-4 mt-6 w-full flex flex-col gap-3'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Title title={title} />
                {bankAccount && (
                    <div className='absolute top-4 right-4'>
                        <DeleteBankAccountButton
                            bankAccount={bankAccount}
                            isDisabled={hasBalance(bankAccount?.balance)}
                        />
                    </div>
                )}
                <BankAccountTypeSelector
                    onChange={onChangeAccountType}
                    hasError={!!errors?.accountType}
                    register={register}
                    defaultValue={accountType}
                />
                <CurrencySelector
                    control={control}
                    currency={bankAccount?.currency}
                    hasError={!!errors?.currency}
                    onChange={onChangeCurrency}
                />
                <Input
                    {...register("description", {
                        required: "This field is required",
                    })}
                    type='text'
                    id='description'
                    data-testid='account-description'
                    placeholder='Add description'
                    label='Account description'
                    hasError={!!errors?.description}
                    errorMessage={errors?.description?.message}
                    onChange={onChangeDescription}
                    defaultValue={description}
                />

                <Button
                    data-testid='submit-account'
                    type='submit'
                    disabled={isPending}
                >
                    {isPending ? "Saving account..." : "Save account"}
                </Button>
            </form>
        </>
    );
};

export default BankAccountForm;
