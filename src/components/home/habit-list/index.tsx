import { View } from 'react-native'
import { HabitCard } from '../habit-card'
import { styles } from './styles'

export function HabitList() {
  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }, (_, index) => (
        <HabitCard key={index} />
      ))}
    </View>
  )
}
