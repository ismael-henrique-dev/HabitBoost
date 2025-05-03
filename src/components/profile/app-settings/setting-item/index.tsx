import React, { ElementType } from 'react'
import { View, Text, ViewStyle } from 'react-native'
import { colors } from '@/styles/theme'
import { Switch } from '@/components/ui'
import { styles } from './styles'

type SettingItemProps = {
  icon: ElementType
  label: string
  value: boolean
  onValueChange: () => void
  containerStyle?: ViewStyle
}

export function SettingItem({
  icon: Icon,
  label,
  value,
  onValueChange,
  containerStyle,
}: SettingItemProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        <Icon color={colors.zinc[900]} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  )
}
