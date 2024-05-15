export type Currency = "EUR" | "USD" | "GBP";

export type AccountType = "savings" | "currency" | "salary";

export type BankAccount = {
    id: string;
    ownerId: number;
    currency: Currency;
    balance: number;
    accountType: AccountType;
    description?: string;
};

export type Stylable = {
    className?: string;
};

export type BankAccountCardProps = Partial<BankAccount> & Stylable;
