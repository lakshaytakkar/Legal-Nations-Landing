import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  Linking,
  KeyboardAvoidingView,
  Modal,
  FlatList,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { RadioCard } from "@/components/RadioCard";

const TOTAL_STEPS = 3;
const STEP_LABELS = ["Company Type", "Jurisdiction", "Contact Info"];

const ENTITY_OPTIONS = [
  { value: "llc", label: "LLC — Limited Liability Company" },
  { value: "c-corp", label: "C-Corporation" },
  { value: "pvt-ltd-india", label: "Private Limited (India)" },
  { value: "free-zone-uae", label: "Free Zone (Dubai / UAE)" },
  { value: "other", label: "Not sure yet — help me choose" },
];

const JURISDICTION_OPTIONS = [
  { value: "usa-wyoming", label: "🇺🇸  USA — Wyoming  (Tax-Friendly)" },
  { value: "usa-delaware", label: "🇺🇸  USA — Delaware  (Investor-Preferred)" },
  { value: "uk", label: "🇬🇧  United Kingdom" },
  { value: "singapore", label: "🇸🇬  Singapore" },
  { value: "dubai-uae", label: "🇦🇪  Dubai / UAE Free Zone" },
  { value: "india", label: "🇮🇳  India" },
  { value: "other", label: "🌍  Other country" },
];

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA / Canada" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong" },
];

