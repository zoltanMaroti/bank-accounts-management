import React from "react";

const Title = ({ title, subTitle }: { title: string; subTitle?: string }) => {
    return (
        <>
            <h1 className='flex-1 text-xl font-bold text-center'>{title}</h1>
            <p className='text-center'>{subTitle}</p>
            <hr className='border mb-2' />
        </>
    );
};

export default Title;
