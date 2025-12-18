import React from 'react';
import { Check, X, Minus } from 'lucide-react';
import { COMPARISON_DATA } from '../constants';

export const CompetitorComparison: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-brand-600 tracking-wide uppercase">Why Switch?</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            See how we stack up
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b-2 border-slate-100 min-w-[200px]"></th>
                <th className="p-4 border-b-2 border-brand-500 bg-brand-50 rounded-t-xl min-w-[150px]">
                  <div className="text-center">
                    <span className="block text-lg font-bold text-brand-700">Apex</span>
                    <span className="text-xs text-brand-600 font-medium uppercase tracking-wider">RepairBench</span>
                  </div>
                </th>
                <th className="p-4 border-b-2 border-slate-100 text-center min-w-[150px]">
                  <span className="block text-lg font-bold text-slate-700">Legacy POS</span>
                </th>
                <th className="p-4 border-b-2 border-slate-100 text-center min-w-[150px]">
                  <span className="block text-lg font-bold text-slate-500">Pen & Paper</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="p-4 font-medium text-slate-900 border-b border-slate-100">
                    {row.feature}
                  </td>
                  <td className="p-4 border-b border-slate-100 bg-brand-50/30 text-center">
                    <div className="flex justify-center">
                      {row.apex === true ? (
                        <div className="bg-brand-100 p-1 rounded-full">
                           <Check className="w-6 h-6 text-brand-600" />
                        </div>
                      ) : (
                        <span className="font-semibold text-brand-700">{row.apex}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-100 text-center">
                    <div className="flex justify-center">
                      {row.legacy === true ? (
                        <Check className="w-6 h-6 text-slate-400" />
                      ) : row.legacy === false ? (
                        <X className="w-6 h-6 text-slate-300" />
                      ) : (
                        <span className="text-sm text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">{row.legacy}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-100 text-center">
                    <div className="flex justify-center">
                      {row.manual === true ? (
                        <Check className="w-6 h-6 text-slate-400" />
                      ) : row.manual === false ? (
                        <Minus className="w-6 h-6 text-slate-300" />
                      ) : (
                        <span className="text-sm text-slate-500">{row.manual}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
