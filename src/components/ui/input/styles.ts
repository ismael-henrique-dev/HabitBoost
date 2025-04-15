import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 12,
    backgroundColor: colors.zinc[200],
    borderRadius: 12,
  },
  inputContent: {
    flex: 1,
    gap: 8,
    flexDirection: 'row',
  },
  input: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
  }
})