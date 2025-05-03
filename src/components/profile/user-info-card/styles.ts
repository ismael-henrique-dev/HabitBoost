import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  userInfoContainer: {
    alignItems: 'center',
    gap: 8,
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
  userInfoTextContainer: {
    alignItems: 'center',
  },
  userInfoUsernameText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 24,
    color: colors.zinc[900],
  },
  userInfoUserEmailText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.zinc[600],
  },
})
