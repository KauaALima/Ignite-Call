'use client'

import { MultiStep } from '../../../../components/MultiStep'
import { getWeekDays } from '../../../../utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '../../../../components/ui/checkbox'
import { ArrowRight } from 'lucide-react'

import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { converTimeToString } from '../../../../utils/conver-time-string-to-minutes'
import { api } from '../../../../lib/api'
import { useRouter } from 'next/navigation'
import type { Metadata } from 'next'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: converTimeToString(interval.startTime),
          endTimeInMinutes: converTimeToString(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início.',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

// export const metadata: Metadata = {
//   title: 'Selecione sua disponibilidade',
// }

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const Router = useRouter()
  const weekDays = getWeekDays()
  const intervals = watch('intervals')

  async function handleCreateIntevals(data: any) {
    const { intervals } = data as TimeIntervalsFormOutput

    await api.post('/users/time-intervals', {
      intervals,
    })

    Router.push('/register/update-profile')
  }

  return (
    <main className="mx-auto mb-4 mt-20 max-w-[572px]">
      <header className="px-6 py-0">
        <strong className="text-2xl text-white">Quase lá</strong>
        <p className="mb-6 text-base text-gray-200">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </p>
        <MultiStep size={4} currentStep={3} />
      </header>

      <div className="mt-6 flex flex-col gap-4 rounded-md border border-gray-600 bg-gray-800 p-6">
        <div className="mb-4 rounded-md border border-gray-600">
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="flex w-full items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          checked={field.value}
                          className="border-gray-300 h-5 w-5 rounded border-gray-900 bg-gray-900 text-white checked:bg-green-500 focus:ring-green-500 data-[state=checked]:bg-green-500"
                        />
                      )
                    }}
                  />
                  <p className="text-base text-gray-100">
                    {weekDays[field.weekDay]}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="time"
                    id=""
                    step={60}
                    disabled={intervals[index].enabled === false}
                    className="rounded-md bg-gray-900 text-sm text-gray-100 disabled:cursor-not-allowed disabled:opacity-55"
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <input
                    type="time"
                    id=""
                    className="rounded-md bg-gray-900 text-sm text-gray-100 disabled:cursor-not-allowed disabled:opacity-55"
                    disabled={intervals[index].enabled === false}
                    step={60}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {errors.intervals && (
          <span className="mt-2 text-sm text-red-500">
            {errors.intervals.message}
          </span>
        )}

        <button
          onClick={handleSubmit(handleCreateIntevals)}
          disabled={isSubmitting}
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-green-500 text-sm text-gray-100 disabled:bg-gray-200"
        >
          Próximo passo <ArrowRight size={16} />
        </button>
      </div>
    </main>
  )
}
