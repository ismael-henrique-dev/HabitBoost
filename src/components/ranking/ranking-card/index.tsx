import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '@/styles/theme'
import { styles } from './styles'

type RankingCardProps = {
  icon: React.ElementType
  title: string
  value: number
}

export function RankingCard({ icon: Icon, title, value }: RankingCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <Icon color={colors.zinc[50]} size={24} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  )
}
