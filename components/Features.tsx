import React from 'react';
import { FEATURES } from '../constants';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="capabilities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-brand-600 tracking-wide uppercase">Powerful Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
             Modern tools for modern shops
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
            Streamline your repair workflow with automation, real-time insights, and enterprise-grade security.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="relative group bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center p-3 bg-brand-600 rounded-xl shadow-lg ring-4 ring-white mb-6">
                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-base text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
