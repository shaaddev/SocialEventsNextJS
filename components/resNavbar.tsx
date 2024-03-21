import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { IoMdMenu, IoMdClose } from "react-icons/io";


export default function ResNavbar({children, user}: {children: React.ReactNode, user: any}) {
    

    return(
        <div className="flex lg:hidden">
            <Drawer>
                <DrawerTrigger className="text-white"><IoMdMenu className="w-6 h-6 mr-2" /></DrawerTrigger>
                <DrawerContent className="bg-[#2b3944] text-white border-none dark:bg-neutral-900">
                    <div className="flex flex-col items-center justify-center p-10">
                        {user ? 
                        <Link href="/">
                            Welcome, @{user.given_name}
                        </Link>
                        : 
                        <Link href="/">
                            Welcome
                        </Link>
                        }
                    </div>
                    <div className="flex flex-row items-center justify-center p-10">
                        <ul className="flex flex-col gap-2 w-full text-center">
                            {user ? (
                                <>
                                    <li className="w-full border border-white border-opacity-10 p-2 rounded-xl">
                                        <Link href="/posts/create" className="flex items-center justify-center">
                                            Create Post
                                        </Link>
                                    </li>
                                    <li className="w-full border border-white border-opacity-10 p-2 rounded-xl">
                                        <Link href="/posts/list" className="flex items-center justify-center">
                                            Your Posts
                                        </Link>
                                    </li>
                                    <li className="w-full border border-white border-opacity-10 p-2 rounded-xl">
                                        <Link href="/" className="flex items-center justify-center">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="w-full border border-white border-opacity-10 p-2 rounded-xl">
                                        <LogoutLink className='flex items-center justify-center'>Log out</LogoutLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="w-full border border-white border-opacity-10 p-2 rounded-xl">
                                        <Link href="/" className="flex items-center justify-center">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="w-full border border-white border-opacity-10 p-2 rounded-xl">
                                        <LoginLink className='flex items-center justify-center'>Login</LoginLink>
                                    </li>
                                    <li className="w-full border border-white border-opacity-10 p-2 rounded-xl">
                                        <RegisterLink className='flex items-center justify-center'>Sign up</RegisterLink>
                                    </li>
                                </>
                            )}
                            <li>
                                {children}
                            </li>
                        </ul>
                    </div>
                    <DrawerClose>
                        <IoMdClose className="absolute right-5 top-5 w-6 h-6" />
                    </DrawerClose>
                </DrawerContent>
            </Drawer>
        </div>
    )
}