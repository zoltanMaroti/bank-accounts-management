"use client";

import React, { useTransition } from "react";
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

    const {
        clearErrors,
        register,
        setValue,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<BankAccountFormValues>();

    const onSubmit: SubmitHandler<BankAccountFormValues> = (data) => {
        startTransition(() => {
            callback(data);
        });
    };

    return (
        <>
            <BankAccountCard
                id={0}
                ownerId={1}
                currency={(getValues("currency") as Currency) || ""}
                balance={0}
                type={(getValues("accountType") as AccountType) || "savings"}
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
                    onChange={setValue}
                    hasError={!!errors?.accountType}
                    clearErrors={clearErrors}
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
                >
                    <option value=''>Please choose an option</option>
                    <option value='EUR'>Euro</option>
                    <option value='USD'>US Dollar</option>
                    <option value='GBP'>British Pound</option>
                </Select>
                <Input
                    type='text'
                    id='description'
                    placeholder='Add description'
                    label='Account description (optional)'
                    hasError={!!errors?.description}
                    errorMessage={errors?.description?.message}
                    {...register("description")}
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
