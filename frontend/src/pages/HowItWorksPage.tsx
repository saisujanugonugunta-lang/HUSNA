import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Eye, 
  Info,
  Sparkles,
  Zap,
  Building2,
  FileCheck2,
  LockKeyhole
} from 'lucide-react';
import { PageRoute } from '../types';
import howItWorksScanImg from '../assets/images/how_it_works_scan_1789272077525.jpg';

interface HowItWorksPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEvidence: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigate,
  onOpenEvidence,
}) => {
  // Interactive Demonstration State
  const [activeHighlight, setActiveHighlight] = useState<'salary' | 'fee' | 'urgency' | 'telegram'>('fee');

  // Accordion state for 5 Deception Vectors
  const [expandedVector, setExpandedVector] = useState<number | null>(0);

  const highlightExplanations = {
    fee: {
      title: 'Monetary Demand Before Joining',
      clause: 'pay a refundable security deposit of ₹1,999',
      verdict: 'CRITICAL VIOLATION (ILO C181)',
      explanation: 'Under International Labor Organization Convention C181 (Fair Recruitment Standard) and Indian labor jurisprudence, legitimate employers NEVER charge job applicants registration fees, training kit costs, or laptop deposits. Any upfront payment request is 100% indicative of an extraction scam.',
      actionable: 'Do not transfer funds via UPI or payment gateway. Real companies provide equipment and onboarding free of charge.',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
    },
    salary: {
      title: 'Salary-to-Effort Disproportion',
      clause: 'earn ₹75,000 per month (work from home)',
      verdict: 'ANOMALY DETECTED (High Risk)',
      explanation: 'Promising executive-level compensation (₹75,000 - ₹1,50,000/mo) for entry-level work-from-home or data entry roles with zero prior technical requirements is classic phishing bait designed to lower the candidate’s critical defenses.',
      actionable: 'Cross-reference entry-level salary benchmarks on AmbitionBox and Glassdoor before proceeding.',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    urgency: {
      title: 'Coercive Temporal Pressure',
      clause: 'confirm within 2 hours or seat will be cancelled',
      verdict: 'PSYCHOLOGICAL COERCION',
      explanation: 'Scam syndicates impose aggressive 1-to-2 hour deadlines to induce panic. This prevents students from consulting parents, career counselors, or checking official websites before paying.',
      actionable: 'Legitimate corporate offers give candidates at least 3 to 7 business days to review formal terms.',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    },
    telegram: {
      title: 'Encrypted Channel Redirection',
      clause: 'Join Telegram channel: @hr_apex_jobs',
      verdict: 'TELEGRAM RELAY DETECTED',
      explanation: 'Urging applicants off formal platforms into private Telegram broadcast channels or burner WhatsApp groups prevents moderation and enables scammers to delete chat histories once the money is transferred.',
      actionable: 'Insist on corporate email communication from authenticated enterprise domains (@company.com).',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    },
  };

  const vectors = [
    {
      id: 0,
      title: 'Vector 1: Upfront Monetary Extraction',
      subtitle: 'Disguised as registration, laptop security, or training kit fee',
      details: 'Scammers invent believable administrative costs ("laptop insurance", "ID card courier", "background check fee") with promises of "100% refund in first month salary". Once paid, the fraudster vanishes or demands additional unlock fees.',
      realExample: 'Intercepted case #SH-92841: Demanded ₹1,999 refundable courier charge for HP Workstation laptop dispatch.',
    },
    {
      id: 1,
      title: 'Vector 2: Unofficial Channel Migration',
      subtitle: 'Diverting communication to Telegram or burner WhatsApp numbers',
      details: 'Legitimate HR departments maintain records on enterprise ATS systems (Workday, Greenhouse, Taleo) and send emails from corporate domains. Syndicates immediately route candidates into encrypted Telegram chat rooms.',
      realExample: 'Intercepted case #SH-88120: Redirected 320 college students to Telegram group "@amazon_remote_batch_5" managed by anonymous bot.',
    },
    {
      id: 2,
      title: 'Vector 3: Salary-to-Effort Disproportion',
      subtitle: 'Offering inflated compensation for trivial or undefined duties',
      details: 'High promises like "₹4,000 daily for liking YouTube videos or rating hotels on Google Maps" are designed to attract students needing quick money. They pay small returns (₹150) initially to gain trust before executing the primary theft.',
      realExample: 'Intercepted case #SH-74192: Promised ₹1,20,000 monthly for copy-pasting text from home 2 hours a day.',
    },
    {
      id: 3,
      title: 'Vector 4: High-Pressure Temporal Constraints',
      subtitle: 'Artificial deadlines triggering panic decision-making',
      details: 'Phrases like "Urgent joining today only", "Immediate slot allocation", or "Pay within 90 minutes" are psychological triggers engineered to bypass logical fact-checking.',
      realExample: 'Intercepted case #SH-62910: Fake appointment letter stated offer expires at 4:00 PM unless verification fee is sent.',
    },
    {
      id: 4,
      title: 'Vector 5: Forged Credentials & Generic Domain Mail',
      subtitle: 'Free Gmail/Outlook addresses with copy-pasted corporate seals',
      details: 'Syndicates paste low-resolution logos of reputable multinational brands onto fake letterheads, but send emails from addresses like `hr-recruitment-infosys@gmail.com`.',
      realExample: 'Intercepted case #SH-51829: Counterfeit TCS offer letter sent from free Outlook domain containing grammatical errors and fake signature.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f1fbff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold font-mono">
            <Cpu className="w-3.5 h-3.5 text-sky-600" />
            <span>Heuristic Verification Engine v3.4</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-headline tracking-tight leading-tight">
            How ScamShield Verifies Recruitment Authenticity
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-body-md leading-relaxed">
            Early Career Safety Initiative: Ephemeral in-memory analysis protecting 42,000+ students and job seekers without exposing personal documents.
          </p>
        </div>

        {/* End-to-End Verification Journey (3 Phases with SVG pulse line) */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sky-100 shadow-xl shadow-sky-900/5 relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded">
              VERIFICATION LIFECYCLE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-headline mt-2">
              End-to-End Autonomous Pipeline
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Phase 1 */}
            <div className="relative p-6 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-sky-600/20">
                01
              </div>
              <h4 className="text-base font-bold text-slate-900 font-headline">
                Phase 1: Detect
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-body-md">
                Optical character recognition (OCR) and token parser extract recruiter phone numbers, Telegram links, payment terms, and declared company identities in milliseconds.
              </p>
              <div className="text-[11px] font-mono text-sky-700 font-semibold pt-2 border-t border-sky-100">
                • 40+ Heuristic Checkpoints Active
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative p-6 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-amber-600/20">
                02
              </div>
              <h4 className="text-base font-bold text-slate-900 font-headline">
                Phase 2: Explain
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-body-md">
                Clauses are matched against the International Labor Organization Fair Recruitment Framework (ILO C181) and Ministry of Corporate Affairs (MCA21) registries.
              </p>
              <div className="text-[11px] font-mono text-amber-700 font-semibold pt-2 border-t border-amber-100">
                • Explainable Severity Scoring
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-600/20">
                03
              </div>
              <h4 className="text-base font-bold text-slate-900 font-headline">
                Phase 3: Protect
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-body-md">
                Generates actionable defense steps: block recruiter, verify via official LinkedIn portal, and propagate anonymized telemetry to inoculate other candidates.
              </p>
              <div className="text-[11px] font-mono text-emerald-700 font-semibold pt-2 border-t border-emerald-100">
                • Autonomous Community Inoculation
              </div>
            </div>
          </div>
        </div>

        {/* Holographic Document Forensics Showcase */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 rounded-3xl p-6 sm:p-8 text-white border border-sky-900/60 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  REAL-TIME OCR FORENSIC SCANNER
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  LATENCY: 18ms
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-headline text-white leading-tight">
                Sub-Second Neural Deconstruction
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-body-md leading-relaxed">
                When an applicant uploads an appointment letter or forwards a WhatsApp chat, our pipeline extracts the text via privacy-preserving in-memory OCR, cross-referencing salary benchmarks, legal registration clauses, and known fraud syndicates.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30">
                  <span className="text-[9.5px] font-mono uppercase text-cyan-400 block font-bold">OPTICAL ENGINE</span>
                  <span className="text-xs font-bold text-slate-100 font-headline">Text & Seal Extraction</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30">
                  <span className="text-[9.5px] font-mono uppercase text-emerald-400 block font-bold">PRIVACY ZERO-STORE</span>
                  <span className="text-xs font-bold text-slate-100 font-headline">RAM Wiped Post-Analysis</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <motion.div 
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full max-w-[480px] rounded-2xl overflow-hidden border border-cyan-500/40 shadow-2xl shadow-cyan-950/90 bg-slate-950 group"
              >
                {/* Laser Scanning Line Animation */}
                <motion.div 
                  animate={{ y: [-140, 240, -140] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_12px_#38bdf8] pointer-events-none z-30"
                />

                {/* Top HUD Bar */}
                <div className="absolute top-0 left-0 right-0 z-20 px-3 py-1.5 bg-gradient-to-b from-slate-950/90 to-transparent flex items-center justify-between text-[9.5px] font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    OCR_DECONSTRUCTION_STAGE
                  </span>
                  <span className="text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    SCAN_ACTIVE
                  </span>
                </div>

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={howItWorksScanImg}
                    alt="Cyber Security AI Document Scanner"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
                </div>

                {/* Bottom HUD Bar */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between p-2 rounded-xl bg-slate-950/90 border border-cyan-500/40 backdrop-blur-md text-[10px] font-mono">
                  <span className="text-slate-300">
                    40+ HEURISTIC VECTORS
                  </span>
                  <span className="text-cyan-400 font-bold">
                    IN-MEMORY VERIFICATION
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Interactive Demonstration: Click Highlights to Inspect */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded">
              INTERACTIVE DEMONSTRATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-headline mt-2">
              Inspect an Intercepted Offer Letter
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Click any highlighted phrase in the intercepted message below to view how ScamShield's engine interprets that specific deception vector.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Intercepted Offer with Clickable Highlights */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-bold text-slate-600 ml-2">
                    MOCK_OFFER_SAMPLE.TXT
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-red-50 text-red-700 px-2 py-0.5 rounded font-bold">
                  FRAUD IDENTIFIED
                </span>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-sm font-body-md text-slate-800 leading-loose">
                Dear Candidate, <br />
                We are pleased to inform that you have been shortlisted for the position of Assistant Project Coordinator at Apex Retail Solutions Ltd. You can{' '}
                <button
                  onClick={() => setActiveHighlight('salary')}
                  className={`px-1.5 py-0.5 rounded font-bold underline transition-all ${
                    activeHighlight === 'salary'
                      ? 'bg-amber-300 text-amber-950 ring-2 ring-amber-500'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  earn ₹75,000 per month
                </button>{' '}
                under our work-from-home initiative. To confirm your batch seat, you must{' '}
                <button
                  onClick={() => setActiveHighlight('fee')}
                  className={`px-1.5 py-0.5 rounded font-bold underline transition-all ${
                    activeHighlight === 'fee'
                      ? 'bg-red-400 text-white ring-2 ring-red-600'
                      : 'bg-red-100 text-red-900 hover:bg-red-200'
                  }`}
                >
                  pay a refundable security deposit of ₹1,999
                </button>{' '}
                and{' '}
                <button
                  onClick={() => setActiveHighlight('urgency')}
                  className={`px-1.5 py-0.5 rounded font-bold underline transition-all ${
                    activeHighlight === 'urgency'
                      ? 'bg-rose-400 text-white ring-2 ring-rose-600'
                      : 'bg-rose-100 text-rose-900 hover:bg-rose-200'
                  }`}
                >
                  confirm within 2 hours
                </button>{' '}
                or your seat will be cancelled. For fast-track onboarding,{' '}
                <button
                  onClick={() => setActiveHighlight('telegram')}
                  className={`px-1.5 py-0.5 rounded font-bold underline transition-all ${
                    activeHighlight === 'telegram'
                      ? 'bg-purple-400 text-white ring-2 ring-purple-600'
                      : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
                  }`}
                >
                  Join Telegram channel: @hr_apex_jobs
                </button>
                .
              </div>

              <div className="text-xs text-slate-400 flex items-center justify-between font-mono pt-2">
                <span>Click any highlighted segment to inspect</span>
                <span className="text-sky-600 font-bold">4 Vectored Triggers</span>
              </div>
            </div>

            {/* Right: Dynamic ScamShield Explanation Card */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                    SCAMSHIELD EXPLANATION ENGINE
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-red-950 text-red-300 border border-red-800">
                  {highlightExplanations[activeHighlight].verdict}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold font-headline text-white">
                  {highlightExplanations[activeHighlight].title}
                </h3>
                <div className="mt-2 p-2.5 bg-slate-800 rounded-xl border border-slate-700 font-mono text-xs text-slate-300">
                  Target Clause: <span className="text-sky-300 font-bold">"{highlightExplanations[activeHighlight].clause}"</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-body-md">
                {highlightExplanations[activeHighlight].explanation}
              </p>

              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ACTIONABLE RECOMMENDATION:</span>
                </div>
                <p className="text-xs text-white">
                  {highlightExplanations[activeHighlight].actionable}
                </p>
              </div>

              <button
                onClick={() => onNavigate('check-offer')}
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Run Scanner on Your Own Offer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* The 5 Canonical Deception Vectors (Accordion Cards) */}
        <div className="space-y-6 pt-6">
          <div>
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-red-700 bg-red-50 px-2.5 py-1 rounded">
              DEFENSE TAXONOMY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-headline mt-2">
              The 5 Canonical Deception Vectors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Every recruitment scam relies on one or more of these psychological and procedural exploitation patterns.
            </p>
          </div>

          <div className="space-y-3">
            {vectors.map((vec) => {
              const isOpen = expandedVector === vec.id;
              return (
                <div
                  key={vec.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-sky-300 transition-all"
                >
                  <div
                    onClick={() => setExpandedVector(isOpen ? null : vec.id)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-headline">
                        {vec.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{vec.subtitle}</p>
                    </div>

                    <div className="p-1 rounded-lg text-slate-400">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs leading-relaxed">
                      <p className="text-slate-700 font-body-md">
                        {vec.details}
                      </p>
                      <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl text-red-950 font-mono text-[11px]">
                        <strong>Real Syndicate Telemetry:</strong> {vec.realExample}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Zero Document Exposure Protocol Box */}
        <div className="bg-gradient-to-r from-sky-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-sky-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
              <LockKeyhole className="w-4 h-4" />
              <span>Zero Document Exposure Architecture</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-headline">
              Your Personal Identity Is Never At Risk
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              All parsed text and uploaded PDFs execute within an ephemeral in-memory container. Personal identifiers (candidate name, Aadhaar, PAN) are scrubbed before heuristic scoring.
            </p>
          </div>

          <button
            onClick={onOpenEvidence}
            className="px-6 py-3 bg-white text-slate-900 hover:bg-sky-50 rounded-xl text-xs font-semibold transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <FileCheck2 className="w-4 h-4 text-sky-600" />
            <span>Review Heuristic Schema</span>
          </button>
        </div>
      </div>
    </div>
  );
};
