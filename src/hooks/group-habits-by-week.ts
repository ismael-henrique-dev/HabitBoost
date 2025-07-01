import dayjs from 'dayjs'
import { Habit } from '@/types/habit'

export type WeekSummary = {
  startDate: string // ex: "2025-03-10"
  endDate: string   // ex: "2025-03-16"
  label: string     // ex: "10 de mar - 16 de mar"
  monthYear: string // ex: "Março de 2025"
  days: {
    day: string
    value: number
    max: number
  }[]
}

export function groupHabitsByWeek(habits: Habit[]): WeekSummary[] {
  const allDates = new Set<string>()

  habits.forEach((habit) => {
    habit.days.forEach((date) => {
      allDates.add(date)
    })
  })

  const sortedDates = Array.from(allDates).sort()
  const groupedWeeks: WeekSummary[] = []

  for (const dateStr of sortedDates) {
    const date = dayjs(dateStr)
    const weekStart = date.startOf('week')
    const weekEnd = date.endOf('week')

    const weekKey = `${weekStart.format('YYYY-MM-DD')}~${weekEnd.format('YYYY-MM-DD')}`

    let weekGroup = groupedWeeks.find((w) => w.startDate === weekStart.format('YYYY-MM-DD'))

    if (!weekGroup) {
      weekGroup = {
        startDate: weekStart.format('YYYY-MM-DD'),
        endDate: weekEnd.format('YYYY-MM-DD'),
        label: `${weekStart.format('D [de] MMM')} - ${weekEnd.format('D [de] MMM')}`,
        monthYear: weekStart.format('MMMM [de] YYYY'),
        days: [],
      }

      // Inicializa com os dias da semana
      for (let i = 0; i < 7; i++) {
        const current = weekStart.add(i, 'day')
        weekGroup.days.push({
          day: current.format('ddd').charAt(0).toUpperCase() + current.format('ddd').slice(1),
          value: 0,
          max: 0,
        })
      }

      groupedWeeks.push(weekGroup)
    }

    // Acumular os dados
    habits.forEach((habit) => {
      if (habit.days.includes(dateStr)) {
        const status = habit.statusByDate?.[dateStr]
        const index = date.day() // 0 (domingo) a 6 (sábado)
        weekGroup!.days[index].max += 1
        if (status === 'concluded') {
          weekGroup!.days[index].value += 1
        }
      }
    })
  }

  return groupedWeeks
}
