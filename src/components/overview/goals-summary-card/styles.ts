import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.zinc[50],
    borderRadius: 12,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: colors.zinc[900],
    fontFamily: fontFamily.semiBold,
  },
  value: {
    fontSize: 16,
    color: colors.zinc[900],
    fontFamily: fontFamily.semiBold,
  },
  message: {
    marginTop: 12,
    fontStyle: 'italic',
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.lime[500],
  },
})