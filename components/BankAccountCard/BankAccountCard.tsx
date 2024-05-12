import React from "react";
import { BankAccount } from "@/components/BankAccountCard/types";
import { formatCurrency } from "@/components/BankAccountCard/utils";
import Link from "next/link";

const BankAccountCard = ({
    id,
    ownerId,
    currency,
    balance,
    type,
}: BankAccount) => {
    return (
        <Link
            href={`/account/${id}`}
            className='flex flex-col justify-between bg-white h-40 min-w-64 p-3 rounded-md bg-cover text-white snap-start'
            style={{
                backgroundImage: `url(/images/accounts/${type}.png)`,
            }}
        >
            <div>
                <p className='capitalize'>{type}</p>
                <p>{id}</p>
            </div>
            <p className='text-xl font-semibold'>
                {formatCurrency(currency, balance)}
            </p>
        </Link>
    );
};

export default BankAccountCard;