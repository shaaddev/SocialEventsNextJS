import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Theme from './Theme';
import ResNavbar from './resNavbar';

export default async function Navbar() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-white bg-[#2b3944] dark:bg-neutral-900 border rounded-none shadow-md h-max border-neutral-950/30 bg-opacity-90 dark:bg-opacity-30 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                  {user ? 
                    <Link href="/"
                      className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
                      Welcome, @{user.given_name}
                    </Link>
                  : 
                    <Link href="/"
                      className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
                        Welcome
                    </Link>}
                  <div className="flex items-center gap-4">
                    <div className="hidden mr-4 lg:block">
                      <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                        {user ? (
                          <>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              <Link href="/posts/create" className="flex items-center">
                                Create Post
                              </Link>
                            </li>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              <Link href="/posts/list" className="flex items-center">
                                Your Posts
                              </Link>
                            </li>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              <Link href="/" className="flex items-center">
                                Home
                              </Link>
                            </li>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              <LogoutLink className='flex items-center'>Log out</LogoutLink>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              <Link href="/" className="flex items-center">
                                Home
                              </Link>
                            </li>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              <LoginLink className='flex items-center'>Login</LoginLink>
                            </li>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              <RegisterLink className='flex items-center'>Sign up</RegisterLink>
                            </li>
                          </>
                        )}
                        <li className='block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
                          <Theme />
                        </li>
                      </ul>
                    </div>
                    <ResNavbar user={user} >
                      <Theme />
                    </ResNavbar>
                  </div>
                </div>
            </nav>
    )
}