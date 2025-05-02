import { colors } from '@/styles/theme'
import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

type OverviewCardProps = {
  icon: React.ElementType
  title: string
  mainValue: string
  mainLabel: string
  secondaryText?: string
}

export function OverviewCard({
  icon: Icon,
  title,
  mainValue,
  mainLabel,
  secondaryText,
}: OverviewCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Icon color={colors.zinc[50]} size={24} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.mainValue}>
          <Text style={styles.valueText}>{mainValue}</Text>
          <Text style={styles.labelText}>{mainLabel}</Text>
        </View>
        {secondaryText && (
          <Text style={styles.secondaryText}>{secondaryText}</Text>
        )}
      </View>
    </View>
  )
}
