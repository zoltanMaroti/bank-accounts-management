"use client";

import React, { useEffect, useState } from "react";
import SavingsIcon from "@/assets/icons/savings.svg";
import CurrencyIcon from "@/assets/icons/currency.svg";
import SalaryIcon from "@/assets/icons/salary.svg";
import { twMerge } from "tailwind-merge";
import { UseFormRegister } from "react-hook-form";
import { BankAccountFormValues } from "@/components/BankAccountForm/types";
import { AccountType } from "@/components/BankAccountCard/types";
import { DEFAULT_BANK_ACCOUNT_TYPE } from "@/components/BankAccountForm/constants";

const BankAccountTypeSelector = ({
    onChange,
    hasError,
    register,
    defaultValue,
}: {
    onChange: (value: AccountType) => void;
    register: UseFormRegister<BankAccountFormValues>;
    hasError: boolean;
    defaultValue?: string;
}) => {
    const [accountType, setAccountType] = useState("");

    const onSelectAccountType = (value: string) => {
        setAccountType(value);
        onChange(value as AccountType);
    };

    useEffect(() => {
        // Register component ref in form
        register("accountType", { required: true });

        // Set local state default value
        setAccountType(defaultValue || DEFAULT_BANK_ACCOUNT_TYPE);

        // Callback
        onChange((defaultValue as AccountType) || DEFAULT_BANK_ACCOUNT_TYPE);
    }, [register, onChange, defaultValue]);

    return (
        <div>
            <label
                className={twMerge(
                    "block mb-2 text-sm text-gray-900",
                    hasError && "text-red-700"
                )}
            >
                Choose account type
            </label>
            <div className='text-sm font-medium text-center text-gray-500 rounded-lg inline-flex shadow-sm w-full'>
                <label
                    htmlFor='savings'
                    className={twMerge(
                        "cursor-pointer w-full inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700}",
                        hasError && "border-red-500",
                        accountType === "savings"
                            ? "text-blue-700 bg-gray-100"
                            : "text-gray-900 bg-white"
                    )}
                >
                    <input
                        type='radio'
                        id='savings'
                        name='savings'
                        className='hidden'
                        checked={accountType === "savings"}
                        onChange={() => onSelectAccountType("savings")}
                    />
                    <SavingsIcon className='w-4 h-4 me-2' />
                    Savings
                </label>
                <label
                    htmlFor='currency'
                    className={twMerge(
                        "cursor-pointer w-full inline-flex items-center px-4 py-2 text-sm font-medium border-t border-b border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700",
                        hasError && "border-red-500",
                        accountType === "currency"
                            ? "text-blue-700 bg-gray-100"
                            : "text-gray-900 bg-white"
                    )}
                >
                    <input
                        type='radio'
                        id='currency'
                        name='currency'
                        className='hidden'
                        checked={accountType === "currency"}
                        onChange={() => onSelectAccountType("currency")}
                    />
                    <CurrencyIcon className='w-4 h-4 me-2' />
                    Currency
                </label>
                <label
                    htmlFor='salary'
                    className={twMerge(
                        "cursor-pointer w-full inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700",
                        hasError && "border-red-500",
                        accountType === "salary"
                            ? "text-blue-700 bg-gray-100"
                            : "text-gray-900 bg-white"
                    )}
                >
                    <input
                        type='radio'
                        id='salary'
                        name='salary'
                        className='hidden'
                        checked={accountType === "salary"}
                        onChange={() => onSelectAccountType("salary")}
                    />
                    <SalaryIcon className='w-4 h-4 me-2' />
                    Salary
                </label>
            </div>
            {hasError ? (
                <label className='block mt-2 text-sm text-red-700'>
                    This field is required
                </label>
            ) : null}
        </div>
    );
};

export default BankAccountTypeSelector;
