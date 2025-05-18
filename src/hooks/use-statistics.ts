import { useHabit } from '@/contexts/habit-context'
import dayjs from 'dayjs'

export function useStatistics() {
  const { habits } = useHabit()

  const totalHabits = habits.length
  const totalHabitsCompleted = habits.filter(
    (habit) => habit.status === 'concluded'
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

  const goalsChartData = weekDays.map((weekDay, index) => {
    let value = 0
    let max = 0

    habits.forEach((habit) => {
      const habitDate = dayjs(habit.createdAt)

      if (habitDate.isSame(weekDay, 'day')) {
        const goals = habit.goals || []
        max += goals.length
        value += goals.filter(
          (goal) => goal.currentCount === goal.targetCount
        ).length
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
    goalsChartData,
  }
}
