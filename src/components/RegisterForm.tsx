'use client'

import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuario precisa ter pelo menos 3 letras' })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O usuario precisa ter pelo menos 3 letras' }),
})

type RegisterFormData = z.infer<typeof RegisterFormSchema>

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
  })

  const Router = useRouter()

  const SearchParams = useSearchParams()

  const Username = SearchParams.get('username')

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      Router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        alert(error.response.data.message)
      }
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="mt-6 grid grid-rows-2 items-start gap-4 rounded-md border border-gray-600 bg-gray-800 p-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="userName" className="ml-1 text-sm text-gray-100">
          Nome de usuário
        </label>
        <div className="flex items-center justify-center rounded-md border-2 border-gray-900 bg-gray-900 px-3 py-3 focus-within:border-green-300">
          <label
            htmlFor="userName"
            className="text-sm font-normal text-gray-500"
          >
            cal.com/
          </label>
          <input
            type="text"
            id="userName"
            placeholder="seu-nome"
            value={Username!}
            className="placeholder:text-gray-400: w-full border-none bg-gray-900 text-sm font-normal text-white outline-none"
            {...register('username')}
          />
        </div>
        {errors.username && (
          <span className="mt-2 text-sm text-red-500">
            {errors.username.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="nameFull" className="ml-1 text-sm text-gray-100">
          Nome completo
        </label>
        <div className="flex items-center justify-center rounded-md border-2 border-gray-900 bg-gray-900 px-3 py-3 focus-within:border-green-300">
          <input
            type="text"
            id="nameFull"
            placeholder="Seu nome"
            className="placeholder:text-gray-400: w-full border-none bg-gray-900 text-sm font-normal text-white outline-none"
            {...register('name')}
          />
        </div>
        {errors.name && (
          <span className="mt-2 text-sm text-red-500">
            {errors.name.message}
          </span>
        )}
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-md bg-green-500 py-3 text-sm text-white hover:bg-green-300">
        Próximo passo <ArrowRight size={16} />
      </button>
    </form>
  )
}
