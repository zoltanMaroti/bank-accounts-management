import React from "react";
import CurrencyIcon from "@/assets/icons/currency.svg";
import Link from "next/link";

const NoBankAccountMessage = () => {
    return (
        <div className='flex flex-col items-center text-center mt-4'>
            <CurrencyIcon className='h-14 w-14 mb-2 text-gray-400' />
            <p className='text-lg font-bold'>You have no bank accounts</p>
            <Link href={"/account/open"} className='text-gray-600'>
                Click here to open a new account
            </Link>
        </div>
    );
};

export default NoBankAccountMessage;
