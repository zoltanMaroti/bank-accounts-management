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

export const useSearch = () => {
    const [searchResult, setSearchResult] = useState<BankAccount[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isPending, startTransition] = useTransition();

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

        if (searchTerm.length) {
            startTransition(async () => {
                await search(searchTerm);
            });
        }
    }, [searchTerm]);

    return {
        onChangeSearchTerm,
        searchResult,
        isPending,
    };
};
