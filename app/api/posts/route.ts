const { posts } = require('@/lib/connect');
import { NextResponse } from 'next/server';

export async function POST(req: any){
    const { title, caption, location, event_date } = await req.json();
    await posts.create({
        title, caption, location, event_date
    });
    return NextResponse.json({message: 'submitted'}, {status: 201})
}

export async function GET() {
    const getPosts = await posts.find({});
    
    return NextResponse.json(getPosts);
}

export async function DELETE(req: any) {
    const id = req.nextUrl.searchParams.get('id');
    await posts.findByIdAndDelete(id);
    return NextResponse.json({message: 'post deleted'}, {status: 201});
}