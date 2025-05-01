import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { styles } from './styles'
import { useHabit } from '@/contexts/habit-context'

dayjs.locale('pt-br')

export function MonthCalendar() {
  const { habits, selectedDate, setSelectedDate } = useHabit()
  const [itemWidth, setItemWidth] = useState(0)
  const scrollRef = useRef<ScrollView>(null)
  const today = dayjs()

  // Garante que selectedDate tenha um valor inicial
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(today.toDate())
    }
  }, [selectedDate, setSelectedDate])

  // Encontra a data de criação mais antiga
  const firstHabitDate =
    habits.length > 0
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

  // Gera dias do primeiro hábito até 1 mês após o dia atual
  const endDate = today.add(1, 'month') // Define o limite como hoje + 1 mês
  const daysOfMonth = []
  for (
    let date = firstHabitDate;
    date.isBefore(endDate) || date.isSame(endDate, 'day');
    date = date.add(1, 'day')
  ) {
    daysOfMonth.push(date)
  }

  const todayIndex = today.date()
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  useEffect(() => {
    if (itemWidth > 0) {
      scrollRef.current?.scrollTo({
        x: todayIndex * itemWidth,
        animated: true,
      })
    }
  }, [itemWidth])

  const handleItemLayout = (event: any) => {
    const { width } = event.nativeEvent.layout
    setItemWidth(width)
  }

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.calendarContainer}>
        {daysOfMonth.map((date, index) => {
          const isSelected = date.isSame(selectedDate, 'day')

          return (
            <TouchableOpacity
              key={date.format('YYYY-MM-DD')}
              style={[styles.dayItem, isSelected && styles.dayItemSelected]}
              onPress={() => setSelectedDate(date.toDate())}
              onLayout={index === 0 ? handleItemLayout : undefined}
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
