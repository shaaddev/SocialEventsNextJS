import UserPostList from "@/components/UserPostList";

export default function List(){
    return (
        <main className="flex flex-col items-center justify-between p-10">
            <div>
                <UserPostList />
            </div>
        </main>
    )
}