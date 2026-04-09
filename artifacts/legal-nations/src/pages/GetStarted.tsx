import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Globe, ArrowLeft, ArrowRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

type FormData = {
  entityType: string;
  jurisdiction: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

const TOTAL_STEPS = 3;

const entityOptions = [
  { value: "llc",           label: "LLC — Limited Liability Company" },
  { value: "c-corp",        label: "C-Corporation" },
  { value: "pvt-ltd-india", label: "Private Limited (India)" },
  { value: "free-zone-uae", label: "Free Zone (Dubai / UAE)" },
  { value: "other",         label: "Not sure yet — help me choose" },
];

const jurisdictionOptions = [
  { value: "usa-wyoming",  label: "🇺🇸  USA — Wyoming  (Tax-Friendly LLC)" },
  { value: "usa-delaware", label: "🇺🇸  USA — Delaware  (Investor-Preferred)" },
  { value: "uk",           label: "🇬🇧  United Kingdom" },
  { value: "singapore",    label: "🇸🇬  Singapore" },
  { value: "dubai-uae",    label: "🇦🇪  Dubai / UAE Free Zone" },
  { value: "india",        label: "🇮🇳  India" },
  { value: "other",        label: "🌍  Other country" },
];

function StepIndicator({ current, total }: { current: number; total: number }) {
  const labels = ["Company Type", "Jurisdiction", "Contact Info"];
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                i < current
                  ? "bg-primary text-white"
                  : i === current
                  ? "bg-primary text-white ring-4 ring-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < current ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i === current ? "text-primary" : "text-muted-foreground"}`}>
              {labels[i]}
            </span>
          </div>
          {i < total - 1 && (
            <div className={`w-16 md:w-24 h-0.5 mx-1 mb-5 transition-all duration-300 ${i < current ? "bg-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

type RadioCardGroupProps = {
  options: { value: string; label: string }[];
  selected: string;
  onSelect: (v: string) => void;
};

function RadioCardGroup({ options, selected, onSelect }: RadioCardGroupProps) {
  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onSelect(opt.value)}
          className={`w-full text-left px-6 py-5 rounded-2xl border-2 transition-all duration-200 font-semibold text-lg flex items-center gap-4 ${
            selected === opt.value
              ? "border-primary bg-secondary text-primary shadow-sm"
              : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted"
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
              selected === opt.value ? "border-primary" : "border-muted-foreground/40"
            }`}
          >
            {selected === opt.value && (
              <span className="w-2.5 h-2.5 rounded-full bg-primary block" />
            )}
          </span>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

export default function GetStarted() {
  const [step, setStep]           = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors]       = useState<Partial<Record<keyof FormData, string>>>({});

  const [formData, setFormData] = useState<FormData>({
    entityType:   "",
    jurisdiction: "",
    name:         "",
    email:        "",
    phone:        "",
    company:      "",
  });

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const goNext = () => { setDirection(1);  setStep((s) => s + 1); };
  const goBack = () => { setDirection(-1); setStep((s) => s - 1); };

  const validateContact = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim())  e.name  = "Full name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.phone.trim()) e.phone = "Phone / WhatsApp is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateContact()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(
        `${import.meta.env.BASE_URL}api/leads`.replace(/\/+/g, "/").replace(":/", "://"),
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or reach us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const entityLabel = entityOptions.find((o) => o.value === formData.entityType)?.label ?? "";
  const jurisLabel  = jurisdictionOptions.find((o) => o.value === formData.jurisdiction)?.label ?? "";

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-background">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 md:px-6 h-16 flex items-center">
            <Link href="/"><Logo size="sm" /></Link>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center px-4 py-16">
          <motion.div
            className="max-w-xl w-full text-center"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              You're all set! We'll call you within 24 hours.
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">Here's what you shared:</p>

            <div className="bg-card rounded-xl border border-border p-6 text-left space-y-3 mb-10">
              {entityLabel   && <div className="flex justify-between text-sm"><span className="font-medium text-muted-foreground">Entity Type</span><span className="font-semibold">{entityLabel}</span></div>}
              {jurisLabel    && <div className="flex justify-between text-sm"><span className="font-medium text-muted-foreground">Jurisdiction</span><span className="font-semibold">{jurisLabel}</span></div>}
              <div className="border-t border-border pt-3 flex justify-between text-sm"><span className="font-medium text-muted-foreground">Name</span><span className="font-semibold">{formData.name}</span></div>
              <div className="flex justify-between text-sm"><span className="font-medium text-muted-foreground">Email</span><span className="font-semibold">{formData.email}</span></div>
              <div className="flex justify-between text-sm"><span className="font-medium text-muted-foreground">Phone</span><span className="font-semibold">{formData.phone}</span></div>
            </div>

            <div className="space-y-4">
              <a href="https://wa.me/919306500349?text=Hi%2C%20I%20just%20submitted%20my%20Legal%20Nations%20form" target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button className="w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white text-lg h-14 rounded-full font-bold flex items-center justify-center gap-2 shadow-md">
                  <SiWhatsapp className="w-5 h-5" /> Chat on WhatsApp
                </Button>
              </a>
              <Link href="/" className="block">
                <Button variant="ghost" className="w-full text-muted-foreground">← Back to Home</Button>
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  const defaultPhone = formData.jurisdiction === "india" || formData.jurisdiction === "" ? "+91" : "+1";

  const steps = [
    {
      title:   "What type of company do you want to register?",
      content: <RadioCardGroup options={entityOptions} selected={formData.entityType} onSelect={(v) => update("entityType", v)} />,
      canNext: !!formData.entityType,
    },
    {
      title:   "Where do you want to register?",
      content: <RadioCardGroup options={jurisdictionOptions} selected={formData.jurisdiction} onSelect={(v) => update("jurisdiction", v)} />,
      canNext: !!formData.jurisdiction,
    },
    {
      title: "Almost done! How should we reach you?",
      content: (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Full Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your full name"
              className={`w-full px-5 py-4 rounded-2xl border-2 bg-card text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${errors.name ? "border-destructive" : "border-border"}`}
            />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-5 py-4 rounded-2xl border-2 bg-card text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${errors.email ? "border-destructive" : "border-border"}`}
            />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              WhatsApp / Phone <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2">
              <select
                className="px-3 py-4 rounded-2xl border-2 border-border bg-card text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                defaultValue={defaultPhone}
                onChange={(e) => {
                  const current = formData.phone.replace(/^\+\d+\s*/, "");
                  update("phone", `${e.target.value} ${current}`.trim());
                }}
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+65">🇸🇬 +65</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+852">🇭🇰 +852</option>
                <option value="+61">🇦🇺 +61</option>
              </select>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder={`${defaultPhone} 9999999999`}
                className={`flex-1 px-5 py-4 rounded-2xl border-2 bg-card text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${errors.phone ? "border-destructive" : "border-border"}`}
              />
            </div>
            {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Company Name <span className="text-muted-foreground text-xs font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => update("company", e.target.value)}
              placeholder="Your desired company name"
              className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-card text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      ),
      canNext: true,
    },
  ];

  const currentStep = steps[step];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/"><Logo size="sm" /></Link>
          <span className="text-sm text-muted-foreground font-medium">Step {step + 1} of {TOTAL_STEPS}</span>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 py-12">
        <div className="max-w-xl w-full">
          <StepIndicator current={step} total={TOTAL_STEPS} />

          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
                  {currentStep.title}
                </h1>
                {currentStep.content}
              </motion.div>
            </AnimatePresence>
          </div>

          {submitError && step === TOTAL_STEPS - 1 && (
            <div className="mt-6 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 text-sm text-destructive">
              {submitError}
            </div>
          )}

          <div className="mt-4 flex gap-3">
            {step > 0 && (
              <Button
                variant="outline"
                className="border-border text-foreground rounded-full h-13 px-6"
                onClick={goBack}
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
            {step < TOTAL_STEPS - 1 ? (
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-full h-13 font-bold text-base disabled:opacity-50 shadow-md"
                onClick={goNext}
                disabled={!currentStep.canNext}
              >
                Continue <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-full h-13 font-bold text-base shadow-md"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "Get My Free Consultation →"}
              </Button>
            )}
          </div>

          {step === 0 && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <a href="https://legalnations.in" className="underline hover:text-primary transition-colors">Sign in</a>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
