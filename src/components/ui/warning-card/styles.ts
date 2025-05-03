import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.zinc[50],
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    borderRadius: 8
  },
  label: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    flex: 1,
  },
})
