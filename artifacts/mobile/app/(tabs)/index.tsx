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
  Dimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const COUNTRIES = [
  { code: "us", name: "USA", currency: "USD", price: "$149", entity: "LLC" },
  { code: "gb", name: "UK", currency: "GBP", price: "£89", entity: "Ltd" },
  { code: "sg", name: "Singapore", currency: "SGD", price: "S$199", entity: "Pte Ltd" },
  { code: "ae", name: "UAE", currency: "AED", price: "AED 1,199", entity: "Free Zone" },
  { code: "in", name: "India", currency: "INR", price: "₹14,999", entity: "Pvt Ltd" },
  { code: "ca", name: "Canada", currency: "CAD", price: "CAD 199", entity: "Inc" },
  { code: "au", name: "Australia", currency: "AUD", price: "AUD 199", entity: "Pty Ltd" },
  { code: "hk", name: "Hong Kong", currency: "HKD", price: "HKD 999", entity: "Ltd" },
];

const SERVICES = [
  { icon: "briefcase" as const, title: "Company Formation", desc: "US LLC or global entity registered fast" },
  { icon: "shield" as const, title: "Compliance & Filing", desc: "Annual reports, state filings, autopilot" },
  { icon: "file-text" as const, title: "Tax & Bookkeeping", desc: "EIN, ITIN, tax prep, full accounting" },
  { icon: "map-pin" as const, title: "Virtual Business Address", desc: "US and global mailing addresses" },
];

const PLANS = [
  { name: "Starter", price: "$149", popular: false },
  { name: "Professional", price: "$349", popular: true },
  { name: "Enterprise", price: "$799", popular: false },
];

