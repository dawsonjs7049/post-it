import prisma from "@/prisma/client";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'GET')
    {
        // get the post
        try 
        {
            const data = await prisma.post.findUnique({
                where: {
                    id: req.query.details,
                },
                include: {
                    user: true,
                    comments: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            user: true
                        }
                    }
                }
            });

            res.status(200).json(data)
        }
        catch(error)
        {
            res.status(403).json({ err: 'Error has Occured While Fetching This Post' })
        }

    }
}