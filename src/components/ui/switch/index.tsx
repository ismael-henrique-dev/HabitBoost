import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'

type SwitchProps = {
  value: boolean
  onValueChange: () => void
}

export function Switch({ value, onValueChange }: SwitchProps) {
  return (
    <TouchableOpacity onPress={onValueChange} activeOpacity={0.8}>
      <View style={[styles.track, value && styles.trackOn]}>
        <View style={[styles.thumb, value && styles.thumbOn]} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 26,
    borderRadius: 26,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    padding: 1,
  },
  trackOn: {
    backgroundColor: '#84CC16', // verde limão
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e5e5ea',
    position: 'absolute',
    left: 1,
  },
  thumbOn: {
    left: 25,
  },
})