type FormData = {
  entityType: string;
  jurisdiction: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

export default function GetStartedScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isWeb = Platform.OS === "web";
  const params = useLocalSearchParams<{ entityType?: string }>();

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [phonePrefix, setPhonePrefix] = useState("+91");
  const [showCodePicker, setShowCodePicker] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    entityType: "",
    jurisdiction: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (params.entityType) {
      setFormData((prev) => ({ ...prev, entityType: params.entityType! }));
    }
  }, [params.entityType]);

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const canNext =
    step === 0
      ? !!formData.entityType
      : step === 1
      ? !!formData.jurisdiction
      : true;

  const goNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setStep((s) => Math.max(s - 1, 0));
    setSubmitError(null);
  };

  const validateContact = (): boolean => {
    const e: Errors = {};
    if (!formData.name.trim()) e.name = "Full name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email";
    if (!formData.phone.trim()) e.phone = "Phone is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateContact()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSubmitting(true);
    setSubmitError(null);
    try {
      const apiBase = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");
      const res = await fetch(`${apiBase}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone: `${phonePrefix}${formData.phone}` }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setSubmitted(true);
    } catch (err) {
      console.error("Lead submission failed:", err);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setSubmitError(
        "Something went wrong. Please try again or reach us on WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(0);
    setSubmitError(null);
    setFormData({ entityType: "", jurisdiction: "", name: "", email: "", phone: "", company: "" });
    setErrors({});
    setPhonePrefix("+91");
  };

  if (submitted) {
    const entityLabel = ENTITY_OPTIONS.find((o) => o.value === formData.entityType)?.label ?? "";
    const jurisLabel = JURISDICTION_OPTIONS.find((o) => o.value === formData.jurisdiction)?.label ?? "";

    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={[
            styles.successContainer,
            { paddingTop: isWeb ? 67 + 40 : insets.top + 60, paddingBottom: isWeb ? 34 + 84 : 100 },
          ]}
        >
          <View style={[styles.successIcon, { backgroundColor: colors.secondary }]}>
            <Feather name="check-circle" size={44} color={colors.primary} />
          </View>
          <Text style={[styles.successTitle, { color: colors.foreground }]}>
            You're all set! We'll call you within 24 hours.
          </Text>

          <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {entityLabel ? (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Entity</Text>
                <Text style={[styles.summaryValue, { color: colors.foreground }]}>{entityLabel}</Text>
              </View>
            ) : null}
            {jurisLabel ? (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Location</Text>
                <Text style={[styles.summaryValue, { color: colors.foreground }]}>{jurisLabel}</Text>
              </View>
            ) : null}
            <View style={[styles.dividerLine, { backgroundColor: colors.border, marginVertical: 8 }]} />
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Name</Text>
              <Text style={[styles.summaryValue, { color: colors.foreground }]}>{formData.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Email</Text>
              <Text style={[styles.summaryValue, { color: colors.foreground }]}>{formData.email}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Phone</Text>
              <Text style={[styles.summaryValue, { color: colors.foreground }]}>
                {phonePrefix} {formData.phone}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.whatsappBtn, { backgroundColor: "#25D366" }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              Linking.openURL("https://wa.me/919306500349?text=Hi%2C%20I%20just%20submitted%20my%20Legal%20Nations%20form");
            }}
            testID="whatsapp-success"
          >
            <Feather name="message-circle" size={20} color="#fff" />
            <Text style={[styles.btnText, { color: "#fff" }]}>Chat on WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.ghostBtn, { borderColor: colors.border }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              resetForm();
              router.navigate("/");
            }}
            testID="back-home-btn"
          >
            <Text style={[styles.ghostBtnText, { color: colors.mutedForeground }]}>Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.background }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: isWeb ? 34 + 84 : 100 }}
        >
          {isWeb && <View style={{ height: 67 }} />}
          <View style={[styles.container, { paddingTop: isWeb ? 24 : insets.top + 16 }]}>
            {/* Step Indicator */}
            <View style={styles.stepIndicator}>
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <React.Fragment key={i}>
                  <View style={styles.stepItem}>
                    <View
                      style={[
                        styles.stepCircle,
                        { backgroundColor: i <= step ? colors.primary : colors.muted },
                      ]}
                    >
                      {i < step ? (
                        <Feather name="check" size={16} color="#fff" />
                      ) : (
                        <Text
                          style={{
                            color: i === step ? "#fff" : colors.mutedForeground,
                            fontFamily: "Inter_700Bold",
                            fontSize: 14,
                          }}
                        >
                          {i + 1}
                        </Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.stepLabel,
                        { color: i === step ? colors.primary : colors.mutedForeground },
                      ]}
                    >
                      {STEP_LABELS[i]}
                    </Text>
                  </View>
                  {i < TOTAL_STEPS - 1 && (
                    <View
                      style={[
                        styles.stepLine,
                        { backgroundColor: i < step ? colors.primary : colors.border },
                      ]}
                    />
                  )}
                </React.Fragment>
              ))}
            </View>

            {/* Step Title */}
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>
              {step === 0
                ? "What type of company?"
                : step === 1
                ? "Where do you want to register?"
                : "How should we reach you?"}
            </Text>

            {/* Step 1: Entity */}
            {step === 0 && (
              <View style={styles.optionsList}>
                {ENTITY_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    label={opt.label}
                    selected={formData.entityType === opt.value}
                    onPress={() => {
                      Haptics.selectionAsync();
                      update("entityType", opt.value);
                    }}
                  />
                ))}
              </View>
            )}

            {/* Step 2: Jurisdiction */}
            {step === 1 && (
              <View style={styles.optionsList}>
                {JURISDICTION_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    label={opt.label}
                    selected={formData.jurisdiction === opt.value}
                    onPress={() => {
                      Haptics.selectionAsync();
                      update("jurisdiction", opt.value);
                    }}
                  />
                ))}
              </View>
            )}

            {/* Step 3: Contact */}
            {step === 2 && (
              <View style={styles.contactForm}>
                {/* Name */}
                <View>
                  <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                    Full Name <Text style={{ color: colors.destructive }}>*</Text>
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: colors.card,
                        borderColor: errors.name ? colors.destructive : colors.border,
                        color: colors.foreground,
                      },
                    ]}
                    placeholder="Your full name"
                    placeholderTextColor={colors.mutedForeground}
                    value={formData.name}
                    onChangeText={(v) => update("name", v)}
                    autoCapitalize="words"
                    testID="name-input"
                  />
                  {errors.name && (
                    <Text style={[styles.errorText, { color: colors.destructive }]}>
                      {errors.name}
                    </Text>
                  )}
                </View>

                {/* Email */}
                <View>
                  <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                    Email <Text style={{ color: colors.destructive }}>*</Text>
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: colors.card,
                        borderColor: errors.email ? colors.destructive : colors.border,
                        color: colors.foreground,
                      },
                    ]}
                    placeholder="you@example.com"
                    placeholderTextColor={colors.mutedForeground}
                    value={formData.email}
                    onChangeText={(v) => update("email", v)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    testID="email-input"
                  />
                  {errors.email && (
                    <Text style={[styles.errorText, { color: colors.destructive }]}>
                      {errors.email}
                    </Text>
                  )}
                </View>

                {/* Phone with country code */}
                <View>
                  <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                    WhatsApp / Phone <Text style={{ color: colors.destructive }}>*</Text>
                  </Text>
                  <View style={[
                    styles.phoneRow,
                    { borderColor: errors.phone ? colors.destructive : colors.border },
                  ]}>
                    <TouchableOpacity
                      style={[styles.codePickerBtn, { backgroundColor: colors.secondary, borderRightColor: colors.border }]}
                      onPress={() => setShowCodePicker(true)}
                      testID="code-picker-btn"
                    >
                      <Text style={[styles.codeText, { color: colors.foreground }]}>
                        {COUNTRY_CODES.find((c) => c.code === phonePrefix)?.flag ?? "🇮🇳"}
                        {"  "}{phonePrefix}
                      </Text>
                      <Feather name="chevron-down" size={14} color={colors.mutedForeground} />
                    </TouchableOpacity>
                    <TextInput
                      style={[
                        styles.phoneInput,
                        {
                          backgroundColor: colors.card,
                          color: colors.foreground,
                        },
                      ]}
                      placeholder="99999 99999"
                      placeholderTextColor={colors.mutedForeground}
                      value={formData.phone}
                      onChangeText={(v) => update("phone", v)}
                      keyboardType="phone-pad"
                      testID="phone-input"
                    />
                  </View>
                  {errors.phone && (
                    <Text style={[styles.errorText, { color: colors.destructive }]}>
                      {errors.phone}
                    </Text>
                  )}
                </View>

                {/* Company */}
                <View>
                  <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                    Company Name{" "}
                    <Text style={[styles.optionalLabel, { color: colors.mutedForeground }]}>
                      (optional)
                    </Text>
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                        color: colors.foreground,
                      },
                    ]}
                    placeholder="Your desired company name"
                    placeholderTextColor={colors.mutedForeground}
                    value={formData.company}
                    onChangeText={(v) => update("company", v)}
                    testID="company-input"
                  />
                </View>

                {/* API error */}
                {submitError && (
                  <View style={[styles.errorBanner, { backgroundColor: "#FEF2F2", borderColor: "#FECACA" }]}>
                    <Feather name="alert-circle" size={16} color="#DC2626" />
                    <Text style={[styles.errorBannerText, { color: "#DC2626" }]}>{submitError}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Navigation Buttons */}
            <View style={styles.navButtons}>
              {step > 0 && (
                <TouchableOpacity
                  style={[styles.backBtn, { borderColor: colors.border }]}
                  onPress={goBack}
                  testID="back-btn"
                >
                  <Feather name="arrow-left" size={18} color={colors.foreground} />
                  <Text style={[styles.backBtnText, { color: colors.foreground }]}>Back</Text>
                </TouchableOpacity>
              )}
              {step < TOTAL_STEPS - 1 ? (
                <TouchableOpacity
                  style={[
                    styles.nextBtn,
                    {
                      backgroundColor: canNext ? colors.primary : colors.muted,
                      flex: step > 0 ? 1 : undefined,
                      width: step === 0 ? "100%" : undefined,
                    },
                  ]}
                  onPress={goNext}
                  disabled={!canNext}
                  testID="next-btn"
                >
                  <Text
                    style={[
                      styles.nextBtnText,
                      { color: canNext ? "#fff" : colors.mutedForeground },
                    ]}
                  >
                    Continue
                  </Text>
                  <Feather name="arrow-right" size={18} color={canNext ? "#fff" : colors.mutedForeground} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.nextBtn, { backgroundColor: colors.primary, flex: 1 }]}
                  onPress={handleSubmit}
                  disabled={submitting}
                  testID="submit-btn"
                >
                  <Text style={[styles.nextBtnText, { color: "#fff" }]}>
                    {submitting ? "Submitting..." : "Get My Free Consultation"}
                  </Text>
                  {!submitting && <Feather name="arrow-right" size={18} color="#fff" />}
                </TouchableOpacity>
              )}
            </View>

            {step === 0 && (
              <Text style={[styles.signInNote, { color: colors.mutedForeground }]}>
                No credit card required. Free consultation.
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Country Code Picker Modal */}
      <Modal
        visible={showCodePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCodePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCodePicker(false)}
        />
        <View style={[styles.pickerSheet, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
          <View style={[styles.pickerHandle, { backgroundColor: colors.border }]} />
          <Text style={[styles.pickerTitle, { color: colors.foreground }]}>Select Country Code</Text>
          <FlatList
            data={COUNTRY_CODES}
            keyExtractor={(item) => item.code + item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.pickerItem,
                  { backgroundColor: phonePrefix === item.code ? colors.secondary : "transparent" },
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setPhonePrefix(item.code);
                  setShowCodePicker(false);
                }}
              >
                <Text style={styles.pickerFlag}>{item.flag}</Text>
                <Text style={[styles.pickerName, { color: colors.foreground }]}>{item.name}</Text>
                <Text style={[styles.pickerCode, { color: colors.primary }]}>{item.code}</Text>
                {phonePrefix === item.code && (
                  <Feather name="check" size={16} color={colors.primary} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    marginTop: 8,
  },
  stepItem: {
    alignItems: "center",
    gap: 6,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  stepLabel: {
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    maxWidth: 70,
  },
  stepLine: {
    width: 32,
    height: 2,
    marginHorizontal: 4,
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    marginBottom: 24,
    lineHeight: 32,
  },
  optionsList: {
    gap: 10,
  },
  contactForm: {
    gap: 18,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 8,
  },
  optionalLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  input: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  phoneRow: {
    flexDirection: "row",
    height: 54,
    borderRadius: 14,
    borderWidth: 1.5,
    overflow: "hidden",
  },
  codePickerBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    borderRightWidth: 1,
  },
  codeText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  errorText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 4,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  errorBannerText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    flex: 1,
    lineHeight: 18,
  },
  navButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 28,
  },
  backBtn: {
    height: 56,
    paddingHorizontal: 20,
    borderRadius: 100,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backBtnText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  nextBtn: {
    height: 56,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#3347D4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  signInNote: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginTop: 16,
  },
  successContainer: {
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 20,
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    lineHeight: 32,
  },
  summaryCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    width: "100%",
    gap: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  summaryValue: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    flex: 1,
    textAlign: "right",
    marginLeft: 12,
  },
  dividerLine: {
    height: StyleSheet.hairlineWidth,
  },
  whatsappBtn: {
    height: 56,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  btnText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  ghostBtn: {
    height: 52,
    borderRadius: 100,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  ghostBtnText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000055",
  },
  pickerSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    paddingBottom: 40,
    maxHeight: "70%",
  },
  pickerHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  pickerTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  pickerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  pickerFlag: {
    fontSize: 24,
  },
  pickerName: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  pickerCode: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    marginRight: 8,
  },
});
