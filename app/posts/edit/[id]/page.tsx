import EditForm from '@/app/components/EditForm';

const getPostById = async (id: string) => {
  try {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok){
      throw new Error('Falied to fetch post');
    }

    return res.json();
  } catch (error) {
    console.log("Error", error);
  }
}

export default async function EditPost({ params }: {params : {id: string}}){
  const { id } = params;
  const post = await getPostById(id);
  const {title, caption, location, event_date} = post || {};
  return <EditForm id={id} title={title} caption={caption} location={location} event_date={event_date}/>;
}