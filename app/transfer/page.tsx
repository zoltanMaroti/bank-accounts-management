import React from "react";
import TransferFundsForm from "@/components/TransferFundsForm/TransferFundsForm";

export default function TransferPage() {
    return (
        <section className='m-2 flex flex-col items-center'>
            <div className='w-96'>
                <TransferFundsForm />
            </div>
        </section>
    );
}
