import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, CheckCircle, AlertCircle, Building2, ExternalLink, ShieldCheck, FileCheck2 } from 'lucide-react';

interface VerifyCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const VerifyCompanyModal: React.FC<VerifyCompanyModalProps> = ({ isOpen, onClose, initialQuery = 'Apex Retail Solutions Ltd' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setSearched(true);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-700 to-blue-800 px-6 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-lg">
                <Building2 className="w-5 h-5 text-sky-200" />
              </div>
              <div>
                <h3 className="font-bold text-base font-headline">Corporate Registry Verification</h3>
                <p className="text-xs text-sky-200">MCA-21 & Official Domain Cross-Check</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter corporate entity name or CIN..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>
              <button
                type="submit"
                disabled={searching}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
              >
                {searching ? 'Querying...' : 'Verify MCA'}
              </button>
            </form>

            {searched && (
              <div className="space-y-3">
                {/* MCA match card */}
                <div className="p-4 rounded-xl border border-red-200 bg-red-50/60 flex items-start gap-3">
                  <div className="p-1.5 bg-red-100 text-red-700 rounded-lg mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-950 font-headline">Discrepancy Detected (MCA Check)</span>
                      <span className="px-2 py-0.5 bg-red-200/80 text-red-900 rounded font-semibold text-[10px]">Unregistered CIN</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      No registered entity named <strong>"{query}"</strong> exists in the Ministry of Corporate Affairs (MCA21) active database with a registered office handling corporate hiring.
                    </p>
                  </div>
                </div>

                {/* Domain impersonation card */}
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex items-start gap-3">
                  <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg mt-0.5">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-950 font-headline">Free Email Domain Usage</span>
                      <span className="px-2 py-0.5 bg-amber-200/80 text-amber-900 rounded font-semibold text-[10px]">High Risk Indicator</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Offers sent via <code>gmail.com</code>, <code>outlook.com</code>, or burner Telegram bots without corporate email domain authentication (SPF/DKIM/DMARC) fail legitimate enterprise recruiting benchmarks.
                    </p>
                  </div>
                </div>

                {/* Safe Protocol Advice */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FileCheck2 className="w-4 h-4 text-sky-600" />
                    <span>Always verify job openings directly on official careers portals.</span>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shrink-0"
                  >
                    Understood
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
