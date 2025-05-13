import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  formContainer: {
    gap: 20,
    backgroundColor: colors.zinc[50],
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginVertical: 20,
    borderRadius: 24
  },
  formGroup: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.zinc[900],
  },
   iconPickerWrapper: {
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    backgroundColor: colors.lime[500],
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  editIconButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: colors.zinc[200],
    borderRadius: 999,
    padding: 4,
    elevation: 2,
  },
})
