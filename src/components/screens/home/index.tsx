import { ScrollView, Text, View } from 'react-native'
import { router } from 'expo-router'
import { styles } from './styles'
import { WeatherSuggestionWidget } from '@/components/home/weather-sugestion-widget'
import { HabitList } from '@/components/home/habit-list'

export function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <WeatherSuggestionWidget
          title='Dia Ensolarado'
          description='descriçao'
          variant='warning'
        />
        <HabitList />
        <Text style={styles.title} onPress={() => router.navigate('/register')}>
          Home
        </Text>
        <View style={styles.separator} />
      </View>
    </ScrollView>
  )
}
