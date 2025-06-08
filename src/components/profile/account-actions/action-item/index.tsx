import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { colors } from '@/styles/theme'
import { styles } from './styles'

type ActionItemProps = {
  icon: React.ElementType
  label: string
} & TouchableOpacityProps

export function ActionItem({ icon: Icon, label, ...rest }: ActionItemProps) {
  return (
    <TouchableOpacity style={{borderRadius: 8}} {...rest}>
      <View
        style={styles.container}
      >
        <View style={styles.content}>
          <Icon color={colors.zinc[900]} />
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
