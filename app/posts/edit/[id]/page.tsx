import EditForm from '@/components/EditForm';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Posts {
  id: number,
  title: string,
  caption: string,
  location: string,
  event_date: string
}

export default async function EditPost({ params }: {params : {id: string}}){
  const { id } = params;
  const post: any = await prisma.posts.findUnique({ where: { id: parseInt(id)}});
  return <EditForm id={id} title={post.title} caption={post.caption} location={post.location} event_date={post.event_date}/>;
}