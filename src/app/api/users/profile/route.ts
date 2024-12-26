import { getServerSession } from 'next-auth'
import { BuildAuthOptions } from '../../auth/[...nextauth]/route'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const UpdateProfileBodySchema = z.object({
  bio: z.string(),
})

export async function PUT(
  request: Request,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(BuildAuthOptions(req, res))

  if (!session) {
    return res.status(401).end()
  }

  const data = await request.json()

  const { bio } = UpdateProfileBodySchema.parse(data)

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  return NextResponse.json({}, { status: 201 })
}
