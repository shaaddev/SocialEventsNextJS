import EditForm from '@/components/EditForm';
import { db } from '@/db';
import { posts } from '@/db/schema/posts';
import { eq } from 'drizzle-orm';


export default async function EditPost({ params }: {params : {id: string}}){
  const { id } = params;
  const post = await db.select().from(posts).where(eq(posts.id, parseInt(id)));
  const { title, caption, location, event_date } = post[0];
  return <EditForm id={id} title={title} caption={caption} location={location} event_date={event_date}/>;
}