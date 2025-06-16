import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  formContainer: {
    gap: 20,
    backgroundColor: colors.zinc[50],
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginVertical: 20,
    borderRadius: 24,
    alignItems: 'center'
  },
  formGroup: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.zinc[900],
  },
  userInfoAvatar: {
    width: 72,
    height: 72,
    backgroundColor: colors.lime[500],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1234,
  },
  userInfoAvatarText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 24,
    color: colors.zinc[50],
  },
  userAvatarImage: {
    width: 72,
    height: 72,
    borderRadius: 1234,
    resizeMode: 'cover',
  },
})
