export const verifyBalance = (balance: number) => {
    if (balance > 0) {
        throw new Error("Can't delete account with balance");
    }
    return true;
};
