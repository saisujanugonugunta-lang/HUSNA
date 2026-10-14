import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  UploadCloud, 
  FileText, 
  Mic, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Eye, 
  ChevronRight,
  Search,
  ExternalLink,
  Info,
  Building,
  DollarSign,
  Clock,
  Send,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { PageRoute } from '../types';
import heroJobScamImg from '../assets/images/hero_job_scam_1789272051915.jpg';

interface CheckOfferPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenEvidence: () => void;
  onOpenReportModal: () => void;
}

export const CheckOfferPage: React.FC<CheckOfferPageProps> = ({
  onNavigate,
  onOpenEvidence,
  onOpenReportModal,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'file' | 'voice'>('text');
  const [messageText, setMessageText] = useState(
    'Congratulations! You are shortlisted for the position of Assistant Project Coordinator at Apex Retail Solutions Ltd. Salary: ₹75,000/month. Work from home. To confirm your seat, pay a refundable security deposit of ₹1,999 within 2 hours. Join Telegram channel: @hr_apex_jobs.'
  );
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 3D Tilt state for the Glass Shield
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 8,
      y: (x / (rect.width / 2)) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const loadPreset = (presetType: 'apex' | 'telegram' | 'cleared') => {
    if (presetType === 'apex') {
      setMessageText(
        'Congratulations! You are shortlisted for the position of Assistant Project Coordinator at Apex Retail Solutions Ltd. Salary: ₹75,000/month. Work from home. To confirm your seat, pay a refundable security deposit of ₹1,999 within 2 hours. Join Telegram channel: @hr_apex_jobs.'
      );
    } else if (presetType === 'telegram') {
      setMessageText(
        'Dear Candidate, Google India Part-Time Task Department selected your profile. Earn ₹3,000 to ₹8,000 daily by rating hotels on Google Maps. No interview needed. Contact Manager Linda on Telegram: https://t.me/task_manager_india immediately.'
      );
    } else {
      setMessageText('');
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleTriggerAnalysis = async () => {
    if (activeTab === 'file') {
      setAnalysisError('Screenshot/PDF text extraction is not connected yet. Select “Paste Message / Text” and paste the offer text to analyze it.');
      return;
    }
    if (activeTab === 'voice') {
      setAnalysisError('Voice transcription is not connected yet. Load the sample transcript or switch to “Paste Message / Text” and enter the message.');
      return;
    }
    const offerText = messageText.trim();
    if (!offerText) {
      setAnalysisError('Please paste a job offer or recruitment message before analyzing.');
      return;
    }

    setAnalysisError('');
    setIsAnalyzing(true);
    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const response = await fetch(`${apiBase}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: offerText }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || `Analysis request failed (${response.status}).`);
      }
      if (!result || typeof result.risk !== 'string' || typeof result.score !== 'number' || !Array.isArray(result.reasons)) {
        throw new Error('The backend response was not in the expected format.');
      }
      sessionStorage.setItem('hsLastAnalysisResult', JSON.stringify({
        ...result,
        submittedText: offerText,
        analyzedAt: new Date().toISOString(),
      }));
      onNavigate('analysis-result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to connect to the analysis service.';
      setAnalysisError(`${message} Please try again in a moment.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f1fbff] text-[#001f27]">
      {/* Top Notice Bar */}
      <div className="bg-sky-900 text-sky-100 text-xs py-2 px-4 text-center font-medium border-b border-sky-800 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>ScamShield v4.2 Active: Over 4,900 recruitment fraud signatures cataloged across India today.</span>
        <button
          onClick={() => onNavigate('scam-radar')}
          className="underline hover:text-white ml-2 text-sky-200"
        >
          View Live Radar →
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
        {/* Subtle decorative background gradient blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-200/40 via-blue-100/20 to-transparent pointer-events-none blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Autonomous Job Fraud Intelligence</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-headline leading-[1.15]">
                Verify Any Job Offer or Recruitment Message in Seconds
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-body-md max-w-2xl leading-relaxed">
                Upload screenshot, paste recruitment message, or check suspicious interview requests before paying fees or sharing sensitive personal documents.
              </p>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-sky-100 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Zero Upfront Fee Rule (ILO C181)
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-sky-100 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  MCA-21 Corporate Cross-Match
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-sky-100 shadow-sm">
                  <Lock className="w-4 h-4 text-sky-600" />
                  Ephemeral In-Memory Sandbox
                </span>
              </div>
            </div>

            {/* Right: 3D Interactive Parallax Shield */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl p-6 glass-shield-pane shield-float cursor-pointer select-none transition-transform duration-150"
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
                onClick={handleTriggerAnalysis}
              >
                {/* Glowing laser scanning line */}
                <div className="laser-scan-line absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_15px_#38bdf8]" />

                <div className="relative h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-sky-700 bg-sky-100/80 px-2.5 py-1 rounded-md border border-sky-200">
                      SENTINEL v4.2
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      MONITORING
                    </span>
                  </div>

                  {/* Center Shield Graphic */}
                  <div className="flex flex-col items-center justify-center my-auto text-center">
                    <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-500 text-white flex items-center justify-center shadow-xl shadow-sky-500/30">
                      <ShieldCheck className="w-14 h-14 text-white" />
                      <div className="absolute inset-0 rounded-2xl border border-white/30" />
                    </div>
                    <h3 className="mt-4 font-bold text-base text-slate-900 font-headline">
                      Autonomous Defense Shield
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
                      Cross-checks WhatsApp & Telegram vectors in real time
                    </p>
                  </div>

                  {/* Shield Bottom telemetry */}
                  <div className="pt-3 border-t border-sky-200/60 flex items-center justify-between text-[11px] font-mono text-slate-600">
                    <span>STATUS: ACTIVE</span>
                    <span className="text-sky-700 font-bold">CLICK TO SCAN →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive 4-Stage Workbench Scanner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-sky-900/5 border border-sky-100 p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('text')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'text'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Paste Message / Text</span>
              </button>

              <button
                onClick={() => setActiveTab('file')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'file'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Screenshot / PDF</span>
              </button>

              <button
                onClick={() => setActiveTab('voice')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'voice'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>Audio / Voice Note</span>
              </button>
            </div>

            {/* Quick Load Example Presets */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 hidden sm:inline">Load sample:</span>
              <button
                type="button"
                onClick={() => loadPreset('apex')}
                className="px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-medium border border-red-200/80 transition-colors"
              >
                ₹1,999 Fee Scam
              </button>
              <button
                type="button"
                onClick={() => loadPreset('telegram')}
                className="px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg font-medium border border-sky-200/80 transition-colors hidden sm:inline-block"
              >
                Google Task Scam
              </button>
              <button
                type="button"
                onClick={() => loadPreset('cleared')}
                className="px-2 py-1 text-slate-400 hover:text-slate-600 underline"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  rows={5}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Paste WhatsApp message, recruitment email body, or job offer letter contents here..."
                  className="w-full p-4 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-body-md leading-relaxed resize-none"
                />
                <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 font-mono">
                  {messageText.length} characters • Heuristic ready
                </div>
              </div>
            </div>
          )}

          {analysisError && (
            <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {analysisError}
            </div>
          )}
          {isAnalyzing && (
            <div role="status" className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-800">
              Sending your message to the HS LAST backend for analysis…
            </div>
          )}

          {activeTab === 'file' && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
                isDragging ? 'border-sky-500 bg-sky-50' : 'border-slate-300 hover:border-sky-400 bg-slate-50/50'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,.pdf"
                className="hidden"
              />
              <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 font-headline">
                {uploadedFile ? uploadedFile.name : 'Drag and drop offer screenshot or PDF here'}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Supports PNG, JPG, WEBP, and PDF up to 15MB. Optical character OCR extracts text automatically.
              </p>
              {uploadedFile && (
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold border border-emerald-200">
                  <FileCheck className="w-3.5 h-3.5" />
                  Ready for OCR inspection
                </div>
              )}
            </div>
          )}

          {activeTab === 'voice' && (
            <div className="p-8 border border-slate-200 rounded-2xl text-center bg-slate-50/70 space-y-3">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
                <Mic className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 font-headline">
                Audio Note & Interview Recording Inspector
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Upload WhatsApp voice notes or telephonic recruitment recordings. Speech-to-text transcriber evaluates coercive urgency and fee demands.
              </p>
              <button
                type="button"
                onClick={() => {
                  setMessageText(
                    'Voice Transcript: "Hello sir, your resume was approved for Amazon backend. Today is last day for batch joining. You have to send ₹2,500 for company laptop kit registration immediately on Google Pay."'
                  );
                  setActiveTab('text');
                }}
                className="text-xs text-sky-600 hover:text-sky-800 font-semibold underline"
              >
                Load sample voice transcript
              </button>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Ephemeral In-Memory Analysis:</strong> Your documents and messages are processed safely and never stored permanently.
              </span>
            </div>

            <button
              onClick={handleTriggerAnalysis}
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white rounded-xl text-sm font-bold shadow-lg shadow-sky-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 btn-interactive disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'Analyzing…' : 'Check this message'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Early Career Safety Initiative Story Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-sky-900 shadow-2xl overflow-hidden relative">
          {/* Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-sky-400 bg-sky-950/80 px-3 py-1 rounded-md border border-sky-800">
                  Early Career Safety Initiative
                </span>
                <span className="text-[10px] font-mono font-semibold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/50 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                  Live Threat Intercepts
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-headline leading-snug">
                Protecting 42,000+ Graduates Across 180+ College Campuses
              </h2>

              <p className="text-sm text-slate-300 font-body-md leading-relaxed">
                Fake recruitment syndicates target fresh graduates on WhatsApp and Telegram by mimicking prestigious IT brands, promising remote work, and demanding upfront deposits for "training materials" or "laptop shipping." ScamShield dismantles these deception patterns before money is lost.
              </p>

              <div className="pt-2 flex items-center gap-6 text-xs font-medium">
                <div>
                  <div className="text-2xl font-bold text-emerald-400 font-headline">96.4%</div>
                  <div className="text-slate-400">Scam Detection Accuracy</div>
                </div>
                <div className="border-l border-slate-700 pl-6">
                  <div className="text-2xl font-bold text-sky-400 font-headline">₹3.8 Cr+</div>
                  <div className="text-slate-400">Student Losses Prevented</div>
                </div>
                <div className="border-l border-slate-700 pl-6 hidden sm:block">
                  <div className="text-2xl font-bold text-amber-400 font-headline">18ms</div>
                  <div className="text-slate-400">Average Verification Latency</div>
                </div>
              </div>

              {/* Student Quote Box */}
              <div className="mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                    AK
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-headline">Ananya K.</div>
                    <div className="text-[10px] text-slate-400">B.Tech Graduate, Hyderabad</div>
                  </div>
                </div>
                <p className="text-xs text-slate-200 italic leading-relaxed">
                  "I almost paid ₹1,999 for a laptop shipping charge after getting an official-looking offer letter from 'Apex Solutions'. ScamShield scanned it in 3 seconds, showed the unverified MCA CIN and fake Telegram handle, and saved me from a complete fraud."
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] text-emerald-400 font-mono">
                  <span>VERIFIED INTERCEPT</span>
                  <span>DEC 2024</span>
                </div>
              </div>
            </div>

            {/* Right: Dramatic Animated Cyber Threat Visual Showcase */}
            <div className="lg:col-span-6 flex justify-center">
              <motion.div 
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full max-w-[500px] rounded-2xl overflow-hidden border border-sky-400/40 shadow-2xl shadow-sky-950/80 bg-slate-950 group"
              >
                {/* Laser Scanning Line Animation */}
                <motion.div 
                  animate={{ y: [-150, 260, -150] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_12px_#38bdf8] pointer-events-none z-30"
                />

                {/* Top Telemetry Bar */}
                <div className="absolute top-0 left-0 right-0 z-20 px-3.5 py-2 bg-gradient-to-b from-slate-950/90 to-transparent flex items-center justify-between text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>SYNDICATE RECONNAISSANCE</span>
                  </div>
                  <span className="text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    LIVE_TRAP_MONITOR
                  </span>
                </div>

                {/* Cyber Security Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={heroJobScamImg}
                    alt="Cyber Job Recruitment Scam Trap Intercept"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30 pointer-events-none" />
                </div>

                {/* Cyber Deception Floating Overlays */}
                <div className="absolute bottom-3 left-3 right-3 z-20 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-red-950/90 border border-red-500/60 text-red-300 font-mono text-[9.5px] font-bold shadow">
                      🚨 FAKE TELEGRAM RECRUITMENT
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-950/90 border border-amber-500/60 text-amber-300 font-mono text-[9.5px] font-bold shadow">
                      ₹1,999 REGISTRATION FEE TRAP
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-900/90 border border-sky-500/40 backdrop-blur-md flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-headline font-bold text-xs text-sky-200">
                        Autonomous Inoculation Engine Active
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">
                      PROTECTED
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Core Pillars: DETECT, EXPLAIN, PROTECT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono font-bold tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-md border border-sky-200">
            Autonomous Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-headline mt-3">
            How ScamShield Safeguards Your Career Journey
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Three interconnected layers of protection preventing fraud at every recruitment stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: DETECT */}
          <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-100/70 px-2 py-0.5 rounded">
                STAGE 01
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-headline mt-2">
                DETECT: Heuristic AI Engine
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-body-md">
              Extracts 40+ recruitment deception patterns including fee demands, generic domain headers, and spoofed signatures before any victim payment is made.
            </p>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Burner Telegram / WhatsApp channel checks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Unrealistic salary-to-effort anomaly scoring</span>
              </li>
            </ul>
          </div>

          {/* Card 2: EXPLAIN */}
          <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                STAGE 02
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-headline mt-2">
                EXPLAIN: Behavioral Breakdown
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-body-md">
              Dissects exact sentences that violate fair recruitment norms with clear severity indicators so candidates comprehend why an offer is dangerous.
            </p>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Highlighted deceptive clauses and coercive phrases</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>International Labor Organization (ILO) standards</span>
              </li>
            </ul>
          </div>

          {/* Card 3: PROTECT */}
          <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                STAGE 03
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-headline mt-2">
                PROTECT: Actionable Playbook
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-body-md">
              Step-by-step guidance on reporting, blocking, and validating via MCA and LinkedIn registries without exposing personal banking details.
            </p>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>One-click MCA Corporate Registry cross-reference</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>National Cyber Crime reporting documentation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6 Common Scam Signals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-red-700 bg-red-50 px-3 py-1 rounded-md border border-red-200">
              Pattern Recognition
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-headline mt-2">
              6 Common Recruitment Scam Signals
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              If an offer displays any of these characteristics, treat it as high risk immediately.
            </p>
          </div>

          <button
            onClick={onOpenEvidence}
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 px-4 py-2 rounded-xl border border-sky-200 self-start md:self-auto"
          >
            <span>View Full Heuristic Diagnostics</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: '1',
              title: 'Upfront Payment Demands',
              description: 'Demanding registration fees, document verification charges, or "refundable" laptop deposits before starting work.',
              icon: DollarSign,
              tag: '100% FRAUD INDICATOR',
              color: 'text-red-700 bg-red-50 border-red-200',
            },
            {
              id: '2',
              title: 'Unrealistic Compensation',
              description: 'Offering ₹75,000 to ₹1,50,000 per month for entry-level data entry or rating hotels with no prior experience.',
              icon: AlertTriangle,
              tag: 'SALARY ANOMALY',
              color: 'text-amber-700 bg-amber-50 border-amber-200',
            },
            {
              id: '3',
              title: 'Generic Email Domains',
              description: 'Recruiters communicating via free Gmail, Yahoo, or Outlook addresses rather than an authenticated corporate domain.',
              icon: Building,
              tag: 'DOMAIN SPOOF',
              color: 'text-sky-700 bg-sky-50 border-sky-200',
            },
            {
              id: '4',
              title: 'Channel Redirection',
              description: 'Quickly urging candidates off job portals into encrypted Telegram broadcast channels or unofficial WhatsApp groups.',
              icon: Send,
              tag: 'TELEGRAM RELAY',
              color: 'text-purple-700 bg-purple-50 border-purple-200',
            },
            {
              id: '5',
              title: 'Artificial Urgency Deadlines',
              description: '"Confirm in 2 hours or your seat will be given to another candidate." Used to provoke panic and bypass caution.',
              icon: Clock,
              tag: 'COERCIVE PRESSURE',
              color: 'text-rose-700 bg-rose-50 border-rose-200',
            },
            {
              id: '6',
              title: 'No Interview or Evaluation',
              description: 'Direct issuance of appointment letters and offer contracts without technical tests, rounds, or hiring manager calls.',
              icon: HelpCircle,
              tag: 'ZERO SELECTION',
              color: 'text-slate-700 bg-slate-100 border-slate-200',
            },
          ].map((signal) => {
            const Icon = signal.icon;
            return (
              <div
                key={signal.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-300 transition-all shadow-sm hover:shadow-md space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${signal.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {signal.tag}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 font-headline">
                  {signal.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {signal.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-8">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-sky-600/20">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-headline">
              Received a suspicious job offer right now?
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 max-w-xl">
              Don't pay any deposit. Paste the offer into our autonomous analyzer or test with our real-time verification engine.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleTriggerAnalysis}
              disabled={isAnalyzing}
              className="px-6 py-3 bg-white text-sky-900 rounded-xl text-xs font-bold hover:bg-sky-50 shadow-md transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{isAnalyzing ? 'Analyzing…' : 'Analyze Threat Patterns'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('whatsapp-bot')}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 transition-all"
            >
              Verify on WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
