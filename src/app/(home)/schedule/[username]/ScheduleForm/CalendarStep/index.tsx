'use client'

import { twMerge } from 'tailwind-merge'
import { Calendar } from '../../../../../../components/Calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { api } from '../../../../../../lib/api'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isSelectedDate = !!selectedDate

  const searchParams = useParams<{ username: string }>()
  const username = searchParams.username
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    {
      enabled: !!selectedDate,
    },
  )

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }

  return (
    <div
      className={twMerge(
        'relative mx-auto mb-0 mt-6 grid max-w-full rounded-md border border-gray-600 bg-gray-800 p-0',
        isSelectedDate
          ? 'grid-cols-[1fr,280px] max-md:grid-cols-[1fr]'
          : 'w-[540px] grid-cols-[1fr]',
      )}
    >
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isSelectedDate && (
        <div className="absolute bottom-0 right-0 top-0 w-[280px] overflow-y-scroll border-l border-gray-600 px-6 pb-0 pt-6">
          <strong className="font-medium">
            {weekDay} <span>{describedDate}</span>
          </strong>
          <div className="mt-3 grid grid-cols-[1fr] gap-2 last:mb-6 max-md:grid-cols-[2fr]">
            {availability?.possibleTimes.map((hour) => {
              return (
                <button
                  key={Math.floor(Math.random() / 1)}
                  onClick={() => handleSelectTime(hour)}
                  className="cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 leading-normal text-gray-100 hover:enabled:bg-gray-500 disabled:cursor-default disabled:bg-gray-800 disabled:opacity-40"
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
