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
  infoIcon: {
    fontSize: 16,
    color: '#444',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    maxHeight: 320,
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
    width: '80%',
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    color: '#000',
  },
  modalText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: '#333',
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 8,
    backgroundColor: colors.lime[600],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
