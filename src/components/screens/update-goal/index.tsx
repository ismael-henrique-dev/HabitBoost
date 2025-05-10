import { UpdateGoalForm } from '@/components/ui/forms/update-goal-form'
import { colors } from '@/styles/theme'
import { ScrollView } from 'react-native'

export function UpdateGoalScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.zinc[200] }}
      keyboardShouldPersistTaps='handled'
    >
      <UpdateGoalForm />
    </ScrollView>
  )
}
