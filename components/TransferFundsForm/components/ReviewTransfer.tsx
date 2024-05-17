import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import React from "react";
import TransferIcon from "@/assets/icons/transfer.svg";
import { BankAccount } from "@/components/BankAccountCard/types";

const ReviewTransfer = ({sourceAccount, targetAccount}: {sourceAccount: BankAccount; targetAccount: BankAccount}) => {
    return (
        <div>
        <div className="flex gap-2 relative">
            <BankAccountCard
                accountType={sourceAccount.accountType}
                balance={sourceAccount.balance}
                currency={sourceAccount.currency}
                className='flex-1 min-w-0 h-32'
            />
            <TransferIcon className="absolute z-10 w-10 h-10 bg-white rounded-full p-1 inset-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <BankAccountCard
                accountType={targetAccount.accountType}
                balance={targetAccount.balance}
                currency={targetAccount.currency}
                className='flex-1 min-w-0 h-32'
            />
        </div>
        <div>asd</div>
        </div>
    );
};

export default ReviewTransfer;
