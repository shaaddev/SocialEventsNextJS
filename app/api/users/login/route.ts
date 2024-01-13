const { user } = require('@/lib/connect');
import { NextResponse } from 'next/server';

interface FoundUser {
    username: string,
    password: string,
}

export async function POST(request: Request){
    try {

        const { username, password } = await request.json();

        const foundUser: FoundUser[] = await user.findOne({ username, password });

        if (foundUser){
            
            return NextResponse.json({ message: 'logged in'}, { status: 200});
        } else {
            return NextResponse.json({ message: 'invalid credentials'}, { status: 401});
        }
    } catch (err){
        console.error('Error during login: ', err);
        return NextResponse.json({ message: 'internal server error'}, { status: 500});
    }

}