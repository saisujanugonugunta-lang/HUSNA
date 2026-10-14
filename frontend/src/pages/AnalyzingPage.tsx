import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  AtSign, 
  CreditCard,
  Lock,
  Shield
} from 'lucide-react';
import { PageRoute } from '../types';
import cyberShieldImg from '../assets/images/cyber_security_shield_1789270789850.jpg';

interface AnalyzingPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AnalyzingPage: React.FC<AnalyzingPageProps> = ({ onNavigate }) => {
  const [progress, setProgress] = useState(78);

  // Subtle interactive progress feedback
  useEffect(() => {
    // Keep progress consistent with the 78% shown in the target design, 
    // with smooth initial transition
    setProgress(78);
  }, []);

  const handleProceedToResult = () => {
    onNavigate('analysis-result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-140px)] bg-[#eef8fd] py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Holographic High-Tech Watermarks & Grid */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Faint large cybernetic typographic watermarks matching screenshot */}
        <div className="absolute -top-6 left-10 text-[100px] sm:text-[140px] font-black font-mono text-slate-400/[0.07] tracking-widest leading-none">
          ENCE
        </div>
        <div className="absolute top-24 left-16 text-[90px] sm:text-[120px] font-black font-mono text-slate-400/[0.06] tracking-widest leading-none">
          SE
        </div>

        <div className="absolute -top-4 right-12 text-[90px] sm:text-[130px] font-black font-mono text-slate-400/[0.07] tracking-widest leading-none text-right">
          ACTIVE
        </div>
        <div className="absolute top-28 right-16 text-[80px] sm:text-[110px] font-black font-mono text-slate-400/[0.06] tracking-widest leading-none text-right">
          PROTO
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-4 text-[70px] sm:text-[100px] font-black font-mono text-slate-400/[0.06] tracking-widest leading-none text-right">
          NETWOIK ST
        </div>
        <div className="absolute top-[62%] right-8 text-[70px] sm:text-[90px] font-black font-mono text-slate-400/[0.05] tracking-widest leading-none text-right">
          NETWO
        </div>

        <div className="absolute bottom-12 left-10 text-[80px] sm:text-[110px] font-black font-mono text-slate-400/[0.05] tracking-widest leading-none">
          NODE-04
        </div>

        {/* Circular Constellation Radar Lines & Nodes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border border-sky-300/30 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] border border-dashed border-sky-300/40 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-sky-200/50 rounded-full pointer-events-none" />

        {/* Radial subtle ambient lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-sky-200/40 via-cyan-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Column */}
      <div className="relative z-10 w-full max-w-[650px] flex flex-col items-center">
        
        {/* Holographic Cyber Shield Visual with Orbital Connection Nodes */}
        <div className="relative mb-5 flex items-center justify-center">
          {/* Orbital connection lines & glowing node dots */}
          <svg className="absolute w-[280px] h-[220px] pointer-events-none overflow-visible -z-10" viewBox="0 0 280 220">
            {/* Top-right line to glowing node */}
            <line x1="180" y1="50" x2="235" y2="35" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="235" cy="35" r="4.5" fill="#38bdf8" />
            <circle cx="235" cy="35" r="8" fill="#38bdf8" fillOpacity="0.25" />

            {/* Left node */}
            <line x1="100" y1="110" x2="45" y2="110" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="45" cy="110" r="4" fill="#38bdf8" />
            <circle cx="45" cy="110" r="7" fill="#38bdf8" fillOpacity="0.25" />

            {/* Bottom-right diagonal node */}
            <line x1="185" y1="150" x2="230" y2="185" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="230" cy="185" r="4" fill="#38bdf8" />
            <circle cx="230" cy="185" r="7" fill="#38bdf8" fillOpacity="0.25" />
          </svg>

          {/* Holographic Shield Container */}
          <motion.div 
            animate={{ y: [-4, 4, -4], scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[128px] h-[128px] rounded-2xl bg-[#041326] p-1 shadow-2xl shadow-sky-500/25 border border-sky-400/60 relative overflow-hidden flex items-center justify-center group"
          >
            {/* Holographic Scanline Grid Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/20 via-transparent to-sky-950/90 pointer-events-none z-10" />

            {/* Glowing corner brackets */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-20" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-20" />

            {/* Animated subtle horizontal laser scan line */}
            <motion.div 
              animate={{ y: [-58, 58, -58] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-[2px] bg-cyan-300 shadow-[0_0_10px_#38bdf8] pointer-events-none z-20"
            />

            {/* Actual Cyber Security Shield Image */}
            <img
              src={cyberShieldImg}
              alt="Cyber Threat Engine Shield"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl relative z-0 shadow-inner group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* Autonomous Threat Engine Badge */}
        <div className="mb-3.5 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50/90 border border-sky-200/80 shadow-sm text-sky-700">
          <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_6px_#0ea5e9]" />
          <div className="flex flex-col text-left">
            <span className="text-[10.5px] font-mono font-bold tracking-wider uppercase text-sky-700 leading-tight">
              AUTONOMOUS THREAT ENGINE
            </span>
            <span className="text-[9px] font-mono text-sky-500 font-semibold leading-none">
              v4.2
            </span>
          </div>

          <span className="text-sky-300 text-xs">|</span>

          <div className="flex items-center gap-1.5 pl-0.5">
            <Shield className="w-3.5 h-3.5 text-sky-600" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[8.5px] font-mono font-bold text-sky-800 uppercase tracking-wider">
                ACTIVE
              </span>
              <span className="text-[8.5px] font-mono font-bold text-sky-800 uppercase tracking-wider">
                SCAN
              </span>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-[34px] font-bold text-slate-900 font-headline tracking-tight text-center leading-tight mb-2">
          Analyzing Offer Patterns...
        </h1>

        {/* Subheading: Preparing explanation */}
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-500" />
          <span className="text-xs sm:text-sm font-semibold text-sky-600">
            Preparing explanation...
          </span>
        </div>

        {/* Subtitle Description */}
        <p className="text-xs text-slate-500 text-center font-body-md max-w-lg mb-6 leading-relaxed">
          Checking against 140,000+ known employment scam signatures and MCA registry
        </p>

        {/* The White Card Container */}
        <div className="w-full bg-white rounded-3xl shadow-xl shadow-sky-900/5 border border-sky-100 p-6 sm:p-7 space-y-4">
          
          {/* Item 1: Checking payment requests */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-slate-900 font-headline">
                  Checking payment requests
                </div>
                <div className="text-xs text-slate-600 flex flex-wrap items-center gap-1.5 font-medium">
                  <span>Completed: Upfront ₹1,999 detected</span>
                  <span className="text-amber-500 font-bold">•</span>
                  <span className="text-amber-600">Security deposit red flag</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 shrink-0">
              VERIFIED
            </span>
          </div>

          {/* Item 2: Checking urgency signals */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-slate-900 font-headline">
                  Checking urgency signals
                </div>
                <div className="text-xs text-slate-600 flex flex-wrap items-center gap-1.5 font-medium">
                  <span>Completed: 2-hour pressure detected</span>
                  <span className="text-amber-500 font-bold">•</span>
                  <span className="text-amber-600">"Respond immediately"</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 shrink-0">
              VERIFIED
            </span>
          </div>

          {/* Item 3: Checking salary claims */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-slate-900 font-headline">
                  Checking salary claims
                </div>
                <div className="text-xs text-slate-600 flex flex-wrap items-center gap-1.5 font-medium">
                  <span>Completed: 3x benchmark anomaly</span>
                  <span className="text-amber-500 font-bold">•</span>
                  <span className="text-amber-600">₹85,000/mo for data entry</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 shrink-0">
              VERIFIED
            </span>
          </div>

          {/* Item 4: Checking company identity (ACTIVE ITEM in highlighted light blue box) */}
          <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-3 sm:p-3.5 -mx-1 sm:-mx-1.5 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-sky-500 border-t-transparent animate-spin shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-sky-950 font-headline">
                  Checking company identity
                </div>
                <div className="text-xs text-sky-600 font-medium">
                  Active: Querying MCA & LinkedIn registry...
                </div>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold tracking-wider text-white bg-sky-500 px-3 py-0.5 rounded-full shadow-sm shrink-0">
              ACTIVE
            </span>
          </div>

          {/* Threat pattern analysis progress bar */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>Threat pattern analysis in progress</span>
              </div>
              <span className="font-bold text-sky-600 font-mono text-xs sm:text-sm">
                {progress}%
              </span>
            </div>

            {/* Progress track */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: '60%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-sky-500 rounded-full"
              />
            </div>
          </div>

          {/* Detected Warning Indicators */}
          <div className="pt-2 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-500 tracking-wider uppercase">
                DETECTED WARNING INDICATORS
              </span>
              <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/80">
                4 Signals Flagged
              </span>
            </div>

            {/* Warning Badges Grid matching screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* UPFRONT PAYMENT */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="text-[10.5px] font-mono font-bold text-amber-900 tracking-wide uppercase truncate">
                  UPFRONT PAYMENT
                </span>
              </div>

              {/* URGENCY SIGNAL */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="text-[10.5px] font-mono font-bold text-amber-900 tracking-wide uppercase truncate">
                  URGENCY SIGNAL
                </span>
              </div>

              {/* SALARY ANOMALY */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="text-[10.5px] font-mono font-bold text-amber-900 tracking-wide uppercase truncate">
                  SALARY ANOMALY
                </span>
              </div>
            </div>

            {/* GENERIC DOMAIN Chip */}
            <div className="inline-flex">
              <div className="bg-slate-100/90 border border-slate-200/80 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
                <AtSign className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span className="text-[10.5px] font-mono font-bold text-slate-800 tracking-wide uppercase">
                  GENERIC DOMAIN
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Card Action Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Risk assessment ready — generating explainable report</span>
            </div>

            <button
              onClick={handleProceedToResult}
              className="w-full sm:w-auto px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 btn-interactive"
            >
              <span>View Threat Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Security Enclave Footer Note under card */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-mono text-center">
          <Lock className="w-3.5 h-3.5 text-sky-500" />
          <span>Zero Knowledge Sandbox</span>
          <span className="text-slate-400">•</span>
          <span>Secure Enclave Hash: 0x9F41...B2A</span>
        </div>

      </div>
    </div>
  );
};
