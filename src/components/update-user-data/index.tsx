import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'
import type { IconProps as TablerIconProps } from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'
import { styles } from './styles'

type InputProps = TextInputProps & {
  variant?: 'default' | 'password'
  onOpenModal?: (value: boolean) => void
}

type IconProps = {
  icon: React.ElementType<TablerIconProps>
}

function UpdateUserInfo({
  variant = 'default',
  children,
  onOpenModal,
  ...rest
}: InputProps) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputContent}>
        {children}
        <TextInput
          secureTextEntry={variant === 'password'}
          placeholderTextColor={colors.zinc[600]}
          style={styles.input}
          {...rest}
        />
      </View>
      <TouchableOpacity onPress={() => onOpenModal?.(true)}>
        <Text>Alterar</Text>
      </TouchableOpacity>
    </View>
  )
}

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.zinc[600]} style={{ marginRight: 8 }} />
}

UpdateUserInfo.Icon = Icon

export { UpdateUserInfo }
