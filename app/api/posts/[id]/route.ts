import { NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema/posts';
import { eq } from 'drizzle-orm';


export async function PUT(request: Request, { params }: { params : {id: string}} ){
    const { id } = params;
    const { newTitle: title, newCaption: caption, newLocation: location, newEventDate: event_date} = await request.json();
    await db.update(posts)
        .set({ title, caption, location, event_date})
        .where(eq(posts.id, parseInt(id)))
    return NextResponse.json({ message: 'post updated'}, {status: 200});
}