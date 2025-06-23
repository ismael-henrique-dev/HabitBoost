import { UpdateUserDataForm } from '@/components/ui/forms/update-user-data-form'
import { colors } from '@/styles/theme'
import { ScrollView } from 'react-native'

export function UpdateUserDataScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.zinc[200] }}
      keyboardShouldPersistTaps='handled'
    >
      <UpdateUserDataForm />
    </ScrollView>
  )
}
