import React, { useMemo } from "react";
import Select, { SingleValue } from "react-select";
import { Control, Controller } from "react-hook-form";
import { BankAccountFormValues } from "@/components/BankAccountForm/types";
import { Currency } from "@/components/BankAccountCard/types";
import Label from "@/components/Label/Label";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { currencies } from "@/components/CurrencySelector/constants";
import { CurrencyOption } from "@/components/BankAccountForm/types";

const CurrencySelector = ({
    control,
    currency,
    hasError,
    onChange,
}: {
    control: Control<BankAccountFormValues, any>;
    currency?: Currency;
    hasError: boolean;
    onChange: (option: SingleValue<CurrencyOption>) => void;
}) => {
    const currencyOptions = useMemo(
        () =>
            currencies.map((currency) => ({
                value: currency,
                label: currency,
            })),
        []
    );

    return (
        <div>
            <Label
                htmlFor='currency'
                label={"Choose currency"}
                hasError={hasError}
            />
            <Controller
                name='currency'
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                    <Select
                        {...field}
                        placeholder='Please choose an option'
                        isSearchable={false}
                        options={currencyOptions}
                        defaultValue={currencyOptions.find(
                            (option) => option.value === currency
                        )}
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
                        onChange={(option: SingleValue<CurrencyOption>) => {
                            const selectedValue = option ? option.value : "";
                            field.onChange(selectedValue);
                            onChange(option);
                        }}
                        value={currencyOptions.find(
                            (option) => option.value === field.value
                        )}
                    />
                )}
            />
            <ErrorMessage
                htmlFor='currency'
                hasError={hasError}
                message={"This field is required"}
            />
        </div>
    );
};

export default CurrencySelector;
