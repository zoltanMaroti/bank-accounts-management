import React, { ChangeEvent } from "react";
import SearchIcon from "@/assets/icons/search.svg";

const SearchBankAccount = ({
    onChange,
}: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <form action='' className='relative'>
            <input
                type='search'
                placeholder='Search account'
                onChange={onChange}
                className='peer cursor-pointer relative z-10 h-12 w-12 rounded-md border border-gray-400 bg-transparent pl-10 outline-none transition-all focus:w-64 focus:cursor-text focus:pl-16 focus:pr-4'
            />
            <SearchIcon className='absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-900 px-3.5 peer-focus:border-gray-400' />
        </form>
    );
};

export default SearchBankAccount;
