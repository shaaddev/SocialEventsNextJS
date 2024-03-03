'use client';
import '@/styles/side.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  new_title: z
    .string({
      required_error: "Please enter a title"
    })
    .max(25, {message: "Must be 25 or fewer characters long"}),
  new_caption: z
    .string({
      required_error: "Please enter a caption"
    })
    .max(255),
  new_location: z
    .string({
      required_error: "Please enter a location"
    })
    .max(25, {message: "Must be 25 or fewer characters long"}),
  event_date: z
    .string({
      required_error: "Please select a date"
    })
})

export default function EditForm({id, title, caption, location, event_date}: {id: string, title: string, caption: string, location: string, event_date: string}) {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })

    const router = useRouter();

    const handleSubmit = async (new_data: z.infer<typeof formSchema>) => {

        if (!new_data){
          alert("All fields are required!");
          return;
        }
        
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(new_data),
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
        <>
          <main className='flex flex-col items-center justify-between p-5 md:p-20'>
            <Card className='w-full md:w-3/5 mt-10 p-10 text-black bg-slate-200 dark:bg-zinc-800 dark:text-neutral-200 border-none'>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
                    <FormField 
                      control={form.control}
                      name="new_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <Input {...field}  className='border border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800' maxLength={25}/>
                        </FormItem>
                      )}
                    />
                    <FormField 
                      control={form.control}
                      name="new_caption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Caption</FormLabel>
                          <Textarea {...field}  className='border dark:border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800'/>
                        </FormItem>
                      )}
                    />
                    <FormField 
                      control={form.control}
                      name="new_location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <Input {...field}  className='border border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800' maxLength={25}/>
                        </FormItem>
                      )}
                    />
                    <FormField 
                      control={form.control}
                      name="event_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Date</FormLabel>
                          <Input type="date" {...field} className='border border-slate-200 border-opacity-10 bg-white dark:bg-zinc-800'/>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className='rounded-full bg-cyan-950 text-slate-200 px-7 py-0 m-0'>Update Post</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </main>
        </>
    )
}