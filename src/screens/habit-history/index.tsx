import { FullHistoryChart } from '@/components/habit-history/full-history-chart'
import { styles } from './styles'
import { View } from 'react-native'

export function HabitHistoryScreen() {
  return (
    <View style={styles.container}>
      <FullHistoryChart />
    </View>
  )
}
