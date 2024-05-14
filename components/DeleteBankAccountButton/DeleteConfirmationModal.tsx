import React from "react";
import WarningIcon from "@/assets/icons/warning.svg";
import CloseIcon from "@/assets/icons/close.svg";
import { BankAccount } from "@/components/BankAccountCard/types";

const DeleteConfirmationModal = ({
    bankAccount,
    onCancel,
    onDelete,
}: {
    bankAccount: BankAccount;
    onCancel: () => void;
    onDelete: (account: BankAccount) => Promise<void>;
}) => {
    const onClickDelete = () => onDelete(bankAccount);

    return (
        <div className='fixed flex top-0 left-0 z-20 w-screen h-screen items-center justify-center bg-black bg-opacity-50'>
            <div
                className='w-full max-w-sm p-4 text-gray-500 bg-white rounded-lg shadow'
                role='alert'
            >
                <div className='flex'>
                    <WarningIcon className='h-8 w-8 text-red-700' />
                    <div className='ms-3 text-sm font-normal'>
                        <span className='mb-1 text-sm font-semibold text-gray-900'>
                            Are you sure?
                        </span>
                        <div className='mb-4 text-sm font-normal'>
                            Do you really want to delete this account?
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <button
                                type='button'
                                onClick={onClickDelete}
                                className='inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg'
                            >
                                Delete
                            </button>
                            <button
                                type='button'
                                onClick={onCancel}
                                className='inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <button
                        type='button'
                        onClick={onCancel}
                        className='ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8'
                        aria-label='Close'
                    >
                        <CloseIcon className='h-3 w-3' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
