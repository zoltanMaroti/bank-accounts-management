import { Page } from "playwright-core";

export const getAccountSelector = async (page: Page, account: string) =>
    page.$(`div[data-testid="${account}"] > div`);
