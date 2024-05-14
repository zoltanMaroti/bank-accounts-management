import Link from "next/link";

export default function NotFound() {
    return (
        <div className='flex flex-col items-center m-2'>
            <p className='text-lg mb-4 text-gray-600'>
                The requested bank account was not found
            </p>
            <Link className='font-semibold' href='/'>
                Return to Dashboard
            </Link>
        </div>
    );
}
