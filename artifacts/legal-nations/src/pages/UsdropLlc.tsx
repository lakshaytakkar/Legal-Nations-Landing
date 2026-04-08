import { useState, useRef } from "react";
import { Link } from "wouter";
import { CheckCircle2, XCircle } from "lucide-react";
import { SiWhatsapp as WhatsAppIcon } from "react-icons/si";
import { Button } from "@/components/ui/button";

function CoBrandBadge() {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
      <span>USDrop AI</span>
      <span className="text-muted-foreground">×</span>
      <span>Legal Nations</span>
      <span className="ml-2 bg-secondary border border-primary/20 text-primary rounded-full px-3 py-0.5 text-xs">
        Exclusive Partner Pricing
      </span>
    </div>
  );
}

export default function UsdropLlc() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const checkoutRef = useRef<HTMLDivElement>(null);

  const scrollToCheckout = () => {
    checkoutRef.current?.scrollIntoView({ behavior: "smooth" });
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
          package: "just-llc",
          source: "usdrop",
          price: 39000,
        }),
      });
    } catch (_) {
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Sticky Minimal Nav */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <img src="/mascot.png" alt="Legal Nations" className="w-7 h-7 object-contain" />
            <span>Legal</span><span className="font-normal">Nations</span>
          </Link>
          <a
            href="https://wa.me/919306500349"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Questions? Chat on WhatsApp
          </a>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero / Offer Section */}
        <section className="bg-gradient-to-b from-secondary/40 to-background pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <div className="flex justify-center mb-5">
              <CoBrandBadge />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Your US LLC. Done in 24 Hours.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              Start selling on Amazon, Walmart & Shopify — legally. Specially priced for USDrop AI members.
            </p>

            {/* Price Block */}
            <div className="inline-flex flex-col items-center bg-card border border-border rounded-2xl px-8 py-6 shadow-md mb-8">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-xl text-muted-foreground line-through">₹55,000</span>
                <span className="text-4xl font-bold text-primary">₹39,000</span>
              </div>
              <p className="text-sm text-muted-foreground">30% USDrop Member Discount — Code <span className="font-semibold text-primary">USDROP30</span> auto-applied</p>
            </div>

            <div className="flex justify-center mb-10">
              <Button
                onClick={scrollToCheckout}
                className="bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-full px-8 py-6 shadow-lg"
              >
                Get My LLC Now →
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">✅ Govt-Registered Agent</span>
              <span className="flex items-center gap-1">⭐ 4.9/5 Rating</span>
              <span className="flex items-center gap-1">🏛 5,000+ LLCs Formed</span>
              <span className="flex items-center gap-1">💯 BBB Accredited</span>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Included */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-4 text-foreground">Included in this package</h3>
                <ul className="space-y-3">
                  {[
                    "LLC Formation (Wyoming or Delaware)",
                    "EIN (Employer Identification Number) from IRS",
                    "Articles of Organization filed & approved",
                    "Operating Agreement (e-commerce optimized)",
                    "Registered Agent — 1st year free",
                    "Annual compliance reminders",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not Included */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-4 text-muted-foreground">Not in this package</h3>
                <ul className="space-y-3">
                  {[
                    "US Mailing Address",
                    "US Phone Number",
                    "US Bank Account Setup",
                    "ITIN Application Assistance",
                    "Amazon Seller Account Setup",
                    "Dedicated Account Manager",
                    "Priority Support",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4 text-muted-foreground/50 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/usdrop-elite" className="text-primary hover:underline font-medium">
                Need all of the above? → See Elite Package ₹69,000
              </Link>
            </div>
          </div>
        </section>

        {/* Where Your LLC Gets You In */}
        <section className="py-14 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Where Your LLC Gets You In</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              All these platforms require a US business entity. Your LLC unlocks them all.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                className="h-7 object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg"
                alt="Shopify"
                className="h-7 object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
              {[
                { name: "Walmart", bg: "bg-blue-600" },
                { name: "eBay", bg: "bg-yellow-500" },
                { name: "TikTok Shop", bg: "bg-black" },
                { name: "Stripe", bg: "bg-indigo-600" },
                { name: "PayPal", bg: "bg-blue-800" },
              ].map(({ name, bg }) => (
                <span
                  key={name}
                  className={`${bg} text-white text-xs font-bold px-4 py-2 rounded-lg`}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "📝", step: "1", title: "Fill Out the Form", desc: "We collect your basic details — takes under 2 minutes." },
                { icon: "📞", step: "2", title: "Our Team Calls You", desc: "A Legal Nations expert calls within 24 hours to confirm details & process payment." },
                { icon: "✅", step: "3", title: "LLC Filed", desc: "You receive all your documents and EIN within 24–48 hrs." },
              ].map(({ icon, step, title, desc }) => (
                <div key={step} className="bg-card border border-border rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-3">{icon}</div>
                  <div className="text-xs font-bold text-muted-foreground mb-1">STEP {step}</div>
                  <h3 className="font-semibold text-base mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Checkout Form */}
        <section id="checkout" className="py-16 bg-secondary/30" ref={checkoutRef}>
          <div className="container mx-auto px-4 md:px-6 max-w-md">
            <div className="bg-white rounded-2xl shadow-md p-8">
              {submitted ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">You're in!</h3>
                  <p className="text-muted-foreground mb-6">
                    We've received your request. A Legal Nations expert will call you within 24 hours to walk you through the process and confirm payment.
                  </p>
                  <a
                    href="https://wa.me/919306500349"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-6 py-3 transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    In the meantime, chat with us on WhatsApp →
                  </a>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-1 text-foreground">Claim Your 30% Discount</h2>
                  <p className="text-sm text-muted-foreground mb-6">₹39,000 total · USDROP30 applied</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name <span className="text-red-500">*</span></label>
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
                      <label className="block text-sm font-medium mb-1">Email Address <span className="text-red-500">*</span></label>
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
                      <label className="block text-sm font-medium mb-1">WhatsApp / Phone <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <input type="hidden" name="package" value="just-llc" />
                    <input type="hidden" name="source" value="usdrop" />

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-full py-6 text-base shadow-md mt-2"
                    >
                      {submitting ? "Submitting..." : "Get My LLC Now — ₹39,000"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-background border-t border-border py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-bold text-primary">
            <img src="/mascot.png" alt="Legal Nations" className="w-6 h-6 object-contain" />
            <span>Legal Nations</span>
          </div>
          <p>© 2026 Legal Nations. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/legalnations" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
            <a href="https://wa.me/919306500349" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors flex items-center gap-1">
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
