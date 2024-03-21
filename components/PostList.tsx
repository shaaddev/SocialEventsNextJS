import '@/styles/post_list.css';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { db } from '@/db';
import { posts } from '@/db/schema/posts';
import { media } from '@/db/schema/media';
import { desc, eq } from 'drizzle-orm';
import Image from 'next/image';

type Posts = {
    id: number;
    kindeAuthId: string;
    title: string;
    caption: string;
    location: string;
    event_date: string;
}

export default async function PostList(){

    const post = await db.select().from(posts).orderBy(desc(posts.id))

    const medium = await db.select().from(media)

    return(
        <> 
            <h1 className='my-10 font-base text-black dark:text-neutral-200'>Social Events</h1>
            <div className='container mx-auto px-1 my-10 justify-center'>
            {post.map((p: any) => (
                    <Card key={p.id} className='w-full md:w-[499px] md:h-auto text-black bg-slate-200 shadow-md dark:shadow-none dark:bg-zinc-800 dark:text-neutral-200 mb-9 border-none'>
                        <CardContent>
                            <div className='py-5'>            
                                {medium.map((m: any) => (
                                    <Image key={m.id} src={m.post_id == p.id ? m.url : ''} className={m.post_id == p.id ? "rounded-xl mb-5 object-fill w-[400px] mx-auto" : "hidden"}  width={400} height={400} alt="media"/>
                                ))}
                                <h3 className="post_user">@{p.kindeAuthName.toLowerCase()}</h3>
                                <h3 className="title">{ p.title } - { p.event_date}</h3>
                                <h4 className="location">{ p.location }</h4>
                                <p className="caption">{ p.caption }</p>
                            </div>
                        </CardContent>
                    </Card>
            ))}
            </div>
        </>
    )
}

