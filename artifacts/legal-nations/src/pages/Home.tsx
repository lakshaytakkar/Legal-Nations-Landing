import { useState, useEffect, useRef, type MutableRefObject } from "react";
import { Link } from "wouter";
import { Menu, X, ArrowRight, CheckCircle2, ChevronRight, ChevronDown, ClipboardList, FileText, Rocket, Linkedin, Twitter, Instagram, Youtube, Shield, FileCheck, Building2, CreditCard, Globe, Star, Target, XCircle, Mail, Calculator, BookOpen, Tag, MapPin, RefreshCw } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, type Variants } from "framer-motion";

function FlagImg({ code, alt }: { code: string; alt: string }) {
  return (
    <img
      src={`https://flagcdn.com/24x18/${code}.png`}
      alt={alt}
      className="inline w-5 h-4 rounded-sm object-cover"
    />
  );
}

type PlanTier = {
  name: string;
  price: string;
  bestFor: string;
  includes: string[];
  notIncluded?: string[];
  popular?: boolean;
};

type CountryPricing = {
  country: string;
  flag: string;
  flagCode: string;
  currency: string;
  entityType: string;
  tiers: PlanTier[];
};

const COUNTRY_PRICING: CountryPricing[] = [
  {
    country: "USA",
    flag: "🇺🇸",
    flagCode: "us",
    currency: "$",
    entityType: "LLC",
    tiers: [
      {
        name: "Starter",
        price: "$149",
        bestFor: "Solopreneurs",
        includes: ["LLC Formation", "EIN", "Registered Agent (1yr)", "Operating Agreement", "Basic Compliance Dashboard", "1 Country"],
        notIncluded: ["Virtual Address", "Banking Assistance", "Bookkeeping & Tax"],
      },
      {
        name: "Professional",
        price: "$349",
        bestFor: "Growing businesses",
        includes: ["Everything in Starter", "Virtual Business Address", "Full Compliance Dashboard", "Banking Assistance (Mercury, Wise)", "Dedicated Manager"],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "$799",
        bestFor: "Multi-country operations",
        includes: ["Everything in Professional", "Bookkeeping (Monthly)", "Tax Filing Included", "Senior Dedicated Manager", "Up to 3 Countries"],
      },
    ],
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    flagCode: "gb",
    currency: "£",
    entityType: "Ltd",
    tiers: [
      {
        name: "Basic",
        price: "£149",
        bestFor: "New founders",
        includes: ["Companies House Filing", "Registered Address (1yr)", "Articles of Association", "Basic Compliance Dashboard"],
        notIncluded: ["Annual Confirmation Filing", "VAT Registration Assist", "Annual Accounts & Tax Returns"],
      },
      {
        name: "Growth",
        price: "£299",
        bestFor: "Growing UK businesses",
        includes: ["Everything in Basic", "Annual Confirmation Statement", "VAT Registration Assist", "Dedicated Manager"],
        popular: true,
      },
      {
        name: "Full Service",
        price: "£649",
        bestFor: "Established companies",
        includes: ["Everything in Growth", "Annual Accounts Preparation", "Corporation Tax Returns", "Senior Dedicated Manager"],
      },
    ],
  },
  {
    country: "Singapore",
    flag: "🇸🇬",
    flagCode: "sg",
    currency: "S$",
    entityType: "Pte Ltd",
    tiers: [
      {
        name: "Basic",
        price: "S$699",
        bestFor: "New entrepreneurs",
        includes: ["ACRA Incorporation", "Company Secretary (1yr)", "Registered Address (1yr)", "Bizfile Profile"],
        notIncluded: ["Bank Account Setup", "AGM Support", "GST Registration"],
      },
      {
        name: "Growth",
        price: "S$1,299",
        bestFor: "Growing businesses",
        includes: ["Everything in Basic", "Bank Account Setup", "AGM Support", "Annual Bizfile Filing", "Dedicated Manager"],
        popular: true,
      },
      {
        name: "Premium",
        price: "S$2,199",
        bestFor: "Scaling companies",
        includes: ["Everything in Growth", "GST Registration", "Employment Pass Assist", "Annual Filing & Compliance", "Senior Dedicated Manager"],
      },
    ],
  },
  {
    country: "UAE",
    flag: "🇦🇪",
    flagCode: "ae",
    currency: "AED",
    entityType: "Free Zone",
    tiers: [
      {
        name: "Starter",
        price: "AED 5,499",
        bestFor: "Solo founders",
        includes: ["Trade License (1yr)", "Registered Address", "0 Investor Visas", "Compliance Dashboard"],
        notIncluded: ["Investor Visa", "Bank Account Setup", "VAT Registration"],
      },
      {
        name: "Business",
        price: "AED 8,999",
        bestFor: "Small businesses",
        includes: ["Everything in Starter", "1 Investor Visa", "Bank Account Setup", "Dedicated Manager"],
        popular: true,
      },
      {
        name: "Premium",
        price: "AED 14,999",
        bestFor: "Growing operations",
        includes: ["Everything in Business", "3 Investor Visas", "VAT Registration", "Compliance Support", "Senior Dedicated Manager"],
      },
    ],
  },
  {
    country: "India",
    flag: "🇮🇳",
    flagCode: "in",
    currency: "₹",
    entityType: "Pvt Ltd",
    tiers: [
      {
        name: "Basic",
        price: "₹9,999",
        bestFor: "Startups",
        includes: ["MCA Filing", "DSC + DIN (×2)", "MOA & AOA Drafting", "Compliance Dashboard"],
        notIncluded: ["GST Registration", "Trademark Filing", "Annual ROC Filing"],
      },
      {
        name: "Growth",
        price: "₹19,999",
        bestFor: "Growing companies",
        includes: ["Everything in Basic", "GST Registration", "Trademark Filing", "Dedicated CA"],
        popular: true,
      },
      {
        name: "Full Service",
        price: "₹34,999",
        bestFor: "Established businesses",
        includes: ["Everything in Growth", "Annual ROC Filing", "Income Tax Returns", "Dedicated Senior CA"],
      },
    ],
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    flagCode: "ca",
    currency: "CAD $",
    entityType: "Inc",
    tiers: [
      {
        name: "Basic",
        price: "CAD $299",
        bestFor: "New businesses",
        includes: ["Federal/Provincial Incorporation", "NUANS Name Search", "Articles of Incorporation", "Compliance Dashboard"],
        notIncluded: ["Business Number", "GST/HST Registration", "Annual Filing"],
      },
      {
        name: "Growth",
        price: "CAD $599",
        bestFor: "Growing companies",
        includes: ["Everything in Basic", "Business Number (BN)", "GST/HST Registration", "Bank Account Assist", "Dedicated Manager"],
        popular: true,
      },
      {
        name: "Premium",
        price: "CAD $1,099",
        bestFor: "Established companies",
        includes: ["Everything in Growth", "Annual Filing & Compliance", "Tax Advisory", "Senior Dedicated Manager"],
      },
    ],
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    flagCode: "au",
    currency: "A$",
    entityType: "Pty Ltd",
    tiers: [
      {
        name: "Basic",
        price: "A$499",
        bestFor: "New businesses",
        includes: ["ASIC Registration", "ABN + ACN", "Company Constitution", "Compliance Dashboard"],
        notIncluded: ["Bank Account Assist", "Compliance Calendar", "GST/BAS Filing"],
      },
      {
        name: "Growth",
        price: "A$899",
        bestFor: "Growing businesses",
        includes: ["Everything in Basic", "Bank Account Assist", "Compliance Calendar", "Dedicated Manager"],
        popular: true,
      },
      {
        name: "Premium",
        price: "A$1,499",
        bestFor: "Established companies",
        includes: ["Everything in Growth", "Annual ASIC Review", "GST Registration", "BAS Filing Support", "Senior Dedicated Manager"],
      },
    ],
  },
  {
    country: "Hong Kong",
    flag: "🇭🇰",
    flagCode: "hk",
    currency: "HK$",
    entityType: "Ltd",
    tiers: [
      {
        name: "Basic",
        price: "HK$2,999",
        bestFor: "New founders",
        includes: ["Incorporation Filing", "Company Secretary (1yr)", "Business Registration (BR)", "Compliance Dashboard"],
        notIncluded: ["Bank Account Setup", "Profit Tax Registration", "Annual Return Filing"],
      },
      {
        name: "Growth",
        price: "HK$5,499",
        bestFor: "Growing businesses",
        includes: ["Everything in Basic", "Bank Account Setup", "Profit Tax Registration", "Dedicated Manager"],
        popular: true,
      },
      {
        name: "Premium",
        price: "HK$9,999",
        bestFor: "Established companies",
        includes: ["Everything in Growth", "Annual Return Filing", "Audit Support", "Virtual Office", "Senior Dedicated Manager"],
      },
    ],
  },
];

