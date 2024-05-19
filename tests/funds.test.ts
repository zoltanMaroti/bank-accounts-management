import { hasSufficientFunds } from "../components/TransferFundsForm/utils";
import { Currency } from "../components/BankAccountCard/types";

describe("Funds validation", () => {
    const currency: Currency = "USD";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns true if the balance is sufficient", () => {
        const validateFunds = hasSufficientFunds(1000, currency);
        expect(validateFunds(500)).toBe(true);
    });

    it("returns error message if the balance is insufficient", () => {
        const validateFunds = hasSufficientFunds(1000, currency);
        const message = validateFunds(1500);
        expect(message).toBe("You do not have enough funds to transfer $1,500");
    });

    it("returns error message for zero balance", () => {
        const validateFunds = hasSufficientFunds(0, currency);
        const message = validateFunds(1);
        expect(message).toBe("You do not have enough funds to transfer $1");
    });

    it("returns true for the same balance", () => {
        const validateFunds = hasSufficientFunds(1000, currency);
        expect(validateFunds(1000)).toBe(true);
    });
});
