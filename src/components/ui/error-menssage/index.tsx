import { Text, TextProps } from 'react-native'
import { styles } from './styles'

export function ErrorMenssage({ children, ...rest }: TextProps) {
  return (
    <Text style={styles.textError} {...rest}>
      {children}
    </Text>
  )
}
