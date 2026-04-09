import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  Platform,
  LayoutChangeEvent,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionHeader } from "@/components/SectionHeader";
import { FlagImg } from "@/components/FlagImg";

const COUNTRIES = [
  { code: "us", name: "USA", price: "$149", entity: "LLC" },
  { code: "gb", name: "UK", price: "£89", entity: "Ltd" },
  { code: "sg", name: "Singapore", price: "S$199", entity: "Pte Ltd" },
  { code: "ae", name: "UAE", price: "AED 1,199", entity: "Free Zone" },
  { code: "in", name: "India", price: "₹14,999", entity: "Pvt Ltd" },
  { code: "ca", name: "Canada", price: "CAD 199", entity: "Inc" },
  { code: "au", name: "Australia", price: "AUD 199", entity: "Pty Ltd" },
  { code: "hk", name: "Hong Kong", price: "HKD 999", entity: "Ltd" },
];

const SERVICES = [
  { icon: "briefcase" as const, title: "Company Formation", desc: "US LLC or global entity" },
  { icon: "shield" as const, title: "Compliance", desc: "Annual reports & filings" },
  { icon: "file-text" as const, title: "Tax & Books", desc: "EIN, ITIN, accounting" },
  { icon: "map-pin" as const, title: "Virtual Address", desc: "US & global addresses" },
];

