import React, { ReactNode } from "react";
import Link from "next/link";

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => {
    return (
        <Link
            href={href}
            className='flex items-center p-2 text-gray-50 font-medium rounded-lg hover:bg-blue-900 group'
        >
            {children}
        </Link>
    );
};

export default NavLink;
