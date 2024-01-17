import UserPostList from "@/components/UserPostList";

export default function List(){
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-10">
            <div>
                <UserPostList />
            </div>
        </main>
    )
}