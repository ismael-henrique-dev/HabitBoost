import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: -20,
    marginTop: 44,
  },
  podiumItem: {
    alignItems: 'center',
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 1234,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: colors.zinc[50],
  },
  initials: {
    fontFamily: fontFamily.semiBold,
    color: colors.lime[500],
    fontSize: 24,
  },
  name: {
    fontSize: 14,
    color: colors.zinc[900],
    fontFamily: fontFamily.semiBold,
    marginBottom: 12,
  },
  bar: {
    width: 50,
    backgroundColor: colors.lime[500],
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 4,
  },
  position: {
    color: colors.zinc[900],
    fontFamily: fontFamily.medium,
    fontSize: 24,
  },
  metas: {
    color: colors.zinc[900],
    fontFamily: fontFamily.medium,
    fontSize: 14,
  },
  goalsInfo: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.zinc[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  userAvatarImage: {
    width: 72,
    height: 72,
    borderRadius: 1234,
    resizeMode: 'cover',
  },
})
