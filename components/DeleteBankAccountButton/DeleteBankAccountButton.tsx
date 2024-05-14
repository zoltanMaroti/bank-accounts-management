"use client";

import React, { useState } from "react";
import DeleteIcon from "@/assets/icons/delete.svg";
import DeleteConfirmationModal from "@/components/DeleteBankAccountButton/DeleteConfirmationModal";
import { deleteBankAccount } from "@/components/DeleteBankAccountButton/actions";
import { BankAccount } from "@/components/BankAccountCard/types";

const DeleteBankAccountButton = ({
    bankAccount,
    isDisabled,
}: {
    bankAccount: BankAccount;
    isDisabled: boolean;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen((prevState) => !prevState);

    return (
        <>
            {isModalOpen ? (
                <DeleteConfirmationModal
                    bankAccount={bankAccount}
                    onCancel={toggleModal}
                    onDelete={deleteBankAccount}
                />
            ) : null}
            <button
                type='button'
                onClick={toggleModal}
                disabled={isDisabled}
                className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 disabled:bg-gray-300 disabled:cursor-not-allowed'
            >
                <DeleteIcon className='w-5 h-5' />
            </button>
        </>
    );
};

export default DeleteBankAccountButton;
