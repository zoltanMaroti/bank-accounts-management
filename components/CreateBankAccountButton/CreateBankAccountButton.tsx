import Link from "next/link";
import React from "react";
import AddIcon from "@/assets/icons/plus.svg";

const CreateBankAccountButton = () => {
    return (
        <Link
            href={"/account/open"}
            className='flex flex-col h-40 min-w-48 p-3 rounded-md bg-gray-300 hover:brightness-95'
        >
            <div className='flex flex-1 items-center justify-center'>
                <AddIcon className='h-8 w-8' />
            </div>

            <div>
                <p className='text-lg'>Open account</p>
                <p className='text-gray-500 text-sm'>
                    Savings, currency, salary
                </p>
            </div>
        </Link>
    );
};

export default CreateBankAccountButton;