const ADD_ONS = [
  {
    icon: RefreshCw,
    name: "Registered Agent Renewal",
    price: "$99/yr per state",
    description: "Keep your registered agent active for another year to stay compliant with state requirements.",
  },
  {
    icon: Mail,
    name: "Virtual Mailbox",
    price: "$29/mo",
    description: "Professional US business address with mail scanning and digital forwarding included.",
  },
  {
    icon: Calculator,
    name: "Annual Tax Filing (LLC)",
    price: "$299",
    description: "Complete federal and state annual tax return preparation and filing for your LLC.",
  },
  {
    icon: FileText,
    name: "Annual Tax Filing (C-Corp)",
    price: "$499",
    description: "Comprehensive corporate tax return preparation and filing for your C-Corporation.",
  },
  {
    icon: BookOpen,
    name: "Bookkeeping (Monthly)",
    price: "$79/mo",
    description: "Ongoing monthly bookkeeping to keep your financials clean, organized, and audit-ready.",
  },
  {
    icon: Tag,
    name: "Trademark Filing",
    price: "$349",
    description: "Protect your brand name and logo with a USPTO trademark application prepared by experts.",
  },
  {
    icon: MapPin,
    name: "Foreign Qualification",
    price: "$199 + state fees",
    description: "Register your existing company to legally operate in an additional US state.",
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const servicesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countriesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDropdown = (setter: (v: boolean) => void, timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setter(true);
  };
  const closeDropdown = (setter: (v: boolean) => void, timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    timeoutRef.current = setTimeout(() => setter(false), 150);
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const containerVariant: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  };

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number] }
    }
  };

  const brandLogos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg", alt: "Shopify" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg", alt: "eBay" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg", alt: "Stripe" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg", alt: "PayPal" },
    { src: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg", alt: "TikTok" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/5/56/Wise_logo.svg", alt: "Wise" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/1/14/Walmart_Spark.svg", alt: "Walmart" },
  ];

  const navCountries = [
    { code: "us", label: "USA — Delaware & Wyoming" },
    { code: "gb", label: "United Kingdom" },
    { code: "sg", label: "Singapore" },
    { code: "ae", label: "Dubai / UAE" },
    { code: "hk", label: "Hong Kong" },
    { code: "in", label: "India" },
    { code: "ca", label: "Canada" },
    { code: "au", label: "Australia" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary-light/30">
      {/* 0. Announcement Bar */}
      <div className="bg-primary text-white text-sm py-2.5 px-4 text-center font-medium sticky top-0 z-50">
        🤝 Exclusive for USDrop AI Members: 30% Off All LLC Packages — Code USDROP30
        <Link href="/usdrop-llc" className="text-white font-bold underline underline-offset-2 hover:text-white/80 transition-colors ml-2">
          Claim Now →
        </Link>
      </div>

      {/* 1. Navigation */}
      <header className={`sticky ${isScrolled ? 'top-0 shadow-sm' : 'top-0 sm:top-9'} z-40 bg-background/95 backdrop-blur-md transition-all duration-200 border-b border-border`}>
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo variant="default" size="md" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-foreground">
            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown(setServicesOpen, servicesTimeout)}
              onMouseLeave={() => closeDropdown(setServicesOpen, servicesTimeout)}
            >
              <button className="flex items-center gap-1 hover:text-primary transition-colors" data-testid="nav-services">
                Services <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl border border-border shadow-xl py-2 z-50"
                  onMouseEnter={() => openDropdown(setServicesOpen, servicesTimeout)}
                  onMouseLeave={() => closeDropdown(setServicesOpen, servicesTimeout)}
                >
                  {[
                    { label: "US Company Formation", href: "#services" },
                    { label: "International Registration", href: "#countries" },
                    { label: "Tax Filing & Compliance", href: "#services" },
                    { label: "Registered Agent", href: "#services" },
                    { label: "Virtual Business Address", href: "#services" },
                    { label: "Bookkeeping & Accounting", href: "#services" },
                  ].map((item) => (
                    <a key={item.label} href={item.href} className="block px-4 py-2.5 text-sm hover:bg-secondary hover:text-primary transition-colors">
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Countries dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown(setCountriesOpen, countriesTimeout)}
              onMouseLeave={() => closeDropdown(setCountriesOpen, countriesTimeout)}
            >
              <button className="flex items-center gap-1 hover:text-primary transition-colors" data-testid="nav-countries">
                Countries <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${countriesOpen ? "rotate-180" : ""}`} />
              </button>
              {countriesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-card rounded-xl border border-border shadow-xl py-2 z-50"
                  onMouseEnter={() => openDropdown(setCountriesOpen, countriesTimeout)}
                  onMouseLeave={() => closeDropdown(setCountriesOpen, countriesTimeout)}
                >
                  {navCountries.map((item) => (
                    <a key={item.label} href="#countries" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-secondary hover:text-primary transition-colors">
                      <FlagImg code={item.code} alt={item.label} /> {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#why-us" className="hover:text-primary transition-colors">Why Us</a>
          </nav>
          
          <div className="hidden md:block">
            <Button className="bg-accent hover:bg-accent-hover text-accent-foreground border-none font-bold rounded-full px-6 shadow-md hover:shadow-lg transition-all" data-testid="button-nav-cta" asChild>
              <Link href="/get-started">Get Started — Free Consultation</Link>
            </Button>
          </div>

          <button 
            className="md:hidden text-foreground" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border px-4 py-4 flex flex-col gap-4 absolute w-full shadow-lg">
            <a href="#services" className="font-medium p-2 hover:bg-muted rounded" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#countries" className="font-medium p-2 hover:bg-muted rounded" onClick={() => setMobileMenuOpen(false)}>Countries</a>
            <a href="#pricing" className="font-medium p-2 hover:bg-muted rounded" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#why-us" className="font-medium p-2 hover:bg-muted rounded" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
            <Button className="bg-accent hover:bg-accent-hover text-accent-foreground w-full mt-2" asChild><Link href="/get-started">Get Started</Link></Button>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <section className="bg-background pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12 relative">
            <motion.div 
              className="flex-1 max-w-2xl text-center lg:text-left relative z-10"
              initial="hidden" animate="visible" variants={fadeUpVariant}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary text-primary font-medium text-sm mb-6 border border-primary/20 shadow-sm">
                <div className="flex -space-x-1.5">
                  {["in", "us", "gb", "ae"].map((code) => (
                    <img
                      key={code}
                      src={`https://flagcdn.com/20x15/${code}.png`}
                      alt={code}
                      className="w-5 h-3.5 rounded-sm border border-white object-cover"
                    />
                  ))}
                </div>
                <span className="w-px h-3.5 bg-primary/25 shrink-0" />
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                <span><span className="font-bold text-primary">2,500+</span> Founders Worldwide</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] mb-6">
                Register Your Company Anywhere.{" "}
                <span>Manage Everything from{" "}<span className="text-primary relative inline-block">One Dashboard<span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary/30 rounded-full" /></span>.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Your US LLC. Filed &amp; Ready in{" "}
                <span className="text-primary font-semibold relative inline-block">
                  24 Hours
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/40 rounded-full" />
                </span>
                . From anywhere in the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Button className="bg-accent hover:bg-accent-hover text-accent-foreground text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto" data-testid="hero-cta-start" asChild>
                  <Link href="/get-started">Start Your Company — $149</Link>
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-secondary text-lg h-14 px-8 rounded-full w-full sm:w-auto" asChild data-testid="hero-cta-pricing">
                  <a href="#pricing">See Pricing</a>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {[
                  { icon: <Building2 className="w-3.5 h-3.5" />, label: "Company Formation" },
                  { icon: <FileText className="w-3.5 h-3.5" />,  label: "Tax Filing" },
                  { icon: <Shield className="w-3.5 h-3.5" />,    label: "Compliance" },
                  { icon: <FileCheck className="w-3.5 h-3.5" />, label: "Registered Agent" },
                  { icon: <Globe className="w-3.5 h-3.5" />,     label: "10+ Countries" },
                ].map(({ icon, label }) => (
                  <span
                    key={label}
                    className="rounded-full border border-primary/20 bg-secondary px-3 py-1.5 text-xs font-semibold text-primary flex items-center gap-1.5 shadow-sm"
                  >
                    {icon} {label}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 w-full relative z-0"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/images/hero-dashboard.png" 
                  alt="Legal Nations SaaS Dashboard Mockup" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Decorative blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-light/20 to-accent/20 blur-3xl -z-10 rounded-full opacity-50"></div>
            </motion.div>
          </div>
        </section>

        {/* 3. Logo/Trust Carousel */}
        <section className="bg-surface py-12 border-y border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-sm font-bold text-muted-foreground tracking-widest uppercase mb-8">Helping Founders From Startups to Enterprises</h2>
            
            <div className="flex overflow-hidden relative max-w-5xl mx-auto mask-image-fade">
              <div className="flex w-max animate-infinite-scroll space-x-12 items-center px-6">
                {brandLogos.map((logo) => (
                  <img key={logo.alt} src={logo.src} alt={logo.alt} className="h-7 w-auto grayscale opacity-60 hover:opacity-100 transition-opacity" />
                ))}
                {brandLogos.map((logo) => (
                  <img key={`dup-${logo.alt}`} src={logo.src} alt={logo.alt} aria-hidden="true" className="h-7 w-auto grayscale opacity-60 hover:opacity-100 transition-opacity" />
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-foreground">
              <div className="flex text-accent">
                <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              4.9/5 from 500+ Reviews
            </div>
          </div>
        </section>

        {/* 4. How It Works */}
        <section id="how-it-works" className="bg-background py-24 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Your Company. Registered in 3 Simple Steps.</h2>
              <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariant}
            >
              {/* Desktop dashed line connecting cards */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-border z-0"></div>
              
              <motion.div variants={cardVariant} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-6 shadow-sm border border-primary/10">
                  <ClipboardList className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">1. Choose Your Country & Package</h3>
                <p className="text-muted-foreground">Select from 10+ countries. Pick LLC, C-Corp, Pvt Ltd, or Free Zone.</p>
              </motion.div>

              <motion.div variants={cardVariant} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-6 shadow-sm border border-primary/10">
                  <FileText className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">2. We Handle All Paperwork</h3>
                <p className="text-muted-foreground">Our legal team files everything — formation docs, EIN, registered agent, compliance setup.</p>
              </motion.div>

              <motion.div variants={cardVariant} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-6 shadow-sm border border-primary/10">
                  <Rocket className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">3. You're Ready to Do Business</h3>
                <p className="text-muted-foreground">Get your incorporation certificate, tax ID, business address, and compliance dashboard.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 5. Countries Grid */}
        <section id="countries" className="bg-surface py-24 scroll-mt-20 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">One Platform. 10+ Countries.</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Wherever your business needs to be, we'll get you set up.</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariant}
            >
              {[
                { code: "us", name: "USA", type: "LLC & C-Corp", price: "$149" },
                { code: "gb", name: "United Kingdom", type: "LTD Company", price: "$299" },
                { code: "sg", name: "Singapore", type: "Pte Ltd", price: "$499" },
                { code: "ae", name: "Dubai / UAE", type: "Free Zone & Mainland", price: "$1,299" },
                { code: "hk", name: "Hong Kong", type: "Limited Company", price: "$599" },
                { code: "in", name: "India", type: "Pvt Ltd / LLP / OPC", price: "₹4,999" },
                { code: "ca", name: "Canada", type: "Corporation", price: "$399" },
                { code: "au", name: "Australia", type: "Pty Ltd", price: "$699" },
              ].map((country, i) => (
                <motion.div key={i} variants={cardVariant} className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                  <div className="mb-4 group-hover:scale-110 transition-transform origin-left">
                    <img src={`https://flagcdn.com/48x36/${country.code}.png`} alt={country.name} className="w-12 h-9 rounded object-cover" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-1">{country.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{country.type}</p>
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <div className="font-medium text-foreground">From <span className="font-bold text-primary">{country.price}</span></div>
                    <Link href="/get-started" className="text-sm font-bold text-primary flex items-center group-hover:text-accent transition-colors">
                      View <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. USA Deep Dive (Delaware vs Wyoming) */}
        <section className="bg-background py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">USA Company Formation — Delaware vs Wyoming</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Two of the most business-friendly states in America. Here's why founders choose them.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative mb-16">
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-card border-2 border-border rounded-full items-center justify-center font-bold text-muted-foreground z-10">VS</div>
              
              {/* Delaware Card */}
              <div className="bg-card rounded-2xl border-2 border-border p-8 shadow-lg relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-heading font-bold">DELAWARE</h3>
                    <p className="text-primary font-medium">"The Gold Standard"</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">$249</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">One-Time</div>
                  </div>
                </div>
                
                <div className="bg-surface rounded-lg p-3 text-sm text-foreground mb-6 font-medium border border-border">
                  Best for: VC-funded startups, C-Corps, complex structures
                </div>

                <div className="mb-6 space-y-2">
                  {[
                    "LLC or C-Corp Formation", "Delaware Certificate of Formation", "EIN / Federal Tax ID (Same-Day)", 
                    "Registered Agent (1st Year Free)", "Operating Agreement / Bylaws", "Banking Resolution", 
                    "US Business Address (Virtual Mailbox)", "Compliance Dashboard Access", "Post-Formation Document Kit", "Dedicated Account Manager"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-8 border-t border-border pt-6">
                  <h4 className="font-bold mb-3 text-sm uppercase text-muted-foreground">Why Delaware?</h4>
                  <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                    <li>Court of Chancery</li>
                    <li>Most developed corporate case law</li>
                    <li>Preferred by VCs globally</li>
                    <li>Strong privacy protections</li>
                    <li>Same-day filing</li>
                    <li>No state income tax on out-of-state revenue</li>
                  </ul>
                </div>

                <div className="mb-8 bg-muted p-4 rounded-lg">
                  <h4 className="font-bold text-sm mb-2">Annual Costs:</h4>
                  <div className="text-sm flex justify-between border-b border-border/50 pb-1 mb-1"><span>Franchise Tax</span> <span>$300/yr</span></div>
                  <div className="text-sm flex justify-between border-b border-border/50 pb-1 mb-1"><span>Registered Agent</span> <span>$99/yr (after Yr 1)</span></div>
                  <div className="text-sm flex justify-between text-muted-foreground"><span>Annual Report</span> <span>Not required for LLCs</span></div>
                </div>

                <Button className="w-full bg-accent hover:bg-accent-hover text-accent-foreground text-lg h-12" asChild><Link href="/get-started">Get Delaware Package</Link></Button>
              </div>

              {/* Wyoming Card */}
              <div className="bg-card rounded-2xl border-2 border-border p-8 shadow-lg relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-heading font-bold">WYOMING</h3>
                    <p className="text-accent-hover font-medium">"The Entrepreneur's Favorite"</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">$149</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">One-Time</div>
                  </div>
                </div>
                
                <div className="bg-secondary rounded-lg p-3 text-sm text-foreground mb-6 font-medium border border-border">
                  Best for: Solopreneurs, e-commerce, holding companies
                </div>

                <div className="mb-6 space-y-2">
                  {[
                    "LLC or C-Corp Formation", "Wyoming Articles of Organization", "EIN / Federal Tax ID (Same-Day)", 
                    "Registered Agent (1st Year Free)", "Operating Agreement / Bylaws", "Banking Resolution", 
                    "US Business Address (Virtual Mailbox)", "Compliance Dashboard Access", "Post-Formation Document Kit", "Dedicated Account Manager"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-8 border-t border-border pt-6">
                  <h4 className="font-bold mb-3 text-sm uppercase text-muted-foreground">Why Wyoming?</h4>
                  <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                    <li>$0 State Income Tax</li>
                    <li>Strongest asset protection laws</li>
                    <li>Anonymous LLC — no public disclosure</li>
                    <li>Lowest annual fees ($60/yr minimum)</li>
                    <li>Same-day online formation</li>
                    <li>No operating agreement requirement</li>
                  </ul>
                </div>

                <div className="mb-8 bg-muted p-4 rounded-lg">
                  <h4 className="font-bold text-sm mb-2">Annual Costs:</h4>
                  <div className="text-sm flex justify-between border-b border-border/50 pb-1 mb-1"><span>Annual Report Tax</span> <span>$60/yr min</span></div>
                  <div className="text-sm flex justify-between border-b border-border/50 pb-1 mb-1"><span>Registered Agent</span> <span>$99/yr (after Yr 1)</span></div>
                  <div className="text-sm flex justify-between text-success font-medium"><span>State Income Tax</span> <span>$0</span></div>
                </div>

                <Button className="w-full bg-accent hover:bg-accent-hover text-accent-foreground text-lg h-12" asChild><Link href="/get-started">Get Wyoming Package</Link></Button>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm border-collapse bg-card">
                  <thead className="bg-surface border-b border-border">
                    <tr>
                      <th className="p-4 font-bold">Feature</th>
                      <th className="p-4 font-bold text-primary">Delaware</th>
                      <th className="p-4 font-bold text-accent-hover">Wyoming</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { f: "State Filing Fee", d: "$110", w: "$100" },
                      { f: "State Income Tax", d: "0% (out-of-state)", w: "0%" },
                      { f: "Annual Report Required", d: "No (LLC)", w: "Yes ($60 min)" },
                      { f: "Franchise Tax", d: "$300/yr", w: "$0" },
                      { f: "Privacy Level", d: "Medium", w: "High (Anonymous LLC)" },
                      { f: "VC / Investor Preference", d: "★★★★★", w: "★★★" },
                      { f: "Best For", d: "Startups, VC, C-Corps", w: "Solopreneurs, E-com, Holdings" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-muted/50">
                        <td className="p-4 font-medium">{row.f}</td>
                        <td className="p-4">{row.d}</td>
                        <td className="p-4">{row.w}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-primary text-primary h-12 px-8 rounded-full" asChild>
                  <Link href="/get-started">Still unsure? Talk to an Expert — Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Pricing Table */}
        <section id="pricing" className="bg-surface py-24 scroll-mt-20 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Transparent Pricing. No Hidden Fees. Ever.</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">The world's most affordable company formation platform.</p>
            </div>

            {/* Country Switcher */}
            <div className="mb-12">
              <p className="text-center text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Select your country</p>
              <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 max-w-4xl mx-auto scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {COUNTRY_PRICING.map((cp, idx) => (
                  <button
                    key={cp.country}
                    onClick={() => setSelectedCountry(idx)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 shrink-0 ${
                      selectedCountry === idx
                        ? "bg-primary text-white border-primary shadow-md scale-105"
                        : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    <FlagImg code={cp.flagCode} alt={cp.country} />
                    <span>{cp.country}</span>
                  </button>
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground mt-3">
                {COUNTRY_PRICING[selectedCountry].entityType} formation · prices in {COUNTRY_PRICING[selectedCountry].currency}
              </p>
            </div>

            {/* Plan Cards */}
            <div className={`grid gap-8 max-w-6xl mx-auto items-end mb-16 ${COUNTRY_PRICING[selectedCountry].tiers.length === 2 ? "lg:grid-cols-2 max-w-3xl" : "lg:grid-cols-3"}`}>
              {COUNTRY_PRICING[selectedCountry].tiers.map((tier, tierIdx) => {
                const isPopular = tier.popular;
                const checkColor = isPopular ? "text-accent" : tierIdx === COUNTRY_PRICING[selectedCountry].tiers.length - 1 ? "text-primary" : "text-success";
                return (
                  <div
                    key={tier.name}
                    className={`rounded-2xl p-8 flex flex-col h-full relative ${
                      isPopular
                        ? "bg-card border-2 border-accent shadow-xl lg:-mt-6 z-10"
                        : "bg-card border border-border shadow-sm"
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground font-bold px-4 py-1 rounded-full text-sm">
                        Most Popular
                      </div>
                    )}
                    <div className={`mb-8 ${isPopular ? "mt-2" : ""}`}>
                      <h3 className={`text-xl font-bold uppercase tracking-wider mb-2 ${isPopular ? "text-accent" : "text-muted-foreground"}`}>
                        {tier.name}
                      </h3>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className={`font-bold ${isPopular ? "text-5xl text-foreground" : "text-4xl"}`}>{tier.price}</span>
                        <span className="text-muted-foreground">/one-time</span>
                      </div>
                      <p className="text-sm text-foreground font-medium">Best for: {tier.bestFor}</p>
                    </div>

                    <div className="flex-grow space-y-4 mb-8">
                      <p className="font-bold text-sm">Includes:</p>
                      <ul className="space-y-3 text-sm">
                        {tier.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-5 h-5 shrink-0 ${checkColor}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {tier.notIncluded && tier.notIncluded.length > 0 && (
                        <div className="pt-4 mt-4 border-t border-border text-muted-foreground">
                          <ul className="space-y-3 text-sm opacity-60">
                            {tier.notIncluded.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <X className="w-5 h-5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {isPopular ? (
                      <Button className="w-full bg-accent hover:bg-accent-hover text-accent-foreground h-14 text-lg font-bold shadow-md" asChild>
                        <Link href="/get-started">Start Now</Link>
                      </Button>
                    ) : tierIdx === COUNTRY_PRICING[selectedCountry].tiers.length - 1 ? (
                      <Button variant="outline" className="w-full border-border hover:bg-muted h-12" asChild>
                        <Link href="/get-started">Contact Sales</Link>
                      </Button>
                    ) : (
                      <Button className="w-full bg-primary hover:bg-primary-light text-white h-12" asChild>
                        <Link href="/get-started">Start Now</Link>
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add-on Tiles */}
            <div className="max-w-4xl mx-auto">
              <h4 className="font-heading font-bold text-xl mb-2 flex items-center gap-2 justify-center">
                <ClipboardList className="w-5 h-5 text-primary" /> Optional Add-On Services
              </h4>
              <p className="text-center text-sm text-muted-foreground mb-8">Enhance your plan with any of these services — all priced in USD</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {ADD_ONS.map((addon) => {
                  const Icon = addon.icon;
                  return (
                    <div key={addon.name} className="bg-card rounded-xl border border-border p-6 flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm leading-tight">{addon.name}</p>
                            <p className="text-primary font-bold text-sm">{addon.price}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{addon.description}</p>
                      <Button size="sm" className="w-full mt-1 bg-primary hover:bg-primary-light text-white" asChild>
                        <Link href="/get-started">Add to Plan</Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 8. All-in-One Platform */}
        <section id="services" className="bg-background py-24 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Everything You Need. One Platform.</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Stop juggling 8 different tools. Legal Nations replaces them all.</p>
            </div>

            <div className="space-y-24 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 order-2 lg:order-1">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">Company Formation</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Register your LLC, C-Corp, Pte Ltd, or Free Zone company in days, not weeks. We handle every document, every filing, every requirement.
                  </p>
                </div>
                <div className="flex-1 order-1 lg:order-2 w-full">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-surface p-2">
                    <img src="/images/compliance-dashboard.png" alt="Formation wizard UI" className="w-full h-auto rounded-xl border border-border" />
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 w-full">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-surface p-2">
                    <img src="/images/compliance-human.jpg" alt="Person relaxing while checking their compliance schedule on a phone" className="w-full h-auto rounded-xl border border-border" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">Compliance Autopilot</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Never miss a deadline. Annual reports, franchise tax, renewals — all tracked and filed automatically from your dashboard.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 order-2 lg:order-1">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">Tax Filing & Bookkeeping</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    From monthly bookkeeping to annual tax returns — we keep your books clean and your filings on time.
                  </p>
                </div>
                <div className="flex-1 order-1 lg:order-2 w-full">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-surface p-2">
                    <img src="/images/bookkeeping-human.jpg" alt="Professional focused at desk with laptop and papers doing tax and bookkeeping work" className="w-full h-auto rounded-xl border border-border" />
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 w-full">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-surface p-2">
                    <img src="/images/mailroom-human.jpg" alt="Person reviewing and sorting mail parcels at a desk for virtual mailroom service" className="w-full h-auto rounded-xl border border-border" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">Virtual Business Address & Mailroom</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Professional US business address. Mail scanned and forwarded. Essential for banking, compliance, and credibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Competitor Comparison */}
        <section id="why-us" className="bg-surface py-24 scroll-mt-20 border-y border-border overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            >
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">Unbiased Comparison</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Why Founders Choose Legal Nations Over Everyone Else</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We stack up our features and pricing against the most popular alternatives so you can decide with confidence.</p>
            </motion.div>

            <motion.div
              className="max-w-6xl mx-auto"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            >
              <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr>
                      <th className="p-4 md:p-5 font-semibold text-muted-foreground text-sm uppercase tracking-wide w-[200px] sticky left-0 bg-surface z-10">Feature</th>
                      {/* Legal Nations — highlighted column header */}
                      <th className="p-0 align-bottom">
                        <div className="relative mx-1 rounded-t-2xl bg-gradient-to-b from-primary to-primary/80 px-4 pt-5 pb-4 shadow-[0_-4px_24px_0_rgba(30,64,175,0.35)] text-center">
                          <span className="inline-block mb-2 px-3 py-0.5 rounded-full bg-amber-400 text-amber-900 text-[10px] font-bold uppercase tracking-widest shadow-sm">Best Value</span>
                          <div className="text-white font-heading font-bold text-xl leading-tight">Legal Nations</div>
                        </div>
                      </th>
                      <th className="p-4 font-medium text-muted-foreground/70 text-sm text-center">firstbase.io</th>
                      <th className="p-4 font-medium text-muted-foreground/70 text-sm text-center">LegalZoom</th>
                      <th className="p-4 font-medium text-muted-foreground/70 text-sm text-center">Stripe Atlas</th>
                      <th className="p-4 font-medium text-muted-foreground/70 text-sm text-center">BookMyLLC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { f: "LLC Formation", ln: "$149", c1: { v: "$399", lose: true }, c2: { v: "$299+", lose: true }, c3: { v: "$500", lose: true }, c4: { v: "~$200", lose: true } },
                      { f: "EIN Included", ln: true, c1: { v: true, lose: false }, c2: { v: "Add-on", lose: true }, c3: { v: true, lose: false }, c4: { v: true, lose: false } },
                      { f: "Registered Agent (1yr)", ln: "Free", c1: { v: "$149/yr", lose: true }, c2: { v: "$299/yr", lose: true }, c3: { v: "Included", lose: false }, c4: { v: "Varies", lose: true } },
                      { f: "Virtual Address", ln: "$29/mo", c1: { v: "$35/mo", lose: true }, c2: { v: "N/A", lose: true }, c3: { v: "N/A", lose: true }, c4: { v: "N/A", lose: true } },
                      { f: "Multi-Country", ln: "10+ Countries", c1: { v: "USA only", lose: true }, c2: { v: "USA only", lose: true }, c3: { v: "USA only", lose: true }, c4: { v: "10+", lose: false } },
                      { f: "Compliance Dashboard", ln: true, c1: { v: true, lose: false }, c2: { v: false, lose: true }, c3: { v: false, lose: true }, c4: { v: false, lose: true } },
                      { f: "Tax Filing", ln: "From $299", c1: { v: "$1,799+", lose: true }, c2: { v: "Separate", lose: true }, c3: { v: "N/A", lose: true }, c4: { v: "Separate", lose: true } },
                      { f: "Dedicated Manager", ln: true, c1: { v: false, lose: true }, c2: { v: false, lose: true }, c3: { v: false, lose: true }, c4: { v: true, lose: false } },
                    ].map((row, i) => {
                      const renderLNCell = (val: string | boolean) => {
                        if (typeof val === "boolean") {
                          return val
                            ? <span className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold"><CheckCircle2 className="w-4 h-4" /><span className="hidden sm:inline">Yes</span></span>
                            : <span className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full bg-red-500/30 text-red-200 text-xs font-semibold"><XCircle className="w-4 h-4" /><span className="hidden sm:inline">No</span></span>;
                        }
                        return <span className="font-bold text-white text-base">{val}</span>;
                      };
                      const renderCompCell = (cell: { v: string | boolean; lose: boolean }) => {
                        if (typeof cell.v === "boolean") {
                          return cell.v
                            ? <span className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 text-xs font-semibold"><CheckCircle2 className="w-4 h-4" /><span className="hidden sm:inline">Yes</span></span>
                            : <span className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold"><XCircle className="w-4 h-4" /><span className="hidden sm:inline">No</span></span>;
                        }
                        return <span className={`text-sm ${cell.lose ? "line-through text-muted-foreground/50" : "text-muted-foreground"}`}>{cell.v}</span>;
                      };

                      return (
                        <tr
                          key={i}
                          className={`border-b border-border/60 transition-colors duration-150 hover:bg-muted/20 ${i % 2 === 0 ? "bg-card" : "bg-surface"}`}
                        >
                          <td className="p-4 md:p-5 font-medium text-foreground text-sm sticky left-0 z-10 bg-inherit">{row.f}</td>
                          {/* Legal Nations column — gradient highlight */}
                          <td className="p-0 align-middle">
                            <div className={`mx-1 px-4 py-4 text-center bg-gradient-to-b from-primary/90 to-primary/75 shadow-[0_0_24px_0_rgba(30,64,175,0.18)] flex items-center justify-center ${i === 7 ? "rounded-b-2xl" : ""}`}>
                              {renderLNCell(row.ln)}
                            </div>
                          </td>
                          <td className="p-4 md:p-5 text-center">{renderCompCell(row.c1)}</td>
                          <td className="p-4 md:p-5 text-center">{renderCompCell(row.c2)}</td>
                          <td className="p-4 md:p-5 text-center">{renderCompCell(row.c3)}</td>
                          <td className="p-4 md:p-5 text-center">{renderCompCell(row.c4)}</td>
                        </tr>
                      );
                    })}
                    {/* Summary badge row */}
                    <tr>
                      <td colSpan={6} className="pt-5 pb-0">
                        <div className="flex justify-center">
                          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            Legal Nations wins on 7 out of 8 features
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 10. Stats + Testimonials */}
        <section id="testimonials" className="bg-background py-24 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">Numbers That Speak Louder Than Words</h2>
              
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariant}
              >
                {[
                  { num: "2,500+", label: "Companies Formed" },
                  { num: "10+", label: "Countries Covered" },
                  { num: "24hr", label: "Avg Formation Time" },
                  { num: "$149", label: "Starting Price" },
                ].map((stat) => (
                  <motion.div key={stat.label} variants={cardVariant}>
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.num}</div>
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left items-start">
                {[
                  { quote: "Legal Nations helped me register my Wyoming LLC in under 24 hours. The dashboard is clean, the pricing is honest, and support was incredibly responsive.", name: "Rahul M.", title: "E-commerce Founder, India", countryCode: "in" },
                  { quote: "I compared 6 different services. Legal Nations was the most affordable AND the only one that offered multi-country support with a single dashboard.", name: "Sarah K.", title: "SaaS Founder, UK", countryCode: "gb" },
                  { quote: "From formation to EIN to bank account — everything was handled. I didn't have to chase a single document.", name: "Ahmed R.", title: "Consultant, UAE", countryCode: "ae" },
                ].map((t, i) => (
                  <motion.div
                    key={t.name}
                    variants={cardVariant}
                    className={`bg-card rounded-2xl p-8 shadow-md border border-border relative overflow-hidden ${
                      i === 1 ? 'md:mt-8' : ''
                    }`}
                  >
                    {/* Giant decorative quote mark */}
                    <div className="absolute -top-2 -left-1 text-[8rem] leading-none text-primary/8 font-serif select-none pointer-events-none">"</div>

                    {/* Stars */}
                    <div className="flex text-amber-400 mb-4 relative z-10">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current"/>)}
                    </div>

                    {/* Quote text */}
                    <p className="text-foreground text-[0.95rem] leading-relaxed mb-6 relative z-10">
                      "{t.quote}"
                    </p>

                    {/* Author row */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border relative z-10">
                      {/* Monogram avatar */}
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-foreground">{t.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                          <FlagImg code={t.countryCode} alt={t.title} /> {t.title}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 11. Trust Badges */}
        <section className="bg-surface py-12 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-sm font-medium text-muted-foreground items-center">
              <span className="flex items-center gap-2"><Shield className="w-5 h-5 text-success" /> 256-bit SSL Encrypted</span>
              <span className="flex items-center gap-2"><FileCheck className="w-5 h-5 text-primary" /> IRS Authorized e-File Provider</span>
              <span className="flex items-center gap-2"><Building2 className="w-5 h-5 text-foreground" /> Registered Agent in All 50 States</span>
              <span className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-accent" /> Secure Payments</span>
              <span className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> Serving 45+ Countries</span>
              <span className="flex items-center gap-2">
                <span className="flex text-accent">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </span>
                4.9/5 Rating
              </span>
            </div>
          </div>
        </section>

        {/* 12. FAQ Accordion */}
        <section className="bg-background py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Got Questions? We've Got Answers.</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">How long does it take to register a company?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    Most US formations within 24-48 hours. International (Singapore, Dubai, UK) 3-7 business days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">Do I need to be a US citizen to form a US LLC?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    No. Anyone from any country can form a US LLC or C-Corp. No US address, SSN, or visa required.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">What's the difference between Delaware and Wyoming?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    Delaware preferred for VC-funded startups due to Court of Chancery. Wyoming offers lower costs, stronger privacy, $0 state income tax.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">Are there any hidden fees?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    Zero. State filing fees passed through at cost with no markup.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">Do you help with bank account opening?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    Yes. Mercury, Wise, Relay, and other founder-friendly banks. Priority banking on Professional and Enterprise plans.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">Can I form companies in multiple countries?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    Yes. Enterprise plan supports up to 3 countries with unified compliance dashboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">What ongoing compliance do I need after formation?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    We track everything — annual reports, franchise tax, registered agent renewals.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">Is Legal Nations cheaper than firstbase.io or LegalZoom?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    Yes. Wyoming LLC from $149 (firstbase.io charges $399). Multi-country support they don't offer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* 12.5 Section B: Our Team is With You Every Step */}
        <section className="relative py-28 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/team-support.png')" }}
          />
          <div className="absolute inset-0 bg-[#1A1E3C]/80" />
          <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                24/7 Global Support from Real Humans
              </h2>
              <p className="text-lg text-white/70 mb-12 max-w-xl mx-auto">
                Every founder gets a dedicated account manager. We're here when you need us.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariant}
            >
              {[
                { icon: "💬", title: "Live Chat Support", desc: "Instant answers during business hours via our dashboard chat widget." },
                { icon: "📱", title: "WhatsApp Direct Line", desc: "Message us on WhatsApp and get a response within minutes — no bots." },
                { icon: "👤", title: "Dedicated Account Manager", desc: "A real person assigned to your account from day one." },
              ].map((item) => (
                <motion.div key={item.title} variants={cardVariant} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-left">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <a
              href="https://wa.me/918218229118?text=Hi%2C%20I%27m%20interested%20in%20company%20registration.%20Can%20you%20help%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-bold px-8 py-4 rounded-full text-lg shadow-xl transition-all hover:scale-105"
            >
              <SiWhatsapp className="w-6 h-6" />
              Chat with us on WhatsApp
            </a>
          </div>
        </section>

        {/* 12.7 Section C: Celebrate Your Incorporation */}
        <section className="bg-background py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div
                className="flex-1"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
              >
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  Join thousands of founders building global businesses.
                </h2>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[
                    { num: "2,500+", label: "Companies Registered" },
                    { num: "50+", label: "Countries Served" },
                    { num: "1", label: "Platform" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.num}</div>
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <Button className="bg-accent hover:bg-accent-hover text-accent-foreground text-lg h-14 px-8 rounded-full shadow-lg">
                  Start Your Company Today
                </Button>
              </motion.div>

              <motion.div
                className="flex-1 w-full max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img
                  src="/images/founder-celebrating.png"
                  alt="Founder celebrating company incorporation"
                  className="w-full h-auto rounded-2xl shadow-2xl border border-border/50"
                  style={{ transform: "rotate(2deg)" }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 13. Final CTA Banner */}
        <section className="bg-primary py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Ready to Start Your Global Business?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Join 2,500+ founders who chose Legal Nations for speed, affordability, and peace of mind.</p>
            <div className="flex flex-col items-center gap-4">
              <Button className="bg-white hover:bg-gray-100 text-primary text-lg h-16 px-10 rounded-full shadow-2xl transition-transform hover:scale-105 w-full sm:w-auto font-bold" asChild>
                <Link href="/get-started">Register Your Company Now — Starting at $149</Link>
              </Button>
              <Link href="/get-started" className="text-white/70 hover:text-white underline underline-offset-4 text-sm mt-2 transition-colors">
                Or schedule a free 15-min consultation →
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 14. Footer */}
      <footer className="bg-[#1A1E3C] text-slate-300 pt-20 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div>
                <Logo variant="footer" size="md" />
              </div>
              <p className="text-sm leading-relaxed">The world's most affordable all-in-one company registration & compliance platform.</p>
              <div className="flex gap-4">
                <a href="https://linkedin.com/company/legal-nations" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="https://twitter.com/legalnations" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="https://instagram.com/legalnations" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="https://youtube.com/@legalnations" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors">US Company Formation</Link></li>
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors">International Registration</Link></li>
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors">Tax Filing & Compliance</Link></li>
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors">Registered Agent Services</Link></li>
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors">Virtual Business Address</Link></li>
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors">Bookkeeping & Accounting</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Countries</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors flex items-center gap-2"><FlagImg code="us" alt="USA" /> USA (Delaware & Wyoming)</Link></li>
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors flex items-center gap-2"><FlagImg code="gb" alt="UK" /> United Kingdom</Link></li>
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors flex items-center gap-2"><FlagImg code="sg" alt="Singapore" /> Singapore</Link></li>
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors flex items-center gap-2"><FlagImg code="ae" alt="UAE" /> Dubai / UAE</Link></li>
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors flex items-center gap-2"><FlagImg code="hk" alt="Hong Kong" /> Hong Kong</Link></li>
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors flex items-center gap-2"><FlagImg code="in" alt="India" /> India</Link></li>
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors flex items-center gap-2"><FlagImg code="ca" alt="Canada" /> Canada</Link></li>
                <li><Link href="/get-started" className="hover:text-primary-light transition-colors flex items-center gap-2"><FlagImg code="au" alt="Australia" /> Australia</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="https://legalnations.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light transition-colors">About Us</a></li>
                <li><a href="#pricing" className="hover:text-primary-light transition-colors">Pricing</a></li>
                <li><a href="https://legalnations.in/blog" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light transition-colors">Blog</a></li>
                <li><a href="https://wa.me/918218229118" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light transition-colors">Contact</a></li>
                <li><Link href="/privacy" className="hover:text-primary-light transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary-light transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-12 mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-slate-400">
              <div>
                <p className="font-bold text-slate-100 mb-2 flex items-center gap-1.5"><FlagImg code="in" alt="India" /> India Office</p>
                <p>Legal Nations (Startup Squad Pvt. Ltd.)</p>
                <p>WeWork, Cyber Hub, DLF Cyber City</p>
                <p>Gurugram, Haryana 122002, India</p>
              </div>
              <div>
                <p className="font-bold text-slate-100 mb-2 flex items-center gap-1.5"><FlagImg code="in" alt="India" /> India Office — South Delhi</p>
                <p>Legal Nations</p>
                <p>2nd Floor, M-62, Greater Kailash Part-II</p>
                <p>New Delhi 110048, India</p>
              </div>
              <div>
                <p className="font-bold text-slate-100 mb-2 flex items-center gap-1.5"><FlagImg code="us" alt="USA" /> USA Office</p>
                <p>Legal Nations (Neom LLC)</p>
                <p>1309 Coffeen Avenue, Suite 1200</p>
                <p>Sheridan, WY 82801, USA</p>
              </div>
              <div>
                <p className="font-bold text-slate-100 mb-2 flex items-center gap-1.5"><FlagImg code="us" alt="USA" /> USA Office — Delaware</p>
                <p>Legal Nations</p>
                <p>8 The Green, Suite A</p>
                <p>Dover, DE 19901, USA</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Legal Nations. A product of Startup Squad Pvt. Ltd. | All rights reserved.</p>
            <p>Built with care for founders everywhere.</p>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <a 
        href="https://wa.me/919306500349?text=Hi%2C%20I%27m%20interested%20in%20company%20registration.%20Can%20you%20help%3F" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
        aria-label="Chat on WhatsApp"
        data-testid="button-whatsapp"
      >
        <SiWhatsapp className="w-8 h-8" />
      </a>

      {isScrolled && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 w-10 h-10 bg-card border border-border text-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-secondary transition-all z-50"
          aria-label="Scroll to top"
          data-testid="button-scroll-top"
        >
          <ChevronRight className="w-5 h-5 -rotate-90" />
        </button>
      )}

      {cookieConsent && (
        <div className="fixed bottom-0 left-0 w-full bg-card border-t border-border p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">We use cookies to improve your experience and for marketing. By continuing, you agree to our Privacy Policy.</p>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => setCookieConsent(false)}>Decline</Button>
            <Button size="sm" className="bg-primary hover:bg-primary-light text-white" onClick={() => setCookieConsent(false)}>Accept</Button>
          </div>
        </div>
      )}
    </div>
  );
}
