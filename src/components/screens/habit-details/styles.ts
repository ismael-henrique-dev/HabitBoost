import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.zinc[200],
  },
  content: {
    padding: 20,
    gap: 32,
  },
  habitCard: {
    backgroundColor: colors.zinc[50],
    borderRadius: 8,
    padding: 24,
  },
  habitInfoColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    backgroundColor: colors.lime[500],
    borderRadius: 50,
    padding: 12,
  },
  habitTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
  habitDescription: {
    color: colors.zinc[600],
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },
  goalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalsTitle: {
    color: colors.zinc[900],
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
  },
  newGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lime[500],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  newGoalText: {
    fontWeight: 'bold',
    color: '#000',
    marginRight: 4,
  },
})
