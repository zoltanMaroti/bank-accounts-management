import React from "react";
import Indicator from "@/components/Indicator/Indicator";
import NotificationIcon from "@/assets/icons/notification.svg";

const NotificationsButton = () => {
    return (
        <button
            type='button'
            className='relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-gray-100 rounded-full focus:ring-4 focus:ring-gray-300'
        >
            <NotificationIcon className='w-6 h-6 text-gray-400' />
            <Indicator
                value={8}
                className='absolute -top-2 -end-2 border-2 border-white'
            />
        </button>
    );
};

export default NotificationsButton;
