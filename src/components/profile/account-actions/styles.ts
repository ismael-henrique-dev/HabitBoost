import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  container: {
    gap: 20,
    width: '100%',
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
  modalActions: { gap: 20 },
})
