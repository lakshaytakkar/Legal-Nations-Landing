import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SectionHeader } from "@/components/SectionHeader";

function hapticPress(fn: () => void) {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  fn();
}

const LLC_BENEFITS = [
  { icon: "shopping-cart" as const, title: "Marketplace Approvals", desc: "Sell on Amazon, Shopify & eBay" },
  { icon: "credit-card" as const, title: "US Bank Account", desc: "Mercury or Relay, easy setup" },
  { icon: "dollar-sign" as const, title: "Payment Gateways", desc: "Stripe, PayPal, Wise globally" },
  { icon: "shield" as const, title: "Asset Protection", desc: "Personal assets fully separated" },
  { icon: "globe" as const, title: "US Credibility", desc: "Build trust with global buyers" },
  { icon: "file-text" as const, title: "Tax Benefits", desc: "No state income tax in Wyoming" },
];

const JUST_LLC_FEATURES = [
  "Wyoming LLC Formation",
  "EIN / Tax ID Number",
  "Registered Agent (1 yr)",
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
  { step: "1", title: "Pick Your Package", desc: "Just LLC or Elite — both include formation and EIN" },
  { step: "2", title: "Expert Calls in 24h", desc: "Our specialist walks you through everything" },
  { step: "3", title: "Start Selling Globally", desc: "Company ready, bank set up, grow your business" },
];

export default function UsdropScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isWeb = Platform.OS === "web";

  const goGetStartedLLC = () =>
    hapticPress(() => router.navigate("/(tabs)/get-started?entityType=llc"));

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
          {/* Co-brand logo row */}
          <View style={styles.coBrand}>
            <Image
              source={require("../../assets/images/usdrop-logo.png")}
              style={styles.usdropLogo}
              resizeMode="contain"
            />
            <Text style={[styles.coBrandText, { color: colors.mutedForeground }]}>USDrop AI</Text>
            <Text style={[styles.coBrandX, { color: colors.mutedForeground }]}>×</Text>
            <Text style={[styles.coBrandLegal, { color: colors.foreground }]}>
              Legal<Text style={{ color: colors.primary }}>Nations</Text>
            </Text>
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
                "Limited payments",
              ].map((item) => (
                <View key={item} style={styles.compRow}>
                  <Feather name="x" size={12} color="#DC2626" />
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
                  <Feather name="check" size={12} color={colors.primary} />
                  <Text style={[styles.compItem, { color: colors.foreground }]}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <SectionHeader title="Why Every Dropshipper Needs a US LLC" />
          <View style={[styles.benefitsGrid, { paddingHorizontal: 20 }]}>
            {LLC_BENEFITS.map((b) => (
              <View
                key={b.title}
                style={[styles.benefitCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={[styles.benefitIcon, { backgroundColor: colors.secondary }]}>
                  <Feather name={b.icon} size={18} color={colors.primary} />
                </View>
                <Text style={[styles.benefitTitle, { color: colors.foreground }]}>{b.title}</Text>
                <Text style={[styles.benefitDesc, { color: colors.mutedForeground }]}>{b.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Pricing — side by side */}
        <View style={styles.section}>
          <SectionHeader title="Choose Your Package" />
          <View style={[styles.pricingRow, { paddingHorizontal: 20 }]}>
            {/* Just LLC */}
            <View style={[styles.priceCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.planName, { color: colors.foreground }]}>Just LLC</Text>
              <View style={styles.priceBlock}>
                <Text style={[styles.strikePrice, { color: colors.mutedForeground }]}>₹55,000</Text>
                <Text style={[styles.price, { color: colors.primary }]}>₹39,000</Text>
              </View>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              {JUST_LLC_FEATURES.map((f) => (
                <View key={f} style={styles.featureRow}>
                  <Feather name="check-circle" size={12} color={colors.primary} />
                  <Text style={[styles.featureText, { color: colors.foreground }]}>{f}</Text>
                </View>
              ))}
              <TouchableOpacity
                style={[styles.planCTA, { backgroundColor: colors.primary }]}
                onPress={goGetStartedLLC}
                testID="usdrop-just-llc-cta"
              >
                <Text style={[styles.planCTAText, { color: "#fff" }]}>Get Started</Text>
              </TouchableOpacity>
            </View>

            {/* Elite */}
            <View style={[styles.priceCard, { backgroundColor: colors.primary, borderColor: colors.primary }]}>
              <View style={[styles.popularBadge, { backgroundColor: "#fff3" }]}>
                <Text style={{ color: "#fff", fontSize: 9, fontFamily: "Inter_700Bold" }}>
                  POPULAR
                </Text>
              </View>
              <Text style={[styles.planName, { color: "#fff" }]}>Elite LLC</Text>
              <View style={styles.priceBlock}>
                <Text style={[styles.strikePrice, { color: "#ffffff66" }]}>₹99,000</Text>
                <Text style={[styles.price, { color: "#fff" }]}>₹69,000</Text>
              </View>
              <View style={[styles.dividerLine, { backgroundColor: "#ffffff33" }]} />
              {ELITE_FEATURES.map((f) => (
                <View key={f} style={styles.featureRow}>
                  <Feather name="check-circle" size={12} color="#fff" />
                  <Text style={[styles.featureText, { color: "#fff" }]}>{f}</Text>
                </View>
              ))}
              <TouchableOpacity
                style={[styles.planCTA, { backgroundColor: "#fff" }]}
                onPress={goGetStartedLLC}
                testID="usdrop-elite-cta"
              >
                <Text style={[styles.planCTAText, { color: colors.primary }]}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* How It Works */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <SectionHeader title="How It Works" style={{ paddingHorizontal: 0 }} />
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
          <WhatsAppButton
            message="Hi%2C%20I%27m%20a%20USDrop%20member%20and%20want%20to%20register%20my%20LLC"
            label="Chat on WhatsApp — USDrop Deal"
            testID="usdrop-whatsapp-cta"
          />
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
    gap: 8,
    marginTop: 12,
  },
  usdropLogo: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  coBrandText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  coBrandX: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  coBrandLegal: {
    fontSize: 15,
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
  comparisonRow: {
    flexDirection: "row",
    gap: 10,
  },
  compCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    gap: 8,
  },
  compTitle: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  compRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
  },
  compItem: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    flex: 1,
    lineHeight: 15,
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
  pricingRow: {
    flexDirection: "row",
    gap: 10,
  },
  priceCard: {
    flex: 1,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1.5,
    gap: 10,
  },
  popularBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    marginBottom: 2,
  },
  planName: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  priceBlock: {
    gap: 2,
  },
  strikePrice: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textDecorationLine: "line-through",
  },
  price: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  dividerLine: {
    height: StyleSheet.hairlineWidth,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    flex: 1,
    lineHeight: 18,
  },
  planCTA: {
    height: 44,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  planCTAText: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
  howRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 20,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  howTitle: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  howDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
});
