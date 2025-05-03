import { colors } from '@/styles/theme'
import { IconAlertTriangle } from '@tabler/icons-react-native'
import { Text, View } from 'react-native'
import { styles } from './styles'

type WarningCardProps = {
  warningMessage: string
}

export function WarningCard({ warningMessage }: WarningCardProps) {
  return (
    <View style={styles.container}>
      <IconAlertTriangle size={40} color={colors.zinc[600]} />
      <Text style={styles.label}>{warningMessage}</Text>
    </View>
  )
}
