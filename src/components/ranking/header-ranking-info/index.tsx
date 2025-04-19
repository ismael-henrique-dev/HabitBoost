import { colors } from '@/styles/theme'
import { IconInfoCircle } from '@tabler/icons-react-native'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

export function HeaderRankingInfo() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton}>
        <IconInfoCircle size={24} color={colors.zinc[900]} />
      </TouchableOpacity>
    </View>
  )
}
