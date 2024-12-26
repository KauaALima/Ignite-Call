import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { Calendar, Clock } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const confirmStepFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no minimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um email valido' }),
  obeservation: z.string().nullable(),
})

type confirmStepFormData = z.infer<typeof confirmStepFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<confirmStepFormData>({
    resolver: zodResolver(confirmStepFormSchema),
  })

  const searchParams = useParams<{ username: string }>()
  const username = searchParams.username

  async function handleConfirmScheduling(data: confirmStepFormData) {
    const { name, email, obeservation } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      obeservation,
      data: schedulingDate,
    })

    onCancelConfirmation()
  }

  const describeDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describeTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <form
      onSubmit={handleSubmit(handleConfirmScheduling)}
      className="mx-auto mb-0 mt-6 flex max-w-[540px] flex-col gap-4 rounded-md border border-gray-600 bg-gray-800 p-6"
    >
      <header className="mb-2 flex items-center gap-4 border-b border-gray-600 pb-6">
        <p className="flex items-center justify-center gap-2 text-base text-white">
          <Calendar width={20} height={20} className="text-gray-200" />
          {describeDate}
        </p>
        <p className="flex items-center justify-center gap-2 text-white">
          <Clock width={20} height={20} className="text-gray-200" />
          {describeTime}
        </p>
      </header>
      <div className="space-y-2">
        <label htmlFor="user" className="text-sm font-normal text-gray-100">
          Seu nome
        </label>

        <div className="flex items-center justify-center rounded-md border-2 border-gray-900 bg-gray-900 px-4 py-3">
          <label htmlFor="user" className="text-sm font-normal text-gray-500">
            cal.com/
          </label>
          <input
            type="text"
            id="user"
            placeholder="seu-usuario"
            className="placeholder:text-gray-400: w-full border-none bg-gray-900 p-0 text-sm font-normal text-white outline-0"
            {...register('name')}
          />
        </div>

        {errors.name && (
          <span className="mt-2 text-sm text-red-500">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-normal text-gray-100">
          Endereço de e-mail
        </label>
        <input
          type="email"
          placeholder="johndoe@exanple.com"
          className="rounded-md border-0 bg-gray-900 px-4 py-3 text-sm text-gray-100 disabled:cursor-not-allowed disabled:opacity-55"
          {...register('email')}
        />

        {errors.email && (
          <span className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-normal text-gray-100">
          Observações
        </label>
        <textarea
          className="h-[80px] w-full resize-none rounded-md border-none bg-gray-900 text-sm font-normal text-white placeholder:text-gray-400"
          {...register('obeservation')}
        />
      </div>

      <div className="ml-auto">
        <button type="button" onClick={onCancelConfirmation}>
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="ml-8 rounded-md bg-green-500 px-[25px] py-3 text-sm font-medium text-white disabled:bg-green-300"
        >
          Confirmar
        </button>
      </div>
    </form>
  )
}
