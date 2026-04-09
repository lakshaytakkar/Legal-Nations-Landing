import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { WhatsAppButton } from "@/components/WhatsAppButton";

function hapticPress(fn: () => void) {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  fn();
}

const OFFICES = [
  {
    country: "India",
    flag: "🇮🇳",
    locations: [
      { city: "Gurugram, Haryana", detail: "Registered Office" },
      { city: "New Delhi", detail: "Operations" },
    ],
  },
  {
    country: "USA",
    flag: "🇺🇸",
    locations: [
      { city: "Wyoming", detail: "LLC Registration State" },
      { city: "Delaware", detail: "C-Corp Registration State" },
    ],
  },
];

const QUICK_LINKS = [
  { icon: "message-circle" as const, label: "WhatsApp Chat", sub: "+91 93065 00349", color: "#25D366", action: () => Linking.openURL("https://wa.me/919306500349?text=Hi%2C%20I%27m%20interested%20in%20company%20registration") },
  { icon: "instagram" as const, label: "Instagram", sub: "@legal.nations", color: "#E1306C", action: () => Linking.openURL("https://instagram.com/legal.nations") },
  { icon: "phone" as const, label: "Call Us", sub: "+91 93065 00349", color: "#3347D4", action: () => Linking.openURL("tel:+919306500349") },
];

export default function ContactScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: isWeb ? 34 + 84 : 100 }}
      >
        {isWeb && <View style={{ height: 67 }} />}

        {/* Header / Logo */}
        <View style={[styles.header, { paddingTop: isWeb ? 32 : insets.top + 24 }]}>
          <View style={[styles.logoBadge, { backgroundColor: colors.primary }]}>
            <Feather name="globe" size={28} color="#fff" />
          </View>
          <Text style={[styles.logoText, { color: colors.navy }]}>
            Legal<Text style={{ color: colors.primary }}>Nations</Text>
          </Text>
          <Text style={[styles.tagline, { color: colors.mutedForeground }]}>
            Global Company Registration for Indian Founders
          </Text>
        </View>

        {/* WhatsApp Primary CTA */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={[styles.whatsappCTA, { backgroundColor: "#25D366" }]}
            onPress={() =>
              hapticPress(() =>
                Linking.openURL(
                  "https://wa.me/919306500349?text=Hi%2C%20I%27m%20interested%20in%20company%20registration"
                )
              )
            }
            testID="whatsapp-cta"
          >
            <Feather name="message-circle" size={22} color="#fff" />
            <View>
              <Text style={[styles.whatsappCTATitle, { color: "#fff" }]}>Chat on WhatsApp</Text>
              <Text style={[styles.whatsappCTASub, { color: "#ffffff99" }]}>Usually replies in minutes</Text>
            </View>
            <Feather name="arrow-right" size={20} color="#fff" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
        </View>

        {/* Quick Contact Links */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Contact</Text>
          <View style={[styles.linksCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {QUICK_LINKS.map((link, i) => (
              <React.Fragment key={link.label}>
                <TouchableOpacity
                  style={styles.linkRow}
                  onPress={() => hapticPress(link.action)}
                  testID={`link-${link.label}`}
                >
                  <View style={[styles.linkIcon, { backgroundColor: link.color + "18" }]}>
                    <Feather name={link.icon} size={20} color={link.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.linkLabel, { color: colors.foreground }]}>{link.label}</Text>
                    <Text style={[styles.linkSub, { color: colors.mutedForeground }]}>{link.sub}</Text>
                  </View>
                  <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
                </TouchableOpacity>
                {i < QUICK_LINKS.length - 1 && (
                  <View style={[styles.sep, { backgroundColor: colors.border }]} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Office Locations */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Our Offices</Text>
          {OFFICES.map((office) => (
            <View
              key={office.country}
              style={[styles.officeCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={styles.officeHeader}>
                <Text style={styles.officeFlag}>{office.flag}</Text>
                <Text style={[styles.officeCountry, { color: colors.foreground }]}>{office.country}</Text>
              </View>
              {office.locations.map((loc, i) => (
                <React.Fragment key={loc.city}>
                  {i > 0 && <View style={[styles.sep, { backgroundColor: colors.border }]} />}
                  <View style={styles.locRow}>
                    <Feather name="map-pin" size={14} color={colors.primary} />
                    <View>
                      <Text style={[styles.locCity, { color: colors.foreground }]}>{loc.city}</Text>
                      <Text style={[styles.locDetail, { color: colors.mutedForeground }]}>{loc.detail}</Text>
                    </View>
                  </View>
                </React.Fragment>
              ))}
            </View>
          ))}
        </View>

        {/* Services shortlist */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>What We Offer</Text>
          <View style={[styles.servicesTags]}>
            {[
              "US LLC Formation",
              "UK Ltd Company",
              "Singapore Pte Ltd",
              "UAE Free Zone",
              "India Pvt Ltd",
              "EIN / ITIN",
              "Virtual Address",
              "Bank Account Setup",
              "Tax Filing",
              "Compliance",
            ].map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
                <Text style={[styles.tagText, { color: colors.primary }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Disclaimer */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 8 }}>
          <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>
            Legal Nations is a business formation service. We are not a law firm and do not provide legal advice. Prices shown exclude government filing fees.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    alignItems: "center",
    gap: 12,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  logoText: {
    fontSize: 36,
    fontFamily: "PlayfairDisplay_800ExtraBold",
  },
  tagline: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  whatsappCTA: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    height: 72,
    borderRadius: 20,
    paddingHorizontal: 20,
    shadowColor: "#25D366",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  whatsappCTATitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  whatsappCTASub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 14,
  },
  linksCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
  },
  linkIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  linkLabel: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  linkSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
  },
  sep: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
  },
  officeCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    gap: 12,
    marginBottom: 12,
  },
  officeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  officeFlag: {
    fontSize: 22,
  },
  officeCountry: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
  },
  locRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 4,
  },
  locCity: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  locDetail: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
  },
  servicesTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  disclaimer: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    lineHeight: 16,
    textAlign: "center",
  },
});
