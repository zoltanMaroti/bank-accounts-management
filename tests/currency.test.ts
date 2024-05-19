import { formatCurrency } from "../components/BankAccountCard/utils";
import {
    convertBalanceToCurrency,
    getCurrencyMultiplier,
} from "../components/TransferFundsForm/utils";
import { CurrencyConversion } from "../components/TransferFundsForm/types";

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

describe("Get currency multiplier", () => {
    const currencyConversionMock: CurrencyConversion = {
        USD: { USD: 1, EUR: 0.92, GBP: 0.79 },
        EUR: { EUR: 1, USD: 1.08, GBP: 0.86 },
        GBP: { GBP: 1, USD: 1.26, EUR: 1.16 },
    };

    it("returns correct multiplier from USD to EUR", () => {
        const multiplier = getCurrencyMultiplier(
            currencyConversionMock,
            "USD",
            "EUR"
        );
        expect(multiplier).toBe(0.92);
    });

    it("returns 1 if the source currency is undefined", () => {
        const multiplier = getCurrencyMultiplier(
            currencyConversionMock,
            undefined,
            "USD"
        );
        expect(multiplier).toBe(1);
    });
});

describe("Convert balance to currency", () => {
    it("returns correct amount for source balance and multiplier", () => {
        const amount = convertBalanceToCurrency(1000, 1.25);
        expect(amount).toBe(1250);
    });

    it("returns correct amount for zero source balance", () => {
        const amount = convertBalanceToCurrency(0, 1.25);
        expect(amount).toBe(0);
    });

    it("returns 0 if the source balance is undefined", () => {
        const amount = convertBalanceToCurrency(undefined, 1.25);
        expect(amount).toBe(0);
    });
});
