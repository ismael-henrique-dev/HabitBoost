import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'

export const styles = StyleSheet.create({
  trigger: {
    padding: 10,
    backgroundColor: colors.zinc[200],
    borderRadius: 8,
    marginBottom: 10,
  },
  triggerText: {
    color: colors.zinc[600],
    fontSize: 16,
  },
  calendar: {
    width: 320,
  },
  selected: {
    fontSize: 16,
    marginTop: 42,
  },
  dayText: {
    color: colors.zinc[900],
  },
  day: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  disabled: {
    color: colors.zinc[200],
  },
  today: {
    fontWeight: 'bold',
    color: colors.lime[500],
  },
  daySelected: {
    backgroundColor: colors.lime[500],
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: colors.zinc[50],
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.zinc[900],
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: colors.lime[500],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: colors.zinc[50],
    fontSize: 16,
    fontWeight: 'bold',
  },
})
