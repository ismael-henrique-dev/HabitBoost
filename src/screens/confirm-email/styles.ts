import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.zinc[50],
    gap: 32,
  },
  text: {
    fontSize: 20,
    color: colors.zinc[900],
    fontFamily: fontFamily.semiBold,
  },
})
