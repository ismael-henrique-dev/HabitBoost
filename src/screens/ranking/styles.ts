import { colors } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: colors.zinc[200],
    gap: 24,
    justifyContent: 'space-between',
  },
})
