import '@/styles/post_list.css';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Posts = {
    id: number;
    title: string;
    caption: string;
    location: string;
    event_date: string;
}

export default async function PostList(){
    const post = await prisma.posts.findMany();

    return(
        <> 
            <h1 className='m-5'>Social Events</h1>
            <div className='container mx-auto px-1 my-10 justify-center'>
            {post.map((p: Posts) => (
                    <div className='all_posts' key={p.id}>
                        <div className='p-5'>
                            <h3 className="post_user">@username</h3>
                            <h3 className="title">{ p.title } - { p.event_date}</h3>
                            <h4 className="location">{ p.location }</h4>
                            <p className="caption">{ p.caption }</p>
                        </div>
                    </div>
            ))}
            </div>
        </>
    )
}

