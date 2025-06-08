import { colors } from '@/styles/theme'
import React, { useEffect } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated'

type SwitchProps = {
  value: boolean
  onValueChange: () => void
}

export function Switch({ value, onValueChange }: SwitchProps) {
  const offset = useSharedValue(value ? 1 : 0)

  useEffect(() => {
    offset.value = value ? 1 : 0
  }, [value])

  const animatedThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(offset.value * 24, { duration: 150 }),
        },
      ],
    }
  })

  const animatedTrackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      offset.value,
      [0, 1],
      [colors.zinc[200], colors.lime[500]]
    )
    return {
      backgroundColor: withTiming(backgroundColor, { duration: 150 }),
    }
  })

  return (
    <TouchableOpacity onPress={onValueChange} activeOpacity={0.8}>
      <Animated.View style={[styles.track, animatedTrackStyle]}>
        <Animated.View style={[styles.thumb, animatedThumbStyle]} />
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 26,
    borderRadius: 26,
    justifyContent: 'center',
    padding: 1,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.zinc[50],
    position: 'absolute',
    left: 1,
  },
})
