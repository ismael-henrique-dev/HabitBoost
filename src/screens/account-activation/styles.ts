import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.zinc[50],
  },
  content: {
    paddingHorizontal: 20,
    gap: 32,
    alignItems: 'center',
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
    width: '100%',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.zinc[600],
    letterSpacing: -0.7
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.zinc[50],
    gap: 24,
  
  },
  logo: { width: 240, height: 40 },
})
