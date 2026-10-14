import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Lock, EyeOff, Server, HardDrive, CheckCircle2 } from 'lucide-react';

interface ProtocolModalProps {
  type: 'privacy' | 'security' | null;
  onClose: () => void;
}

export const ProtocolModals: React.FC<ProtocolModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden my-8"
        >
          <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
                {type === 'privacy' ? <EyeOff className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-base font-headline">
                  {type === 'privacy' ? 'Zero Document Exposure Privacy Protocol' : 'Autonomous Security Architecture'}
                </h3>
                <p className="text-xs text-slate-400">
                  {type === 'privacy' ? 'Client-side ephemeral analysis standards' : 'ISO-aligned verification benchmarks'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-slate-700 text-xs leading-relaxed">
            {type === 'privacy' ? (
              <>
                <div className="p-3.5 bg-sky-50/70 rounded-xl border border-sky-200 text-sky-900 font-medium">
                  At ScamShield, we believe job seekers should never sacrifice personal confidentiality while checking recruitment authenticity.
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-headline">1. Ephemeral In-Memory Execution</strong>
                      When you paste text or upload an offer letter, text parsing runs in an ephemeral in-memory sandbox. The document is purged within milliseconds after generating the heuristic risk score.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-headline">2. Automated PII Redaction</strong>
                      Personal Identifiable Information (PII) including Candidate Name, Aadhaar/PAN numbers, home addresses, and bank accounts are automatically masked before heuristic scoring.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-headline">3. Zero Data Resale</strong>
                      ScamShield never sells candidate contact details to third parties, recruitment marketing agencies, or credit profiling networks.
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium">
                  Real-time autonomous defense mesh safeguarding students and job seekers from cyber syndicates.
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-headline">End-to-End TLS 1.3 Transport</strong>
                      All client payload transmissions leverage strict transport layer security with cryptographic hash validation.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Server className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-headline">Decentralized Threat Feed</strong>
                      Syndicate indicators (burner phone numbers, malicious Telegram bot handles, spoofed domains) are propagated across cluster nodes in real time.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <HardDrive className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-headline">Regulatory Alignment</strong>
                      Scoring models strictly observe Ministry of Corporate Affairs (MCA21) corporate registration and ILO fair recruitment standards.
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="pt-4 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
