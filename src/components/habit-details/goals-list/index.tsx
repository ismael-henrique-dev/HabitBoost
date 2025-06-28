import { Habit } from '@/types/habit'
import { GoalCard } from '../goal-card'
import { useGoal } from '@/contexts/goal-context'
import { EmptyGoalList } from '../empty-goal-list'

type GoalsListProps = {
  habit: Habit
}

export function GoalsList({ habit }: GoalsListProps) {
  const { goals } = useGoal()

  // Filtrar metas relacionadas a este hábito
  const filteredGoals = goals.filter((goal) => goal.habitId === habit.id)

  // if (filteredGoals.length === 0) {
  //   return null
  // }

  return (
    <>
      {filteredGoals.map((goal) => (
        <GoalCard
          key={goal.id}
          goalId={goal.id}
          habitId={habit.id}
          currentCount={goal.currentCount}
          targetCount={goal.targetCount}
          title={goal.title}
        />
      ))}
      {filteredGoals.length === 0 && <EmptyGoalList habitId={habit.id} />}
    </>
  )
}
