import React from "react";
import AvatarIcon from "@/assets/icons/avatar.svg";

const AvatarButton = () => {
    return (
        <button
            type='button'
            className='rounded-full focus:ring-4 focus:ring-gray-300'
        >
            <div className='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full'>
                <AvatarIcon className='absolute w-12 h-12 text-gray-400 -left-1' />
            </div>
        </button>
    );
};
export default AvatarButton;
