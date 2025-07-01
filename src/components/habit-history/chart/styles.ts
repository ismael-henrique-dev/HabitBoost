import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.zinc[50],
    borderRadius: 16,
    padding: 16,
    gap: 16,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    maxHeight: 320,
    backgroundColor: colors.zinc[50],
  },
  barWrapper: {
    alignItems: 'center',
  },
  bar: {
    width: 14,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
  },
  dayLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  tooltip: {
    backgroundColor: colors.lime[600],
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.zinc[50],
    padding: 24,
    borderRadius: 12,
    width: '90%',
    gap: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.zinc[900],
  },
  modalHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // flex: 1
  },
  modalText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.zinc[600],
    textAlign: 'left',
  },
  weekContainer: {
    gap: 24,
    backgroundColor: colors.zinc[50],
    borderRadius: 16,
    padding: 16,
    maxHeight: 320
  },
  weekHeader: {},
  weekLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
  },
})
