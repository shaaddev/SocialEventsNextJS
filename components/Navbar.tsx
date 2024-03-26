import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Theme from './Theme';
import ResNavbar from './resNavbar';

export const navItems = [
  {
    route: '/posts/create',
    name: 'Create Post',
  },
  {
    route: '/posts/list',
    name: 'Your Posts',
  },
  {
    route: '/',
    name: 'Home',
  },
  {
    route: '',
    name: 'Log out',
  },
  {
    route: '',
    name: 'Login'
  },
  {
    route: '',
    name: 'Sign Up'
  } 
]

export const non_user_items = [...navItems.filter(items => items.name === 'Home'), ...navItems.slice(-2)]


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
                            {navItems.slice(0, 4).map((n) => (
                              <li 
                                key={n.name}
                                className="block p-1 font-sans text-sm antialiased font-normal leading-normal"
                              >
                                {n.route ? (
                                  <Link href={n.route} className="flex items-center hover:opacity-75 transition-all">
                                    {n.name}
                                  </Link>
                                ) : (
                                  <LogoutLink className="flex items-center hover:opacity-75 transition-all">
                                    {n.name}
                                  </LogoutLink>
                                )}
                              </li>
                            ))}
                          </>
                        ) : (
                          <>
                            {non_user_items.map((n) => (
                              <li key={n.name} className="block p-1 font-sans text-sm antialiased font-normal leading-normal">
                                {n.route ? (
                                  <Link href={n.route} className="flex items-center hover:opacity-75 transition-all">
                                    {n.name}
                                  </Link>
                                ) : n.name === 'Login' ? (
                                  <LoginLink className='flex items-center hover:opacity-75 transition-all'>Login</LoginLink>
                                ) : (
                                  <RegisterLink className='flex items-center hover:opacity-75 transition-all'>Sign up</RegisterLink>
                                )}
                              </li>
                            ))}
                          </>
                        )}
                        <li className='block p-1 font-sans text-sm antialiased font-normal leading-normal'>
                          <Theme />
                        </li>
                      </ul>
                    </div>
                    <ResNavbar theme={<Theme />} user={user} />
                  </div>
                </div>
            </nav>
    )
}