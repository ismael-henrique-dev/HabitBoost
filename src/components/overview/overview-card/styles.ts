import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    backgroundColor: colors.zinc[50],
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  iconBox: {
    backgroundColor: colors.lime[500],
    borderRadius: 8,
    marginRight: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
  },
  mainValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  valueText: {
    fontSize: 32,
    fontFamily: fontFamily.semiBold,
  },
  labelText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.zinc[900],
  },
  secondaryText: {
    fontSize: 14,
    color: colors.zinc[600],
    fontFamily: fontFamily.regular,
  },
})
