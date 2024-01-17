'use client';
import '@/styles/post_list.css';
import { useState, useEffect } from 'react';


type Posts = {
    _id: string;
    title: string;
    caption: string;
    location: string;
    event_date: string;
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
                        </div>
                    </div>
            ))}
            </div>
        </>
    )
}

