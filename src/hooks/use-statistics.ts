import { useGoal } from '@/contexts/goal-context'
import { useHabit } from '@/contexts/habit-context'

export function useStatistics() {
  const { habits } = useHabit()
  const { goals } = useGoal()

  const totalHabits = habits.length

  const totalHabitsCompleted = habits.filter((habit) =>
    Object.values(habit.statusByDate || {}).includes('concluded')
  ).length

  const totalGoals = goals.length

  const totalGoalsCompleted = goals.filter(
    (goal) => goal.currentCount === goal.targetCount
  ).length

  return {
    totalHabits,
    totalHabitsCompleted,
    totalGoals,
    totalGoalsCompleted,
  }
}
