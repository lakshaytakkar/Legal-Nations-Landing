import { useState } from "react";
import { useSearch, Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag, ArrowLeft } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

type FormData = { name: string; email: string; phone: string };
type Errors = Partial<Record<keyof FormData, string>>;

export default function Checkout() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const plan    = params.get("plan")    ?? "Starter";
  const price   = params.get("price")   ?? "";
  const country = params.get("country") ?? "USA";
  const entity  = params.get("entity")  ?? "LLC";

  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm]             = useState<FormData>({ name: "", email: "", phone: "" });
  const [errors, setErrors]         = useState<Errors>({});

  const update = (field: keyof FormData, val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim())  e.name  = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone / WhatsApp is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(
        `${import.meta.env.BASE_URL}api/leads`.replace(/\/+/g, "/").replace(":/", "://"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            plan,
            price,
            country,
            entityType: entity,
            source: "checkout",
          }),
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong submitting your order. Please try again or reach us on WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const waText = encodeURIComponent(
    `Hi, I just placed an order for the ${plan} ${entity} in ${country}${price ? " (" + price + ")" : ""}. Please confirm my order.`
  );

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
            className="max-w-lg w-full text-center"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6 text-lg">
              We've received your <strong>{plan}</strong> order for {country} {entity}.
              A Legal Nations expert will call you within 24 hours to confirm your order and process payment securely.
            </p>

            <div className="bg-card border border-border rounded-xl p-6 text-left space-y-3 mb-8">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">Plan</span>
                <span className="font-semibold">{plan}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">Location</span>
                <span className="font-semibold">{country} — {entity}</span>
              </div>
              {price && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-muted-foreground">Price</span>
                  <span className="font-semibold">{price}</span>
                </div>
              )}
              <div className="border-t border-border pt-3 flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">Name</span>
                <span className="font-semibold">{form.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">Email</span>
                <span className="font-semibold">{form.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">Phone</span>
                <span className="font-semibold">{form.phone}</span>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href={`https://wa.me/919306500349?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white text-lg h-14 rounded-full font-bold flex items-center justify-center gap-2 shadow-md">
                  <SiWhatsapp className="w-5 h-5" /> Chat to Confirm on WhatsApp
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

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/"><Logo size="sm" /></Link>
          <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Change Plan
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 py-12">
        <div className="max-w-xl w-full">

          <div className="bg-secondary/50 border border-border rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-grow">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Your Order</p>
                <h2 className="text-xl font-bold text-foreground">{plan} — {country} {entity}</h2>
              </div>
              {price && <div className="text-2xl font-bold text-foreground shrink-0">{price}</div>}
            </div>
            <p className="text-sm text-muted-foreground bg-card rounded-lg px-4 py-3 border border-border">
              No payment now. Our team will call you within 24 hours to confirm your order and process payment securely.
            </p>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-6">Your Contact Details</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={form.name}
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
                value={form.email}
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
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+91 9999999999"
                className={`w-full px-5 py-4 rounded-2xl border-2 bg-card text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${errors.phone ? "border-destructive" : "border-border"}`}
              />
              {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
            </div>

            {submitError && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 text-sm text-destructive">
                {submitError}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-14 font-bold text-lg shadow-md"
              disabled={submitting}
            >
              {submitting ? "Confirming…" : "Confirm My Order →"}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              No payment required now. Our team calls you to confirm and arrange payment securely.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
