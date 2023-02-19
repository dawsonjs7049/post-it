'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from 'react-hot-toast'
import { AxiosError } from "axios"

type CommentID = {
    id: string
}

type Comment = {
    postId: string,
    title: string
}

export default function AddComment({ id } : CommentID)
{
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const queryClient = useQueryClient();

    let toastPostID: string;

    const { mutate } = useMutation(
        async (data: Comment) => await axios.post('/api/posts/addComment', { data }),
        {
            onError: (error) => {
                if(error instanceof AxiosError)
                {
                    toast.error(error?.response?.data.message, { id: toastPostID })
                }

                setIsDisabled(false);
            },
            onSuccess: (data) => {
                toast.success("Comment Has Been Uploaded", { id: toastPostID });
                
                setIsDisabled(false);
                setTitle("");

                // will invalidate the cache and force a new fetch so we can see the new post
                queryClient.invalidateQueries(["detail-post"])
            }
        }
    )

    async function SubmitComment(e: React.FormEvent)
    {
        e.preventDefault()

        setIsDisabled(true);

        toastPostID = toast.loading("Adding Comment...", { id: toastPostID });

        mutate({ title, postId: id })
    }

    return (
        <form onSubmit={(e) => SubmitComment(e)} className="my-8">
            <h3>Add a Comment</h3>
            <div className="flex flex-col my-2">
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" className="p-4 text-lg rounded-md my-2" />
            </div>
            <div className="flex items-center gap-2">
                <button disabled={isDisabled} className="text-sm bg-teal-600 text-white p-2 rounded-md shadow-md" type="submit">
                    Add A Comment
                </button>
                <p className={`font-bold ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{title.length}/300</p>
            </div>
        </form>
    )
}