import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import React from "react";
import TransferIcon from "@/assets/icons/transfer.svg";
import { BankAccount, Currency } from "@/components/BankAccountCard/types";
import { formatCurrency } from "@/components/BankAccountCard/utils";
import Label from "@/components/Label/Label";

const ReviewTransfer = ({
    sourceAccount,
    targetAccount,
    amountToTransfer,
    targetCurrency,
}: {
    sourceAccount: BankAccount;
    targetAccount: BankAccount;
    amountToTransfer: number;
    targetCurrency: Currency;
}) => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex gap-2 relative'>
                <BankAccountCard
                    accountType={sourceAccount.accountType}
                    balance={sourceAccount.balance}
                    currency={sourceAccount.currency}
                    className='flex-1 min-w-0 h-32'
                />
                <TransferIcon className='absolute z-10 w-10 h-10 bg-white rounded-full p-1 inset-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                <BankAccountCard
                    accountType={targetAccount.accountType}
                    balance={targetAccount.balance}
                    currency={targetAccount.currency}
                    className='flex-1 min-w-0 h-32'
                />
            </div>
            <div>
                <p className='text-3xl text-center mb-2'>
                    {formatCurrency(targetCurrency, amountToTransfer)}
                </p>
                <div className='flex flex-col gap-3 bg-gray-100 p-3 rounded-md'>
                    <div>
                        <Label
                            label='Transfer from'
                            className='text-gray-600 mb-0'
                        />
                        <p className='text-gray-800'>
                            <span className='capitalize'>
                                {sourceAccount.accountType}
                            </span>
                            <span> | {sourceAccount.description}</span>
                        </p>
                    </div>
                    <div>
                        <Label
                            label='Transfer to'
                            className='text-gray-600 mb-0'
                        />
                        <p className='text-gray-800'>
                            <span className='capitalize'>
                                {targetAccount.accountType}
                            </span>
                            <span> | {targetAccount.description}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewTransfer;
