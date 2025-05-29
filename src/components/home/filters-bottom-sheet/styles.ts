import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  selectedButtonCategory: {
    flexDirection: 'row',
    gap: 8,
    // borderRadius: 12,
    // borderWidth: 1,
    // borderColor: colors.zinc[600]
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
  trigger: {
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.zinc[200],
    borderRadius: 12,
    height: 56,
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colors.zinc[200],
  },
  clearButtonText: {
    color: colors.zinc[50],
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.zinc[600],
    fontFamily: fontFamily.semiBold,
    marginBottom: 12,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.zinc[200],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    height: 40,
  },
  dateButtonText: {
    fontSize: 14,
    color: colors.zinc[50],
    fontFamily: fontFamily.semiBold,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.zinc[200],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipSelected: {
    backgroundColor: colors.lime[500],
  },
  chipText: {
    color: colors.zinc[50],
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    marginLeft: 4,
  },
  chipTextSelected: {
    color: colors.zinc[900],
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
    backgroundColor: colors.lime[500],
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 16,
    color: colors.zinc[600],
    fontFamily: fontFamily.regular,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.lime[500],
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 32,
  },
  newButtonText: {
    fontFamily: fontFamily.semiBold,
    color: colors.zinc[900],
    fontSize: 16,
    lineHeight: 29,
  },
})

