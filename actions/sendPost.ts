"use server";
import { db } from '@/db';
import { posts } from '@/db/schema/posts'; 
import { media } from '@/db/schema/media';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { eq, and } from 'drizzle-orm';
import {redirect} from 'next/navigation';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

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

const acceptedType = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
]

const maxFileSize = 1024 * 1024 * 5 // 5MB

const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
}

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export async function getSignedURL(type: string, size: number, checksum: string){
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser()

    if (!isAuthenticated){
        return {failure: "Not Authenticated"}
    }

    if (!acceptedType.includes(type)){
        return { failure: "Invalid file type"}
    }
    
    if (size > maxFileSize){
        return { failure: "File too large"}
    }
    
    const putObjectCommand = new PutObjectCommand({
        Bucket: bucket,
        Key: generateFileName(),
        ContentType: type,
        ContentLength: size,
        ChecksumSHA256: checksum,
        Metadata: {
            userId: user?.id as string
        }
    })

    const signedURL = await getSignedUrl(s3, putObjectCommand, {
        expiresIn: 60,
    })

    const mediaRes = await db.insert(media).values({
        type: type,
        user_id: user?.id as string,
        url: signedURL.split("?")[0]
    }).returning({id: media.id}).then(res => res[0]);


    return {success: {url: signedURL, mediaId: mediaRes.id}}
}

export const sendPost = async (formData: FormData) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const title = formData.get('title');
    const caption = formData.get('caption');
    const location = formData.get('location');
    const event_date = formData.get('event_date');  

    const image: any = formData.get('image');

    if (!title || !caption || !location || !event_date || typeof title !== 'string' || typeof location !== 'string' || typeof caption !== 'string' || typeof event_date !== 'string'){
        return {
            error: 'Invalid message',
        }
    }
    
    const media_Id = await getSignedURL(image.type, image.size, await computeSHA256(image))
    let mediaId = media_Id?.success?.mediaId
    const signedURLResult = media_Id

    if (signedURLResult.failure !== undefined){
        console.error("Error: Image is too big")
        return;
    }    

    const url = signedURLResult.success.url

    await fetch(url, { 
        method: "PUT",
        body: image,
        headers: {
            "Content-Type": image.type
        }
    })


    if (mediaId){
        const mediaItem = await db
            .select()
            .from(media)
            .where(and(eq(media.id, mediaId), eq(media.user_id, user?.id as string)))
            .then((res) => res[0])
        
        if (!mediaItem){
            console.error("error")
            return { failure: "Media not found"}
        }
    }

    try {
        const postItem = await db.insert(posts).values({
            kindeAuthId: user?.id as string,
            kindeAuthName: user?.given_name as string,
            title: title,
            caption: caption,
            location: location,
            event_date: event_date
        }).returning().then(res => res[0]);


        if (mediaId){
            await db
                .update(media)
                .set({ post_id: postItem.id.toString()})
                .where(eq(media.id, mediaId))
        }
    } catch (err){
        return console.error("Error: ", err)
    }

    revalidatePath("/");
    redirect("/");
}