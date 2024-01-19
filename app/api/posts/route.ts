import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: any){
    const { title, caption, location, event_date } = await req.json();
    await prisma.posts.create({
        data : {
            title, caption, location, event_date
        }
    });
    return NextResponse.json({message: 'submitted'}, {status: 201})
}


export async function DELETE(req: any) {
    const id = req.nextUrl.searchParams.get('id');
    await prisma.posts.delete({
        where: {
            id: parseInt(id),
        }
    });
    return NextResponse.json({message: 'post deleted'}, {status: 201});
}