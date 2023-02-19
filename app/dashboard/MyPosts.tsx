'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { UserPosts } from "../types/UserPosts";
import EditPost from "./EditPost";

const fetchMyPosts = async () => {
    const response = await axios.get('/api/posts/userPosts');

    return response.data;
}

export default function MyPosts()
{

    const { data, isLoading } = useQuery<UserPosts>({ queryFn: fetchMyPosts, queryKey: ["my-posts"] });

    if(isLoading)
    {
        return <h1>Loading...</h1>
    }
    console.log(data);
    return (
        <div>
            {
                data?.Post.map((post) => {
                    return <EditPost id={post.id} key={post.id} avatar={data.image} name={data.name} title={post.title} comments={post.comments} />
                })
            }
        </div>
    )
}