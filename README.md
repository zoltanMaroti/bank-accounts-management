<img src="./public/images/bank-accounts-management.gif" width="640" height="320" />

# Bank Accounts Management

This project was created as part of an assignment for a frontend engineer position.

Features:

-   Create, list, update, delete and search accounts with different account types and currencies
-   Transfer funds between accounts in different currencies
-   Account balance validation with currency conversion
-   E2E tests for visual regression testing
-   CRUD json server to provide mock data
-   Utilised Next server actions and server components

# Getting Started

## Cloning

```bash
git clone https://github.com/zoltanMaroti/bank-accounts-management.git
```

## Prerequisites

-   [Node.js](https://nodejs.org/) 18.17 or later

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file in the project root (see .env.example file)

```
API_URL="http://localhost:1111"
APP_ENV="dev"
```

## Installation

```bash
cd bank-accounts-management
npm install
npx playwright install
```

## Starting

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Running Tests

To run visual regression tests, run the following command

```bash
npm run test:e2e
```

To run unit tests, run the following command

```bash
npm run test:unit
```

To update screenshots, run the following command

```bash
npm run update-snapshots
```

## Built With

-   [Next](https://nextjs.org/)
-   [React](https://react.dev/)
-   [Tailwind](https://tailwindcss.com/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Playwright](https://playwright.dev/)
-   [Jest](https://jestjs.io/)

## Roadmap

-   Paginate bank accounts
-   Optimize for mobile and tablet devices
-   Stabilize flaky E2E tests

## Author

Zoltán Maróti [Github](https://www.github.com/zoltanMaroti) | [LinkedIn](https://www.linkedin.com/in/zoltan-maroti/)
