"use client";

import React, { useState, useTransition, useCallback } from "react";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import BankAccountTypeSelector from "@/components/BankAccountTypeSelector/BankAccountTypeSelector";
import { BankAccountFormValues } from "@/components/BankAccountForm/types";
import { AccountType, Currency } from "@/components/BankAccountCard/types";
import { BankAccount } from "@/components/BankAccountCard/types";

const BankAccountForm = ({
    callback,
}: {
    callback: (data: BankAccountFormValues) => Promise<BankAccount | never>;
}) => {
    const [isPending, startTransition] = useTransition();
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState<Currency>();
    const [accountType, setAccountType] = useState<AccountType>("savings");

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<BankAccountFormValues>();

    const onSubmit: SubmitHandler<BankAccountFormValues> = (data) => {
        startTransition(() => {
            callback(data);
        });
    };

    const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDescription(e.target.value);

    const onChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setCurrency(e.target.value as Currency);

    const onChangeAccountType = useCallback(
        (value: AccountType) => {
            setValue("accountType", value);
            setAccountType(value);
        },
        [setValue]
    );

    return (
        <>
            <BankAccountCard
                id={"0"}
                ownerId={1}
                currency={currency}
                balance={0}
                type={accountType}
                description={description}
                className='pointer-events-none'
            />
            <form
                className='bg-white rounded-md p-4 mt-6 w-full flex flex-col gap-3'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className='flex-1 text-xl font-bold text-center'>
                    Add new account
                </h1>
                <hr className='border mb-2' />
                <BankAccountTypeSelector
                    onChange={onChangeAccountType}
                    hasError={!!errors?.accountType}
                    register={register}
                />
                <Select
                    id='currency'
                    label='Choose currency'
                    hasError={!!errors.currency}
                    errorMessage={errors.currency?.message}
                    {...register("currency", {
                        required: {
                            value: true,
                            message: "This field is required",
                        },
                    })}
                    onChange={onChangeCurrency}
                >
                    <option value=''>Please choose an option</option>
                    <option value='EUR'>Euro</option>
                    <option value='USD'>US Dollar</option>
                    <option value='GBP'>British Pound</option>
                </Select>
                <Input
                    {...register("description")}
                    type='text'
                    id='description'
                    placeholder='Add description'
                    label='Account description (optional)'
                    hasError={!!errors?.description}
                    errorMessage={errors?.description?.message}
                    onChange={onChangeDescription}
                />
                <button
                    type='submit'
                    disabled={isPending}
                    className='mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                >
                    {isPending ? "Saving account..." : "Save account"}
                </button>
            </form>
        </>
    );
};

export default BankAccountForm;
