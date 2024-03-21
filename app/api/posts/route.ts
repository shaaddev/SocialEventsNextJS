import { NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema/posts'; 
import { media } from '@/db/schema/media';
import { eq } from 'drizzle-orm';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const ak = process.env.AWS_A_KEY!
const sa_k = process.env.AWS_SA_KEY!
const region = process.env.AWS_BUCKET_REGION!
const bucket = process.env.AWS_BUCKET_NAME!


const s3 = new S3Client({
    credentials: {
        accessKeyId: ak,
        secretAccessKey: sa_k
    },
    region: region
})

export async function DELETE(req: any) {
    const {isAuthenticated} = getKindeServerSession();
    
    if (!isAuthenticated){
        return NextResponse.json({message: 'Not Authenticated'}, {status: 401});
    }
    const id = req.nextUrl.searchParams.get('id');

    const mediaItem = await db.delete(media)
        .where(eq(media.post_id, id))
        .returning().then((res) => res[0]);

    await db.delete(posts)
        .where(eq(posts.id, parseInt(id)));    


    const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: bucket,
        Key: mediaItem.url.split('/').pop()!
    })
    await s3.send(deleteObjectCommand)
    
    return NextResponse.json({message: 'post deleted'}, {status: 201});
}