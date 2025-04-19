import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.lime[500],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerGroup: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
    color: colors.zinc[50],
  },

  description: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.zinc[50],
    lineHeight: 19.6,
  },
})
