import React from "react";
import BankAccountForm from "@/components/BankAccountForm/BankAccountForm";
import { createBankAccount } from "@/components/BankAccountForm/actions";

export default function CreateBankAccountPage() {
    return (
        <section className='m-2 flex flex-col items-center'>
            <div className='w-96'>
                <BankAccountForm
                    title={"Add new account"}
                    callback={createBankAccount}
                />
            </div>
        </section>
    );
}
