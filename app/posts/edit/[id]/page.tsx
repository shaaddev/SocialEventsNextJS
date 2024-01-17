import EditForm from '@/components/EditForm';
const { posts } = require('@/lib/connect');

interface Posts {
  id: string,
  title: string,
  caption: string,
  location: string,
  event_date: string
}

export default async function EditPost({ params }: {params : {id: string}}){
  const { id } = params;
  const post: Posts = await posts.findOne({ _id: id});
  return <EditForm id={id} title={post.title} caption={post.caption} location={post.location} event_date={post.event_date}/>;
}