import React, { useEffect, useRef } from 'react'
import { View, Text, Animated, Easing } from 'react-native'
import { colors } from '@/styles/theme'
import { styles } from './styles'

type RankingCardProps = {
  icon: React.ElementType
  title: string
  value: number
  loading?: boolean
}

export function RankingCard({
  icon: Icon,
  title,
  value,
  loading,
}: RankingCardProps) {
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.4,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start()
    }
  }, [loading, opacity])

  if (loading) {
    return (
      <Animated.View
        style={[styles.cardContainer, { opacity, backgroundColor: '#e0e0e0' }]}
      >
        <View style={styles.content}>
          <View style={[styles.iconBox, { backgroundColor: '#d0d0d0' }]} />
          <View
            style={{
              width: 120,
              height: 18,
              backgroundColor: '#d0d0d0',
              borderRadius: 4,
            }}
          />
        </View>
        <View
          style={{
            width: 40,
            height: 22,
            backgroundColor: '#d0d0d0',
            borderRadius: 4,
          }}
        />
      </Animated.View>
    )
  }

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
