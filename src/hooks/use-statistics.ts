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


 



  return {
    totalHabits,
    totalHabitsCompleted,
    totalGoals,
    totalGoalsCompleted,
  }
}
