import PostList from '@/components/PostList'

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-between px-6">
        <div>
          <PostList />
        </div>
      </main>
  )
}
