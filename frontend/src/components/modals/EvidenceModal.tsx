import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, ShieldAlert, Cpu, Terminal, CheckCircle2, AlertOctagon } from 'lucide-react';

interface EvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportCode?: string;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  isOpen,
  onClose,
  reportCode = 'CR-9042-EVID'
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden my-8"
        >
          <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base font-headline">Autonomous Forensic Diagnostics</h3>
                <p className="text-xs text-slate-400 font-mono">Payload Dump • Heuristic Verification Engine v4.2</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Metadata bar */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">CASE FINGERPRINT</span>
                <span className="text-slate-800 font-semibold">{reportCode}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">PARSER ENGINE</span>
                <span className="text-slate-800 font-semibold">Gemini + Rule-Mesh v4</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CONFIDENCE SCORE</span>
                <span className="text-red-600 font-bold">96.8% Malicious</span>
              </div>
            </div>

            {/* Forensic checkpoints */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-headline">
                Deception Vector Checkpoint Logs
              </h4>

              <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-red-900">
                  <span className="flex items-center gap-1.5">
                    <AlertOctagon className="w-3.5 h-3.5 text-red-600" />
                    [VECTOR-1] Upfront Monetary Obligation (Registration / Kit)
                  </span>
                  <span className="font-mono text-[11px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded">MATCHED</span>
                </div>
                <p className="text-xs text-slate-600 pl-5">
                  String match detected: <code>"registration fee of ₹1,999"</code>. Violates ILO fair recruitment benchmark C181 Article 7 (prohibiting charging recruitment fees to jobseekers).
                </p>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-900">
                  <span className="flex items-center gap-1.5">
                    <AlertOctagon className="w-3.5 h-3.5 text-amber-600" />
                    [VECTOR-2] Channel Migration to Telegram Relay
                  </span>
                  <span className="font-mono text-[11px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">MATCHED</span>
                </div>
                <p className="text-xs text-slate-600 pl-5">
                  Redirect URL detected: <code>t.me/hr_desk_apex</code>. Recruiter diverts communication away from corporate ATS into unmonitored encrypted broadcast channel.
                </p>
              </div>

              <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-rose-900">
                  <span className="flex items-center gap-1.5">
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                    [VECTOR-3] Artificial Urgency Deadline Constraint
                  </span>
                  <span className="font-mono text-[11px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">MATCHED</span>
                </div>
                <p className="text-xs text-slate-600 pl-5">
                  Extracted heuristic: <code>"offer expires in 2 hours"</code>. High psychological pressure pattern designed to preempt victim validation or consultation with family.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-sky-600" />
                    [VECTOR-4] No Interview Assessment Check
                  </span>
                  <span className="font-mono text-[11px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">VERIFIED</span>
                </div>
                <p className="text-xs text-slate-600 pl-5">
                  Direct appointment letter issuance without technical rounds, background check, or hiring manager interview recorded.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-mono text-[11px]">
                Cryptographic Signature: SHA256:7e99...d014
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors"
              >
                Close Diagnostics
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
