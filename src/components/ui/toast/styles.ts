import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.zinc[50],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    elevation: 4,
    marginVertical: 8,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  message: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.zinc[900],
    marginLeft: 8,
  },
})