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
    // gap: 8, ❌ Remova isso
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1, // ✅ Importante
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.zinc[900], // Certifique-se de que está visível
  },
})

