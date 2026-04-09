import { useState } from "react";
import { Link } from "wouter";
import {
  CheckCircle2, XCircle, Shield, Star, Building2, BadgeCheck,
  ShoppingCart, Phone, Rocket, ArrowDown, MessageCircle, X, User, Mail, PhoneCall,
  Landmark, CreditCard, ShieldCheck, Globe, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

const JUST_LLC_FEATURES = [
  "LLC Formation (Wyoming or Delaware — your choice)",
  "EIN (Employer Identification Number) from IRS",
  "Articles of Organization filed & approved",
  "Operating Agreement (e-commerce optimized)",
  "Registered Agent — 1st year included",
  "Annual compliance reminders",
];

const ELITE_FEATURES = [
  "US Mailing Address",
  "US Phone Number",
  "US Bank Account Setup (Mercury or Relay)",
  "ITIN Application Assistance",
  "Resale Certificate Filing",
  "Amazon Seller Account Setup",
  "Shopify Website Development",
  "Dedicated Account Manager",
  "Priority Support",
];

const PROBLEMS = [
  { before: "Rejected by Amazon Seller Central",   after: "Marketplace approved & selling" },
  { before: "Stripe & PayPal won't onboard you",   after: "Payment gateways fully unlocked" },
  { before: "No US bank account for payouts",       after: "Mercury / Relay account ready" },
  { before: "Confused about US taxes & EIN",        after: "EIN + compliance handled for you" },
];

const TRUST = [
  { icon: <Shield className="w-4 h-4 text-primary" />,     label: "Govt-Registered Agent" },
  { icon: <Star className="w-4 h-4 text-amber-500" />,      label: "4.9/5 Client Rating" },
  { icon: <Building2 className="w-4 h-4 text-primary" />,  label: "5,000+ LLCs Formed" },
  { icon: <BadgeCheck className="w-4 h-4 text-primary" />, label: "BBB Accredited" },
];

const PLATFORMS = [
  { name: "Amazon",  src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Shopify", src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
  { name: "eBay",    src: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg" },
  { name: "TikTok",  src: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" },
  { name: "Stripe",  src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "PayPal",  src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
];

const LLC_BENEFITS = [
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Marketplace Approvals",
    desc: "Get your LLC approved on Amazon, eBay, TikTok Shop, and Shopify as a verified US business entity.",
  },
  {
    icon: <Landmark className="w-6 h-6" />,
    title: "US Business Bank Account",
    desc: "Open a real US bank account with Mercury or Relay to receive payouts directly from marketplaces.",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Payment Gateway Access",
    desc: "Unlock Stripe, PayPal, and other US payment gateways that reject non-US businesses.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Personal Asset Protection",
    desc: "Separate your personal finances from your business — your personal assets stay protected from any liability.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "US Business Credibility",
    desc: "A registered US LLC gives suppliers, partners, and customers the confidence to do business with you.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Tax Benefits & Compliance",
    desc: "Get your EIN, stay compliant with US tax law, and take advantage of favorable pass-through tax treatment.",
  },
];

const STEPS = [
  { icon: <ShoppingCart className="w-6 h-6" />, step: "1", title: "Pick Your Package", desc: "Choose Just LLC for the essentials, or Elite for the full done-for-you setup." },
  { icon: <Phone className="w-6 h-6" />,         step: "2", title: "We Call You in 24 Hours", desc: "A Legal Nations expert confirms your details and handles all the paperwork." },
  { icon: <Rocket className="w-6 h-6" />,        step: "3", title: "Start Selling", desc: "LLC filed, EIN received, bank account ready. You're live on Amazon." },
];

type Package = "just-llc" | "elite";
type ModalStep = 1 | 2 | 3;

interface ModalState {
  open: boolean;
  step: ModalStep;
  selectedPackage: Package;
  form: { name: string; email: string; phone: string };
  submitting: boolean;
}

const initialModal: ModalState = {
  open: false,
  step: 1,
  selectedPackage: "just-llc",
  form: { name: "", email: "", phone: "" },
  submitting: false,
};

export default function UsdropPartner() {
  const [modal, setModal] = useState<ModalState>(initialModal);

  const openModal = (pkg: Package) => {
    setModal({ ...initialModal, open: true, selectedPackage: pkg });
  };

  const closeModal = () => {
    setModal((m) => ({ ...m, open: false }));
  };

  const handleBackdropClick = () => {
    if (modal.step === 1 || modal.step === 2) closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModal((m) => ({ ...m, submitting: true }));
    try {
      await fetch(`/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...modal.form,
          package: modal.selectedPackage,
          source: "usdrop",
          price: modal.selectedPackage === "elite" ? 69000 : 39000,
        }),
      });
    } catch (_) { /* graceful fallback */ }
    setModal((m) => ({ ...m, submitting: false, step: 3 }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">

      {/* ── Sticky Nav ── */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/mascot.png" alt="Legal Nations" className="w-7 h-7 object-contain" />
            <span className="font-bold text-base text-primary" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Legal Nations
            </span>
          </Link>
          <a
            href="https://wa.me/919306500349?text=Hi%2C%20I%20came%20from%20USDrop%20AI%20and%20want%20to%20register%20my%20US%20LLC"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Questions? Chat on WhatsApp
          </a>
        </div>
      </header>

      <main className="flex-grow">

        {/* ── 1. Hero ── */}
        <section className="bg-gradient-to-b from-secondary/50 to-background pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">

            {/* Large co-brand logos */}
            <div className="flex items-center justify-center gap-6 md:gap-10 mb-8 flex-wrap">
              <img
                src="/usdrop-logo.png"
                alt="USDrop AI"
                className="h-10 md:h-14 w-auto object-contain"
              />
              <span className="text-3xl md:text-4xl font-thin text-muted-foreground/60 leading-none">×</span>
              <div className="flex items-center gap-2.5">
                <img src="/mascot.png" alt="Legal Nations" className="h-10 w-10 md:h-14 md:w-14 object-contain" />
                <span className="font-bold text-xl md:text-2xl text-primary" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  Legal Nations
                </span>
              </div>
            </div>

            {/* Partner badge */}
            <div className="inline-block mb-7">
              <span className="bg-amber-50 text-amber-700 border border-amber-200 text-sm font-semibold px-4 py-1.5 rounded-full">
                Exclusive Partner Pricing · 30% Off for USDrop AI Members
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
              Your US Business.{" "}
              <span className="text-primary">
                Approved by Amazon, Stripe &amp; Shopify.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The #1 reason Indian dropshippers get rejected — no US LLC. Fix it in 24 hours.
              Get marketplace approvals, open a US bank account, and handle taxes the right way.
            </p>

            <Button
              onClick={() => openModal("just-llc")}
              className="bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-full px-10 h-14 shadow-lg hover:shadow-xl transition-all"
            >
              See Packages &amp; Pricing <ArrowDown className="w-4 h-4 ml-2" />
            </Button>

            {/* Before / After card */}
            <div className="mt-14 bg-card border border-border rounded-2xl shadow-sm overflow-hidden max-w-3xl mx-auto">
              <div className="grid grid-cols-2">
                {/* Before */}
                <div className="p-6 border-r border-border">
                  <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">Without a US LLC</div>
                  <ul className="space-y-3 text-left">
                    {PROBLEMS.map((p) => (
                      <li key={p.before} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                        {p.before}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* After */}
                <div className="p-6 bg-secondary/30">
                  <div className="text-xs font-bold uppercase tracking-widest text-green-600 mb-4">With Legal Nations</div>
                  <ul className="space-y-3 text-left">
                    {PROBLEMS.map((p) => (
                      <li key={p.after} className="flex items-start gap-2.5 text-sm text-foreground font-medium">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        {p.after}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Platform Logos ── */}
        <section className="py-12 border-y border-border bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
              Get approved on
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
              {PLATFORMS.map(({ name, src }) => (
                <img
                  key={name}
                  src={src}
                  alt={name}
                  className="h-7 object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  loading="lazy"
                />
              ))}
              <span className="text-sm font-semibold text-muted-foreground/70">+ more</span>
            </div>
          </div>
        </section>

        {/* ── 2b. LLC Benefits ── */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Why Every Dropshipper Needs a US LLC
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
              A US LLC isn't just paperwork — it's the key that unlocks every major marketplace, payment gateway, and bank account you need to run a serious dropshipping business.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {LLC_BENEFITS.map(({ icon, title, desc }) => (
                <div key={title} className="bg-card border border-border rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {icon}
                  </div>
                  <h3 className="font-semibold text-base mb-2 text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Side-by-Side Pricing ── */}
        <section id="pricing" className="py-20 bg-surface border-b border-border scroll-mt-16">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Choose Your Package
              </h2>
              <p className="text-muted-foreground text-lg">
                Both plans include your 30% USDrop member discount — code <span className="font-semibold text-primary">USDROP30</span> auto-applied.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto">

              {/* Just LLC */}
              <div className="bg-card rounded-2xl border-2 border-border p-8 shadow-sm flex flex-col">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Just LLC</div>
                <div className="mb-1 flex items-baseline gap-3">
                  <span className="text-xl text-muted-foreground line-through">₹55,000</span>
                  <span className="text-4xl font-bold text-foreground">₹39,000</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">30% USDrop discount · USDROP30 applied</p>
                <Button
                  onClick={() => openModal("just-llc")}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 mb-8 rounded-xl"
                >
                  Get Just LLC — ₹39,000
                </Button>
                <ul className="space-y-3 flex-grow">
                  {JUST_LLC_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Best for: Getting marketplace-approved fast with a clean US legal entity.
                  </p>
                </div>
              </div>

              {/* Elite */}
              <div className="bg-card rounded-2xl border-2 border-primary p-8 shadow-xl flex flex-col relative md:-mt-4 md:mb-4">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Elite LLC</div>
                <div className="mb-1 flex items-baseline gap-3">
                  <span className="text-xl text-muted-foreground line-through">₹99,000</span>
                  <span className="text-4xl font-bold text-foreground">₹69,000</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">30% USDrop discount · USDROP30 applied</p>
                <Button
                  onClick={() => openModal("elite")}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 mb-8 rounded-xl shadow-md"
                >
                  Get Elite Package — ₹69,000
                </Button>
                <ul className="space-y-3 flex-grow">
                  {JUST_LLC_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                  {ELITE_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>
                        {f}
                        {f === "Shopify Website Development" && (
                          <span className="ml-2 bg-amber-100 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5 text-[10px] font-bold">
                            NEW
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Best for: Serious sellers who want a fully operational US business from day one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. How It Works ── */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {STEPS.map(({ icon, step, title, desc }) => (
                <div key={step} className="bg-card border border-border rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    {icon}
                  </div>
                  <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Step {step}</div>
                  <h3 className="font-semibold text-base mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Trust Signals ── */}
        <section className="py-8 bg-secondary/40 border-y border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              {TRUST.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  {icon}
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Minimal Footer ── */}
      <footer className="bg-background border-t border-border py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 text-primary">
            <img src="/mascot.png" alt="Legal Nations" className="w-6 h-6 object-contain" />
            <span className="font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>Legal Nations</span>
          </div>
          <p>© 2026 Legal Nations. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/legal.nations" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
            <a
              href="https://wa.me/919306500349"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* ── Multi-Step Modal ── */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />

          {/* Modal panel */}
          <div className="relative z-10 w-full max-w-md bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                  {modal.step === 1 && "Step 1 of 2 — Choose Package"}
                  {modal.step === 2 && "Step 2 of 2 — Your Details"}
                  {modal.step === 3 && "All done!"}
                </p>
                <h2 className="text-lg font-bold text-foreground">
                  {modal.step === 1 && "Pick Your Package"}
                  {modal.step === 2 && "Contact Details"}
                  {modal.step === 3 && "Request Received"}
                </h2>
              </div>
              {(modal.step === 1 || modal.step === 2) && (
                <button
                  onClick={closeModal}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-secondary"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Step indicator */}
            {modal.step !== 3 && (
              <div className="flex gap-1.5 px-6 pt-4">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      s <= modal.step ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-5">

              {/* Step 1: Package picker */}
              {modal.step === 1 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Both packages include the 30% USDrop discount — code <span className="font-semibold text-primary">USDROP30</span> applied.
                  </p>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setModal((m) => ({ ...m, selectedPackage: "just-llc" }))}
                      className={`flex-1 border rounded-xl p-4 text-sm font-semibold transition-all text-left ${
                        modal.selectedPackage === "just-llc"
                          ? "border-primary bg-secondary text-primary ring-1 ring-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <div className="font-bold mb-0.5">Just LLC</div>
                      <div className="text-xs font-normal text-muted-foreground">₹39,000</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setModal((m) => ({ ...m, selectedPackage: "elite" }))}
                      className={`flex-1 border rounded-xl p-4 text-sm font-semibold transition-all text-left relative ${
                        modal.selectedPackage === "elite"
                          ? "border-primary bg-secondary text-primary ring-1 ring-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 whitespace-nowrap">
                        Most Popular
                      </span>
                      <div className="font-bold mb-0.5">Elite LLC</div>
                      <div className="text-xs font-normal text-muted-foreground">₹69,000</div>
                    </button>
                  </div>

                  <Button
                    onClick={() => setModal((m) => ({ ...m, step: 2 }))}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl mt-2"
                  >
                    Continue
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    No payment now. Our team calls you within 24 hours.
                  </p>
                </div>
              )}

              {/* Step 2: Contact details */}
              {modal.step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        Full Name <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      autoFocus
                      value={modal.form.name}
                      onChange={(e) => setModal((m) => ({ ...m, form: { ...m.form, name: e.target.value } }))}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        Email Address <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="email"
                      required
                      value={modal.form.email}
                      onChange={(e) => setModal((m) => ({ ...m, form: { ...m.form, email: e.target.value } }))}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <PhoneCall className="w-3.5 h-3.5 text-muted-foreground" />
                        WhatsApp / Phone <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={modal.form.phone}
                      onChange={(e) => setModal((m) => ({ ...m, form: { ...m.form, phone: e.target.value } }))}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setModal((m) => ({ ...m, step: 1 }))}
                      className="flex-none border border-border rounded-xl px-4 h-12 text-sm font-semibold text-muted-foreground hover:border-primary/40 transition-colors"
                    >
                      Back
                    </button>
                    <Button
                      type="submit"
                      disabled={modal.submitting}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-md"
                    >
                      {modal.submitting
                        ? "Submitting..."
                        : modal.selectedPackage === "elite"
                          ? "Get Elite Package — ₹69,000"
                          : "Get My LLC — ₹39,000"}
                    </Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    No payment now. Our team will call to confirm and process payment securely.
                  </p>
                </form>
              )}

              {/* Step 3: Thank you */}
              {modal.step === 3 && (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-9 h-9 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">You're all set!</h3>
                  <p className="text-sm text-muted-foreground mb-7 max-w-sm mx-auto">
                    We've received your request. A Legal Nations expert will call you within 24 hours
                    to walk you through the process and confirm your payment.
                  </p>
                  <a
                    href="https://wa.me/919306500349?text=Hi%2C%20I%20just%20submitted%20my%20USDrop%20LLC%20request"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-6 py-3 transition-colors mb-4"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat with us on WhatsApp
                  </a>
                  <div>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
