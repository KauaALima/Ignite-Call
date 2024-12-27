import { prisma } from '../../../../lib/prisma'
import Image from 'next/image'
import { ScheduleForm } from './ScheduleForm'

type ScheduleProps = Promise<{
  params: {
    username: string
  }
}>

async function getDetails(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    user: {
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatar_url,
    },
  }
}

// export const metadata: Metadata = {
//   title: 'Crie uma conta',
// }

export default async function Schedule(props: { params: ScheduleProps }) {
  const params = await props.params
  const { user } = await getDetails(params.params.username)

  return (
    <div className="mx-auto mb-4 mt-8 max-w-[852px] px-4 py-0">
      <header className="flex flex-col items-center">
        <Image
          src={user?.avatarUrl}
          alt={user?.name}
          width={64}
          height={64}
          className="rounded-full"
        />
        <h1 className="mt-2 text-2xl font-bold leading-normal text-white">
          {user?.name}
        </h1>
        <p className="text-base font-normal text-gray-200">{user?.bio}</p>
      </header>
      <ScheduleForm />
    </div>
  )
}
