import React, { ChangeEvent } from "react";
import SearchIcon from "@/assets/icons/search.svg";
import { twMerge } from "tailwind-merge";

const SearchBankAccount = ({
    onChange,
    searchTerm,
}: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
}) => {
    return (
        <form
            className={twMerge(
                "relative bg-neutral-300 rounded-md hover:brightness-95 hover:focus-within:brightness-100",
                searchTerm && "hover:brightness-100"
            )}
        >
            <input
                type='search'
                data-testid='search'
                placeholder='Search for account, currency or balance'
                onChange={onChange}
                className={twMerge(
                    "peer cursor-pointer relative z-10 h-12 w-12 rounded-md bg-transparent pl-10 outline-none transition-all focus:w-96 focus:cursor-text focus:pl-16 focus:pr-4 focus:bg-white focus:border focus:border-gray-400",
                    searchTerm &&
                        "w-96 pl-16 pr-4 bg-white border border-gray-400"
                )}
            />
            <SearchIcon
                className={twMerge(
                    "absolute inset-y-0 my-auto h-8 w-12 stroke-gray-900 px-3.5 peer-focus:border-r peer-focus:border-gray-400 peer-focus:z-10",
                    searchTerm && "border-r border-gray-400 z-10"
                )}
            />
        </form>
    );
};

export default SearchBankAccount;
