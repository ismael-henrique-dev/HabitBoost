import { useState } from 'react'
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import type { IconProps as TablerIconProps } from '@tabler/icons-react-native'
import { IconEye, IconEyeOff } from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'
import { styles } from './styles'

type InputProps = TextInputProps & {
  variant?: 'default' | 'password'
}

type IconProps = {
  icon: React.ElementType<TablerIconProps>
}

function Input({ variant = 'default', children, ...rest }: InputProps) {
  const [showPassword, setShowpassword] = useState(false)

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputContent}>
        {children}
        <TextInput
          secureTextEntry={showPassword}
          placeholderTextColor={colors.zinc[600]}
          style={styles.input}
          {...rest}
        />
      </View>
      {variant === 'password' && (
        <TouchableOpacity onPress={() => setShowpassword(!showPassword)}>
          {showPassword ? (
            <IconEyeOff color={colors.zinc[600]} size={24} />
          ) : (
            <IconEye color={colors.zinc[600]} />
          )}
        </TouchableOpacity>
      )}
    </View>
  )
}

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.zinc[600]} />
}

Input.Icon = Icon

export { Input }
