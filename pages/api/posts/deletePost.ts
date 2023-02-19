// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'DELETE')
    {
        const session = await unstable_getServerSession(req, res, authOptions)

        if(!session)
        {
            return res.status(401).json({ message: 'Please Sign In' });
        }

        // delete post
        try 
        {
            const postId = req.body;
            const result = await prisma.post.delete({
                where: {
                    id: postId
                }
            });

            res.status(200).json(result)
        }
        catch(error)
        {
            res.status(403).json({ err: 'Error has Occured While Deleting Post' })
        }

    }
}