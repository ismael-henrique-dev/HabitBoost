import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: colors.zinc[200],
    gap: 24,
  },
  infoGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    color: colors.zinc[900],
  },
  link: {
    color: colors.lime[600],
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
     fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
})
