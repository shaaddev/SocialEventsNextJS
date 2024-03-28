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

    const toggleTheme = () => {
        if (resolvedTheme === 'dark'){
            setTheme('light')
        } else if (resolvedTheme === 'light'){
            setTheme('dark')
        }
    }

    return (
        <button 
            onClick={toggleTheme}
            className={btn_style}    
        >
            {resolvedTheme === 'dark' ? 
            (<BsSun className={btn_size} aria-label='the sun'/>) : 
            (<BsMoon className={btn_size} aria-label='the moon'/>)}
        </button>
    )
    
}

const btn_style = 'text-slate-200 inline align-middle p-2 lg:p-0 lg:border-none rounded-xl border'
const btn_size = 'w-5 h-5'
