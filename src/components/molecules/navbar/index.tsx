'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'antd'
import { FaRegMoon } from 'react-icons/fa'

export default function PublicNavbar() {
    const router = useRouter()

    return (
        <div className='flex items-center justify-between w-full h-full px-20 max-sm:px-6'>
            <div className='w-auto h-full gap-6 flex items-center'>
                <h1
                    onClick={() => router.push('/')}
                    className='font-countries-dale flex text-[1em] max-sm:text-[1.2em] font-extrabold select-none cursor-pointer'
                >
                    Where in the world?
                </h1>
            </div>
            <div className='w-auto h-full gap-12 flex items-center'>
                {/* <Button
                    type='text'
                    className='flex items-center text-medium'
                    icon={<FaRegMoon />}
                >
                    Dark Mode
                </Button> */}
            </div>
        </div>
    )
}