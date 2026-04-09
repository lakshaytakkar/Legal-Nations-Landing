import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

type Props = {
  text: React.ReactNode;
  icon?: keyof (typeof Feather)["glyphMap"];
};

export function AnnouncementBanner({ text, icon = "tag" }: Props) {
  const colors = useColors();
  return (
    <View style={[styles.banner, { backgroundColor: colors.primary }]}>
      <Feather name={icon} size={12} color="#fff" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    flex: 1,
  },
});
