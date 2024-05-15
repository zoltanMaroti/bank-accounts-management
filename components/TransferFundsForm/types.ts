import { Currency } from "../BankAccountCard/types";

export type CurrencyConversion = {
    [key in Currency]: {
        [key in Currency]: number;
    };
};
