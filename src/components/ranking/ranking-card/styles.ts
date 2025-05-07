import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
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
})
