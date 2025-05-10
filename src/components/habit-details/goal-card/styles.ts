import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  goalCard: {
    backgroundColor: colors.zinc[50],
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 40,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalTitle: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.zinc[900],
    flex: 1,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  progressBarBackground: {
    height: 16,
    backgroundColor: colors.zinc[200],
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.lime[500],
  },
  goalProgress: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    marginLeft: 8,
  },
})