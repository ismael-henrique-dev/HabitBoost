import { Text, View } from 'react-native'
import { colors } from '@/styles/theme'
import { styles } from './styles'

type StepProps = {
  title: string
  description: string
  icon: React.ElementType
}

export function Step({ title, description, icon: Icon }: StepProps) {
  return (
    <View style={styles.container}>
      {Icon && <Icon size={32} color={colors.lime[500]} />}
      <View style={styles.datails}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )
}
