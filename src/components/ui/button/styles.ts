import { colors } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  default: {
    backgroundColor: colors.zinc[200],
  },
  secundary: {
    backgroundColor: colors.lime[500],
  },
  alert: {
    backgroundColor: colors.red[600],
  },
  title: {
    fontSize: 16,
    color: colors.zinc[600],
    fontWeight: 'bold',
  },
})
