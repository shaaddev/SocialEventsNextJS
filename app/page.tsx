import PostList from '@/components/PostList'

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between px-6">
        <div>
          <PostList />
        </div>
      </main>
  )
}
