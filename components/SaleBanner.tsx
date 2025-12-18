import React from 'react';
import { Gift, ArrowRight, Clock } from 'lucide-react';

export const SaleBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white relative z-50 shadow-md border-b border-red-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-y-2 gap-x-4 text-center sm:text-left">
         <div className="flex items-center gap-2 text-sm justify-center sm:justify-start">
            <span className="hidden sm:flex h-6 w-6 items-center justify-center rounded-full bg-white/20 animate-pulse flex-shrink-0">
               <Gift className="h-3.5 w-3.5 text-white" />
            </span>
            <p className="font-medium leading-tight">
               <span className="font-bold text-red-100 uppercase tracking-wider text-[10px] mr-2 border border-red-400/50 px-1.5 py-0.5 rounded align-middle">Holiday Sale</span>
               First 10 subscribers get <span className="font-bold underline decoration-red-300 underline-offset-4">2 months FREE</span>!
            </p>
         </div>
         
         <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm justify-center sm:justify-end">
            <div className="flex items-center gap-1.5 text-red-100/90 bg-red-800/30 px-2 py-1 rounded">
               <Clock className="w-3.5 h-3.5" />
               <span className="whitespace-nowrap">Ends Jan 1, 2026</span>
            </div>
            <a href="#pricing" className="group flex items-center gap-1 font-bold text-white bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-all whitespace-nowrap">
               Claim Offer <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
         </div>
      </div>
    </div>
  );
};