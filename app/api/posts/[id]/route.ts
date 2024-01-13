const { posts } = require('@/lib/connect');
import { NextResponse } from 'next/server';


export async function PUT(request: Request, { params }: { params : {id: string}} ){
    const { id } = params;
    const { newTitle: title, newCaption: caption, newLocation: location, newEventDate: event_date} = await request.json();
    await posts.findByIdAndUpdate(id, {title, caption, location, event_date});
    return NextResponse.json({ message: 'post updated'}, {status: 200});
}

export async function GET(request: Request, {params}: {params:{id: string}}){
    const { id } = params;
    const post = await posts.findOne({_id: id});
    return NextResponse.json({ post }, {status: 200});
}