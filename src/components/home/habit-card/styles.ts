import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.zinc[50],
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.zinc[900],
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 14,
    color: colors.lime[500],
    fontFamily: fontFamily.regular,
  },
  description: {
    fontSize: 14,
    color: colors.lime[500],
    fontFamily: fontFamily.regular,
  },
  category: {
    backgroundColor: colors.lime[500],
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.zinc[900],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonText: {
    color: colors.lime[500],
    fontFamily: fontFamily.medium,
    fontSize: 14,
    textAlign: 'center'
  },
})
