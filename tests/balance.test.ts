import { hasBalance } from "../components/DeleteBankAccountButton/utils";

describe("Balance validation", () => {
    it("returns true if balance is positive", () => {
        expect(hasBalance(100)).toBe(true);
    });

    it("returns false if balance is zero", () => {
        expect(hasBalance(0)).toBe(false);
    });

    it("returns false if balance is negative", () => {
        expect(hasBalance(-100)).toBe(false);
    });
});
