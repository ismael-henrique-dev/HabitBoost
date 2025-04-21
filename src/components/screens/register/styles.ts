import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.zinc[50],
    flex: 1,
    justifyContent: 'center',
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
  formContainer: {
    gap: 20,
  },
  logo: { width: 240, height: 40 }
})
