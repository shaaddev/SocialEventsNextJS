'use client';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { updatePost } from '@/actions/updatePost';

export default function EditForm({id, title, caption, location, event_date}: {id: string, title: string, caption: string, location: string, event_date: string}) {
    const { register, setValue } = useForm();


    useEffect(() => {
      setValue("new_title", title);
      setValue("new_caption", caption);
      setValue("new_location", location);
      setValue("new_event_date", event_date);
    }, [setValue, title, caption, location, event_date]);


    const { isAuthenticated, isLoading } = useKindeBrowserClient();

    if (isLoading) return <div className='flex flex-col items-center justify-between p-14 mt-14'><main className='text-black dark:text-neutral-200'>Loading...</main></div>

    return isAuthenticated ? (
        <>
          <main className='flex flex-col items-center justify-between p-5 md:p-20'>
            <Card className='w-full md:w-3/5 mt-10 p-10 text-black bg-slate-200 dark:bg-zinc-800 dark:text-neutral-200 border-none'>
              <CardContent>
                  <form onSubmit={ async (e) => {
                    e.preventDefault();

                    const formData = new FormData(e.currentTarget)
                    await updatePost(formData, id);
                  }} className='space-y-6'>
                    <Input 
                      id="new_title" 
                      placeholder="Title" 
                      className='border border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800'
                      {...register("new_title", { required: true})}
                    />
                    
                    <Textarea 
                      id="new_caption" 
                      placeholder='Caption' 
                      className='border border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800'
                      {...register("new_caption", { required: true})}
                    />

                    <Input 
                      id="new_location" 
                      placeholder='Location' 
                      className='border border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800'
                      {...register("new_location", { required: true})}
                    />

              
                    <Label htmlFor='new_event_date'>Event Date</Label>
                    <Input 
                      id="new_event_date" 
                      type="date" 
                      placeholder='Event Date' 
                      className='border border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800'
                      {...register("new_event_date", { required: true})}
                    />
                    <Button type="submit" className='rounded-full bg-cyan-950 text-slate-200 px-7 py-0 m-0 dark:hover:text-black dark:hover:bg-slate-300'>Update Post</Button>
                  </form>
              </CardContent>
            </Card>
          </main>
        </>
    ) : (
      <>
        <main className='flex flex-col items-center justify-between py-10'>
          You must be signed in to create a post.
        </main>
      </>
    )
}