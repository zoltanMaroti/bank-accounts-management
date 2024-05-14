"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => {
    const pathName = usePathname();
    const isActive = pathName === href;

    return (
        <Link
            href={href}
            className={twJoin(
                "flex items-center p-2 text-gray-50 font-medium rounded-lg hover:bg-blue-900",
                isActive && "bg-blue-900"
            )}
        >
            {children}
        </Link>
    );
};

export default NavLink;
