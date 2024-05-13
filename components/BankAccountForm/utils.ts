/**
 * Generates fake IBAN number for testing purposes.
 * Not intended for production usage.
 */
export const generateRandomIBAN = (countryCode: string) => {
    if (countryCode.length !== 2 || !/^[A-Z]{2}$/.test(countryCode)) {
        throw new Error("Invalid country code");
    }

    // Generate 14 digits random account number
    const accountNumber = Math.floor(Math.random() * 1e14)
        .toString()
        .padStart(14, "0");

    return countryCode.toUpperCase() + accountNumber;
};
