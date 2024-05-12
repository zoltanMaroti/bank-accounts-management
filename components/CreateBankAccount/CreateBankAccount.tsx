import Link from "next/link";
import React from "react";
import AddIcon from "@/assets/icons/plus.svg";

const CreateBankAccount = () => {
    return (
        <Link
            href={"/create-account"}
            className='flex flex-col h-40 min-w-48 p-3 rounded-md shadow-xl bg-neutral-300'
        >
            <div className='flex flex-1 items-center justify-center'>
                <AddIcon className='h-8 w-8' />
            </div>

            <div>
                <p>Open account</p>
                <p className='text-stone-500 text-sm'>
                    Savings, currency, salary
                </p>
            </div>
        </Link>
    );
};

export default CreateBankAccount;
