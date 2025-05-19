import { useMemo } from 'react'
import { Habit } from '@/types/habit'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

type DayData = {
  day: string
  value: number
  max: number
}

export function useWeeklyChartData(habits: Habit[]): DayData[] {
  const data: DayData[] = useMemo(() => {
    const today = dayjs()
    const weekStart = today.startOf('week')
    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
      weekStart.add(i, 'day')
    )

    return daysOfWeek.map((date) => {
      const fullDate = date.format('YYYY-MM-DD')
      const shortDay = date.format('ddd')
      let value = 0
      let max = 0

      habits.forEach((habit) => {
        const isScheduled = habit.days.includes(fullDate)
        const status = habit.statusByDate?.[fullDate]

        if (isScheduled) {
          max += 1
          if (status === 'concluded') {
            value += 1
          }
        }
      })

      return {
        day: shortDay.charAt(0).toUpperCase() + shortDay.slice(1),
        value,
        max,
      }
    })
  }, [habits])

  return data
}
