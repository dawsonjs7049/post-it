export type UserPosts = {
    email: string,
    title: string,
    name: string,
    image: string,
    id: string,
    createdAt: string,
    Post: {
        createdAt: string,
        id: string,
        title: string,
        comments?: {
            createdAt: string,
            id: string,
            postId: string,
            title: string,
            userId: string
        }[]
    }[]
}