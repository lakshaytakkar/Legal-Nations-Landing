import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Globe, ArrowLeft, ArrowRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";

type FormData = {
  entityType: string;
  jurisdiction: string;
  timeline: string;
  revenue: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

const TOTAL_STEPS = 5;

const entityOptions = [
  { value: "llc", label: "LLC" },
  { value: "c-corp", label: "C-Corporation" },
  { value: "pvt-ltd-india", label: "Private Limited (India)" },
  { value: "free-zone-uae", label: "Free Zone (Dubai/UAE)" },
  { value: "other", label: "Other / Not sure yet" },
];

const jurisdictionOptions = [
  { value: "usa-wyoming", label: "🇺🇸 USA — Wyoming (Tax-Friendly LLC)" },
  { value: "usa-delaware", label: "🇺🇸 USA — Delaware (Investor-Preferred)" },
  { value: "uk", label: "🇬🇧 United Kingdom" },
  { value: "singapore", label: "🇸🇬 Singapore" },
  { value: "dubai-uae", label: "🇦🇪 Dubai / UAE Free Zone" },
  { value: "india", label: "🇮🇳 India" },
  { value: "other", label: "🌍 Other country" },
];

const timelineOptions = [
  { value: "this-week", label: "Right away (this week)" },
  { value: "next-month", label: "Within the next month" },
  { value: "exploring", label: "I'm still exploring" },
  { value: "compliance-only", label: "I already have a company — need compliance help" },
];

const revenueOptions = [
  { value: "pre-revenue", label: "Pre-revenue / Idea stage" },
  { value: "early", label: "Early revenue (under $50K/yr)" },
  { value: "growing", label: "Growing ($50K – $500K/yr)" },
  { value: "scaling", label: "Scaling ($500K+/yr)" },
];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              i < current
                ? "bg-accent text-white"
                : i === current
                ? "bg-primary text-white ring-2 ring-primary/30"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`w-8 h-0.5 transition-all duration-300 ${i < current ? "bg-accent" : "bg-muted"}`} />
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
          className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium text-base ${
            selected === opt.value
              ? "border-primary bg-secondary text-primary"
              : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export default function GetStarted() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [formData, setFormData] = useState<FormData>({
    entityType: "",
    jurisdiction: "",
    timeline: "",
    revenue: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const defaultPhone = formData.jurisdiction === "india" || formData.jurisdiction === "" ? "+91" : "+1";

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const validateStep5 = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone / WhatsApp is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep5()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/leads`.replace(/\/+/g, "/").replace(":/", "://"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("API error");
    } catch {
      console.log("Lead submitted (fallback):", formData);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const labelFor: Record<string, Record<string, string>> = {
    entityType: Object.fromEntries(entityOptions.map((o) => [o.value, o.label])),
    jurisdiction: Object.fromEntries(jurisdictionOptions.map((o) => [o.value, o.label])),
    timeline: Object.fromEntries(timelineOptions.map((o) => [o.value, o.label])),
    revenue: Object.fromEntries(revenueOptions.map((o) => [o.value, o.label])),
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-background">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 md:px-6 h-16 flex items-center">
            <Link href="/" className="font-heading font-bold text-xl text-primary flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              Legal Nations
            </Link>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center px-4 py-16">
          <motion.div
            className="max-w-xl w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              You're all set! A Legal Nations expert will call you within 24 hours.
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">Here's a summary of what you shared with us:</p>

            <div className="bg-card rounded-xl border border-border p-6 text-left space-y-3 mb-10">
              {formData.entityType && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-muted-foreground">Entity Type</span>
                  <span className="font-semibold text-foreground">{labelFor.entityType[formData.entityType]}</span>
                </div>
              )}
              {formData.jurisdiction && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-muted-foreground">Jurisdiction</span>
                  <span className="font-semibold text-foreground">{labelFor.jurisdiction[formData.jurisdiction]}</span>
                </div>
              )}
              {formData.timeline && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-muted-foreground">Timeline</span>
                  <span className="font-semibold text-foreground">{labelFor.timeline[formData.timeline]}</span>
                </div>
              )}
              {formData.revenue && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-muted-foreground">Revenue Stage</span>
                  <span className="font-semibold text-foreground">{labelFor.revenue[formData.revenue]}</span>
                </div>
              )}
              <div className="border-t border-border pt-3 flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">Name</span>
                <span className="font-semibold text-foreground">{formData.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">Email</span>
                <span className="font-semibold text-foreground">{formData.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">Phone</span>
                <span className="font-semibold text-foreground">{formData.phone}</span>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href="https://cal.com/legal-nations/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full bg-accent hover:bg-accent-hover text-accent-foreground text-lg h-14 rounded-full font-bold shadow-md">
                  Book a Time With Us
                </Button>
              </a>
              <a
                href="https://wa.me/918218229118?text=Hi%2C%20I%27m%20interested%20in%20company%20registration.%20Can%20you%20help%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button variant="outline" className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 text-lg h-12 rounded-full flex items-center justify-center gap-2">
                  <SiWhatsapp className="w-5 h-5" />
                  Chat on WhatsApp
                </Button>
              </a>
              <Link href="/" className="block">
                <Button variant="ghost" className="w-full text-muted-foreground">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  const steps = [
    {
      title: "What type of company do you want to register?",
      content: (
        <RadioCardGroup
          options={entityOptions}
          selected={formData.entityType}
          onSelect={(v) => update("entityType", v)}
        />
      ),
      canNext: !!formData.entityType,
    },
    {
      title: "Where do you want to register?",
      content: (
        <RadioCardGroup
          options={jurisdictionOptions}
          selected={formData.jurisdiction}
          onSelect={(v) => update("jurisdiction", v)}
        />
      ),
      canNext: !!formData.jurisdiction,
    },
    {
      title: "When do you need this done?",
      content: (
        <RadioCardGroup
          options={timelineOptions}
          selected={formData.timeline}
          onSelect={(v) => update("timeline", v)}
        />
      ),
      canNext: !!formData.timeline,
    },
    {
      title: "What is your current revenue stage?",
      content: (
        <RadioCardGroup
          options={revenueOptions}
          selected={formData.revenue}
          onSelect={(v) => update("revenue", v)}
        />
      ),
      canNext: !!formData.revenue,
    },
    {
      title: "Almost done! How should we reach you?",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Full Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your full name"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${
                errors.name ? "border-destructive" : "border-border"
              }`}
            />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${
                errors.email ? "border-destructive" : "border-border"
              }`}
            />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              WhatsApp / Phone <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2">
              <select
                className="px-3 py-3 rounded-xl border-2 border-border bg-card text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
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
                <option value="+1-CA">🇨🇦 +1</option>
                <option value="+61">🇦🇺 +61</option>
              </select>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder={defaultPhone + " 9999999999"}
                className={`flex-1 px-4 py-3 rounded-xl border-2 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${
                  errors.phone ? "border-destructive" : "border-border"
                }`}
              />
            </div>
            {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Company Name <span className="text-muted-foreground text-xs">(optional)</span>
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => update("company", e.target.value)}
              placeholder="Your desired company name"
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
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
          <Link href="/" className="font-heading font-bold text-xl text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            Legal Nations
          </Link>
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

          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <Button
                variant="outline"
                className="border-border text-foreground rounded-full h-12 px-6"
                onClick={goBack}
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
            {step < TOTAL_STEPS - 1 ? (
              <Button
                className="flex-1 bg-accent hover:bg-accent-hover text-accent-foreground rounded-full h-12 font-bold disabled:opacity-50"
                onClick={goNext}
                disabled={!currentStep.canNext}
              >
                Next <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                className="flex-1 bg-accent hover:bg-accent-hover text-accent-foreground rounded-full h-12 font-bold"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "Submit & Get My Free Consultation"}
              </Button>
            )}
          </div>

          {step === 0 && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <a href="https://legalnations.in" className="underline hover:text-primary transition-colors">
                Sign in
              </a>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
