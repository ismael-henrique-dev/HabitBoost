import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 16,
    paddingVertical: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.lime[500],
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.lime[500],
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  newButtonText: {
    fontFamily: fontFamily.semiBold,
    color: colors.zinc[900],
    fontSize: 16,
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
    // width: '90%',
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
  modalSubtitle: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.zinc[600],
    textAlign: 'left',
  },
  modalActions: { gap: 20 },
})