'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

const claimUserNameFormdSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuario precisa ter pelo menos 3 letras' })
    .transform((username) => username.toLowerCase()),
})

type claimUserNameFormdata = z.infer<typeof claimUserNameFormdSchema>

export function ClaimUserNameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<claimUserNameFormdata>({
    resolver: zodResolver(claimUserNameFormdSchema),
  })

  const router = useRouter()

  async function handleTeste(data: claimUserNameFormdata) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(handleTeste)}
        className="mt-4 grid grid-cols-Form items-center gap-2 rounded-md border border-gray-600 bg-gray-800 p-4 max-md:grid-cols-[1fr]"
      >
        <div className="flex items-center justify-center rounded-md border-2 border-gray-900 bg-gray-900 px-3 py-1 focus-within:border-green-300">
          <label htmlFor="user" className="text-sm font-normal text-gray-500">
            ignite.com/
          </label>
          <input
            type="text"
            id="user"
            placeholder="seu-usuario"
            className="w-full border-none bg-gray-900 pl-0 text-sm font-normal text-white outline-none placeholder:text-gray-400"
            {...register('username')}
          />
        </div>
        <button
          type="submit"
          className="flex h-full w-[120px] items-center justify-center gap-2 rounded-md bg-green-500 px-4 text-center text-sm font-medium text-white duration-100 hover:bg-green-300"
        >
          Reservar <ArrowRight width={16} height={16} />{' '}
        </button>
      </form>
      <span className="mt-2 text-sm text-gray-500">
        {errors.username
          ? errors.username.message
          : 'Digite o nome do usuario desejado'}
      </span>
    </div>
  )
}
