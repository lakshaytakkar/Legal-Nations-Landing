import { useState, useEffect, useRef, type MutableRefObject } from "react";
import { Link } from "wouter";
import { Menu, X, ArrowRight, CheckCircle2, ChevronRight, ChevronDown, ClipboardList, FileText, Rocket, Linkedin, Twitter, Instagram, Youtube, Shield, FileCheck, Building2, CreditCard, Globe, Star } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, type Variants } from "framer-motion";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const containerVariant: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary-light/30">
      {/* 0. Announcement Bar */}
      <div className="bg-card text-foreground text-sm py-2 px-4 text-center font-medium sticky top-0 z-50 border-b border-border">
        🎯 Limited Offer: Wyoming LLC Formation at $149 — Lowest Price Guaranteed <ArrowRight className="inline w-4 h-4 ml-1" />
        <Link href="#pricing" className="ml-2 underline underline-offset-2 hover:text-primary transition-colors">
          Claim Now
        </Link>
      </div>

      {/* 1. Navigation */}
      <header className={`sticky ${isScrolled ? 'top-0 shadow-sm' : 'top-0 sm:top-9'} z-40 bg-background/95 backdrop-blur-md transition-all duration-200 border-b border-border`}>
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-xl md:text-2xl text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            Legal Nations
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
                  {[
                    { flag: "🇺🇸", label: "USA — Delaware & Wyoming" },
                    { flag: "🇬🇧", label: "United Kingdom" },
                    { flag: "🇸🇬", label: "Singapore" },
                    { flag: "🇦🇪", label: "Dubai / UAE" },
                    { flag: "🇭🇰", label: "Hong Kong" },
                    { flag: "🇮🇳", label: "India" },
                    { flag: "🇨🇦", label: "Canada" },
                    { flag: "🇦🇺", label: "Australia" },
                  ].map((item) => (
                    <a key={item.label} href="#countries" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-secondary hover:text-primary transition-colors">
                      <span>{item.flag}</span> {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#why-us" className="hover:text-primary transition-colors">Why Us</a>
          </nav>
          
          <div className="hidden md:block">
            <Button className="bg-accent hover:bg-accent-hover text-accent-foreground border-none font-bold rounded-full px-6 shadow-md hover:shadow-lg transition-all" data-testid="button-nav-cta">
              Get Started — Free Consultation
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
            <Button className="bg-accent hover:bg-accent-hover text-accent-foreground w-full mt-2">Get Started</Button>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <section className="bg-background pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="flex-1 max-w-2xl text-center lg:text-left"
              initial="hidden" animate="visible" variants={fadeUpVariant}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary font-medium text-sm mb-6 border border-primary-light/20">
                <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                Trusted by 2,500+ Founders Worldwide
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] mb-6">
                Register Your Company Anywhere. Manage Everything from One Dashboard.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                From Delaware LLCs to Dubai Free Zones — formation, tax filing, compliance, and registered agent services. All-in-one. All affordable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Button className="bg-accent hover:bg-accent-hover text-accent-foreground text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto" data-testid="hero-cta-start">
                  Start Your Company — $149
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-secondary text-lg h-14 px-8 rounded-full w-full sm:w-auto" asChild data-testid="hero-cta-pricing">
                  <a href="#pricing">See Pricing</a>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground">
                <span className="flex items-center gap-1"><span className="text-accent">⚡</span> 24hr Formation</span>
                <span className="flex items-center gap-1"><span className="text-success">🔒</span> 100% Compliant</span>
                <span className="flex items-center gap-1"><span className="text-primary">💰</span> Lowest Price Guarantee</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 w-full relative"
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
              <div className="flex w-max animate-infinite-scroll space-x-12 items-center text-2xl font-heading font-bold text-muted-foreground/40 px-6">
                <span>Stripe</span><span>Mercury</span><span>Wise</span><span>QuickBooks</span>
                <span>Xero</span><span>Razorpay</span><span>Carta</span><span>Brex</span>
                <span>Notion</span><span>Slack</span><span>HubSpot</span><span>Deel</span>
                {/* Duplicated for smooth infinite scroll */}
                <span aria-hidden="true">Stripe</span><span aria-hidden="true">Mercury</span>
                <span aria-hidden="true">Wise</span><span aria-hidden="true">QuickBooks</span>
                <span aria-hidden="true">Xero</span><span aria-hidden="true">Razorpay</span>
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
        <section className="bg-background py-24">
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
                { flag: "🇺🇸", name: "USA", type: "LLC & C-Corp", price: "$149" },
                { flag: "🇬🇧", name: "United Kingdom", type: "LTD Company", price: "$299" },
                { flag: "🇸🇬", name: "Singapore", type: "Pte Ltd", price: "$499" },
                { flag: "🇦🇪", name: "Dubai / UAE", type: "Free Zone & Mainland", price: "$1,299" },
                { flag: "🇭🇰", name: "Hong Kong", type: "Limited Company", price: "$599" },
                { flag: "🇮🇳", name: "India", type: "Pvt Ltd / LLP / OPC", price: "₹4,999" },
                { flag: "🇨🇦", name: "Canada", type: "Corporation", price: "$399" },
                { flag: "🇦🇺", name: "Australia", type: "Pty Ltd", price: "$699" },
              ].map((country, i) => (
                <motion.div key={i} variants={cardVariant} className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">{country.flag}</div>
                  <h3 className="text-xl font-heading font-bold mb-1">{country.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{country.type}</p>
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <div className="font-medium text-foreground">From <span className="font-bold text-primary">{country.price}</span></div>
                    <a href="#" className="text-sm font-bold text-primary flex items-center group-hover:text-accent transition-colors">
                      View <ChevronRight className="w-4 h-4" />
                    </a>
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

                <Button className="w-full bg-accent hover:bg-accent-hover text-accent-foreground text-lg h-12">Get Delaware Package</Button>
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

                <Button className="w-full bg-accent hover:bg-accent-hover text-accent-foreground text-lg h-12">Get Wyoming Package</Button>
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
                      { f: "VC / Investor Preference", d: "⭐⭐⭐⭐⭐", w: "⭐⭐⭐" },
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
                <Button variant="outline" className="border-primary text-primary h-12 px-8 rounded-full">
                  Still unsure? Talk to an Expert — Free
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Pricing Table */}
        <section id="pricing" className="bg-surface py-24 scroll-mt-20 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Transparent Pricing. No Hidden Fees. Ever.</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">The world's most affordable company formation platform.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-end mb-16">
              {/* Starter */}
              <div className="bg-card rounded-2xl border border-border p-8 shadow-sm flex flex-col h-full relative lg:order-1 order-2">
                <div className="mb-8">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-muted-foreground mb-2">Starter</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold">$149</span>
                    <span className="text-muted-foreground">/one-time</span>
                  </div>
                  <p className="text-sm text-foreground font-medium">Best for: Solopreneurs</p>
                </div>
                
                <div className="flex-grow space-y-4 mb-8">
                  <p className="font-bold text-sm">Includes:</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-success shrink-0" /> Formation</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-success shrink-0" /> EIN</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-success shrink-0" /> Registered Agent (1yr)</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-success shrink-0" /> Operating Agreement</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-success shrink-0" /> Basic Compliance Dashboard</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-success shrink-0" /> 1 Country</li>
                  </ul>
                  <div className="pt-4 mt-4 border-t border-border text-muted-foreground">
                    <ul className="space-y-3 text-sm opacity-60">
                      <li className="flex items-start gap-2"><X className="w-5 h-5 shrink-0" /> Virtual Address</li>
                      <li className="flex items-start gap-2"><X className="w-5 h-5 shrink-0" /> Banking</li>
                      <li className="flex items-start gap-2"><X className="w-5 h-5 shrink-0" /> Bookkeeping & Tax</li>
                    </ul>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary-light text-white h-12">Start Now</Button>
              </div>

              {/* Professional */}
              <div className="bg-card rounded-2xl border-2 border-accent p-8 shadow-xl flex flex-col h-full relative lg:-mt-6 lg:mb-0 z-10 lg:order-2 order-1">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground font-bold px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
                <div className="mb-8 mt-2">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-accent mb-2">Professional</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-bold text-foreground">$349</span>
                    <span className="text-muted-foreground">/one-time</span>
                  </div>
                  <p className="text-sm text-foreground font-medium">Best for: Growing businesses</p>
                </div>
                
                <div className="flex-grow space-y-4 mb-8">
                  <p className="font-bold text-sm">Everything in Starter, plus:</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Virtual Business Address</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Full Compliance Dashboard</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Banking Assistance (Mercury, Wise)</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Dedicated Manager</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0" /> Annual tax $299 add-on</li>
                  </ul>
                </div>
                <Button className="w-full bg-accent hover:bg-accent-hover text-accent-foreground h-14 text-lg font-bold shadow-md">Start Now</Button>
              </div>

              {/* Enterprise */}
              <div className="bg-card rounded-2xl border border-border p-8 shadow-sm flex flex-col h-full relative lg:order-3 order-3">
                <div className="mb-8">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-muted-foreground mb-2">Enterprise</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold">$799</span>
                    <span className="text-muted-foreground">/one-time</span>
                  </div>
                  <p className="text-sm text-foreground font-medium">Best for: Multi-country operations</p>
                </div>
                
                <div className="flex-grow space-y-4 mb-8">
                  <p className="font-bold text-sm">Everything in Professional, plus:</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> Bookkeeping (Monthly)</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> Tax Filing Included</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> Senior Dedicated Manager</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> Up to 3 Countries</li>
                  </ul>
                </div>
                <Button variant="outline" className="w-full border-border hover:bg-muted h-12">Contact Sales</Button>
              </div>
            </div>

            {/* Add-ons */}
            <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl border border-border shadow-sm">
              <h4 className="font-heading font-bold text-lg mb-6 flex items-center gap-2"><ClipboardList className="w-5 h-5 text-primary" /> Optional Add-On Services</h4>
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2"><span>Registered Agent Renewal</span> <span className="font-medium">$99/yr/state</span></div>
                <div className="flex justify-between border-b border-border/50 pb-2"><span>Virtual Mailbox</span> <span className="font-medium">$29/mo</span></div>
                <div className="flex justify-between border-b border-border/50 pb-2"><span>Annual Tax Filing (LLC)</span> <span className="font-medium">$299</span></div>
                <div className="flex justify-between border-b border-border/50 pb-2"><span>Annual Tax Filing (C-Corp)</span> <span className="font-medium">$499</span></div>
                <div className="flex justify-between border-b border-border/50 pb-2"><span>Bookkeeping</span> <span className="font-medium">$79/mo</span></div>
                <div className="flex justify-between border-b border-border/50 pb-2"><span>Trademark Filing</span> <span className="font-medium">$349</span></div>
                <div className="flex justify-between border-b border-border/50 pb-2 sm:col-span-2"><span>Foreign Qualification</span> <span className="font-medium">$199 + state fees</span></div>
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
                    <img src="/images/formation-wizard.png" alt="Formation wizard UI" className="w-full h-auto rounded-xl border border-border" />
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 w-full">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-surface p-2">
                    <img src="/images/compliance-dashboard.png" alt="Compliance calendar dashboard" className="w-full h-auto rounded-xl border border-border" />
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
                    <img src="/images/bookkeeping-dashboard.png" alt="Bookkeeping dashboard" className="w-full h-auto rounded-xl border border-border" />
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 w-full">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-surface p-2">
                    <img src="/images/virtual-mailbox.png" alt="Virtual mailbox interface" className="w-full h-auto rounded-xl border border-border" />
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
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Why Founders Choose Legal Nations Over Everyone Else</h2>
            </div>

            <div className="max-w-6xl mx-auto overflow-x-auto pb-4">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-4 font-bold text-muted-foreground border-b-2 border-border text-lg">Feature</th>
                    <th className="p-4 font-bold text-primary border-b-2 border-primary text-xl bg-secondary/50 rounded-t-xl border-x border-t border-border">Legal Nations</th>
                    <th className="p-4 font-medium text-muted-foreground border-b-2 border-border">firstbase.io</th>
                    <th className="p-4 font-medium text-muted-foreground border-b-2 border-border">LegalZoom</th>
                    <th className="p-4 font-medium text-muted-foreground border-b-2 border-border">Stripe Atlas</th>
                    <th className="p-4 font-medium text-muted-foreground border-b-2 border-border">BookMyLLC</th>
                  </tr>
                </thead>
                <tbody className="bg-card">
                  {[
                    { f: "LLC Formation", ln: "$149", c1: "$399", c2: "$299+", c3: "$500", c4: "~$200" },
                    { f: "EIN Included", ln: "✅", c1: "✅", c2: "Add-on", c3: "✅", c4: "✅" },
                    { f: "Registered Agent (1yr)", ln: "Free", c1: "$149/yr", c2: "$299/yr", c3: "Included", c4: "Varies" },
                    { f: "Virtual Address", ln: "$29/mo", c1: "$35/mo", c2: "N/A", c3: "N/A", c4: "N/A" },
                    { f: "Multi-Country", ln: "10+ Countries", c1: "USA only", c2: "USA only", c3: "USA only", c4: "10+" },
                    { f: "Compliance Dashboard", ln: "✅", c1: "✅", c2: "❌", c3: "❌", c4: "❌" },
                    { f: "Tax Filing", ln: "From $299", c1: "$1,799+", c2: "Separate", c3: "N/A", c4: "Separate" },
                    { f: "Dedicated Manager", ln: "✅", c1: "❌", c2: "❌", c3: "❌", c4: "✅" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border hover:bg-muted/30">
                      <td className="p-4 font-medium text-foreground">{row.f}</td>
                      <td className="p-4 font-bold text-foreground bg-secondary/30 border-x border-border shadow-[inset_4px_0_0_0_#1E40AF]">{row.ln}</td>
                      <td className="p-4 text-muted-foreground">{row.c1}</td>
                      <td className="p-4 text-muted-foreground">{row.c2}</td>
                      <td className="p-4 text-muted-foreground">{row.c3}</td>
                      <td className="p-4 text-muted-foreground">{row.c4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 10. Stats + Testimonials */}
        <section className="bg-background py-24">
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

              <motion.div
                className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariant}
              >
                {[
                  { quote: "Legal Nations helped me register my Wyoming LLC in under 24 hours. The dashboard is clean, the pricing is honest, and support was incredibly responsive.", name: "Rahul M.", title: "E-commerce Founder, India 🇮🇳" },
                  { quote: "I compared 6 different services. Legal Nations was the most affordable AND the only one that offered multi-country support with a single dashboard.", name: "Sarah K.", title: "SaaS Founder, UK 🇬🇧" },
                  { quote: "From formation to EIN to bank account — everything was handled. I didn't have to chase a single document.", name: "Ahmed R.", title: "Consultant, UAE 🇦🇪" },
                ].map((t) => (
                  <motion.div key={t.name} variants={cardVariant} className="bg-surface p-8 rounded-xl border-l-4 border-primary shadow-sm">
                    <div className="flex text-accent mb-4"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                    <p className="text-foreground italic mb-6">"{t.quote}"</p>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.title}</div>
                  </motion.div>
                ))}
              </motion.div>
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

        {/* 13. Final CTA Banner */}
        <section className="bg-primary py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Ready to Start Your Global Business?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Join 2,500+ founders who chose Legal Nations for speed, affordability, and peace of mind.</p>
            <div className="flex flex-col items-center gap-4">
              <Button className="bg-white hover:bg-gray-100 text-primary text-lg h-16 px-10 rounded-full shadow-2xl transition-transform hover:scale-105 w-full sm:w-auto font-bold">
                Register Your Company Now — Starting at $149
              </Button>
              <a href="#" className="text-white/70 hover:text-white underline underline-offset-4 text-sm mt-2 transition-colors">
                Or schedule a free 15-min consultation →
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 14. Footer */}
      <footer className="bg-[#1A1E3C] text-slate-300 pt-20 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="font-heading font-bold text-2xl text-white flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                Legal Nations
              </div>
              <p className="text-sm leading-relaxed">The world's most affordable all-in-one company registration & compliance platform.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-primary-light transition-colors">US Company Formation</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">International Registration</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Tax Filing & Compliance</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Registered Agent Services</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Virtual Business Address</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Bookkeeping & Accounting</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Countries</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-primary-light transition-colors">🇺🇸 USA (Delaware & Wyoming)</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">🇬🇧 United Kingdom</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">🇸🇬 Singapore</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">🇦🇪 Dubai / UAE</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">🇭🇰 Hong Kong</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">🇮🇳 India</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">🇨🇦 Canada</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">🇦🇺 Australia</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-primary-light transition-colors">About Us</a></li>
                <li><a href="#pricing" className="hover:text-primary-light transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-light transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-12 mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-slate-400">
              <div>
                <p className="font-bold text-slate-100 mb-2">🇮🇳 India Office</p>
                <p>Legal Nations (Startup Squad Pvt. Ltd.)</p>
                <p>WeWork, Cyber Hub, DLF Cyber City</p>
                <p>Gurugram, Haryana 122002, India</p>
              </div>
              <div>
                <p className="font-bold text-slate-100 mb-2">🇮🇳 India Office — South Delhi</p>
                <p>Legal Nations</p>
                <p>2nd Floor, M-62, Greater Kailash Part-II</p>
                <p>New Delhi 110048, India</p>
              </div>
              <div>
                <p className="font-bold text-slate-100 mb-2">🇺🇸 USA Office</p>
                <p>Legal Nations (Neom LLC)</p>
                <p>1309 Coffeen Avenue, Suite 1200</p>
                <p>Sheridan, WY 82801, USA</p>
              </div>
              <div>
                <p className="font-bold text-slate-100 mb-2">🇺🇸 USA Office — Delaware</p>
                <p>Legal Nations</p>
                <p>8 The Green, Suite A</p>
                <p>Dover, DE 19901, USA</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Legal Nations. A product of Startup Squad Pvt. Ltd. | All rights reserved.</p>
            <p>Built with ❤️ for founders everywhere.</p>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <a 
        href="https://wa.me/918218229118?text=Hi%2C%20I%27m%20interested%20in%20company%20registration.%20Can%20you%20help%3F" 
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
