import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 16,
    paddingVertical: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.lime[500],
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.lime[500],
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  newButtonText: {
    fontFamily: fontFamily.semiBold,
    color: colors.zinc[900],
    fontSize: 16,
  },
})