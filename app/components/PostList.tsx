'use client';
import '@/styles/post_list.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiDotsVertical } from 'react-icons/hi';
import DeleteBtn from './DeleteBtn';

type Posts = {
    _id: string;
    title: string;
    caption: string;
    location: string;
    event_date: string;
    created_at: string;
}

export default function PostList(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/api/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.log('failed to fetch: ', err))
    }, [])

    return(
        <> 
            <h1 className='m-5'>Social Events</h1>
            <div className='container mx-auto px-1 my-10 justify-center'>
            {posts.map((p: Posts) => (
                    <div className='all_posts' key={p._id}>
                        <div className='p-5'>
                            <h3 className="post_user">@username</h3>
                            <h3 className="title">{ p.title } - { p.event_date}</h3>
                            <h4 className="location">{ p.location }</h4>
                            <p className="caption">{ p.caption }</p>
                            <p className="date-bottom">{ p.created_at }</p>
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
    )
}

