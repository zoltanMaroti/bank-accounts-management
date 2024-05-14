"use client";

import React, {
    useState,
    useTransition,
    useCallback,
    ChangeEvent,
} from "react";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import BankAccountTypeSelector from "@/components/BankAccountTypeSelector/BankAccountTypeSelector";
import { BankAccountFormValues } from "@/components/BankAccountForm/types";
import { AccountType, Currency } from "@/components/BankAccountCard/types";
import { BankAccount } from "@/components/BankAccountCard/types";

const BankAccountForm = ({
    bankAccount,
    callback,
}: {
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
        bankAccount?.accountType || "savings"
    );

    const {
        register,
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

    const onChangeCurrency = (e: ChangeEvent<HTMLSelectElement>) =>
        setCurrency(e.target.value as Currency);

    const onChangeAccountType = useCallback(
        (value: AccountType) => {
            setFormValue("accountType", value);
            setAccountType(value);
        },
        [setFormValue]
    );

    return (
        <>
            <BankAccountCard
                id={bankAccount?.id || ""}
                ownerId={1}
                currency={currency}
                balance={bankAccount?.balance || 0}
                accountType={accountType}
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
                    defaultValue={accountType}
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
                    defaultValue={currency}
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
                    defaultValue={description}
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
