import '@/styles/base.css';
import Link from "next/link";

export default function Navbar() {
    const username: string = 'username';
    const user: boolean = false;

    return (
        <nav className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-white bg-neutral-900 border rounded-none shadow-md h-max border-neutral-950/80 bg-opacity-30 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                  {user ? 
                    <a href="/"
                      className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
                      Welcome, @{username}
                    </a>
                  : 
                    <a href="/"
                      className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
                        Welcome
                    </a>}
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
                              <Link href="/login" className="flex items-center">
                                Logout
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              <Link href="/posts/create" className="flex items-center">
                                Create Post
                              </Link>
                            </li>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              <Link href="/" className="flex items-center">
                                Home
                              </Link>
                            </li>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              <Link href="/login" className="flex items-center">
                                Login
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
            </nav>
    )
}