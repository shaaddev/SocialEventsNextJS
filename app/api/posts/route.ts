import { NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema/posts'; 
import { eq } from 'drizzle-orm';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: any){
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const { title, caption, location, event_date } = await req.json();
    await db.insert(posts).values({
        kindeAuthId: user?.id as string,
        kindeAuthName: user?.given_name as string,
        title: title,
        caption: caption,
        location: location,
        event_date: event_date
    });
    return NextResponse.json({message: 'submitted'}, {status: 201})
}


export async function DELETE(req: any) {
    const id = req.nextUrl.searchParams.get('id');
    await db.delete(posts)
        .where(eq(posts.id, parseInt(id)));    
    return NextResponse.json({message: 'post deleted'}, {status: 201});
}