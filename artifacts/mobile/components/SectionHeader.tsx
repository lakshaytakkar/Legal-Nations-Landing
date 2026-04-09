import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import { useColors } from "@/hooks/useColors";

type Props = {
  title: string;
  style?: StyleProp<TextStyle>;
};

export function SectionHeader({ title, style }: Props) {
  const colors = useColors();
  return (
    <Text style={[styles.title, { color: colors.foreground }, style]}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
});
