import EditForm from '@/components/EditForm';
import { db } from '@/db';
import { posts } from '@/db/schema/posts';

interface Posts {
  id: number,
  title: string,
  caption: string,
  location: string,
  event_date: string
}

export default async function EditPost({ params }: {params : {id: string}}){
  const { id } = params;
  const post: any = await db.select().from(posts);
  return <EditForm id={id} title={post.title} caption={post.caption} location={post.location} event_date={post.event_date}/>;
}