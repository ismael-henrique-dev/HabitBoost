import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'

export const styles = StyleSheet.create({
  trigger: {
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center', // Centraliza verticalmente
    backgroundColor: colors.zinc[200],
    borderRadius: 12,
    height: 48,
  },
  triggerText: {
    color: colors.zinc[600],
    fontSize: 16,
    fontFamily: fontFamily.regular,
  },
  bottomSheetBackgroundStyle: {
    backgroundColor: colors.zinc[50],
  },
  bottomSheetStyle: {
    padding: 24,
    paddingTop: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 10,
  },
  handleIndicatorStyle: {
    backgroundColor: colors.zinc[600],
    width: 80,
    height: 4,
    borderRadius: 999,
  },
  sheetContent: {
    flex: 1,
  },
  sheetHeader: {
    marginVertical: 12,
  },
  sheetTitle: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.lime[500], // verde limão
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 16,
    color: colors.zinc[600],
    fontFamily: fontFamily.regular,
  },
})
