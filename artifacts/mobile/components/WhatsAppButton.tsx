import React from "react";
import { TouchableOpacity, Text, StyleSheet, Linking } from "react-native";
import * as Haptics from "expo-haptics";
import { Feather } from "@expo/vector-icons";

const DEFAULT_PHONE = "919306500349";
const DEFAULT_MSG = "Hi%2C%20I%27m%20interested%20in%20company%20registration";

type Props = {
  phone?: string;
  message?: string;
  label?: string;
  testID?: string;
};

export function WhatsAppButton({
  phone = DEFAULT_PHONE,
  message = DEFAULT_MSG,
  label = "Chat on WhatsApp",
  testID,
}: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`https://wa.me/${phone}?text=${message}`);
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={handlePress} testID={testID}>
      <Feather name="message-circle" size={20} color="#fff" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#25D366",
    shadowColor: "#25D366",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
});
