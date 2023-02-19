// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'GET')
    {
        const session = await unstable_getServerSession(req, res, authOptions)

        if(!session)
        {
            return res.status(401).json({ message: 'Please Sign In' });
        }

        // get user's posts
        try 
        {
            const data = await prisma.user.findUnique({
                where: { email: session.user?.email },
                include: { Post: { orderBy: { createdAt: "desc"}, include: { comments: true } } }
            });

            res.status(200).json(data)
        }
        catch(error)
        {
            res.status(403).json({ err: 'Error has Occured While Fetching Your Posts' })
        }

    }
}