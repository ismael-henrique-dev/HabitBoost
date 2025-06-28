import { Animated, Easing, View } from 'react-native'
import { useEffect, useRef } from 'react'
import { colors } from '@/styles/theme'
import { styles } from './styles'

export function HabitListSkeleton() {
  return (
    <View style={{ gap: 12 }}>
      <HabitCardSkeleton />
      <HabitCardSkeleton />
      <HabitCardSkeleton />
    </View>
  )
}

export function HabitCardSkeleton() {
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
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
  }, [])

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: colors.zinc[200], opacity }]}
    >
      <View style={styles.header}>
        <View style={styles.headerGroup}>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: '#d0d0d0',
            }}
          />
          <View
            style={{
              width: 160,
              height: 18,
              backgroundColor: '#d0d0d0',
              borderRadius: 4,
              marginLeft: 8,
            }}
          />
        </View>
        <View
          style={{
            width: 40,
            height: 18,
            backgroundColor: '#d0d0d0',
            borderRadius: 4,
          }}
        />
      </View>

      <View
        style={{
          width: '100%',
          height: 18,
          backgroundColor: '#d0d0d0',
          borderRadius: 4,
          marginTop: 12,
        }}
      />
    </Animated.View>
  )
}
