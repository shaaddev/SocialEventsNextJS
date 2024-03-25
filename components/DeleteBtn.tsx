'use client';
import { FaTrash } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function DeleteBtn({ id }: {id: number}) {
    const router = useRouter();

    const removePost = async () => {
        const confirmed = confirm('Are you sure?');

        if (confirmed) {
            const res = await fetch(`/api/posts?id=${id}`, {
                method: "DELETE",

            });

            if (res.ok){
                router.refresh();
            }
        }
    }

    return (
        <>
            <button onClick={removePost}> <FaTrash /> </button>
        </>
    )
}