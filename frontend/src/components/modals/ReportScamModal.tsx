import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, Building, Send, Link as LinkIcon, Phone } from 'lucide-react';

interface ReportScamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (details: any) => void;
}

export const ReportScamModal: React.FC<ReportScamModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [platform, setPlatform] = useState<'whatsapp' | 'telegram' | 'email' | 'instagram' | 'other'>('whatsapp');
  const [companyName, setCompanyName] = useState('');
  const [recruiterContact, setRecruiterContact] = useState('');
  const [feeRequested, setFeeRequested] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccess) {
        onSuccess({
          platform,
          companyName,
          recruiterContact,
          feeRequested,
          messageBody
        });
      }
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    setCompanyName('');
    setRecruiterContact('');
    setFeeRequested('');
    setMessageBody('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 py-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight font-headline">Report Fraud Syndicate</h3>
                <p className="text-xs text-red-100 mt-0.5">Directly inoculate the decentralized community defense mesh</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200"
              >
                <CheckCircle2 className="w-8 h-8" />
              </motion.div>
              <h4 className="text-xl font-bold text-slate-900 font-headline">Incident Intercepted</h4>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                Thank you. Your report has been anonymized and ingested into the ScamShield Threat Radar cluster. Verification fingerprint generated with hash:
              </p>
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-700 select-all">
                SEC-ID: #HASH-90214-IND-FRAUD-FLAGGED
              </div>
              <p className="text-xs text-emerald-600 font-medium mt-3 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Active across Hyderabad, Delhi, and Bengaluru verification nodes
              </p>
              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Platform Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Contact Channel / Platform
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'whatsapp', label: 'WhatsApp', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                    { id: 'telegram', label: 'Telegram', color: 'text-sky-700 bg-sky-50 border-sky-200' },
                    { id: 'email', label: 'Email', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
                    { id: 'instagram', label: 'Instagram', color: 'text-purple-700 bg-purple-50 border-purple-200' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPlatform(item.id as any)}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        platform === item.id
                          ? `${item.color} ring-2 ring-red-500/20 shadow-sm`
                          : 'border-slate-200 text-slate-600 bg-slate-50/70 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Impersonated entity & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    Company Claimed
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Infosys, TCS, Amazon HR"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Phone or Handle
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98765 43210 or @hr_jobs"
                    value={recruiterContact}
                    onChange={(e) => setRecruiterContact(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Fee requested */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Upfront Fee Demanded (if any)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹1,999 registration / training kit"
                  value={feeRequested}
                  onChange={(e) => setFeeRequested(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
                />
              </div>

              {/* Message text */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Suspicious Message Content / Offer Letter text
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Paste the suspicious text, instructions to pay, or job offer details here..."
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-colors resize-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Privacy Guaranteed:</strong> Personal identifiers (your phone/email) are stripped client-side before mesh ingestion.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Publishing to Mesh...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Submit Flag to Community
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
