import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.zinc[50],
    padding: 12,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 12
  },
  content: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
  },
})
