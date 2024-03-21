"use server";
import { db } from '@/db';
import { posts } from '@/db/schema/posts';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updatePost = async (formData: FormData, id: string) => {

    const new_title = formData.get('new_title') as string;
    const new_caption = formData.get('new_caption') as string;
    const new_location = formData.get('new_location') as string;
    const new_event_date = formData.get('new_event_date') as string;


    if (!new_title || !new_caption || !new_location || !new_event_date || typeof new_title !== 'string' || typeof new_location !== 'string' || typeof new_caption !== 'string' || typeof new_event_date !== 'string'){
        return {
            error: 'Invalid message',
        }
    }

    try {
        await db.update(posts)
            .set({ title: new_title, caption: new_caption, location: new_location, event_date: new_event_date})
            .where(eq(posts.id, parseInt(id)));
        
        
    } catch (err){
        return console.error("Error: ", err);
    }
    revalidatePath("/");
    redirect("/");
}