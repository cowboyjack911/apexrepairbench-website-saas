import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Shield, Star, Lock, Check, UploadCloud, Settings, Rocket } from 'lucide-react';
import { NAV_LINKS, TESTIMONIALS, BENEFITS } from './constants';
import { FeaturesSection } from './components/Features';
import { ROICalculator } from './components/ROICalculator';
import { CompetitorComparison } from './components/CompetitorComparison';
import { ChatWidget } from './components/ChatWidget';
import { FAQSection } from './components/FAQ';
import { PricingSection } from './components/Pricing';
import { SaleBanner } from './components/SaleBanner';
import { DownloadSection } from './components/DownloadSection';

// Custom Logo Component matching the brand identity
const BrandLogo: React.FC<{ className?: string, textClass?: string }> = ({ className = "h-8", textClass = "text-white" }) => (
  <div className="flex items-center gap-2.5 select-none">
    <div className={`relative ${className} aspect-square flex items-center justify-center`}>
      {/* Monitor Shape */}
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
        <rect x="4" y="6" width="32" height="22" rx="4" stroke="#0066FF" strokeWidth="3.5" />
        <path d="M14 34H26" stroke="#0066FF" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M20 30V34" stroke="#0066FF" strokeWidth="3.5" />
        {/* Heartbeat Line */}
        <path d="M2 17H11L15 7L21 27L26 17H38" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div className={`font-bold tracking-tight text-xl leading-none flex flex-col sm:flex-row sm:gap-1 ${textClass}`}>
      <span>Apex</span>
      <span className="text-accent-500">RepairBench</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setFormStatus('success');
      // Here you would integrate with your backend
    }
  };

  // Nav text color logic: White on dark hero (unscrolled), Dark on white header (scrolled)
  const navTextColor = scrolled ? 'text-slate-600 hover:text-brand-600' : 'text-slate-300 hover:text-white';
  const navLogoText = scrolled ? 'text-slate-900' : 'text-white';
  const mobileMenuButtonColor = scrolled ? 'text-slate-900' : 'text-white';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Fixed Header Assembly */}
      <div className="fixed top-0 left-0 w-full z-40 flex flex-col font-sans">
        <SaleBanner />
        <nav
          className={`w-full transition-all duration-300 ${
            scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100' : 'bg-transparent py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              
              <a href="#" className="hover:opacity-90 transition-opacity">
                <BrandLogo className="h-9" textClass={navLogoText} />
              </a>
              
              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${navTextColor}`}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#trial"
                  className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-bold rounded-full text-white bg-accent-500 hover:bg-accent-600 transition-all shadow-lg shadow-accent-500/30 hover:shadow-accent-500/40 transform hover:-translate-y-0.5"
                >
                  Start Free Trial
                </a>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`p-2 transition-colors ${mobileMenuButtonColor}`}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 shadow-xl border-t border-slate-800 animate-in slide-in-from-top-2">
              <div className="px-4 pt-2 pb-6 space-y-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#trial"
                  className="block w-full text-center mt-4 px-4 py-3 border border-transparent text-base font-bold rounded-md text-white bg-accent-500 hover:bg-accent-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Free Trial
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 lg:pt-64 lg:pb-40 overflow-hidden bg-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center rounded-full bg-brand-800/50 px-4 py-1.5 text-sm font-medium text-brand-200 ring-1 ring-inset ring-brand-500/30 mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
               #1 Repair Management Platform
            </span>
          </div>
          <h1 className="text-5xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl mb-8 leading-tight">
            <span className="block mb-2">Repair smarter with</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-white to-accent-400">
              Apex RepairBench
            </span>
          </h1>
          <p className="mt-6 max-w-md mx-auto text-lg text-slate-300 sm:text-xl md:mt-8 md:text-2xl md:max-w-3xl leading-relaxed">
            Transform your shop with the complete "Repair OS" — instant ticketing, intelligent inventory, customer CRM, and audit-safe operations.
          </p>
          <div className="mt-12 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
            <a
              href="#trial"
              className="flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-accent-500 hover:bg-accent-600 shadow-xl shadow-accent-500/20 hover:shadow-accent-500/40 transition-all transform hover:-translate-y-1"
            >
              Start Free Trial
            </a>
            <a
              href="#demo"
              className="flex items-center justify-center px-8 py-4 border border-slate-600/50 text-lg font-bold rounded-xl text-white bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500 backdrop-blur-sm shadow-lg transition-all transform hover:-translate-y-1"
            >
              Watch Demo
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-400 flex justify-center items-center gap-6">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-accent-500"/> No credit card required</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-accent-500"/> 7-day free trial</span>
          </p>
        </div>
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-500/10 rounded-full blur-[100px]"></div>
          <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
             <defs>
               <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                 <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.05" className="text-slate-700"/>
               </pattern>
             </defs>
             <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </section>

      {/* Why Apex Wins Grid */}
      <section id="benefits" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-base font-bold text-accent-600 tracking-wide uppercase">Benefits</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Why Apex RepairBench Wins
              </p>
              <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
                More than just software—it's your complete repair operation system.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BENEFITS.map((benefit, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-lg hover:border-brand-100 transition-all duration-300 group">
                  <div className="p-3 bg-white text-brand-600 rounded-xl shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{benefit.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <ROICalculator />

      {/* How It Works (Onboarding) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-extrabold text-slate-900">Switch in minutes, not days</h2>
             <p className="mt-4 text-xl text-slate-500">Our onboarding wizard handles the heavy lifting.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             {/* Connector Line (Desktop) */}
             <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 z-0"></div>

             {[
               { icon: UploadCloud, title: '1. Import Data', desc: 'Upload your customers and inventory via CSV or connect your old POS.' },
               { icon: Settings, title: '2. Configure Shop', desc: 'Set your tax rates, receipt branding, and staff permissions.' },
               { icon: Rocket, title: '3. Start Repairing', desc: 'Launch your new dashboard and start accepting tickets instantly.' }
             ].map((step, i) => (
               <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center mb-6 shadow-md group-hover:border-brand-200 transition-colors">
                    <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-500 px-4">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* Competitor Comparison */}
      <CompetitorComparison />

      {/* Testimonials Section */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-extrabold">Loved by repair shops everywhere</h2>
               <p className="mt-4 text-xl text-brand-200">Join the fastest growing community of repair professionals.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="bg-brand-950/50 backdrop-blur p-8 rounded-2xl border border-brand-800 relative hover:border-brand-600 transition-colors">
                     <div className="flex gap-1 mb-4">
                        {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                     </div>
                     <p className="text-slate-200 italic mb-6 min-h-[80px]">"{t.quote}"</p>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-700 flex items-center justify-center font-bold text-white border border-brand-600">
                           {t.author.charAt(0)}
                        </div>
                        <div>
                           <div className="font-bold text-white">{t.author}</div>
                           <div className="text-xs text-brand-300">{t.role}, {t.company}</div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <PricingSection />

      <DownloadSection />

      <FAQSection />

      {/* Demo Trial Section (Lead Capture) */}
      <section id="trial" className="relative py-24 bg-slate-900">
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-900 to-slate-900"></div>
            <div className="absolute right-0 top-0 w-1/2 h-full bg-brand-600/10 blur-[100px]"></div>
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-5xl mb-6">
            Join 500+ repair shops
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Start your free 7-day trial. No credit card required. Full access to all Pro features.
          </p>
          
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
            {formStatus === 'success' ? (
               <div className="flex flex-col items-center justify-center py-4 text-white animate-in zoom-in duration-300">
                 <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-accent-500/20">
                    <Check className="w-8 h-8 text-white" />
                 </div>
                 <h3 className="text-2xl font-bold">Welcome aboard!</h3>
                 <p className="mt-2 text-slate-300">Check your inbox for your login details.</p>
               </div>
            ) : (
              <form onSubmit={handleTrialSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email address"
                  className="flex-1 px-6 py-4 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 shadow-inner bg-white/90"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                  type="submit"
                  className="px-8 py-4 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-all shadow-lg shadow-accent-500/30 flex items-center justify-center whitespace-nowrap transform hover:-translate-y-0.5"
                >
                  Start My Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </form>
            )}
             <p className="mt-6 text-xs text-slate-400 opacity-80">
              By signing up, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section id="trust" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Logos */}
          <div className="mb-16">
            <p className="text-center text-sm font-bold uppercase text-slate-400 tracking-wider mb-10">
              Seamlessly Integrated With
            </p>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex justify-center items-center gap-2">
                 <div className="w-8 h-8 bg-slate-800 rounded-md"></div>
                 <span className="text-xl font-bold text-slate-800">SQUARE</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                 <div className="w-8 h-8 bg-slate-800 rounded-full border-2 border-white ring-2 ring-slate-800"></div>
                 <span className="text-xl font-bold text-slate-800">SignPath</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                 <div className="w-8 h-8 border-t-4 border-slate-800 rounded-full"></div>
                 <span className="text-xl font-bold text-slate-800">Starlink</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                 <BrandLogo className="h-6" textClass="text-slate-800" />
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>SSL Secure</span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>GDPR Compliant</span>
            </div>
             <div className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Trusted by Leading Repair Shops</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050a14] text-slate-300 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-1 space-y-4">
            <BrandLogo className="h-8" />
            <p className="text-sm text-slate-500 leading-relaxed">
              The complete repair management platform. Transform your shop with intelligent automation, instant ticketing, and customer-first workflows.
            </p>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6">Product</h4>
             <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Platform</a></li>
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Interactive Demo</a></li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6">Resources</h4>
             <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
             </ul>
          </div>

          <div className="md:text-right">
             <p className="mb-4 text-slate-400">Made with ❤️ for repair shops</p>
             <div className="flex md:justify-end gap-6 text-sm">
               <a href="#" className="text-slate-500 hover:text-white transition">Privacy Policy</a>
               <a href="#" className="text-slate-500 hover:text-white transition">Terms of Service</a>
             </div>
             <div className="mt-6 text-xs text-slate-600">
               © {new Date().getFullYear()} ApexRepairBench. All rights reserved.
             </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant Widget */}
      <ChatWidget />
    </div>
  );
};

export default App;