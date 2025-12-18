import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign } from 'lucide-react';

export const ROICalculator: React.FC = () => {
  const [weeklyRepairs, setWeeklyRepairs] = useState(30);
  const [avgTicket, setAvgTicket] = useState(120);

  // Constants for calculation
  const ADMIN_MINUTES_SAVED_PER_TICKET = 15; // Intake, check-in, updates, checkout
  const HOURLY_RATE = 30; // Avg hourly cost of shop operation
  const MISSED_OPPORTUNITY_RATE = 0.10; // 10% lost revenue due to disorganization/missed follow-ups
  
  // Calculations
  const monthlyRepairs = weeklyRepairs * 4.3;
  const hoursSavedPerMonth = Math.round((monthlyRepairs * ADMIN_MINUTES_SAVED_PER_TICKET) / 60);
  const laborSavings = Math.round(hoursSavedPerMonth * HOURLY_RATE);
  const recoveredRevenue = Math.round(monthlyRepairs * avgTicket * MISSED_OPPORTUNITY_RATE);
  const totalMonthlyBenefit = laborSavings + recoveredRevenue;

  return (
    <section id="roi" className="py-24 bg-brand-900 text-white relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-800 border border-brand-700 text-brand-200 text-sm font-medium mb-6">
               <Calculator className="w-4 h-4" />
               <span>ROI Calculator</span>
            </div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Stop losing money to manual work</h2>
            <p className="mt-4 text-xl text-brand-100 max-w-2xl mx-auto">
              See how much ApexRepairBench could save your shop in just 30 days by automating intake and inventory.
            </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Controls */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
               <div className="space-y-8">
                  <div>
                     <div className="flex justify-between items-center mb-2">
                        <label className="text-lg font-medium text-white">Weekly Repairs</label>
                        <span className="text-2xl font-bold text-brand-300">{weeklyRepairs}</span>
                     </div>
                     <input 
                        type="range" 
                        min="5" 
                        max="200" 
                        step="5"
                        value={weeklyRepairs} 
                        onChange={(e) => setWeeklyRepairs(parseInt(e.target.value))}
                        className="w-full h-2 bg-brand-950 rounded-lg appearance-none cursor-pointer accent-brand-400"
                     />
                     <p className="mt-2 text-sm text-brand-200">The number of devices you fix per week.</p>
                  </div>

                  <div>
                     <div className="flex justify-between items-center mb-2">
                        <label className="text-lg font-medium text-white">Avg. Ticket Value</label>
                        <span className="text-2xl font-bold text-brand-300">${avgTicket}</span>
                     </div>
                     <input 
                        type="range" 
                        min="50" 
                        max="500" 
                        step="10"
                        value={avgTicket} 
                        onChange={(e) => setAvgTicket(parseInt(e.target.value))}
                        className="w-full h-2 bg-brand-950 rounded-lg appearance-none cursor-pointer accent-brand-400"
                     />
                     <p className="mt-2 text-sm text-brand-200">Average revenue per repair.</p>
                  </div>
               </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl transform transition hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <Clock className="w-6 h-6" />
                     </div>
                     <span className="font-semibold text-slate-500">Time Saved</span>
                  </div>
                  <div className="text-4xl font-extrabold text-slate-900 mb-1">{hoursSavedPerMonth} <span className="text-lg font-medium text-slate-400">hrs/mo</span></div>
                  <p className="text-sm text-slate-500">Automated intake, updates, and inventory tracking saves ~15 mins per ticket.</p>
               </div>

               <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl transform transition hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                        <TrendingUp className="w-6 h-6" />
                     </div>
                     <span className="font-semibold text-slate-500">Recovered Rev.</span>
                  </div>
                  <div className="text-4xl font-extrabold text-slate-900 mb-1">${recoveredRevenue.toLocaleString()} <span className="text-lg font-medium text-slate-400">/mo</span></div>
                  <p className="text-sm text-slate-500">Revenue recovered from better follow-ups and organized inventory.</p>
               </div>

               <div className="sm:col-span-2 bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                     <div>
                        <div className="text-brand-100 font-medium mb-1 uppercase tracking-wide text-sm">Total Monthly Value</div>
                        <div className="text-5xl font-extrabold text-white">${totalMonthlyBenefit.toLocaleString()}</div>
                     </div>
                     <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                        <DollarSign className="w-8 h-8 text-white" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
       </div>
    </section>
  );
};
