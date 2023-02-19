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
            return res.status(401).json({ message: 'Please Sign In to Make a Post' });
        }

        const title: string = req.body.title 
       //Get User
        const prismaUser = await prisma.user.findUnique({
            where: { email: session?.user?.email },
        })
        
        if(title.length > 300)
        {
            return res.status(403).json({ message: 'Message is Too Long' });
        }

        if(title.length == 0)
        {
            return res.status(403).json({ message: 'No Message Entered' });
        }

        // create the post
        try 
        {
            const result = await prisma.post.create({
                data: {
                    title,
                    userId: prismaUser.id
                }
            });

            res.status(200).json(result)
        }
        catch(error)
        {
            res.status(403).json({ err: 'Error has Occured While Making Post' })
        }

    }
}