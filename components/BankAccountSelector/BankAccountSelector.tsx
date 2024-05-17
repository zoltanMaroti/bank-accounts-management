import React, { useEffect, useMemo, useState } from "react";
import Select, { SingleValue } from "react-select";
import { Control, Controller } from "react-hook-form";
import { BankAccount, Currency } from "@/components/BankAccountCard/types";
import { BankAccountOption } from "@/components/BankAccountSelector/types";
import { formatCurrency } from "@/components/BankAccountCard/utils";
import { TransferFundsFormValues } from "@/components/TransferFundsForm/types";
import Label from "@/components/Label/Label";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

const BankAccountSelector = ({
    id,
    name,
    label,
    control,
    accounts,
    hasError,
    onChange,
}: {
    id?: string;
    name: keyof TransferFundsFormValues;
    label: string;
    control: Control<TransferFundsFormValues, any>;
    accounts: BankAccount[];
    hasError: boolean;
    onChange: (id: string) => void;
}) => {
    const [value, setValue] = useState();

    const formatOptionLabel = ({
        currency,
        balance,
        accountType,
        description,
    }: {
        currency: string;
        balance: number;
        accountType: string;
        description?: string;
    }) => (
        <div>
            <div className='flex gap-2 justify-between'>
                <span>
                    <span>{currency} | </span>
                    <span className='capitalize'>{accountType}</span>
                </span>
                <div>{formatCurrency(currency as Currency, balance)}</div>
            </div>
            <div className='text-gray-400 text-sm'>{description}</div>
        </div>
    );

    const options: BankAccountOption[] = useMemo(
        () =>
            accounts.map(
                ({ id, accountType, balance, currency, description }) => ({
                    id,
                    accountType,
                    balance,
                    currency,
                    description,
                })
            ),
        [accounts]
    );

    useEffect(() => {
        // Reset state when id changes
        setValue(undefined);
    }, [id]);

    return (
        <div>
            <Label htmlFor={name} label={label} hasError={hasError} />
            <Controller
                name={name}
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                    <Select
                        {...field}
                        key={id}
                        value={value}
                        classNames={{
                            control: () =>
                                hasError
                                    ? "!border-red-500 !bg-gray-50 !rounded-lg !focus:border-none !shadow-none !p-1"
                                    : "!border-gray-300 !bg-gray-50 !rounded-lg !p-1",
                            option: (state) =>
                                state.isSelected ? "!bg-blue-700" : "bg-white",
                            menu: () => "bg-gray-50 !z-20",
                            placeholder: () => "!text-gray-400 !text-sm",
                        }}
                        isSearchable={false}
                        formatOptionLabel={formatOptionLabel}
                        options={options}
                        placeholder='Please choose an option'
                        getOptionValue={(option) => option.id}
                        onChange={(
                            selectedOption: SingleValue<BankAccountOption>
                        ) => {
                            field.onChange(selectedOption);

                            if (selectedOption) {
                                onChange(`${selectedOption.id}`);
                            }
                        }}
                    />
                )}
            />
            <ErrorMessage
                htmlFor={name}
                hasError={hasError}
                message='This field is required'
            />
        </div>
    );
};

export default BankAccountSelector;
