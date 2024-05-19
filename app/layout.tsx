import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import HeaderWithSideBar from "@/components/HeaderWithSideBar/HeaderWithSideBar";
import "./globals.css";

// Opt out caching for e2e testing
export const fetchCache =
    process.env.APP_ENV === "e2e" ? "force-no-store" : "auto";

const inter = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Bank Accounts Management",
    description: "Overseeing financial accounts and transactions.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <HeaderWithSideBar>{children}</HeaderWithSideBar>
            </body>
        </html>
    );
}
