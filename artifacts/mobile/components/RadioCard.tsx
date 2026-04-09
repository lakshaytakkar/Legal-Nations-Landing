import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useColors } from "@/hooks/useColors";

type RadioCardProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  testID?: string;
};

export function RadioCard({ label, selected, onPress, testID }: RadioCardProps) {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: selected ? colors.secondary : colors.card,
          borderColor: selected ? colors.primary : colors.border,
          borderWidth: selected ? 2 : 1.5,
        },
      ]}
      onPress={onPress}
      testID={testID ?? `radio-${label}`}
    >
      <View
        style={[
          styles.dot,
          { borderColor: selected ? colors.primary : colors.mutedForeground },
        ]}
      >
        {selected && <View style={[styles.fill, { backgroundColor: colors.primary }]} />}
      </View>
      <Text
        style={[
          styles.label,
          { color: selected ? colors.primary : colors.foreground },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 16,
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  fill: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    flex: 1,
    lineHeight: 22,
  },
});
