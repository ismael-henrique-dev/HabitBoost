import { colors } from '@/styles/theme'
import { IconFilter, IconPlus } from '@tabler/icons-react-native'
import { TouchableOpacity, View, Text } from 'react-native'
import { styles } from './styles'

export function HeaderHomeActions() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton}>
        <IconFilter size={24} color={colors.zinc[900]} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.newButton}>
        <Text style={styles.newButtonText}>Novo</Text>
        <IconPlus size={24} color={colors.zinc[900]} />
      </TouchableOpacity>
    </View>
  )
}
