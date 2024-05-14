import React from "react";
import { BankAccountCardProps } from "@/components/BankAccountCard/types";
import { formatCurrency } from "@/components/BankAccountCard/utils";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import SavingsIcon from "@/assets/icons/savings.svg";
import CurrencyIcon from "@/assets/icons/currency.svg";
import SalaryIcon from "@/assets/icons/salary.svg";

const bankAccountIcons = {
    savings: <SavingsIcon className='w-6 h-6' />,
    currency: <CurrencyIcon className='w-6 h-6' />,
    salary: <SalaryIcon className='w-6 h-6' />,
};

const BankAccountCard = ({
    id,
    ownerId,
    currency,
    balance,
    type,
    className,
    description,
}: BankAccountCardProps) => {
    return (
        <Link
            href={`/account/${id}`}
            className={twMerge(
                "flex flex-col justify-between relative bg-white h-40 min-w-64 p-3 rounded-md bg-cover text-white snap-start",
                className
            )}
            style={{
                backgroundImage: `url(/images/accounts/${type}.png)`,
            }}
        >
            <div>
                <p className='capitalize'>{type}</p>
                <p className='text-sm font-light'>{description}</p>
            </div>

            <p className='text-xl font-semibold'>
                {currency ? formatCurrency(currency, balance) : null}
            </p>
            <span className='absolute bottom-4 right-4'>
                {bankAccountIcons[type]}
            </span>
        </Link>
    );
};

export default BankAccountCard;
