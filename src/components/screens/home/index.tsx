import { ScrollView, Text, View } from 'react-native'
import { router } from 'expo-router'
import { styles } from './styles'
import { WeatherSuggestionWidget } from '@/components/home/weather-sugestion-widget'
import { HabitList } from '@/components/home/habit-list'
import { MonthCalendar } from '@/components/home/month-calendar'

export function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <WeatherSuggestionWidget
        // title='Dia Ensolarado'
        // description='descriçao'
        // variant='warning'
        />
        <MonthCalendar />
        <HabitList />
        <View style={styles.separator} />
      </View>
    </ScrollView>
  )
}
