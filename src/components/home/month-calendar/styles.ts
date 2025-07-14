import { StyleSheet } from 'react-native'
import { colors } from '@/styles/theme'

export const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    gap: 8,
    // paddingHorizontal: 8,
  },
  dayItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 58,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: 8,
    // marginHorizontal: 4,
    elevation: 2,
  },
  dayItemSelected: {
    backgroundColor: colors.lime[500],
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  textDefault: {
    color: colors.lime[500],
  },
  textSelected: {
    color: '#fff',
  },
})
