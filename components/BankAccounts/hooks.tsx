"use client";

import {
    useState,
    useEffect,
    ChangeEvent,
    useCallback,
    useTransition,
} from "react";
import { BankAccount } from "@/components/BankAccountCard/types";
import { searchAccount } from "@/components/BankAccounts/actions";

const useDebounce = <T,>(value: T, delay: number = 300): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const debounce = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(debounce);
    }, [value, delay]);

    return debouncedValue;
};

export const useSearch = () => {
    const [isPending, startTransition] = useTransition();
    const [searchResult, setSearchResult] = useState<BankAccount[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm);

    const onChangeSearchTerm = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            setSearchTerm(e.target.value);

            if (value === "") {
                onClear();
            }
        },
        []
    );

    const onClear = () => {
        setSearchResult([]);
        setSearchTerm("");
    };

    useEffect(() => {
        const search = async (searchTerm: string) => {
            const accounts = await searchAccount(searchTerm);
            setSearchResult(accounts);
        };

        if (debouncedSearchTerm.length) {
            startTransition(async () => {
                await search(debouncedSearchTerm);
            });
        }
    }, [debouncedSearchTerm]);

    return {
        onChangeSearchTerm,
        searchResult,
        isPending,
    };
};
