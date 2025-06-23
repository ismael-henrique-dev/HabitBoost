import { ScrollView, View } from 'react-native'
import { styles } from './styles'
import { WeatherSuggestionWidget } from '@/components/home/weather-sugestion-widget'
import { HabitList } from '@/components/home/habit-list'
import { MonthCalendar } from '@/components/home/month-calendar'
import { useSettings } from '@/hooks/use-settings'

export function HomeScreen() {
  const { settings } = useSettings()
  const isWeatherWidgetEnabled = settings.weatherWidget

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {isWeatherWidgetEnabled && <WeatherSuggestionWidget />}
        <MonthCalendar />
        <HabitList />
        <View style={styles.separator} />
      </View>
    </ScrollView>
  )
}
