import { useHabit } from '@/contexts/habit-context'
import { groupHabitsByWeek } from '@/hooks/group-habits-by-week'
import { ScrollView, Text, View } from 'react-native'
import { WeeklyBarChartInline } from '../chart'
import { styles } from './styles'

export function FullHistoryChart() {
  const { habits } = useHabit()
  const grouped = groupHabitsByWeek(habits)

  const groupedByMonth: Record<string, typeof grouped> = {}

  grouped.forEach((week) => {
    if (!groupedByMonth[week.monthYear]) {
      groupedByMonth[week.monthYear] = []
    }
    groupedByMonth[week.monthYear].push(week)
  })

  return (
    <ScrollView contentContainerStyle={{ gap: 24 }}>
      {Object.entries(groupedByMonth).map(([month, weeks]) => (
        <View key={month} style={{ gap: 24 }}>
          <Text style={styles.title}>
            {month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()}
          </Text>

          {weeks.map((week, i) => (
            <WeeklyBarChartInline key={i} week={week} />
          ))}
        </View>
      ))}
    </ScrollView>
  )
}
