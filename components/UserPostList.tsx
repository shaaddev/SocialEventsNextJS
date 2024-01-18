import '@/styles/post_list.css';
import Link from 'next/link';
import { HiDotsVertical } from 'react-icons/hi';
import DeleteBtn from './DeleteBtn';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const { posts } = require('@/lib/connect');

type Posts = {
    _id: string;
    title: string;
    caption: string;
    location: string;
    event_date: string;
}

export default async function UserPostList(){
    const post = await posts.find({});

    const { isAuthenticated } = getKindeServerSession();

    return ( await isAuthenticated()) ? (
        <> 
            <h1 className='m-5'>Social Events</h1>
            <div className='container mx-auto px-1 my-10 justify-center'>
            {post.map((p: Posts) => (
                    <div className='all_posts' key={p._id}>
                        <div className='p-5'>
                            <h3 className="post_user">@username</h3>
                            <h3 className="title">{ p.title } - { p.event_date}</h3>
                            <h4 className="location">{ p.location }</h4>
                            <p className="caption">{ p.caption }</p>
                            <div className='flex gap-2'>
                                <Link className='update-icon' href={`/posts/edit/${p._id}`}>
                                    <HiDotsVertical />
                                </Link>
                            </div>
                            <div className='flex gap-2'>
                                <DeleteBtn id={p._id}/>
                            </div>
                        </div>
                    </div>
            ))}
            </div>
        </>
    ) : (
        <>
            You must be signed in to view your posts.
        </>
    );
}

