import { useMemo } from 'react'
import { Habit } from '@/types/habit'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import 'dayjs/locale/pt-br'
import { useGoal } from '@/contexts/goal-context'

dayjs.extend(isBetween)
dayjs.locale('pt-br')

export function useGoalSummaryFromHabits(habits: Habit[]) {
  const { goals } = useGoal()

  const summary = useMemo(() => {

    const now = dayjs()
    const startOfThisMonth = now.startOf('month')
    const endOfThisMonth = now.endOf('month')
    const startOfLastMonth = now.subtract(1, 'month').startOf('month')
    const endOfLastMonth = now.subtract(1, 'month').endOf('month')

    const goalsThisMonth = goals.filter((goal) =>
      dayjs(goal.createdAt).isBetween(
        startOfThisMonth,
        endOfThisMonth,
        'day',
        '[]'
      )
    )

    const goalsLastMonth = goals.filter((goal) =>
      dayjs(goal.createdAt).isBetween(
        startOfLastMonth,
        endOfLastMonth,
        'day',
        '[]'
      )
    )

    const totalThisMonth = goalsThisMonth.length
    const totalLastMonth = goalsLastMonth.length
    const difference = totalLastMonth - totalThisMonth

    const message =
      difference > 0
        ? `Faltam ${difference} metas para bater o total do mês passado.`
        : difference === 0
        ? 'Você igualou o total de metas do mês passado!'
        : 'Você superou o total de metas do mês passado! 🎉'

    return {
      totalThisMonth,
      totalLastMonth,
      difference,
      message,
    }
  }, [habits])

  return summary
}
