import { formatCurrency } from "../components/BankAccountCard/utils";

describe("Format currency", () => {
    it("formats USD correctly", () => {
        expect(formatCurrency("USD", 1234)).toBe("$1,234");
    });

    it("formats EUR correctly", () => {
        expect(formatCurrency("EUR", 1234)).toBe("€1,234");
    });

    it("formats GBP correctly", () => {
        expect(formatCurrency("GBP", 1234)).toBe("£1,234");
    });

    it("handles large numbers correctly", () => {
        expect(formatCurrency("USD", 1234567890)).toBe("$1,234,567,890");
    });

    it("handles negative numbers correctly", () => {
        expect(formatCurrency("USD", -1234)).toBe("-$1,234");
    });

    it("handles zero correctly", () => {
        expect(formatCurrency("USD", 0)).toBe("$0");
    });
});
