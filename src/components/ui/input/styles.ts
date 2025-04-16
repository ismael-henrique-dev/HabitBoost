import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: colors.zinc[200],
    borderRadius: 12,
  },
  inputContent: {
    flex: 1,
    gap: 8,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
  },
})
