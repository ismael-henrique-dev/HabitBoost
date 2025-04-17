import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.zinc[600],
  },
})