import { View } from 'react-native'
import { useHabit } from '@/contexts/habit-context'
import { HabitCard } from '../habit-card'
import { styles } from './styles'

export function HabitList() {
  const { habits } = useHabit()

  return (
    <View style={styles.container}>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          description={habit.description}
          reminderTime={habit.reminderTime}
          status={habit.status}
          title={habit.title}
          days={habit.days}
          createdAt={habit.createdAt}
          updatedAt={habit.updatedAt}
          completedAt={habit.completedAt}
          id={habit.id}
          category={habit.category}
        />
      ))}
    </View>
  )
}
