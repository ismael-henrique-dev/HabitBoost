import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  formContainer: {
    gap: 20,
    backgroundColor: colors.zinc[50],
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  formGroup: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.zinc[900],
  },
})
