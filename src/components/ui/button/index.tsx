import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { s } from './styles'
import { IconProps as TablerIconsProps } from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'

type ButtonPros = TouchableOpacityProps & {
  isLoading?: boolean
  variant?: 'default' | 'secundary' | 'alert'
}

function Button({
  children,
  style,
  isLoading = false,
  variant = 'default',
  ...rest
}: ButtonPros) {
  return (
    <TouchableOpacity
      style={[s.container, s[variant], style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size={20} color={colors.zinc[50]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

function Title({ children, style }: TextProps) {
  return <Text style={[s.title, style]}>{children}</Text>
}

type IconProps = {
  icon: React.ComponentType<TablerIconsProps>
}

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.zinc[900]} />
}

Button.Title = Title
Button.Icon = Icon

export { Button }
