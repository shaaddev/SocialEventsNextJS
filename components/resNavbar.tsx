import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { navItems, non_user_items } from "./Navbar";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

export default function ResNavbar({
   theme, user
}:{
    theme: React.ReactNode, user: KindeUser | null
}) {
    

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
                                    {navItems.slice(0, 4).map((n) => (
                                        <li 
                                          key={n.name}
                                          className="w-full border border-white border-opacity-10 p-2 rounded-xl"
                                        >
                                          {n.route ? (
                                            <Link href={n.route} className="flex items-center justify-center">
                                              {n.name}
                                            </Link>
                                          ) : (
                                            <LogoutLink className='flex items-center justify-center'>{n.name}</LogoutLink>
                                          )}
                                        </li>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {non_user_items.map((n) => (
                                        <li 
                                            key={n.name} 
                                            className="w-full border border-white border-opacity-10 p-2 rounded-xl"
                                        >
                                          {n.route ? (
                                            <Link href={n.route} className="flex items-center justify-center">
                                              {n.name}
                                            </Link>
                                          ) : n.name === 'Login' ? (
                                            <LoginLink className='flex items-center justify-center'>Login</LoginLink>
                                          ) : (
                                            <RegisterLink className='flex items-center justify-center'>Sign up</RegisterLink>
                                          )}
                                        </li>
                                    ))}
                                </>
                            )}
                            <li>
                                {theme}
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