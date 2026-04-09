import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Linking,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

function hapticPress(fn: () => void) {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  fn();
}

const LLC_BENEFITS = [
  { icon: "shopping-cart" as const, title: "Marketplace Approvals", desc: "Sell on Amazon, Shopify & eBay as a verified business" },
  { icon: "credit-card" as const, title: "US Bank Account", desc: "Open Mercury or Relay bank account easily" },
  { icon: "dollar-sign" as const, title: "Payment Gateway Access", desc: "Accept Stripe, PayPal, and Wise payments globally" },
  { icon: "shield" as const, title: "Asset Protection", desc: "Keep personal assets separate from business liability" },
  { icon: "globe" as const, title: "US Business Credibility", desc: "Build trust with global buyers and platforms" },
  { icon: "file-text" as const, title: "Tax Benefits", desc: "Wyoming LLC = no state income tax, streamlined filing" },
];

const JUST_LLC_FEATURES = [
  "Wyoming LLC Formation",
  "EIN / Tax ID Number",
  "Registered Agent (1 year)",
  "Operating Agreement",
  "Expert Setup Call",
];

const ELITE_FEATURES = [
  "Everything in Just LLC",
  "US Virtual Phone Number",
  "Bank Account Setup",
  "ITIN Application",
  "Shopify Store Setup",
  "Priority Support",
];

const HOW_IT_WORKS = [
  { step: "1", title: "Pick Your Package", desc: "Choose Just LLC or Elite — both include formation and EIN" },
  { step: "2", title: "Expert Calls You in 24h", desc: "Our specialist walks you through the full process" },
  { step: "3", title: "Start Selling Globally", desc: "Company ready, bank set up, start growing your business" },
];

