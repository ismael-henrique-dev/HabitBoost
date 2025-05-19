import { useHabit } from '@/contexts/habit-context'
import dayjs from 'dayjs'

export function useStatistics() {
  const { habits } = useHabit()

  const totalHabits = habits.length

  const totalHabitsCompleted = habits.filter((habit) =>
    Object.values(habit.statusByDate || {}).includes('concluded')
  ).length

  const totalGoals = habits.reduce(
    (acc, habit) => acc + (habit.goals?.length || 0),
    0
  )

  const totalGoalsCompleted = habits.reduce(
    (acc, habit) =>
      acc +
      (habit.goals?.filter((goal) => goal.currentCount === goal.targetCount)
        .length || 0),
    0
  )

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    dayjs().startOf('week').add(i, 'day')
  )

  const habitChartData = weekDays.map((weekDay, index) => {
    const dateStr = weekDay.format('YYYY-MM-DD')
    const dayOfWeek = weekDay.day()

    let value = 0
    let max = 0

    habits.forEach((habit) => {
      const isScheduled = habit.days?.some((d) => Number(d) === dayOfWeek)

      if (isScheduled) {
        max++
        const status = habit.statusByDate?.[dateStr]
        if (status === 'concluded') {
          value++
        }
      }
    })

    return {
      day: daysOfWeek[index],
      value,
      max,
    }
  })

  const goalsChartData = weekDays.map((weekDay, index) => {
    const dateStr = weekDay.format('YYYY-MM-DD')
    const dayOfWeek = weekDay.day()

    let value = 0
    let max = 0

    habits.forEach((habit) => {
      const isScheduled = habit.days?.includes(dayOfWeek.toString())

      if (isScheduled) {
        const goals = habit.goals || []
        max += goals.length

        // Aqui você pode filtrar também apenas se o hábito foi concluído neste dia:
        const status = habit.statusByDate?.[dateStr]
        if (status === 'concluded') {
          value += goals.filter(
            (goal) => goal.currentCount === goal.targetCount
          ).length
        }
      }
    })

    return {
      day: daysOfWeek[index],
      value,
      max,
    }
  })

  return {
    totalHabits,
    totalHabitsCompleted,
    totalGoals,
    totalGoalsCompleted,
    habitChartData,
    goalsChartData,
  }
}
