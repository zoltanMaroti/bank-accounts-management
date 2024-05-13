import React from "react";
import BankAccountForm from "@/components/BankAccountForm/BankAccountForm";

export default function OpenAccountPage() {
    return (
        <section className='m-2 flex flex-col items-center'>
            <div className='w-96'>
                <BankAccountForm />
            </div>
        </section>
    );
}