function hapticPress(fn: () => void) {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  fn();
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;

  const openWhatsApp = () => {
    hapticPress(() =>
      Linking.openURL("https://wa.me/919306500349?text=Hi%2C%20I%27m%20interested%20in%20company%20registration")
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: isWeb ? 34 + 84 : 100 }}
      >
        {/* Web top pad */}
        {isWeb && <View style={{ height: topPad }} />}

        {/* Announcement Banner */}
        <View style={[styles.announcementBanner, { backgroundColor: colors.primary }]}>
          <Feather name="tag" size={12} color="#fff" />
          <Text style={styles.announcementText}>
            Exclusive for USDrop Members: 30% Off — Code{" "}
            <Text style={{ fontFamily: "Inter_700Bold" }}>USDROP30</Text>
          </Text>
        </View>

        {/* Hero */}
        <View style={[styles.hero, { paddingTop: isWeb ? 24 : insets.top + 16 }]}>
          {/* Trust badge */}
          <View style={[styles.trustBadge, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
            <View style={styles.flagRow}>
              {["in", "us", "gb", "ae"].map((code) => (
                <Image
                  key={code}
                  source={{ uri: `https://flagcdn.com/20x15/${code}.png` }}
                  style={styles.flagImg}
                  resizeMode="cover"
                />
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
          <TouchableOpacity
            style={[styles.primaryCTA, { backgroundColor: colors.primary }]}
            onPress={() => hapticPress(() => router.navigate("/(tabs)/get-started"))}
            testID="hero-cta"
          >
            <Text style={[styles.primaryCTAText, { color: colors.primaryForeground }]}>
              Start Your Company
            </Text>
            <Feather name="arrow-right" size={18} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryCTA, { borderColor: colors.border }]}
            onPress={() => hapticPress(() => router.navigate("/(tabs)/usdrop"))}
          >
            <Text style={[styles.secondaryCTAText, { color: colors.primary }]}>
              USDrop 30% Off Deal
            </Text>
          </TouchableOpacity>
        </View>

        {/* Countries */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Register in 8 Countries
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.countryScroll}
          >
            {COUNTRIES.map((c) => (
              <TouchableOpacity
                key={c.code}
                style={[styles.countryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => hapticPress(() => router.navigate("/(tabs)/get-started"))}
              >
                <Image
                  source={{ uri: `https://flagcdn.com/40x30/${c.code}.png` }}
                  style={styles.countryFlag}
                  resizeMode="cover"
                />
                <Text style={[styles.countryName, { color: colors.foreground }]}>{c.name}</Text>
                <Text style={[styles.countryEntity, { color: colors.mutedForeground }]}>{c.entity}</Text>
                <Text style={[styles.countryPrice, { color: colors.primary }]}>From {c.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Services */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>What We Handle</Text>
          <View style={[styles.servicesBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {SERVICES.map((s, i) => (
              <React.Fragment key={s.title}>
                <View style={styles.serviceRow}>
                  <View style={[styles.serviceIconBox, { backgroundColor: colors.secondary }]}>
                    <Feather name={s.icon} size={20} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.serviceTitle, { color: colors.foreground }]}>{s.title}</Text>
                    <Text style={[styles.serviceDesc, { color: colors.mutedForeground }]}>{s.desc}</Text>
                  </View>
                  <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
                </View>
                {i < SERVICES.length - 1 && (
                  <View style={[styles.sep, { backgroundColor: colors.border }]} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* USA Deep Dive */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            USA — Most Popular Jurisdiction
          </Text>
          <View style={[styles.usaCard, { backgroundColor: colors.secondary, borderColor: colors.primary + "33" }]}>
            <View style={styles.usaRow}>
              <View style={[styles.usaCol, { borderRightWidth: 1, borderRightColor: colors.border }]}>
                <Text style={[styles.usaState, { color: colors.foreground }]}>Delaware</Text>
                <Text style={[styles.usaTag, { color: colors.mutedForeground }]}>Investor-preferred</Text>
                <Text style={[styles.usaPrice, { color: colors.primary }]}>From $349</Text>
              </View>
              <View style={styles.usaCol}>
                <Text style={[styles.usaState, { color: colors.foreground }]}>Wyoming</Text>
                <Text style={[styles.usaTag, { color: colors.mutedForeground }]}>Tax-friendly LLC</Text>
                <Text style={[styles.usaPrice, { color: colors.primary }]}>From $149</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.usaCTA, { backgroundColor: colors.primary }]}
              onPress={() => hapticPress(() => router.navigate("/(tabs)/get-started"))}
            >
              <Text style={{ color: "#fff", fontFamily: "Inter_600SemiBold", fontSize: 15 }}>
                Register US LLC Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pricing Teaser */}
        <View style={[styles.section, { paddingHorizontal: 20 }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>USA Pricing Plans</Text>
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
                onPress={() => hapticPress(() => router.navigate("/(tabs)/get-started"))}
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
            onPress={() => hapticPress(() => router.navigate("/(tabs)/usdrop"))}
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
  announcementBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  announcementText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 24,
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
    marginTop: 20,
    marginBottom: 16,
  },
  flagRow: {
    flexDirection: "row",
    gap: -4,
  },
  flagImg: {
    width: 20,
    height: 14,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: -4,
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
    marginBottom: 24,
  },
  primaryCTA: {
    height: 56,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
    shadowColor: "#3347D4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryCTAText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
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
    marginTop: 8,
    paddingTop: 8,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  countryScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  countryCard: {
    width: 140,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    alignItems: "center",
    gap: 6,
  },
  countryFlag: {
    width: 40,
    height: 30,
    borderRadius: 4,
  },
  countryName: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  countryEntity: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  countryPrice: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
  servicesBox: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
  },
  serviceIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 2,
  },
  serviceDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 16,
  },
  sep: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
  },
  usaCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  usaRow: {
    flexDirection: "row",
  },
  usaCol: {
    flex: 1,
    padding: 20,
    gap: 4,
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
    marginTop: 4,
  },
  usaCTA: {
    margin: 16,
    marginTop: 0,
    height: 52,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  plansRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  planCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
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
