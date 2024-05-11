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
            className={`flex flex-col justify-between bg-white h-40 w-64 p-2 rounded-md shadow-xl bg-cover text-white`}
            style={{
                backgroundImage: `url(/images/accounts/${type}.png)`,
            }}
        >
            <div>
                <div className='capitalize'>{type}</div>
                <div>{id}</div>
            </div>
            <div className='text-xl font-semibold'>
                {formatCurrency(currency, balance)}
            </div>
        </Link>
    );
};

export default BankAccountCard;
