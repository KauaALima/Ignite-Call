'use client'

import { api } from '../lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const UpdateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof UpdateProfileFormSchema>

export function UpdateProfileForm() {
  const { register, handleSubmit } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(UpdateProfileFormSchema),
  })

  const session = useSession()
  console.log(session)

  const Router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    Router.push(`/schedule/${session.data?.user.username}`)
  }
  return (
    <form
      onSubmit={handleSubmit(handleUpdateProfile)}
      className="mt-6 flex flex-col items-start gap-4 rounded-md border border-gray-600 bg-gray-800 p-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="userName" className="ml-1 text-sm text-gray-100">
          Foto de Perfil
        </label>

        {session.status === 'loading' ? (
          <h1>não</h1>
        ) : (
          <Image
            src={session.data?.user.avatar_url}
            alt={session.data?.user.username}
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
      </div>

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="userName" className="ml-1 text-sm text-gray-100">
          Sobre você
        </label>
        <div className="flex items-center justify-center rounded-md border-2 border-gray-900 bg-gray-900 px-3 py-3 focus-within:border-green-300">
          <textarea
            id="userName"
            className="h-[120px] w-full border-none bg-gray-900 text-sm font-normal text-white placeholder:text-gray-400"
            {...register('bio')}
          />
        </div>
        <p className="text-sm text-gray-200">
          Fale um pouco sobre você. Isto será exibido em sua página pessoal.
        </p>
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-md bg-green-500 py-3 text-sm text-white hover:bg-green-300">
        Finalizar <ArrowRight size={16} />
      </button>
    </form>
  )
}
