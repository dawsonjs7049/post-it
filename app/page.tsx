'use client'

import axios from 'axios';
import AddPost from './components/AddPost';
import Post from './components/Post';
import { useQuery } from '@tanstack/react-query';
import { PostType } from './types/Posts';

// fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
}

export default function Home() {

  const { data, error, isLoading } = useQuery<PostType[]>({ queryFn: allPosts, queryKey: ["posts"]});

  if(error)
  {
    return error;
  }

  if(isLoading)
  {
    return "Loading...";
  }
  
  console.log(data)

  return (
    <main>
      <AddPost />
      {
        data && 
          data.map((post: any) => {
            return <Post key={post.id} comments={post.comments} name={post.user.name} avatar={post.user.image} postTitle={post.title} id={post.id} />
          })
      }
    </main>
  )
}
