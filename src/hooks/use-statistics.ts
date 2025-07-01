import { useGoal } from '@/contexts/goal-context'
import { useHabit } from '@/contexts/habit-context'
import dayjs from 'dayjs'

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

  // Coleta todas as datas com pelo menos um hábito concluído
  const concludedDateSet = new Set<string>()

  habits.forEach((habit) => {
    Object.entries(habit.statusByDate || {}).forEach(([date, status]) => {
      if (status === 'concluded') {
        const formattedDate = dayjs(date).format('YYYY-MM-DD')
        concludedDateSet.add(formattedDate)
      }
    })
  })

  // Converte o set em array ordenado crescente (mais antigo para mais novo)
  const concludedDatesSorted = Array.from(concludedDateSet)
    .map((date) => dayjs(date))
    .sort((a, b) => a.diff(b))

  // 🔥 Calcular melhor sequência
  let bestSequence = 0
  let currentStreak = 0

  for (let i = 0; i < concludedDatesSorted.length; i++) {
    const currentDate = concludedDatesSorted[i]
    const previousDate = concludedDatesSorted[i - 1]

    if (i === 0) {
      currentStreak = 1
    } else if (currentDate.diff(previousDate, 'day') === 1) {
      currentStreak++
    } else {
      currentStreak = 1
    }

    if (currentStreak > bestSequence) {
      bestSequence = currentStreak
    }
  }

  // 🔥 Calcular sequência atual (dias consecutivos até hoje)
  let currentSequence = 0
  let today = dayjs()

  while (true) {
    const key = today.format('YYYY-MM-DD')
    if (concludedDateSet.has(key)) {
      currentSequence++
      today = today.subtract(1, 'day')
    } else {
      break
    }
  }

  return {
    totalHabits,
    totalHabitsCompleted,
    totalGoals,
    totalGoalsCompleted,
    currentSequence,
    bestSequence,
  }
}
