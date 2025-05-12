import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  habitCard: {
    backgroundColor: colors.zinc[50],
    borderRadius: 8,
    padding: 24,
  },
  habitInfoColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    backgroundColor: colors.lime[500],
    borderRadius: 50,
    padding: 12,
  },
  habitTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
  habitDescription: {
    color: colors.zinc[600],
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },
})
