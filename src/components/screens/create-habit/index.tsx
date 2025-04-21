import { ScrollView } from 'react-native'
import { CreateHabitForm } from '@/components/ui/forms/create-habit-form'
import { colors } from '@/styles/theme'

export function CreateHabitScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.zinc[200] }}
      keyboardShouldPersistTaps='handled'
    >
      <CreateHabitForm />
    </ScrollView>
  )
}
