import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params : {id: string}} ){
    const { id } = params;
    const { newTitle: title, newCaption: caption, newLocation: location, newEventDate: event_date} = await request.json();
    await prisma.posts.update({
        where: {
            id: parseInt(id),
        },
        data: {
            title, caption, location, event_date
        }
    })
    return NextResponse.json({ message: 'post updated'}, {status: 200});
}