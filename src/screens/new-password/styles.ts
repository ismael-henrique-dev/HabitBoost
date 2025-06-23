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
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
    width: '100%',
    textAlign: 'left',
  },
  subTitle: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.zinc[600],
  },
  formContainer: {
    gap: 20,
  },
  forgotPassword: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.lime[500],
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  logo: { width: 240, height: 40 },
})
