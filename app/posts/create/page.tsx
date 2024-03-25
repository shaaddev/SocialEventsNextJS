'use client';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { sendPost } from '@/actions/sendPost';

export default function CreatePost() {
    const { register } = useForm();
    
    const { isAuthenticated, isLoading } = useKindeBrowserClient();

    if (isLoading) return <div className='flex flex-col items-center justify-between p-14 mt-14'><main className='text-black dark:text-neutral-200'>Loading...</main></div>

    return isAuthenticated ? (
        <main className='flex flex-col items-center justify-between p-5 md:p-20'>
          <Card className='w-full md:w-4/5 lg:w-3/5 mt-10 p-10 text-black bg-slate-200 dark:bg-zinc-800 dark:text-neutral-200 border-none'>
            <CardContent>
                <form onSubmit={async (e) => { 
                  e.preventDefault();
                  
                  const formData = new FormData(e.currentTarget);
                  await sendPost(formData); 
                  
                  }} className='space-y-6' encType='multipart/form-data'>
                  <Input
                    type="file"
                    id="image"
                    className='border border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800'
                    accept="image/*"
                    {...register("image", {required: false})}
                  />

                  <Input 
                    id="title" 
                    placeholder="Title" 
                    className='border border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800'
                    {...register("title", { required: true})}
                  />

                
                  <Textarea 
                    id="caption" 
                    placeholder='Caption' 
                    className='border border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800'
                    {...register("caption", { required: true})}
                  />

                  <Input 
                    id="location" 
                    placeholder='Location' 
                    className='border border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800'
                    {...register("location", { required: true})}
                  />

              
                  <Input 
                    id="event_date" 
                    type="date" 
                    placeholder='Event Date' 
                    className='border border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800'
                    {...register("event_date", { required: true})}
                  />

                  
                  <Button type="submit" className='rounded-full bg-cyan-950 text-slate-200 px-7 py-0 m-0 dark:hover:text-black dark:hover:bg-slate-300'>Post</Button>
                </form>
            </CardContent>
          </Card>
        </main>
    ) : (
      <>
        <main className='flex flex-col items-center justify-between py-10'>
          You must be signed in to create a post.
        </main>
      </>
    );
}