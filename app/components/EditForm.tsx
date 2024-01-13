'use client';
import '@/styles/side.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function EditForm({id, title, caption, location, event_date}: {id: string, title: string, caption: string, location: string, event_date: string}) {
    const [newTitle, setNewTitle] = useState(title);
    const [newCaption, setNewCaption] = useState(caption);
    const [newLocation, setNewLocation] = useState(location);
    const [newEventDate, setNewEventDate] = useState(event_date);

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({newTitle, newCaption, newLocation, newEventDate}),
            });

            if (!res.ok) {
                throw new Error('Failed to update topic')
            }

            router.push('/');
            router.refresh();
        } catch (error) {
            console.log("Error: ", error);
        }
    }


    return(
        <div className='min-h-screen'>
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
                                            name="title"
                                            id="title"
                                            autoComplete="title"
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            value={newTitle}
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
                                            name="caption"
                                            id="caption"
                                            autoComplete="caption"
                                            onChange={(e) => setNewCaption(e.target.value)}
                                            value={newCaption}
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
                                            name="location"
                                            id="location"
                                            autoComplete="location"
                                            // maxLength="25"
                                            onChange={(e) => setNewLocation(e.target.value)}
                                            value={newLocation}
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
                                            name="event_date"
                                            id="event_date"
                                            autoComplete="event_date"
                                            onChange={(e) => setNewEventDate(e.target.value)}
                                            value={newEventDate}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                </div>

                                <button type="submit" className='rounded-full bg-cyan-950 text-slate-200 px-7 py-1'>Update Post</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}