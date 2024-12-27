import { getServerSession } from 'next-auth'
import { BuildAuthOptions } from '../../auth/[...nextauth]/route'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '../../../../lib/prisma'

const timeInrevalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export async function POST(
  request: Request,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(BuildAuthOptions(req, res))

  if (!session) {
    return res.status(401).end()
  }

  const interval = await request.json()

  const { intervals } = timeInrevalsBodySchema.parse(interval)

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user.id,
        },
      })
    }),
  )

  console.log(intervals)

  return NextResponse.json({}, { status: 201 })
}
