'use client'

import Posts from "@/app/components/Post"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PostType } from "@/app/types/Post"
import AddComment from "@/app/components/AddComment"
import Image from "next/image"

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`);

    return response.data;
}

type URL = {
    params: {
        slug: string
    }
}

export default function PostDetail(url: URL)
{
    const { data, isLoading } = useQuery<PostType>({ queryFn: () => fetchDetails(url.params.slug), queryKey: ["detail-post"] });

    if(isLoading)
    {
        return <h1>Loading...</h1>
    }
    console.log(data);
    return (
        <div>
            <Posts id={data?.id || ""} name={data?.user.name || ""} avatar={data?.user.image || ""} postTitle={data?.title || ""} comments={data?.comments || []} />
            <AddComment id={data?.id || ""} />
            {
                data?.comments?.map((comment) => (
                        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
                            <div className="flex items-center gap-2">
                                <Image width={24} height={24} src={comment.user.image} alt="avatar" className="rounded-full" />
                                <h3 className="font-bold">{comment.user.name}</h3>
                                <h2 className="text-sm">{comment.createdAt}</h2>
                            </div>
                            <div className="py-4">{comment.message}</div>
                        </div>
                    )
                )
            }
        </div>
    )
}