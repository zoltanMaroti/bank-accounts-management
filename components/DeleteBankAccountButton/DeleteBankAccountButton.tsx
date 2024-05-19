"use client";

import React, { useState } from "react";
import DeleteIcon from "@/assets/icons/delete.svg";
import DeleteConfirmationModal from "@/components/DeleteBankAccountButton/DeleteConfirmationModal";
import { deleteBankAccount } from "@/components/DeleteBankAccountButton/actions";
import { BankAccount } from "@/components/BankAccountCard/types";
import { Tooltip } from "react-tooltip";

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
                data-testid='delete-account-button'
                type='button'
                onClick={toggleModal}
                disabled={isDisabled}
                data-tooltip-id='delete-tooltip'
                data-tooltip-place='bottom'
                data-tooltip-content={
                    isDisabled
                        ? "You can't delete your account with a balance"
                        : "Delete account"
                }
                className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 disabled:bg-gray-300 disabled:cursor-not-allowed'
            >
                <DeleteIcon className='w-5 h-5' />
            </button>
            <Tooltip id='delete-tooltip' className='!px-2 !py-1' opacity={1} />
        </>
    );
};

export default DeleteBankAccountButton;
