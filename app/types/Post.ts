export type PostType = {
    title: string,
    id: string,
    updatedAt?: string
    user: {
        email: string,
        name: string,
        image: string,
        id: string
    },
    comments?: {
        createdAt?: string,
        id: string,
        postId: string,
        userId: string
        message: string,
        user: {
            email: string,
            id: string,
            image: string,
            name: string
        }
    }[]
}