import { Habit } from '@/types/habit'
import { GoalCard } from '../goal-card'

type GoalsListProps = {
  habit: Habit
}

export function GoalsList({ habit }: GoalsListProps) {
  if (!habit || !habit.goals || habit.goals.length === 0) {
    return null
  }

  return (
    <>
      {habit.goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goalId={goal.id}
          habitId={habit.id}
          currentCount={goal.currentCount}
          targetCount={goal.targetCount}
          title={goal.title}
        />
      ))}
    </>
  )
}
