import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.zinc[50],
    borderRadius: 12,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    color: colors.zinc[600],
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    color: colors.zinc[600],
    marginTop: 16,
    textAlign: 'center',
    fontFamily: fontFamily.regular,
  },
})
