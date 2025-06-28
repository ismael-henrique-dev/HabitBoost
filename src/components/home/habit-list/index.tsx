import { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useHabit } from '@/contexts/habit-context'
import { HabitCard } from '../habit-card'
import { styles } from './styles'
import dayjs from 'dayjs'
import Animated, {
  Layout,
  Easing,
  FadeInUp,
  FadeOutUp,
} from 'react-native-reanimated'
import { useLocalSearchParams } from 'expo-router'
import { EmptyHabitList } from '../empty-habit-list'
import { colors, fontFamily } from '@/styles/theme'
import { HabitListSkeleton } from '@/components/ui/skeletons/habit-list-skeleton'

const HABITS_PER_PAGE = 5

export function HabitList() {
  const { isLoading, habits, selectedDate } = useHabit()
  const formattedSelectedDate = dayjs(selectedDate).format('YYYY-MM-DD')

  const { categoryId, status } = useLocalSearchParams<{
    categoryId?: string
    status?: string
  }>()

  const [visibleCount, setVisibleCount] = useState(HABITS_PER_PAGE)

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

  const enteringAnimation = FadeInUp.duration(600).easing(
    Easing.out(Easing.linear)
  )
  const exitingAnimation = FadeOutUp.duration(600).easing(
    Easing.in(Easing.linear)
  )

  const layoutAnimation = Layout.springify().damping(300).stiffness(0).mass(0.1)

  const visibleHabits = filteredHabits.slice(0, visibleCount)
  const hasMoreToShow = filteredHabits.length > visibleCount

  return (
    <View style={styles.container}>
      {isLoading && <HabitListSkeleton />}
      {visibleHabits.length === 0 && !isLoading && <EmptyHabitList />}
      {visibleHabits.map((habit) => (
        <Animated.View
          key={habit.id}
          entering={enteringAnimation}
          exiting={exitingAnimation}
          layout={layoutAnimation}
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

      {hasMoreToShow && (
        <TouchableOpacity
          onPress={() => setVisibleCount((prev) => prev + HABITS_PER_PAGE)}
          style={{
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: colors.lime[600],
              fontFamily: fontFamily.semiBold,
              fontSize: 16,
              textDecorationLine: 'underline',
            }}
          >
            VER MAIS
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
