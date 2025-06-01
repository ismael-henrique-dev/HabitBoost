import { View } from 'react-native'
import { useHabit } from '@/contexts/habit-context'
import { HabitCard } from '../habit-card'
import { styles } from './styles'
import dayjs from 'dayjs'
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated'
import { useLocalSearchParams } from 'expo-router'

export function HabitList() {
  const { habits, selectedDate } = useHabit()
  const formattedSelectedDate = dayjs(selectedDate).format('YYYY-MM-DD')

  const { categoryId, status } = useLocalSearchParams<{
    categoryId?: string
    status?: string
  }>()

  const isValidCategory = categoryId && categoryId !== 'null'
  const isValidStatus = status && status !== 'null'

  const filteredHabits = habits
    .filter((habit) => habit.days.includes(formattedSelectedDate))
    .filter((habit) => {
      if (isValidCategory) {
        return habit.categoryId === categoryId
      }
      return true
    })
    .filter((habit) => {
      if (isValidStatus) {
        const statusByDate = habit.statusByDate[formattedSelectedDate]
        return statusByDate === status
      }
      return true
    })

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
            statusByDate={habit.statusByDate}
            title={habit.title}
            days={habit.days}
            createdAt={habit.createdAt}
            updatedAt={habit.updatedAt}
            id={habit.id}
            categoryId={habit.categoryId}
            selectedDate={formattedSelectedDate}
          />
        </Animated.View>
      ))}
    </View>
  )
}
