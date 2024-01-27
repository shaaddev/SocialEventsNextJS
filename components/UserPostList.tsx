import '@/styles/post_list.css';
import Link from 'next/link';
import { HiDotsVertical } from 'react-icons/hi';
import DeleteBtn from './DeleteBtn';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from '@prisma/client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const prisma = new PrismaClient();

type Posts = {
    id: number;
    title: string;
    caption: string;
    location: string;
    event_date: string;
}

export default async function UserPostList(){
    const post = await prisma.posts.findMany();

    const { isAuthenticated } = getKindeServerSession();

    return ( await isAuthenticated()) ? (
        <> 
            <h1 className='m-5'>Social Events</h1>
            <div className='container mx-auto px-1 my-10 justify-center'>
            {post.map((p: Posts) => (
                    <Card className='w-full md:w-[499px] md:h-[300px] bg-zinc-800 text-neutral-200 mb-9 border-none' key={p.id}>
                        <CardContent>
                            <div className='py-5'>
                                <h3 className="post_user">@username</h3>
                                <h3 className="title">{ p.title } - { p.event_date}</h3>
                                <h4 className="location">{ p.location }</h4>
                                <p className="caption">{ p.caption }</p>
                            </div>
                        </CardContent>
                        <CardFooter className='flex justify-between opacity-50'>
                            <div className='flex gap-2'>
                                <Link className='' href={`/posts/edit/${p.id}`}>
                                    <HiDotsVertical />
                                </Link>
                            </div>
                            <div className='flex gap-2'>
                                <DeleteBtn id={p.id}/>
                            </div> 
                        </CardFooter>
                    </Card>
            ))}
            </div>
        </>
    ) : (
        <>
            You must be signed in to view your posts.
        </>
    );
}

