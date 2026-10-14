import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  Smartphone, 
  Zap, 
  Globe2, 
  CheckCheck,
  Languages,
  Clock,
  ArrowRight,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { PageRoute } from '../types';
import whatsappFraudBotImg from '../assets/images/whatsapp_fraud_bot_1789272088734.jpg';

interface WhatsAppBotPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenReportModal: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  isThreat?: boolean;
}

export const WhatsAppBotPage: React.FC<WhatsAppBotPageProps> = ({
  onNavigate,
  onOpenReportModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const officialNumber = '+91 90000 72260';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'Hi, I received this offer: Assistant Coordinator at Apex Retail Solutions. ₹75k salary, work from home. Asking ₹1,999 security deposit. Is this genuine?',
      time: '11:42 AM',
    },
    {
      id: 'msg-2',
      sender: 'bot',
      text: `⚠️ HIGH RISK FRAUD PATTERN (Threat Score: 82/100)\n\n• Demanding ₹1,999 refundable fee violates ILO Fair Recruitment standard C181.\n• Apex Retail Solutions has an unverified CIN in MCA21 registry.\n• Urgent 2-hour deadline is classic psychological coercion.\n\n🚨 DO NOT SEND ANY MONEY.\n\nReply STEPS for defensive guidance or REPORT to flag to our community radar.`,
      time: '11:42 AM',
      isThreat: true,
    },
  ]);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(officialNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMsg('');
    setIsTyping(true);

    // Simulate bot smart response
    setTimeout(() => {
      let botResponseText = '';
      const upper = text.toUpperCase();

      if (upper.includes('STEP')) {
        botResponseText = `🛡️ DEFENSIVE ACTION PLAYBOOK:\n1. Do not transfer any money via UPI or credit card.\n2. Block and report this number on WhatsApp.\n3. Verify job openings exclusively on official company careers portals.`;
      } else if (upper.includes('REPORT')) {
        botResponseText = `✅ Report recorded! Anonymous threat hash generated and synchronized with ScamShield Radar nodes. Thank you for protecting fellow job seekers.`;
      } else if (upper.includes('MCA')) {
        botResponseText = `🏢 MCA REGISTRY QUERY:\nCompany name failed active CIN validation in Ministry of Corporate Affairs database. No authenticated corporate recruitment domain detected.`;
      } else {
        botResponseText = `🤖 SCAMSHIELD ENGINE RESPONSE:\nAnalyzed: "${text.substring(0, 30)}..."\nStatus: Parsed through heuristic engine. Remember: Genuine recruiters NEVER demand registration or laptop fees before joining!`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isThreat: upper.includes('STEP'),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="w-full min-h-screen bg-[#f1fbff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Header & Helpline Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Installation Intelligence v2.4</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-headline tracking-tight leading-[1.15]">
              Instant Fraud Verification Directly in WhatsApp
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-body-md leading-relaxed max-w-xl">
              Forward any suspicious recruitment message, screenshot, or job offer letter to our official helpline for an immediate autonomous safety assessment without downloading apps.
            </p>

            {/* Official Helpline Box with Click-to-Copy */}
            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-sky-100 shadow-md space-y-3 max-w-lg">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                OFFICIAL VERIFICATION HELPLINE
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tracking-tight">
                      {officialNumber}
                    </span>
                    <span className="block text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Verified WhatsApp Business Account
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyNumber}
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                    title="Copy phone number"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <a
                    href="https://web.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 shrink-0"
                  >
                    <span>Open WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Micro-Features */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="p-3 bg-white/70 rounded-xl border border-sky-100 text-xs">
                <div className="font-bold text-slate-900">Zero App Installs</div>
                <div className="text-[11px] text-slate-500">Works in existing chat</div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-sky-100 text-xs">
                <div className="font-bold text-slate-900">Screenshot OCR</div>
                <div className="text-[11px] text-slate-500">Auto image parsing</div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-sky-100 text-xs">
                <div className="font-bold text-slate-900">Multilingual</div>
                <div className="text-[11px] text-slate-500">EN, हिन्दी, తెలుగు +</div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Smartphone Mockup Running WhatsApp Interface */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] bg-slate-900 rounded-[44px] p-3 shadow-2xl shadow-sky-900/20 border-4 border-slate-800">
              {/* Phone Speaker / Dynamic Island */}
              <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900" />
              </div>

              {/* Phone Screen Inner Container */}
              <div className="w-full h-[580px] bg-[#efeae2] rounded-[34px] overflow-hidden flex flex-col justify-between border border-slate-300 relative shadow-inner">
                {/* WhatsApp Chat Top Header */}
                <div className="bg-[#075e54] text-white px-3 py-2.5 flex items-center justify-between shadow-sm shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full bg-white text-emerald-800 flex items-center justify-center font-bold text-xs shadow">
                      SS
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-xs leading-tight">ScamShield Bot</span>
                        <CheckCheck className="w-3 h-3 text-sky-300" />
                      </div>
                      <div className="text-[9px] text-emerald-100 opacity-90">verified business • online</div>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-emerald-200 bg-emerald-800/60 px-2 py-0.5 rounded">
                    BOT v2.4
                  </div>
                </div>

                {/* Chat Messages Body */}
                <div className="flex-1 p-3 space-y-3 overflow-y-auto text-xs">
                  <div className="text-center my-1">
                    <span className="bg-amber-100/90 text-amber-900 text-[10px] px-2.5 py-0.5 rounded-md shadow-xs">
                      🔒 End-to-end encrypted AI defense
                    </span>
                  </div>

                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl shadow-xs whitespace-pre-wrap leading-relaxed ${
                          m.sender === 'user'
                            ? 'bg-[#d9fdd3] text-slate-800 rounded-tr-xs'
                            : 'bg-white text-slate-900 rounded-tl-xs border border-slate-200'
                        }`}
                      >
                        {m.text}
                        <div className="text-[9px] text-slate-400 text-right mt-1 font-mono">
                          {m.time}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white p-2.5 rounded-2xl shadow-xs text-[11px] text-slate-500 italic flex items-center gap-1.5 border border-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                        <span className="ml-1">ScamShield is analyzing offer...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Action Suggestion Chips */}
                <div className="px-3 py-1.5 bg-[#f0f2f5] border-t border-slate-200/60 flex items-center gap-1.5 overflow-x-auto shrink-0">
                  {['STEPS', 'REPORT', 'MCA CHECK', 'CLEAR'].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleSendMessage(chip)}
                      className="px-2 py-0.5 bg-white hover:bg-emerald-50 text-[10px] font-bold text-emerald-800 rounded-full border border-slate-200 shadow-xs whitespace-nowrap transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Bottom Interactive Message Input */}
                <div className="p-2 bg-[#f0f2f5] border-t border-slate-200 flex items-center gap-2 shrink-0">
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type message or paste offer..."
                    className="flex-1 px-3 py-2 text-xs bg-white rounded-full border border-slate-300 focus:outline-none focus:border-emerald-600"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center shadow hover:bg-[#008f6f] transition-colors shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Cyber Defense Intercept Showcase */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white border border-emerald-900/60 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  WHATSAPP CLOUD INOCULATION
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  ENTERPRISE API
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-headline text-white leading-tight">
                Autonomous Chatbot Interception Engine
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-body-md leading-relaxed">
                Forward job offers, appointment letters, or suspicious recruiter chats to our verified WhatsApp business helpline. Our AI analyzes the message and responds in seconds with a safety verdict and guidance.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30">
                  <span className="text-[9.5px] font-mono uppercase text-emerald-400 block font-bold">RESPONSE SPEED</span>
                  <span className="text-xs font-bold text-slate-100 font-headline">Instant &lt; 2.0s</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-teal-500/30">
                  <span className="text-[9.5px] font-mono uppercase text-teal-400 block font-bold">PRIVACY</span>
                  <span className="text-xs font-bold text-slate-100 font-headline">End-to-End Ephemeral</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <motion.div 
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full max-w-[480px] rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl shadow-emerald-950/90 bg-slate-950 group"
              >
                {/* Laser Scanning Line Animation */}
                <motion.div 
                  animate={{ y: [-140, 240, -140] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_12px_#34d399] pointer-events-none z-30"
                />

                {/* Top HUD Bar */}
                <div className="absolute top-0 left-0 right-0 z-20 px-3 py-1.5 bg-gradient-to-b from-slate-950/90 to-transparent flex items-center justify-between text-[9.5px] font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    NEURAL_FORWARD_INTERCEPT
                  </span>
                  <span className="text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    24/7 HELPLINE
                  </span>
                </div>

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={whatsappFraudBotImg}
                    alt="WhatsApp Cyber Scam Defense Bot"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
                </div>

                {/* Bottom HUD Bar */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between p-2 rounded-xl bg-slate-950/90 border border-emerald-500/40 backdrop-blur-md text-[10px] font-mono">
                  <span className="text-slate-300">
                    WHATSAPP BOT HELPLINE
                  </span>
                  <span className="text-emerald-400 font-bold">
                    +91 90000 12345
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bot Node Cluster Metrics */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900 font-headline">
                Bot Node Cluster Telemetry
              </h3>
              <p className="text-xs text-slate-500">Real-time throughput for WhatsApp gateway instances</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>GATEWAY: CONNECTED (99.98% UPTIME)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[10px] font-mono text-slate-400 uppercase">AVERAGE LATENCY</div>
              <div className="text-2xl font-bold text-slate-900 font-headline mt-0.5">1.8s</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Instant triage</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[10px] font-mono text-slate-400 uppercase">DAILY QUERIES</div>
              <div className="text-2xl font-bold text-sky-600 font-headline mt-0.5">14,290</div>
              <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Across India</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[10px] font-mono text-slate-400 uppercase">SUPPORTED LANGUAGES</div>
              <div className="text-2xl font-bold text-purple-600 font-headline mt-0.5">6+</div>
              <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Indic models active</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[10px] font-mono text-slate-400 uppercase">OCR ACCURACY</div>
              <div className="text-2xl font-bold text-emerald-600 font-headline mt-0.5">97.8%</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Screenshot detection</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA to Scanner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-600/20">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-headline">
              Prefer testing on our desktop workbench?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Use our interactive 4-stage scanner with 3D parallax analysis, MCA registry queries, and full heuristic evidence breakdown.
            </p>
          </div>

          <button
            onClick={() => onNavigate('check-offer')}
            className="px-6 py-3 bg-white text-emerald-950 rounded-xl text-xs font-semibold hover:bg-emerald-50 shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <span>Open Desktop Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
