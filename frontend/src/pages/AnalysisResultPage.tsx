import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  AlertTriangle,
  Building2,
  Share2,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Search,
  RefreshCw,
} from 'lucide-react';
import { PageRoute } from '../types';

interface BackendAnalysis {
  success: boolean;
  risk: string;
  score: number;
  reasons: string[];
  recommendation: string;
  submittedText?: string;
  analyzedAt?: string;
}

interface AnalysisResultPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenVerifyCompany: () => void;
  onOpenShareWarning: () => void;
  onOpenEvidence: () => void;
  onOpenReportModal: () => void;
}

function readSavedResult(): BackendAnalysis | null {
  try {
    const raw = sessionStorage.getItem('hsLastAnalysisResult');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BackendAnalysis;
    if (typeof parsed.risk !== 'string' || typeof parsed.score !== 'number' || !Array.isArray(parsed.reasons)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export const AnalysisResultPage: React.FC<AnalysisResultPageProps> = ({
  onNavigate,
  onOpenVerifyCompany,
  onOpenShareWarning,
  onOpenEvidence,
  onOpenReportModal,
}) => {
  const [analysis] = useState<BackendAnalysis | null>(() => readSavedResult());
  const risk = (analysis?.risk || '').toLowerCase();
  const styles = useMemo(() => {
    if (risk === 'high') return {
      banner: 'from-red-600 via-rose-600 to-red-700',
      border: 'border-red-200',
      pill: 'bg-red-100 text-red-800',
      label: 'High risk',
      icon: 'text-red-600',
    };
    if (risk === 'medium') return {
      banner: 'from-amber-500 via-orange-500 to-amber-600',
      border: 'border-amber-200',
      pill: 'bg-amber-100 text-amber-800',
      label: 'Medium risk',
      icon: 'text-amber-600',
    };
    return {
      banner: 'from-emerald-600 via-teal-600 to-emerald-700',
      border: 'border-emerald-200',
      pill: 'bg-emerald-100 text-emerald-800',
      label: risk === 'low' ? 'Low risk' : 'Risk result unavailable',
      icon: 'text-emerald-600',
    };
  }, [risk]);

  return (
    <div className="w-full min-h-screen bg-[#f1fbff] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('check-offer')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" /> Analyze Another Recruitment Message
        </button>
        <button
          onClick={onOpenEvidence}
          className="text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 transition-colors flex items-center gap-1.5 self-start"
        >
          <FileText className="w-3.5 h-3.5" /> Evidence
        </button>
      </div>

      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-6"
      >
        {!analysis ? (
          <section className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm">
            <div className="flex gap-3 items-start">
              <AlertTriangle className="w-7 h-7 text-amber-600 shrink-0" />
              <div>
                <h1 className="text-xl font-bold text-slate-900">No analysis result found</h1>
                <p className="mt-2 text-sm text-slate-600">Return to the offer checker and submit a message. The result page displays the response returned by your backend.</p>
                <button onClick={() => onNavigate('check-offer')} className="mt-4 rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white">Analyze an offer</button>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className={`rounded-3xl overflow-hidden border ${styles.border} bg-white shadow-xl shadow-sky-900/5`}>
              <div className={`bg-gradient-to-r ${styles.banner} px-6 sm:px-8 py-7 text-white`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20 shrink-0">
                      <ShieldAlert className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="inline-flex rounded-md bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-800">Backend analysis result</span>
                      <h1 className="text-2xl sm:text-3xl font-bold mt-2">{styles.label}</h1>
                      <p className="text-sm text-white/90 mt-2 max-w-2xl">{analysis.recommendation}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/20 p-4 text-center min-w-[130px]">
                    <div className="text-[10px] uppercase tracking-wider text-white/80">Rule score</div>
                    <div className="text-4xl font-bold my-1">{analysis.score}</div>
                    <div className="text-[10px] text-white/80">matched points</div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Why this message was flagged</h2>
                  <p className="text-sm text-slate-500 mt-1">These reasons were returned by your deployed HS LAST backend.</p>
                  {analysis.reasons.length ? (
                    <ul className="mt-4 space-y-3">
                      {analysis.reasons.map((reason, index) => (
                        <li key={`${index}-${reason}`} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                          <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${styles.icon}`} />
                          <span className="text-sm text-slate-700">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-slate-600">No listed warning signs were detected.</p>
                  )}
                </div>

                {analysis.submittedText && (
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 mb-2">Message analyzed</h2>
                    <blockquote className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 whitespace-pre-wrap">{analysis.submittedText}</blockquote>
                  </div>
                )}

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <strong>Important:</strong> This prototype uses phrase-based rules. A Low result does not prove a job offer is genuine, and a High result alone does not prove fraud. Independently verify the employer and never share passwords, OTPs, or payment PINs.
                </div>

                <div className="flex flex-wrap gap-3">
                  <button onClick={onOpenVerifyCompany} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                    <Building2 className="w-4 h-4 text-sky-600" /> Verify company
                  </button>
                  <button onClick={onOpenShareWarning} className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-800 hover:bg-sky-100">
                    <Share2 className="w-4 h-4" /> Share warning
                  </button>
                  <button onClick={onOpenReportModal} className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-800 hover:bg-red-100">
                    <AlertTriangle className="w-4 h-4" /> Report offer
                  </button>
                  <button onClick={() => onNavigate('check-offer')} className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800">
                    <RefreshCw className="w-4 h-4" /> Analyze another
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </motion.main>
    </div>
  );
};
