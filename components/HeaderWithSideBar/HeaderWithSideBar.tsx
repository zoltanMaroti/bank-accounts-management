import React, { ReactNode } from "react";
import NavLink from "@/components/NavLink/NavLink";
import DashboardIcon from "@/assets/icons/dashboard.svg";
import InboxIcon from "@/assets/icons/inbox.svg";
import SignOutIcon from "@/assets/icons/signOut.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import TransferIcon from "@/assets/icons/transfer.svg";
import NotificationsButton from "@/components/NotificationsButton/NotificationsButton";
import Indicator from "@/components/Indicator/Indicator";
import AvatarButton from "@/components/AvatarButton/AvatarButton";

const HeaderWithSideBar = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header className='fixed top-0 w-full bg-white px-3 py-3 z-10'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <button
                            type='button'
                            className='p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
                        >
                            <MenuIcon className='w-6 h-6' />
                        </button>

                        <span className='text-xl font-semibold'>Bank</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <NotificationsButton />
                        <AvatarButton />
                    </div>
                </div>
            </header>

            <aside className='fixed top-0 left-0 w-64 transition-transform -translate-x-full bg-blue-950 sm:translate-x-0 h-full p-3 z-20'>
                <div className='text-2xl font-bold text-white p-2 pb-4'>
                    Bank
                </div>
                <nav className='flex flex-col gap-1 space-y-2'>
                    <NavLink href='/'>
                        <DashboardIcon className='w-5 h-5 text-gray-50' />
                        <span className='ms-3'>Dashboard</span>
                    </NavLink>
                    <NavLink href='/transfer'>
                        <TransferIcon className='w-5 h-5 text-gray-50' />
                        <span className='ms-3'>Transfer</span>
                    </NavLink>
                    <NavLink href='#'>
                        <InboxIcon className='w-5 h-5 text-gray-50' />
                        <span className='flex-1 ms-3'>Inbox</span>
                        <Indicator value={3} className='' />
                    </NavLink>
                    <NavLink href='#'>
                        <SignOutIcon className='w-5 h-5 text-gray-50' />
                        <span className='ms-3'>Sign Out</span>
                    </NavLink>
                </nav>
            </aside>
            <main className='relative top-16 sm:ml-64 p-4 transition-all'>
                {children}
            </main>
        </>
    );
};

export default HeaderWithSideBar;
