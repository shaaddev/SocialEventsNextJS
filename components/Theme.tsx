'use client'
import { BsSun, BsMoon } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function Theme(){
    const [mounted, setMounted] = useState(false)
    const {setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return (
        <Image 
            src='data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=='
            width={15}
            height={15}
            sizes='20x20'
            alt="toggle"
            priority={false}
            title="toggle"
        />
    )

    if (resolvedTheme === 'dark'){
        return (
            <button onClick={() => setTheme('light')} className='text-slate-200 inline align-middle p-2 lg:p-0 lg:border-none rounded-xl border'>
                <BsSun className='w-4 h-4 lg:w-5 lg:h-5'/>
            </button>
        )
    }

    if (resolvedTheme === 'light'){
        return (
            <button onClick={() => setTheme('dark')} className='text-slate-200 inline align-middle p-2 lg:p-0 lg:border-none rounded-xl border border-white border-opacity-10'>
                <BsMoon className='w-4 h-4 lg:w-5 lg:h-5'/>
            </button>
        )
    }
}