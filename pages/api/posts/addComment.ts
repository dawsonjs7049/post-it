// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'POST')
    {
        const session = await unstable_getServerSession(req, res, authOptions)

        if(!session)
        {
            return res.status(401).json({ message: 'Please Sign In' });
        }

        const prismaUser = await prisma.user.findUnique({
            where: { email: session?.user?.email },
        })

        // add comment to a post
        try 
        {
            const { title, postId } = req.body.data;

            if(title.length == 0)
            {
                return res.status(401).json({ message: 'Please Enter A Comment' });
            }

            const result = await prisma.comment.create({
                data: {
                    message: title,
                    userId: prismaUser?.id,
                    postId
                }
            })

            res.status(200).json(result)
        }
        catch(error)
        {
            res.status(403).json({ err: 'Error has Occured While Fetching Your Posts' })
        }

    }
}