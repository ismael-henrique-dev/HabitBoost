import { View } from 'react-native'
import { useHabit } from '@/contexts/habit-context'
import { HabitCard } from '../habit-card'
import { styles } from './styles'
import dayjs from 'dayjs'

export function HabitList() {
  const { habits, selectedDate } = useHabit()
  const formattedSelectedDate = dayjs(selectedDate).format('YYYY-MM-DD')

  const filteredHabits = habits.filter((habit) =>
    habit.days.includes(formattedSelectedDate)
  )

  return (
    <View style={styles.container}>
      {filteredHabits.map((habit) => (
        <HabitCard
          key={habit.id}
          description={habit.description}
          reminderTime={habit.reminderTime}
          status={habit.status}
          title={habit.title}
          days={habit.days}
          createdAt={habit.createdAt}
          updatedAt={habit.updatedAt}
          id={habit.id}
          categoryId={habit.categoryId}
        />
      ))}
    </View>
  )
}
