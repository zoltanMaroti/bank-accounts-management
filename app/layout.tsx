import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import HeaderWithSideBar from "@/components/HeaderWithSideBar/HeaderWithSideBar";
import "./globals.css";

export const fetchCache = "force-no-store";

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
