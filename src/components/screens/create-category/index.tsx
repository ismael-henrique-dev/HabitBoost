import { CreateCategoryForm } from '@/components/ui/forms/create-category-form'
import { colors } from '@/styles/theme'
import { ScrollView } from 'react-native'

export function CreateCategoryScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.zinc[200] }}
      keyboardShouldPersistTaps='handled'
    >
      <CreateCategoryForm />
    </ScrollView>
  )
}
