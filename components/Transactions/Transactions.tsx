import React from "react";
import { Transaction } from "@/components/TransferFundsForm/types";
import { formatCurrency } from "../BankAccountCard/utils";

const Transactions = ({ transactions }: { transactions?: Transaction[] }) => {
    if (!transactions || !transactions.length) {
        return null;
    }

    return (
        <section className='m-2 flex flex-col gap-4'>
            <h1 className='flex-1 text-2xl font-bold'>Recent transfers</h1>
            <div className='p-4 bg-white rounded-md'>
                <div className='grid grid-cols-4 gap-y-3'>
                    <p className='text-gray-500 mb-1 border-b border-gray-200 pb-2'>
                        From account
                    </p>
                    <p className='text-gray-500 mb-1 border-b border-gray-200 pb-2'>
                        To account
                    </p>
                    <p className='text-gray-500 mb-1 border-b border-gray-200 pb-2'>
                        Amount
                    </p>
                    <p className='text-gray-500 mb-1 border-b border-gray-200 pb-2'>
                        Date
                    </p>
                    {transactions.map(
                        ({
                            id,
                            targetAmount,
                            targetCurrency,
                            targetAccount,
                            sourceAccount,
                            timestamp,
                        }) => (
                            <React.Fragment key={id}>
                                <p className='text-gray-800'>
                                    {sourceAccount?.description}
                                </p>
                                <p className='text-gray-800'>
                                    {targetAccount?.description}
                                </p>
                                <p className='text-gray-800'>
                                    {formatCurrency(
                                        targetCurrency,
                                        targetAmount
                                    )}
                                </p>
                                <p className='text-gray-800'>
                                    {new Date(
                                        timestamp * 1000
                                    ).toLocaleString()}
                                </p>
                            </React.Fragment>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default Transactions;