const PLANS = [
  { name: "Starter", price: "$149", popular: false },
  { name: "Professional", price: "$349", popular: true },
  { name: "Enterprise", price: "$799", popular: false },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;
  const scrollRef = useRef<ScrollView>(null);
  const pricingY = useRef(0);

  const openWhatsApp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL("https://wa.me/919306500349?text=Hi%2C%20I%27m%20interested%20in%20company%20registration");
  };

  const scrollToPricing = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scrollRef.current?.scrollTo({ y: pricingY.current, animated: true });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        ref={scrollRef}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: isWeb ? 34 + 84 : 100 }}
      >
        {isWeb && <View style={{ height: topPad }} />}

        {/* Announcement Banner */}
        <AnnouncementBanner
          text={
            <>
              Exclusive for USDrop Members: 30% Off — Code{" "}
              <Text style={{ fontFamily: "Inter_700Bold" }}>USDROP30</Text>
            </>
          }
        />

        {/* Hero */}
        <View style={[styles.hero, { paddingTop: isWeb ? 24 : insets.top + 16 }]}>
          {/* Trust badge */}
          <View style={[styles.trustBadge, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
            <View style={styles.flagRow}>
              {["in", "us", "gb", "ae"].map((code) => (
                <FlagImg key={code} code={code} width={20} height={14} style={{ marginRight: -4, borderWidth: 1, borderColor: "#fff" }} />
              ))}
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={[styles.pulse, { backgroundColor: "#22C55E" }]} />
            <Text style={[styles.trustText, { color: colors.primary }]}>
              <Text style={{ fontFamily: "Inter_700Bold" }}>2,500+</Text> Founders Worldwide
            </Text>
          </View>

          {/* Headline */}
          <Text style={[styles.headline, { color: colors.foreground }]}>
            Register Your Company{"\n"}
            <Text style={{ color: colors.primary }}>Anywhere in the World</Text>
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            US LLC filed in 24 hours. From India, for the world.
          </Text>

          {/* CTAs */}
          <PrimaryButton
            label="Start Your Company"
            onPress={() => router.navigate("/(tabs)/get-started")}
            icon="arrow-right"
            testID="hero-cta"
          />
          <TouchableOpacity
            style={[styles.secondaryCTA, { borderColor: colors.border }]}
            onPress={scrollToPricing}
          >
            <Text style={[styles.secondaryCTAText, { color: colors.primary }]}>
              See Pricing
            </Text>
          </TouchableOpacity>
        </View>

        {/* Countries Grid */}
        <View style={styles.section}>
          <SectionHeader title="Register in 8 Countries" />
          <View style={[styles.countriesGrid, { paddingHorizontal: 20 }]}>
            {COUNTRIES.map((c) => (
              <TouchableOpacity
                key={c.code}
                style={[styles.countryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.navigate("/(tabs)/get-started");
                }}
              >
                <FlagImg code={c.code} width={36} height={27} />
                <Text style={[styles.countryName, { color: colors.foreground }]}>{c.name}</Text>
                <Text style={[styles.countryEntity, { color: colors.mutedForeground }]}>{c.entity}</Text>
                <Text style={[styles.countryPrice, { color: colors.primary }]}>From {c.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Services – horizontal strip */}
        <View style={styles.section}>
          <SectionHeader title="What We Handle" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesStrip}
          >
            {SERVICES.map((s) => (
              <View
                key={s.title}
                style={[styles.serviceCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={[styles.serviceIconBox, { backgroundColor: colors.secondary }]}>
                  <Feather name={s.icon} size={22} color={colors.primary} />
                </View>
                <Text style={[styles.serviceTitle, { color: colors.foreground }]}>{s.title}</Text>
                <Text style={[styles.serviceDesc, { color: colors.mutedForeground }]}>{s.desc}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* USA Deep Dive */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <SectionHeader title="USA — Most Popular" style={{ paddingHorizontal: 0 }} />
          <View style={[styles.usaCard, { backgroundColor: colors.secondary, borderColor: colors.primary + "33" }]}>
            <View style={styles.usaRow}>
              <View style={[styles.usaCol, { borderRightWidth: 1, borderRightColor: colors.border }]}>
                <FlagImg code="us" width={32} height={24} />
                <Text style={[styles.usaState, { color: colors.foreground }]}>Wyoming</Text>
                <Text style={[styles.usaTag, { color: colors.mutedForeground }]}>Tax-friendly LLC</Text>
                <Text style={[styles.usaPrice, { color: colors.primary }]}>From $149</Text>
              </View>
              <View style={styles.usaCol}>
                <FlagImg code="us" width={32} height={24} />
                <Text style={[styles.usaState, { color: colors.foreground }]}>Delaware</Text>
                <Text style={[styles.usaTag, { color: colors.mutedForeground }]}>Investor-preferred</Text>
                <Text style={[styles.usaPrice, { color: colors.primary }]}>From $349</Text>
              </View>
            </View>
            <PrimaryButton
              label="Register US LLC Now"
              onPress={() => router.navigate("/(tabs)/get-started")}
              testID="usa-cta"
            />
          </View>
        </View>

        {/* Pricing Teaser */}
        <View
          style={[styles.section, { paddingHorizontal: 20 }]}
          onLayout={(e: LayoutChangeEvent) => { pricingY.current = e.nativeEvent.layout.y; }}
        >
          <SectionHeader title="USA Pricing Plans" style={{ paddingHorizontal: 0 }} />
          <View style={styles.plansRow}>
            {PLANS.map((p) => (
              <TouchableOpacity
                key={p.name}
                style={[
                  styles.planCard,
                  {
                    backgroundColor: p.popular ? colors.primary : colors.card,
                    borderColor: p.popular ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.navigate("/(tabs)/get-started");
                }}
              >
                {p.popular && (
                  <View style={[styles.popularBadge, { backgroundColor: "#fff3" }]}>
                    <Text style={{ color: "#fff", fontSize: 9, fontFamily: "Inter_600SemiBold" }}>
                      POPULAR
                    </Text>
                  </View>
                )}
                <Text
                  style={[
                    styles.planName,
                    { color: p.popular ? "#fff" : colors.mutedForeground },
                  ]}
                >
                  {p.name}
                </Text>
                <Text
                  style={[
                    styles.planPrice,
                    { color: p.popular ? "#fff" : colors.foreground },
                  ]}
                >
                  {p.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.viewAllBtn, { borderColor: colors.border }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.navigate("/(tabs)/usdrop");
            }}
          >
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All Countries & Plans</Text>
          </TouchableOpacity>
        </View>

        {/* Trust signals */}
        <View style={[styles.trustRow, { paddingHorizontal: 20, paddingBottom: 32 }]}>
          {["5,000+ LLCs formed", "4.9/5 rating", "24h filing"].map((t) => (
            <View key={t} style={[styles.trustPill, { backgroundColor: colors.muted }]}>
              <Feather name="check-circle" size={13} color={colors.primary} />
              <Text style={[styles.trustPillText, { color: colors.mutedForeground }]}>{t}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* WhatsApp FAB */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: "#25D366",
            bottom: isWeb ? 34 + 84 + 16 : (insets.bottom || 16) + 80,
          },
        ]}
        onPress={openWhatsApp}
        testID="whatsapp-fab"
      >
        <Feather name="message-circle" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 14,
  },
  trustBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    marginTop: 8,
  },
  flagRow: {
    flexDirection: "row",
    gap: 0,
  },
  divider: {
    width: 1,
    height: 14,
  },
  pulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  trustText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  headline: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    lineHeight: 40,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
  },
  secondaryCTA: {
    height: 52,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  secondaryCTAText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  section: {
    marginBottom: 8,
    paddingTop: 8,
    paddingBottom: 16,
  },
  countriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  countryCard: {
    width: "47%",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    gap: 6,
  },
  countryName: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    marginTop: 4,
  },
  countryEntity: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  countryPrice: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    marginTop: 2,
  },
  servicesStrip: {
    paddingHorizontal: 20,
    gap: 12,
  },
  serviceCard: {
    width: 140,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    gap: 8,
  },
  serviceIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceTitle: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    lineHeight: 18,
  },
  serviceDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 16,
  },
  usaCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    gap: 0,
    paddingBottom: 16,
  },
  usaRow: {
    flexDirection: "row",
  },
  usaCol: {
    flex: 1,
    padding: 20,
    gap: 6,
  },
  usaState: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  usaTag: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  usaPrice: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    marginTop: 2,
  },
  plansRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  planCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1.5,
    alignItems: "center",
    gap: 4,
  },
  popularBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    marginBottom: 2,
  },
  planName: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  planPrice: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  viewAllBtn: {
    height: 52,
    borderRadius: 100,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  viewAllText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  trustRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  trustPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },
  trustPillText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  fab: {
    position: "absolute",
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
});