export default function UsdropScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isWeb = Platform.OS === "web";

  const goGetStartedLLC = () =>
    hapticPress(() =>
      router.navigate({
        pathname: "/(tabs)/get-started",
        params: { entityType: "llc" },
      } as any)
    );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: isWeb ? 34 + 84 : 100 }}
      >
        {isWeb && <View style={{ height: 67 }} />}

        {/* Hero */}
        <View style={[styles.hero, { paddingTop: isWeb ? 24 : insets.top + 20 }]}>
          {/* Co-brand */}
          <View style={styles.coBrand}>
            <View style={[styles.brandPill, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
              <Text style={[styles.brandPillText, { color: colors.primary }]}>USDrop AI</Text>
            </View>
            <Text style={[styles.coBrandX, { color: colors.mutedForeground }]}>×</Text>
            <View style={[styles.brandPill, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
              <Text style={[styles.brandPillText, { color: colors.primary }]}>Legal Nations</Text>
            </View>
          </View>

          {/* Discount badge */}
          <View style={[styles.discountBadge, { backgroundColor: "#FEF3C7", borderColor: "#F59E0B33" }]}>
            <Text style={styles.discountEmoji}>🎉</Text>
            <Text style={[styles.discountText, { color: "#92400E" }]}>
              Exclusive: 30% Off with code{" "}
              <Text style={{ fontFamily: "Inter_700Bold" }}>USDROP30</Text>
            </Text>
          </View>

          <Text style={[styles.headline, { color: colors.foreground }]}>
            Build Your Global{"\n"}
            <Text style={{ color: colors.primary }}>Dropshipping Empire</Text>
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            US LLC + EIN + Bank Account. Everything a dropshipper needs to sell globally.
          </Text>
        </View>

        {/* Before/After */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <View style={styles.comparisonRow}>
            <View style={[styles.compCard, { backgroundColor: "#FEF2F2", borderColor: "#FECACA" }]}>
              <Text style={[styles.compTitle, { color: "#DC2626" }]}>Without US LLC</Text>
              {[
                "Rejected by Amazon",
                "Stripe not available",
                "No business credibility",
                "Limited payment options",
              ].map((item) => (
                <View key={item} style={styles.compRow}>
                  <Feather name="x" size={13} color="#DC2626" />
                  <Text style={[styles.compItem, { color: "#7F1D1D" }]}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={[styles.compCard, { backgroundColor: colors.secondary, borderColor: colors.primary + "40" }]}>
              <Text style={[styles.compTitle, { color: colors.primary }]}>With Legal Nations</Text>
              {[
                "Amazon Seller approved",
                "Stripe & PayPal ready",
                "Verified US business",
                "All platforms unlocked",
              ].map((item) => (
                <View key={item} style={styles.compRow}>
                  <Feather name="check" size={13} color={colors.primary} />
                  <Text style={[styles.compItem, { color: colors.foreground }]}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Benefits */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Why Every Dropshipper Needs a US LLC
          </Text>
          <View style={styles.benefitsGrid}>
            {LLC_BENEFITS.map((b) => (
              <View
                key={b.title}
                style={[styles.benefitCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={[styles.benefitIcon, { backgroundColor: colors.secondary }]}>
                  <Feather name={b.icon} size={20} color={colors.primary} />
                </View>
                <Text style={[styles.benefitTitle, { color: colors.foreground }]}>{b.title}</Text>
                <Text style={[styles.benefitDesc, { color: colors.mutedForeground }]}>{b.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Pricing */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Choose Your Package</Text>

          {/* Just LLC */}
          <View style={[styles.priceCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.priceHeader}>
              <View>
                <Text style={[styles.planName, { color: colors.foreground }]}>Just LLC</Text>
                <Text style={[styles.planTagline, { color: colors.mutedForeground }]}>Everything to get started</Text>
              </View>
              <View style={styles.priceBlock}>
                <Text style={[styles.strikePrice, { color: colors.mutedForeground }]}>₹55,000</Text>
                <Text style={[styles.price, { color: colors.primary }]}>₹39,000</Text>
              </View>
            </View>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            {JUST_LLC_FEATURES.map((f) => (
              <View key={f} style={styles.featureRow}>
                <Feather name="check-circle" size={15} color={colors.primary} />
                <Text style={[styles.featureText, { color: colors.foreground }]}>{f}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={[styles.planCTA, { backgroundColor: colors.primary }]}
              onPress={goGetStartedLLC}
              testID="usdrop-just-llc-cta"
            >
              <Text style={[styles.planCTAText, { color: "#fff" }]}>Get Just LLC — ₹39,000</Text>
            </TouchableOpacity>
          </View>

          {/* Elite */}
          <View style={[styles.priceCard, { backgroundColor: colors.primary, borderColor: colors.primary }]}>
            <View style={[styles.popularBadge, { backgroundColor: "#fff3" }]}>
              <Text style={{ color: "#fff", fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 0.5 }}>
                MOST POPULAR
              </Text>
            </View>
            <View style={styles.priceHeader}>
              <View>
                <Text style={[styles.planName, { color: "#fff" }]}>Elite LLC</Text>
                <Text style={[styles.planTagline, { color: "#ffffff99" }]}>Complete business setup</Text>
              </View>
              <View style={styles.priceBlock}>
                <Text style={[styles.strikePrice, { color: "#ffffff66" }]}>₹99,000</Text>
                <Text style={[styles.price, { color: "#fff" }]}>₹69,000</Text>
              </View>
            </View>
            <View style={[styles.dividerLine, { backgroundColor: "#ffffff33" }]} />
            {ELITE_FEATURES.map((f) => (
              <View key={f} style={styles.featureRow}>
                <Feather name="check-circle" size={15} color="#fff" />
                <Text style={[styles.featureText, { color: "#fff" }]}>{f}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={[styles.planCTA, { backgroundColor: "#fff" }]}
              onPress={goGetStartedLLC}
              testID="usdrop-elite-cta"
            >
              <Text style={[styles.planCTAText, { color: colors.primary }]}>Get Elite LLC — ₹69,000</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* How It Works */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>How It Works</Text>
          {HOW_IT_WORKS.map((s) => (
            <View key={s.step} style={styles.howRow}>
              <View style={[styles.stepCircle, { backgroundColor: colors.primary }]}>
                <Text style={{ color: "#fff", fontFamily: "Inter_700Bold", fontSize: 15 }}>{s.step}</Text>
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={[styles.howTitle, { color: colors.foreground }]}>{s.title}</Text>
                <Text style={[styles.howDesc, { color: colors.mutedForeground }]}>{s.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Final CTA */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <TouchableOpacity
            style={[styles.finalCTA, { backgroundColor: "#25D366" }]}
            onPress={() =>
              hapticPress(() =>
                Linking.openURL(
                  "https://wa.me/919306500349?text=Hi%2C%20I%27m%20a%20USDrop%20member%20and%20want%20to%20register%20my%20LLC"
                )
              )
            }
          >
            <Feather name="message-circle" size={20} color="#fff" />
            <Text style={[styles.planCTAText, { color: "#fff" }]}>Chat on WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 14,
  },
  coBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  brandPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
  },
  brandPillText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  coBrandX: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  discountBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  discountEmoji: {
    fontSize: 14,
  },
  discountText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  headline: {
    fontSize: 30,
    fontFamily: "Inter_700Bold",
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 16,
  },
  comparisonRow: {
    flexDirection: "row",
    gap: 10,
  },
  compCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    gap: 8,
  },
  compTitle: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  compRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  compItem: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    flex: 1,
    lineHeight: 16,
  },
  benefitsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  benefitCard: {
    width: "47%",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    gap: 8,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  benefitTitle: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    lineHeight: 18,
  },
  benefitDesc: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    lineHeight: 15,
  },
  priceCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    gap: 12,
    marginBottom: 14,
  },
  popularBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    marginBottom: 4,
  },
  priceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  planName: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  planTagline: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  priceBlock: {
    alignItems: "flex-end",
  },
  strikePrice: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    textDecorationLine: "line-through",
  },
  price: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
  },
  dividerLine: {
    height: StyleSheet.hairlineWidth,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  planCTA: {
    height: 54,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  planCTAText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  howRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 24,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  howTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  howDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  finalCTA: {
    height: 56,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
