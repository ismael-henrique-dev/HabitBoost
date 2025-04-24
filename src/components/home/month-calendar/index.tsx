import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { styles } from './styles'
import { useHabit } from '@/contexts/habit-context'

dayjs.locale('pt-br')

export function MonthCalendar() {
  const { selectedDate, setSelectedDate } = useHabit()
  const [itemWidth, setItemWidth] = useState(0)
  const scrollRef = useRef<ScrollView>(null)
  const today = dayjs()
  
  const startOfMonth = today.startOf('month')
  const daysInMonth = today.daysInMonth()
  const daysOfMonth = Array.from({ length: daysInMonth }).map((_, index) =>
    startOfMonth.add(index, 'day')
  )

  const todayIndex = today.date() - 1
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  useEffect(() => {
    if (itemWidth > 0) {
      scrollRef.current?.scrollTo({
        x: todayIndex * itemWidth + itemWidth - 20,
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
