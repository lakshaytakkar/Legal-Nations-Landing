import React from "react";
import { Image, StyleSheet } from "react-native";

type Props = {
  code: string;
  width?: number;
  height?: number;
  style?: object;
};

export function FlagImg({ code, width = 32, height = 24, style }: Props) {
  return (
    <Image
      source={{ uri: `https://flagcdn.com/${width * 2}x${height * 2}/${code.toLowerCase()}.png` }}
      style={[{ width, height, borderRadius: 3 }, style]}
      resizeMode="cover"
    />
  );
}
