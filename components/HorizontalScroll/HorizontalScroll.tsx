import React, { ReactNode } from "react";

const HorizontalScroll = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex gap-2 overflow-y-scroll no-scrollbar'>
            {children}
        </div>
    );
};

export default HorizontalScroll;
