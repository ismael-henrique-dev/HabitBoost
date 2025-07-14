import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import { useRef, useEffect } from 'react'
import { styles } from './styles'
import { useHabit } from '@/contexts/habit-context'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

export function MonthCalendar() {
  const scrollRef = useRef<ScrollView>(null)
  const { habits, selectedDate, setSelectedDate } = useHabit()
  const ITEM_WIDTH = 66
  const today = dayjs()

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(today.toDate())
    }
  }, [selectedDate, setSelectedDate])

  const hasHabits = habits.length > 0

  const firstHabitDate = hasHabits
    ? dayjs(
        habits.reduce(
          (earliest, habit) =>
            dayjs(habit.createdAt).isBefore(dayjs(earliest))
              ? habit.createdAt
              : earliest,
          habits[0].createdAt
        )
      )
    : today

  const endDate = today.add(1, 'month')
  const daysOfMonth: Dayjs[] = []

  for (
    let date = firstHabitDate;
    date.isBefore(endDate) || date.isSame(endDate, 'day');
    date = date.add(1, 'day')
  ) {
    daysOfMonth.push(date)
  }

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  useEffect(() => {
    const isFirstHabitToday = firstHabitDate.isSame(today, 'day')
    const todayIndex = daysOfMonth.findIndex((date) =>
      date.isSame(today, 'day')
    )

    if (todayIndex !== -1 && !isFirstHabitToday && scrollRef.current) {
      const screenWidth = Dimensions.get('window').width
      const scrollOffset =
        todayIndex * ITEM_WIDTH - screenWidth / 2 + ITEM_WIDTH / 2

      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({
          x: Math.max(scrollOffset, 0),
          animated: false,
        })
      })
    }
  }, [daysOfMonth.length])

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.calendarContainer}>
        {daysOfMonth.map((date) => {
          const isSelected = date.isSame(selectedDate, 'day')

          return (
            <TouchableOpacity
              key={date.format('YYYY-MM-DD')}
              style={[styles.dayItem, isSelected && styles.dayItemSelected]}
              onPress={() => setSelectedDate(date.toDate())}
            >
              <Text
                style={[
                  styles.dayNumber,
                  isSelected ? styles.textSelected : styles.textDefault,
                ]}
              >
                {date.date()}
              </Text>
              <Text
                style={[
                  styles.dayLabel,
                  isSelected ? styles.textSelected : styles.textDefault,
                ]}
              >
                {weekDays[date.day()]}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  )
}
