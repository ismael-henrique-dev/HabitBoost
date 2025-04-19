import { colors } from '@/styles/theme'
import { IconExclamationCircle, IconX } from '@tabler/icons-react-native'
import { Text, View } from 'react-native'
import { styles } from './styles'

type WeatherSuggestionWidgetProps = {
  title: string
  description: string
  variant?: 'default' | 'warning'
  icon?: React.ElementType
}

export function WeatherSuggestionWidget({
  variant = 'default',
  title,
  description,
  icon: Icon,
}: WeatherSuggestionWidgetProps) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            variant === 'warning' ? colors.red[600] : colors.lime[500],
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerGroup}>
          {Icon && <Icon size={24} color={colors.zinc[50]} />}
          {variant === 'warning' && !Icon && (
            <IconExclamationCircle size={24} color={colors.zinc[50]} />
          )}
          <Text style={styles.title}>
            {variant === 'warning' ? 'Sugestões baseadas no clima' : title}
          </Text>
        </View>
        {variant === 'warning' && <IconX size={24} color={colors.zinc[50]} />}
      </View>
      <Text style={styles.description}>
        {variant === 'warning'
          ? 'Para ver atividades recomendadas de acordo com o clima, permita o acesso à sua localização.'
          : description}
      </Text>
    </View>
  )
}
