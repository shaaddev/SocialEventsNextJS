'use client'
import { BsSun, BsMoon } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function Theme(){
    const [mounted, setMounted] = useState(false)
    const {setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return

    if (resolvedTheme === 'dark'){
        return (
            <button onClick={() => setTheme('light')} className='text-slate-200 inline align-middle p-2 lg:p-0 lg:border-none rounded-xl border' aria-label='sun'>
                <BsSun className='w-4 h-4 lg:w-5 lg:h-5'/>
            </button>
        )
    }

    if (resolvedTheme === 'light'){
        return (
            <button onClick={() => setTheme('dark')} className='text-slate-200 inline align-middle p-2 lg:p-0 lg:border-none rounded-xl border border-white border-opacity-10' aria-label='moon'>
                <BsMoon className='w-4 h-4 lg:w-5 lg:h-5'/>
            </button>
        )
    }
}