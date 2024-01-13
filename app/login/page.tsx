'use client';
import { useState } from 'react';
import '@/styles/side.css';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      
      if (!username || !password){
        alert("All fields are required. (Feature not yet added)");
        return;
      }
      try {
        const res = await fetch('/api/user/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username, password})
        })

        if (res.ok) {
          router.push('/welcome');
          router.refresh();
        } else {
          throw new Error('failed to login');
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }

    let signup = "Don't Have An Account?";

    return(
        <div className='min-h-screen'>
            <div className='flex container mx-auto px-1 my-10 justify-center sm:px-2 md:px-2 lg:px-24'>
                <div className='relative flex flex-col mt-6 text-neutral-200 bg-zinc-800 shadow-md bg-clip-border rounded-xl w-4/5 '>
                        <form onSubmit={handleSubmit} className='post-form p-5'>
                            <div className='space-y-6 mx-auto px-0'>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                      <label htmlFor="username" className="block text-sm font-medium leading-6 text-neutral-200">
                                        Username
                                      </label>
                                      <div className="mt-2">
                                        <div className="flex rounded-md min-w-full justify-items-center shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                          <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            autoComplete="username"
                                            onChange={(e => setUsername(e.target.value))}
                                            value={username}
                                            className="block flex-1 border-0 min-w-full bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="janesmith"
                                            disabled
                                          />
                                        </div>
                                      </div>
                                    </div>
                                </div>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-neutral-200">
                                        Password
                                      </label>
                                      <div className="mt-2">
                                        <div className="flex rounded-md min-w-full shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                          <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="password"
                                            onChange={(e => setPassword(e.target.value))}
                                            value={password}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                </div>

                                <button type="submit" className='rounded-full bg-cyan-950 text-slate-200 px-7 py-1'>Login</button>

                                <h3>{signup}</h3>
                                <button className='rounded-full bg-emerald-800 px-7 py-1'><a href="/signup">Sign Up</a></button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}