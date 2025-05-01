import { View } from 'react-native'
import { useHabit } from '@/contexts/habit-context'
import { HabitCard } from '../habit-card'
import { styles } from './styles'
import dayjs from 'dayjs'
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated'

export function HabitList() {
  const { habits, selectedDate } = useHabit()
  const formattedSelectedDate = dayjs(selectedDate).format('YYYY-MM-DD')

  const filteredHabits = habits.filter((habit) =>
    habit.days.includes(formattedSelectedDate)
  )

  return (
    <View style={styles.container}>
      {filteredHabits.map((habit) => (
        <Animated.View
          key={habit.id}
          entering={FadeIn}
          exiting={FadeOut.delay(300)}
          layout={Layout.springify()}
        >
          <HabitCard
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
        </Animated.View>
      ))}
    </View>
  )
}
