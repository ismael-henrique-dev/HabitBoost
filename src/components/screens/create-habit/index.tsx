import { Text, View } from 'react-native'
import { CreateHabitForm } from '@/components/ui/forms/create-habit-form'

export function CreateHabitScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Create Habit</Text>
      <CreateHabitForm />
    </View>
  )
}
