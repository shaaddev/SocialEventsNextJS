import '@/styles/post_list.css';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { db } from '@/db';
import { posts } from '@/db/schema/posts';
import { desc } from 'drizzle-orm';

type Posts = {
    id: number;
    title: string;
    caption: string;
    location: string;
    event_date: string;
}

export default async function PostList(){
    const post = await db.select().from(posts).orderBy(desc(posts.id));

    return(
        <> 
            <h1 className='my-10 font-base text-black dark:text-neutral-200'>Social Events</h1>
            <div className='container mx-auto px-1 my-10 justify-center'>
            {post.map((p: Posts) => (
                    <Card key={p.id} className='w-full md:w-[499px] md:h-[300px] text-black bg-slate-200 shadow-md dark:shadow-none dark:bg-zinc-800 dark:text-neutral-200 mb-9 border-none'>
                        <CardContent>
                            <div className='py-5'>
                                <h3 className="post_user">@username</h3>
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

