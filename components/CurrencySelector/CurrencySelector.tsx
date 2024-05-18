"use client";

import React, { useState, ReactNode, FocusEvent } from "react";
import ChevronIcon from "@/assets/icons/chevron.svg";
import UsdIcon from "@/assets/icons/usd.svg";
import EurIcon from "@/assets/icons/eur.svg";
import GbpIcon from "@/assets/icons/gbp.svg";
import { Currency } from "@/components/BankAccountCard/types";
import { TransferFundsFormValues } from "@/components/TransferFundsForm/types";
import {
    DEFAULT_CURRENCY,
    currencies,
} from "@/components/CurrencySelector/constants";
import { Control, Controller } from "react-hook-form";

const currencyIcons: { [key in Currency]: ReactNode } = {
    USD: <UsdIcon className='h-4 w-4 me-2' />,
    EUR: <EurIcon className='h-4 w-4 me-2' />,
    GBP: <GbpIcon className='h-4 w-4 me-2' />,
};

const CurrencySelector = ({
    name,
    control,
}: {
    name: keyof TransferFundsFormValues;
    control: Control<TransferFundsFormValues, any>;
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const onClickCurrency = (
        currency: Currency,
        fieldOnChange: (value: any) => void
    ) => {
        fieldOnChange(currency);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);

    const onBlur = (e: FocusEvent<HTMLButtonElement>) => {
        if (
            e.relatedTarget &&
            (e.relatedTarget as HTMLButtonElement).type === "button"
        ) {
            return;
        }
        setIsDropdownOpen(false);
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={DEFAULT_CURRENCY}
            render={({ field }) => {
                const selectedCurrency = field.value as Currency;

                return (
                    <div>
                        <button
                            type='button'
                            onClick={toggleDropdown}
                            onBlur={onBlur}
                            className='min-w-28 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100'
                        >
                            {currencyIcons[selectedCurrency]}
                            {selectedCurrency}{" "}
                            <ChevronIcon className='w-2.5 h-2.5 ms-2.5' />
                        </button>

                        {isDropdownOpen ? (
                            <div className='absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36'>
                                <ul className='py-2 text-sm text-gray-700'>
                                    {currencies.map((currency) => (
                                        <li key={currency}>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    onClickCurrency(
                                                        currency,
                                                        field.onChange
                                                    )
                                                }
                                                className='inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                            >
                                                <div className='inline-flex items-center'>
                                                    {currencyIcons[currency]}
                                                    {currency}
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                );
            }}
        />
    );
};

export default CurrencySelector;
