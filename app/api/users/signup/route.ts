const { user } = require('@/lib/connect');
import { NextResponse } from 'next/server';

export async function POST(request: Request){
    const { fullname, username, email, password } = await request.json();
    await user.create({
        fullname, username, email, password
    });
    return NextResponse.json({ message: 'submitted'}, {status: 201})
}