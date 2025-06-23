import { CreateGoalForm } from '@/components/ui/forms/create-goal-form'
import { colors } from '@/styles/theme'
import { ScrollView } from 'react-native'

export function CreateGoalScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.zinc[200] }}
      keyboardShouldPersistTaps='handled'
    >
      <CreateGoalForm />
    </ScrollView>
  )
}
