import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  textError: {
    fontSize: 16,
    color: colors.red[600],
    textAlign: 'left',
    fontFamily: fontFamily.regular,
    marginTop: -4
  },
})