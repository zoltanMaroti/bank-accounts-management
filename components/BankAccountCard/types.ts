export type Currency = "EUR" | "USD" | "GBP";

export type AccountType = "savings" | "currency" | "salary";

export type BankAccount = {
    id: number;
    ownerId: number;
    currency: Currency;
    balance: number;
    type: AccountType;
};
