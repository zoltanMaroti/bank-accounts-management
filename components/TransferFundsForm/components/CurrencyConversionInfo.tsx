import { Currency } from "@/components/BankAccountCard/types";
import React from "react";

const CurrencyConversionInfo = ({
    sourceCurrency,
    multiplier,
    targetCurrency,
}: {
    sourceCurrency: Currency;
    multiplier: number;
    targetCurrency: Currency;
}) => {
    return (
        <p className='text-sm text-gray-500 text-center'>
            <span>1 {sourceCurrency} </span>
            <span>
                ~ {multiplier} {targetCurrency}
            </span>
        </p>
    );
};

export default CurrencyConversionInfo;
