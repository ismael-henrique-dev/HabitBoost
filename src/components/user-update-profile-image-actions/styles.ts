import { colors } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    gap: 20,
    backgroundColor: colors.zinc[50],
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginVertical: 20,
    borderRadius: 24,
    alignItems: 'center',
    flex: 1,
  },
  formGroup: {
    gap: 12,
  },
})
