'use client';
import { useState } from 'react';
import '@/styles/side.css';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: any) => {
      e.preventDefault();

      if (!fullname || !username || !email || !password){
        alert("All fields are required.");
        return;
      }
      
      if (password !== confirmPassword){
        alert("Password doesn't match");
        return;
      }

      try {
        const res = await fetch("/api/user/signup", {
          method: 'POST', 
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({fullname, username, email, password})
        });

        if (res.ok){
          router.push('/login');
          router.refresh();
        } else {
          throw new Error('failed to create user');
        }
        
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    return(
        <div className='min-h-screen'>
          <div className='flex container mx-auto px-2 my-10 justify-center sm:px-2 md:px-10 lg:px-24'>
              <div className='relative flex flex-col mt-6 text-neutral-200 bg-zinc-800 shadow-md bg-clip-border rounded-xl w-4/5 md:w-full sm:w-full lg:w-full '>
                <form onSubmit={handleSubmit} className='post-form p-5'>
                      <div className='space-y-6 mx-auto px-0'>
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-4">
                                <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-neutral-200">
                                  Full Name
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm min-w-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="text"
                                      name="fullname"
                                      id="fullname"
                                      autoComplete="fullname"
                                      onChange={(e => setFullname(e.target.value))}
                                      value={fullname}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="Jane Smith"
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                          </div>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-neutral-200">
                                  Username
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm min-w-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="text"
                                      name="username"
                                      id="username"
                                      autoComplete="username"
                                      onChange={(e => setUsername(e.target.value))}
                                      value={username}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="janesmith"
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                          </div>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-neutral-200">
                                  Email Adress
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm min-w-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="text"
                                      name="email"
                                      id="email"
                                      autoComplete="email"
                                      onChange={(e => setEmail(e.target.value))}
                                      value={email}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="janesmith@email.com"
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
                                  <div className="flex rounded-md shadow-sm min-w-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-4">
                                <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-neutral-200">
                                  Confirm Password
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm min-w-full ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                      type="password"
                                      name="password"
                                      id="confirmpassword"
                                      autoComplete="password"
                                      onChange={(e => setConfirmPassword(e.target.value))}
                                      value={confirmPassword}
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                              </div>
                          </div>

                          <button type="submit" className='rounded-full bg-indigo-900 text-slate-200 px-7 py-1'>Sign Up</button>

                          <h3>Already have an Account?</h3>
                          <button className='rounded-full bg-cyan-950 text-slate-200 px-7 py-1'><a href="/login">Log In</a></button>
                      </div>
                </form>
              </div>
          </div>
        </div>
    )
}