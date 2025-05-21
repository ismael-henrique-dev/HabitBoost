import { useHabit } from '@/contexts/habit-context'
import { useGoalSummaryFromHabits } from '@/hooks/use-goal-summary-from-habits'
import { Text, View } from 'react-native'
import { styles } from './styles'

export function GoalSummaryCard() {
  const { habits } = useHabit()
  const { totalThisMonth, totalLastMonth, message } =
    useGoalSummaryFromHabits(habits)

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Metas do mês passado:</Text>
        <Text style={styles.value}>{totalLastMonth}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Metas deste mês:</Text>
        <Text style={styles.value}>{totalThisMonth}</Text>
      </View>

      <Text style={styles.message}>{message}</Text>
    </View>
  )
}
