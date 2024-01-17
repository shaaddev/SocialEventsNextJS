'use client';
import '@/styles/side.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
// import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";


export default function CreatePost() {
    const [form, setForm] = useState({
      title: "",
      caption: "",
      location: "",
      event_date: ""
    })

    const router = useRouter();


    const handleChange = (e: any) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!form){
        alert("All fields are required.");
        return;
      }

      try {
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });


        if (res.ok) {
          router.push('/')
          router.refresh();
        } else {
          throw new Error('failed to create post')
        }
      } catch (error) {
        console.log("Error: ", error);
      }

    };

    const { isAuthenticated, isLoading } = useKindeBrowserClient();

    if (isLoading) return <div className='flex min-h-screen flex-col items-center justify-between p-10'><main>Loading...</main></div>

    return isAuthenticated ? (
        <div className='min-h-screen px-2 md:px-24'>
            <div className='flex container mx-auto px-2 my-10 justify-center sm:px-2 md:px-10 lg:px-24'>
                <div className='relative flex flex-col mt-6 text-neutral-200 bg-zinc-800 shadow-md bg-clip-border rounded-xl w-4/5 md:w-full sm:w-full lg:w-full'>
                        <form  onSubmit={handleSubmit} className='post-form p-5'>
                            <div className='space-y-6 mx-auto px-0'>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                      <label htmlFor="title" className="block text-sm font-medium leading-6 text-neutral-200">
                                        Title
                                      </label>
                                      <div className="mt-2">
                                        <div className="flex rounded-md min-w-full justify-items-center shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                          <input
                                            type="text"
                                            onChange={handleChange}
                                            name="title"
                                            id="title"
                                            required
                                            maxLength={25}
                                            autoComplete="title"
                                            className="block flex-1 border-0 min-w-full bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                </div>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                      <label htmlFor="caption" className="block text-sm font-medium leading-6 text-neutral-200">
                                        Caption
                                      </label>
                                      <div className="mt-2">
                                        <div className="flex rounded-md min-w-full shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                          <textarea
                                            onChange={handleChange}
                                            name="caption"
                                            required
                                            id="caption"
                                            autoComplete="caption"
                                            maxLength={255}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                </div>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                      <label htmlFor="location" className="block text-sm font-medium leading-6 text-neutral-200">
                                        location
                                      </label>
                                      <div className="mt-2">
                                        <div className="flex rounded-md min-w-full shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                          <input
                                            type="text"
                                            onChange={handleChange}
                                            name="location"
                                            required
                                            id="location"
                                            autoComplete="location"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                </div>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                      <label htmlFor="event_date" className="block text-sm font-medium leading-6 text-neutral-200">
                                        Event Date
                                      </label>
                                      <div className="mt-2">
                                        <div className="flex rounded-md min-w-full shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                          <input
                                            type="date"
                                            onChange={handleChange}
                                            name="event_date"
                                            required
                                            id="event_date"
                                            autoComplete="event_date"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                </div>

                                <button type="submit" className='rounded-full bg-cyan-950 text-slate-200 px-7 py-1'>Post</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    ) : (
      <>
        <main className='flex min-h-screen flex-col items-center justify-between py-5'>
          You must be signed in to create a post.
        </main>
      </>
    );
}