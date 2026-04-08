import { useState, useRef } from "react";
import { Link } from "wouter";
import {
  CheckCircle2, XCircle, Shield, Star, Building2, BadgeCheck,
  ShoppingCart, Phone, Rocket, ArrowDown, MessageCircle
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
  "Everything in Just LLC",
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
  { name: "Walmart", src: "https://upload.wikimedia.org/wikipedia/commons/1/14/Walmart_Spark.svg" },
  { name: "eBay",    src: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg" },
  { name: "TikTok",  src: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" },
  { name: "Stripe",  src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "PayPal",  src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "Mercury", src: "https://cdn.brandfetch.io/idNFHGScJH/theme/dark/logo.svg" },
];

const STEPS = [
  { icon: <ShoppingCart className="w-6 h-6" />, step: "1", title: "Pick Your Package", desc: "Choose Just LLC for the essentials, or Elite for the full done-for-you setup." },
  { icon: <Phone className="w-6 h-6" />,         step: "2", title: "We Call You in 24 Hours", desc: "A Legal Nations expert confirms your details and handles all the paperwork." },
  { icon: <Rocket className="w-6 h-6" />,        step: "3", title: "Start Selling", desc: "LLC filed, EIN received, bank account ready. You're live on Amazon." },
];

export default function UsdropPartner() {
  const [selectedPackage, setSelectedPackage] = useState<"just-llc" | "elite">("just-llc");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToCheckout = (pkg: "just-llc" | "elite") => {
    setSelectedPackage(pkg);
    checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          package: selectedPackage,
          source: "usdrop",
          price: selectedPackage === "elite" ? 69000 : 39000,
        }),
      });
    } catch (_) { /* graceful fallback */ }
    setSubmitting(false);
    setSubmitted(true);
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
            <div className="flex items-center justify-center gap-8 mb-7 flex-wrap">
              <img
                src="/usdrop-logo.png"
                alt="USDrop AI"
                className="h-14 object-contain"
              />
              <span className="text-4xl font-thin text-muted-foreground/60">×</span>
              <div className="flex items-center gap-3">
                <img src="/mascot.png" alt="Legal Nations" className="h-14 w-14 object-contain" />
                <span className="font-bold text-2xl text-primary" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  Legal Nations
                </span>
              </div>
            </div>

            {/* Partner badge */}
            <div className="inline-block mb-8">
              <span className="bg-amber-50 text-amber-700 border border-amber-200 text-sm font-semibold px-4 py-1.5 rounded-full">
                Exclusive Partner Pricing · 30% Off for USDrop AI Members
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-5">
              Your US Business.{" "}
              <span className="text-primary relative inline-block">
                Approved by Amazon, Stripe & Shopify.
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary/25 rounded-full" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The #1 reason Indian dropshippers get rejected — no US LLC. Fix it in 24 hours.
              Get marketplace approvals, open a US bank account, and handle taxes the right way.
            </p>

            <Button
              onClick={scrollToPricing}
              className="bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-full px-10 h-14 shadow-lg hover:shadow-xl transition-all"
            >
              See Packages & Pricing <ArrowDown className="w-4 h-4 ml-2" />
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
            </div>
          </div>
        </section>

        {/* ── 3. Side-by-Side Pricing ── */}
        <section id="pricing" className="py-20 bg-surface border-b border-border scroll-mt-16" ref={pricingRef}>
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
                  onClick={() => scrollToCheckout("just-llc")}
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
                  onClick={() => scrollToCheckout("elite")}
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

        {/* ── 6. Unified Checkout Form ── */}
        <section id="checkout" className="py-16 bg-background" ref={checkoutRef}>
          <div className="container mx-auto px-4 md:px-6 max-w-lg">
            <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
              {submitted ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-5" />
                  <h3 className="text-2xl font-bold mb-3 text-foreground">You're all set!</h3>
                  <p className="text-muted-foreground mb-7 max-w-sm mx-auto">
                    We've received your request. A Legal Nations expert will call you within 24 hours
                    to walk you through the process and confirm your payment.
                  </p>
                  <a
                    href="https://wa.me/919306500349?text=Hi%2C%20I%20just%20submitted%20my%20USDrop%20LLC%20request"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-6 py-3 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat with us on WhatsApp
                  </a>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-1 text-foreground">Claim Your 30% Discount</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    USDROP30 applied · Your team will call within 24 hours
                  </p>

                  {/* Package toggle */}
                  <div className="flex gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setSelectedPackage("just-llc")}
                      className={`flex-1 border rounded-xl p-3 text-sm font-semibold transition-all ${
                        selectedPackage === "just-llc"
                          ? "border-primary bg-secondary text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      Just LLC
                      <div className="text-xs font-normal mt-0.5">₹39,000</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPackage("elite")}
                      className={`flex-1 border rounded-xl p-3 text-sm font-semibold transition-all relative ${
                        selectedPackage === "elite"
                          ? "border-primary bg-secondary text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                        Popular
                      </span>
                      Elite LLC
                      <div className="text-xs font-normal mt-0.5">₹69,000</div>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        WhatsApp / Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-xl py-6 text-base shadow-md mt-2"
                    >
                      {submitting
                        ? "Submitting..."
                        : selectedPackage === "elite"
                          ? "Get Elite Package — ₹69,000"
                          : "Get My LLC — ₹39,000"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground pt-1">
                      No payment now. Our team will call you to confirm details and process payment securely.
                    </p>
                  </form>
                </>
              )}
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
              className="hover:text-green-600 transition-colors flex items-center gap-1"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
