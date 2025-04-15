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
    textAlign: 'auto',
  },
  formContainer: {
    gap: 20,
  },
})
