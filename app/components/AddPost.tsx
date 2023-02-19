'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function CreatePost()
{
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    let toastPostID: string

    const { mutate } = useMutation(
        async (title: string) => await axios.post('/api/posts/addPost', { title }),
        {
            onError: (error) => {
                if(error instanceof AxiosError)
                {
                    console.log(error);
                    toast.error(error?.response?.data.message, { id: toastPostID })
                }

                setIsDisabled(false);
            },
            onSuccess: (data) => {
                toast.success("Post Has Been Uploaded", { id: toastPostID });
                setIsDisabled(false);
                setTitle("");
                console.log(data)
            }
        }
    )

    async function submitPost(e: React.FormEvent) 
    {
        e.preventDefault()

        toastPostID = toast.loading("Creating Your Post", { id: toastPostID }) 

        setIsDisabled(true);

        mutate(title);
    }

    return (
        <form onSubmit={(e) => submitPost(e) } className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea onChange={(e) => setTitle(e.target.value)} className="p-4 text-lg rounded-md my-2 bg-gray-200" name="title" value={title} placeholder="What's Going On?"></textarea>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`font-bold text-sm ${title.length > 300 ? 'text-red-700' : 'text-gray-700'} `}>{title.length}/300</p>
                <button disabled={isDisabled} className="text-sm bg-teal-600 text-white p-2 rounded-md disabled:opacity-25" type="submit">
                    Create a Post
                </button>
            </div>
        </form>
    )
}