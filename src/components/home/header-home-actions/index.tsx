import { colors } from '@/styles/theme'
import { IconPlus } from '@tabler/icons-react-native'
import { TouchableOpacity, View, Text } from 'react-native'
import { styles } from './styles'
import { router } from 'expo-router'
import { FiltersBottomSheet } from '../filters-bottom-sheet'

export function HeaderHomeActions() {

  return (
    <View style={styles.container}>
      <FiltersBottomSheet />

      <TouchableOpacity
        onPress={() => router.navigate('/create-habit')}
        style={styles.newButton}
      >
        <Text style={styles.newButtonText}>Novo</Text>
        <IconPlus size={24} color={colors.zinc[900]} />
      </TouchableOpacity>
    </View>
  )
}
