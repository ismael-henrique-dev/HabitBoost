import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.zinc[50],
    gap: 32,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 20,
    color: colors.zinc[900],
    fontFamily: fontFamily.semiBold,
  },
  description: {
    fontSize: 16,
    color: colors.zinc[600],
    fontFamily: fontFamily.regular,
  },
  logoWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 240,
    height: 40,
  },
})
