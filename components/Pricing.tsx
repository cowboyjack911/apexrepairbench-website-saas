import React from 'react';
import { Check, Gift, Sparkles, ShieldCheck } from 'lucide-react';
import { PRICING_TIERS } from '../constants';

export const PricingSection: React.FC = () => {
  const paymentMode = import.meta.env.VITE_PAYMENT_MODE || 'links';

  const handleSubscribe = async (plan: string) => {
    try {
      const res = await fetch(`/api/create-payment-link?plan=${encodeURIComponent(plan)}`);
      const data = await res.json();
      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        alert('Unable to create payment link. Please try again.');
      }
    } catch (e) {
      alert('Network error. Please try again.');
    }
  };
  return (
    <section id="pricing" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sale Banner */}
        <div className="mb-16 bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-[1.01] transition-transform relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                 <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                   <Gift className="w-3 h-3" /> Holiday Special
                 </span>
                 <span className="bg-red-800/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                   Limited Time
                 </span>
              </div>
              <h3 className="text-3xl font-extrabold mb-2">Christmas to New Year Sale!</h3>
              <p className="text-red-100 text-lg max-w-2xl">
                Be one of the <span className="font-bold text-white underline decoration-white/50 underline-offset-4">first 10 subscribers</span> and get your <span className="font-bold text-white">first 2 months FREE</span>.
              </p>
              <p className="text-sm text-red-200 mt-2 font-medium">
                Offer ends January 1st, 2026. Don't miss out!
              </p>
            </div>
            <div className="flex-shrink-0">
               <div className="bg-white text-red-600 font-bold px-8 py-4 rounded-xl shadow-lg flex flex-col items-center">
                 <span className="text-xs uppercase tracking-widest text-red-400">Save up to</span>
                 <span className="text-3xl">$118</span>
               </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-slate-500 mb-8">
            Lower prices, same great power. Choose the plan that fits your shop.
          </p>

          {/* Trial Visibility Badge */}
          <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-full pl-2 pr-5 py-1.5 shadow-sm transform hover:scale-105 transition-all duration-300 cursor-default">
             <div className="bg-emerald-500 text-white p-1 rounded-full">
                <ShieldCheck className="w-4 h-4" />
             </div>
             <div className="flex flex-col md:flex-row md:gap-1 text-left">
                <span className="text-emerald-800 font-bold text-sm">Risk-Free 7-Day Trial</span>
                <span className="text-emerald-600 text-sm hidden md:inline">•</span>
                <span className="text-emerald-600 text-sm">No credit card required to start</span>
             </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl shadow-xl bg-white ring-1 ${
                tier.highlight ? 'ring-brand-500 scale-105 z-10 relative' : 'ring-slate-200'
              } flex flex-col p-8 transition-transform hover:-translate-y-1`}
            >
              {tier.highlight && (
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm flex items-center gap-1">
                   <Sparkles className="w-3 h-3" /> Most Popular
                 </div>
              )}
              <h3 className="text-lg font-semibold leading-8 text-slate-900">{tier.name}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-500">{tier.description}</p>
              <div className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-slate-900">{tier.price}</span>
                {tier.period && (
                  <span className="text-sm font-semibold leading-6 text-slate-500">{tier.period}</span>
                )}
              </div>
              
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-600 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-brand-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                {(() => {
                  const starterUrl = import.meta.env.VITE_STARTER_LINK || '#';
                  const proUrl = import.meta.env.VITE_PROFESSIONAL_LINK || '#';
                  const enterpriseUrl = import.meta.env.VITE_ENTERPRISE_CONTACT_LINK || '#';
                  const href = tier.name === 'Starter' ? starterUrl : tier.name === 'Professional' ? proUrl : enterpriseUrl;
                  return paymentMode === 'api' ? (
                    <button
                      onClick={() => handleSubscribe(tier.name)}
                      className={`w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 shadow-sm ${
                        tier.highlight
                          ? 'bg-brand-600 text-white hover:bg-brand-500 focus-visible:outline-brand-600'
                          : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                      }`}
                    >
                      {tier.cta}
                    </button>
                  ) : (
                    <a
                      href={href}
                      target={href !== '#' ? '_blank' : undefined}
                      rel={href !== '#' ? 'noopener noreferrer' : undefined}
                      className={`block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 shadow-sm ${
                        tier.highlight
                          ? 'bg-brand-600 text-white hover:bg-brand-500 focus-visible:outline-brand-600'
                          : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                      }`}
                    >
                      {tier.cta}
                    </a>
                  );
                })()}
                <p className="mt-3 text-xs text-center text-slate-400 font-medium">
                  7-day free trial • No card required
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};