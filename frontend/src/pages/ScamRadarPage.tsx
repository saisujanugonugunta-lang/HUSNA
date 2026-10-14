import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  Search, 
  Filter, 
  MapPin, 
  ShieldAlert, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  ExternalLink, 
  Clock, 
  Building, 
  RotateCcw,
  MessageSquare,
  Mail,
  Instagram,
  FileX2,
  CheckCircle2,
  Globe,
  Maximize2,
  Activity,
  Zap,
  Layers,
  Wifi,
  TrendingUp
} from 'lucide-react';
import { PageRoute } from '../types';
import threatRadarMapImg from '../assets/images/threat_radar_map_1789272066241.jpg';
import cyberThreatMapImg from '../assets/images/cyber_threat_map_hud_1789272404449.jpg';

interface ScamRadarPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenReportModal: () => void;
}

interface FeedItem {
  id: string;
  company: string;
  handle: string;
  platform: 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'fake-offers';
  fee: string;
  threatLevel: 'Critical' | 'High' | 'Caution';
  timeAgo: string;
  description: string;
  details: string;
  reportCount: number;
}

export const ScamRadarPage: React.FC<ScamRadarPageProps> = ({
  onNavigate,
  onOpenReportModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [selectedHub, setSelectedHub] = useState<string | null>('hyderabad');
  const [expandedRow, setExpandedRow] = useState<string | null>('item-1');
  const [visibleCount, setVisibleCount] = useState(5);
  const [activeMapMode, setActiveMapMode] = useState<'global' | 'regional'>('global');
  const [selectedGlobalCity, setSelectedGlobalCity] = useState<string | null>('New York');

  const globalCityNodes = [
    { name: 'New York', top: '41%', left: '72%', signals: 1420, threat: 'High Alert', vector: 'Phishing Syndicate', ip: '198.51.100.24' },
    { name: 'Chicago', top: '39%', left: '55%', signals: 890, threat: 'Elevated', vector: 'Fake Job Recruiters', ip: '203.0.113.12' },
    { name: 'Los Angeles', top: '50%', left: '25%', signals: 1105, threat: 'High Alert', vector: 'Vishing / Scam Call Relay', ip: '198.51.100.88' },
    { name: 'Dallas', top: '67%', left: '46%', signals: 640, threat: 'Moderate', vector: 'Telegram Task Bot', ip: '192.0.2.77' },
    { name: 'Miami', top: '75%', left: '68%', signals: 780, threat: 'Elevated', vector: 'Fee Phishing Trap', ip: '203.0.113.44' },
    { name: 'Toronto', top: '31%', left: '70%', signals: 520, threat: 'Elevated', vector: 'Cross-Border Wire Trap', ip: '192.0.2.145' },
  ];

  const liveScamAttacks = [
    { from: 'New York', to: 'Chicago', type: 'Phishing', ip: '198.51.100.24', time: '14:58:22' },
    { from: 'LA', to: 'Dallas', type: 'Scam Call', ip: '203.0.113.88', time: '14:58:19' },
    { from: 'Toronto', to: 'Montreal', type: 'Fraud', ip: '192.0.2.145', time: '14:58:15' },
    { from: 'LA', to: 'Dallas', type: 'Scam Call', ip: '198.51.100.91', time: '14:58:11' },
    { from: 'Chicago', to: 'Miami', type: 'Phishing', ip: '203.0.113.12', time: '14:58:08' },
    { from: 'Toronto', to: 'Montreal', type: 'Fraud', ip: '192.0.2.67', time: '14:58:02' },
  ];

  const initialFeed: FeedItem[] = [
    {
      id: 'item-1',
      company: 'Apex Retail Solutions Ltd',
      handle: '@hr_apex_jobs (Telegram)',
      platform: 'telegram',
      fee: '₹1,999 (Security Deposit)',
      threatLevel: 'Critical',
      timeAgo: '4 mins ago',
      description: 'Work-from-home Assistant Project Coordinator offer demanding ₹1,999 refundable fee for training laptop dispatch.',
      details: 'Victim targeted via direct WhatsApp message from unknown +91 93211 series number. Urged to contact Telegram account before 2-hour deadline.',
      reportCount: 48,
    },
    {
      id: 'item-2',
      company: 'Google India Task Dept (Spoofed)',
      handle: '+91 98450 11209 (WhatsApp)',
      platform: 'whatsapp',
      fee: '₹2,500 - ₹10,000 (Crypto / UPI Task)',
      threatLevel: 'Critical',
      timeAgo: '18 mins ago',
      description: 'Promises ₹5,000 daily for rating hotels on Google Maps. Asks for initial deposit in Telegram VIP channel to unlock payouts.',
      details: 'Classic part-time task scam. Victim receives small initial return (₹150) before fraudsters lock funds and demand large unlock transfers.',
      reportCount: 114,
    },
    {
      id: 'item-3',
      company: 'TCS Placement Office (Fake HR)',
      handle: 'careers-tcs-verify@gmail.com',
      platform: 'email',
      fee: '₹3,500 (Interview Gate Pass)',
      threatLevel: 'Critical',
      timeAgo: '42 mins ago',
      description: 'Issued counterfeit appointment letter with forged TCS logo requesting ₹3,500 refundable gate pass for campus interview entry.',
      details: 'Originates from free gmail domain. Candidate received PDF offer without any official TCS careers portal test or registration.',
      reportCount: 82,
    },
    {
      id: 'item-4',
      company: 'Zomato Delivery Fleet Ops',
      handle: '@zomato_hr_support_india (Instagram)',
      platform: 'instagram',
      fee: '₹850 (Uniform & ID Badge)',
      threatLevel: 'High',
      timeAgo: '1 hour ago',
      description: 'Sponsored Instagram carousel recruiting delivery fleet coordinators with fake Zomato brand assets demanding uniform fees.',
      details: 'Instagram ads redirecting to WhatsApp numbers. Zomato never charges recruitment or onboarding processing fees.',
      reportCount: 39,
    },
    {
      id: 'item-5',
      company: 'IndiGo Airlines Cabin Crew Agency',
      handle: '+91 91024 88392 (WhatsApp)',
      platform: 'fake-offers',
      fee: '₹9,800 (Aviation Medical Exam)',
      threatLevel: 'Critical',
      timeAgo: '2 hours ago',
      description: 'Ground staff and cabin crew appointment letter requiring upfront medical screening fees paid directly to recruiter UPI.',
      details: 'Interglot Aviation / IndiGo issues recurring warnings stating that recruitment is strictly handled via goindigo.in careers.',
      reportCount: 96,
    },
    {
      id: 'item-6',
      company: 'Cognizant Technology Solutions (Fake)',
      handle: 'hr-hiring-cognizant@outlook.com',
      platform: 'email',
      fee: '₹2,200 (Document Verification)',
      threatLevel: 'High',
      timeAgo: '3 hours ago',
      description: 'Fake junior software engineer direct offer letter requiring document background check fees through private payment links.',
      details: 'Spoofed Outlook address targeting graduates on LinkedIn. Does not have Cognizant.com SPF/DKIM verification tags.',
      reportCount: 57,
    },
    {
      id: 'item-7',
      company: 'Amazon Data Operations Work',
      handle: '@amazon_prime_tasks (Telegram)',
      platform: 'telegram',
      fee: '₹5,000 (Recharge balance)',
      threatLevel: 'Critical',
      timeAgo: '4 hours ago',
      description: 'Telegram group advertising fake merchant commission tasks promising 30% daily returns for completing shopping cart submissions.',
      details: 'Multi-tiered crypto syndicate operating across Bangalore and Delhi NCR targeting college students looking for remote work.',
      reportCount: 142,
    },
  ];

  const mapHubs = [
    {
      id: 'hyderabad',
      name: 'Hyderabad Cyber Hub',
      state: 'Telangana',
      count: 842,
      threat: 'Critical',
      top: '55%',
      left: '42%',
      primaryVectors: 'Telegram task rackets & remote placement letters',
      activeAlerts: 18,
    },
    {
      id: 'delhi',
      name: 'Delhi NCR Region',
      state: 'Delhi / Noida / Gurugram',
      count: 1240,
      threat: 'Critical',
      top: '28%',
      left: '36%',
      primaryVectors: 'Fake IT service gate passes & hotel rating bots',
      activeAlerts: 34,
    },
    {
      id: 'bengaluru',
      name: 'Bengaluru Tech Corridor',
      state: 'Karnataka',
      count: 910,
      threat: 'High',
      top: '68%',
      left: '40%',
      primaryVectors: 'Fake startup recruitment & laptop security deposits',
      activeAlerts: 21,
    },
    {
      id: 'mumbai',
      name: 'Mumbai Metropolitan',
      state: 'Maharashtra',
      count: 620,
      threat: 'High',
      top: '50%',
      left: '26%',
      primaryVectors: 'Aviation & merchant rating investment syndicates',
      activeAlerts: 15,
    },
  ];

  const filteredFeed = initialFeed.filter((item) => {
    const matchesSearch =
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform =
      platformFilter === 'all' || item.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const selectedHubData = mapHubs.find((h) => h.id === selectedHub);

  return (
    <div className="w-full min-h-screen bg-[#f1fbff] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header & Metrics Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-800 text-xs font-bold mb-3">
              <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>Decentralized Threat Feed v3.4-live</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-headline tracking-tight">
              Scam Threat Radar
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-body-md">
              Real-time telemetry and community-verified recruitment fraud signatures intercepted across India.
            </p>
          </div>

          <button
            onClick={onOpenReportModal}
            className="self-start md:self-auto px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-red-500/20 hover:shadow-lg transition-all flex items-center gap-2 btn-interactive"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Submit Flag to Radar</span>
          </button>
        </div>

        {/* Live Threat Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              TOTAL REPORTS PROCESSED
            </span>
            <div className="text-3xl font-bold text-slate-900 font-headline mt-1">
              4,912
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              +18 flags submitted in last 60 mins
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              ACTIVE FRAUD SYNDICATES
            </span>
            <div className="text-3xl font-bold text-red-600 font-headline mt-1">
              142
            </div>
            <div className="text-[11px] text-red-600 font-semibold mt-1">
              Identified across Telegram & WhatsApp channels
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              REGIONAL MONITORING NODES
            </span>
            <div className="text-3xl font-bold text-sky-600 font-headline mt-1">
              18
            </div>
            <div className="text-[11px] text-slate-500 font-semibold mt-1">
              Live mesh synchronizing every 30 seconds
            </div>
          </div>
        </div>

        {/* National Cyber Command Operations Center Banner */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 rounded-3xl p-6 sm:p-8 text-white border border-sky-900/60 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  NATIONAL TELEMETRY GRID
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  NODE_SYNC: ACTIVE
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-headline text-white leading-tight">
                Live Cyber Syndicate Operations Room
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-body-md leading-relaxed">
                ScamShield continuously correlates employment scam flags across Telegram bots, bulk SMS gateways, and deceptive recruiting portals, mapping geographical cluster outbreaks in real time.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-800/80 text-red-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  NCR & Bengaluru High Activity
                </span>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-sky-950/80 border border-sky-800/80 text-sky-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  14,280 Daily Signatures Verified
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <motion.div 
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full max-w-[480px] rounded-2xl overflow-hidden border border-sky-500/40 shadow-2xl shadow-sky-950/90 bg-slate-950 group"
              >
                {/* Laser Scanning Line Animation */}
                <motion.div 
                  animate={{ y: [-140, 240, -140] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_12px_#38bdf8] pointer-events-none z-30"
                />

                {/* Top HUD Bar */}
                <div className="absolute top-0 left-0 right-0 z-20 px-3 py-1.5 bg-gradient-to-b from-slate-950/90 to-transparent flex items-center justify-between text-[9.5px] font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    REGIONAL_THREAT_TOPOLOGY
                  </span>
                  <span className="text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    REAL_TIME_FEED
                  </span>
                </div>

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={threatRadarMapImg}
                    alt="Cyber Threat Operations Center"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
                </div>

                {/* Bottom HUD Bar */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between p-2 rounded-xl bg-slate-950/90 border border-sky-500/40 backdrop-blur-md text-[10px] font-mono">
                  <span className="text-slate-300">
                    18 SURVEILLANCE MESH NODES
                  </span>
                  <span className="text-emerald-400 font-bold">
                    SYNCHRONIZED (18ms)
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Live Threat Intelligence Map Section */}
        <div className="bg-[#050b14] rounded-3xl p-4 sm:p-6 lg:p-8 text-white border border-cyan-900/60 shadow-2xl shadow-cyan-950/50 overflow-hidden relative">
          {/* Top HUD Frame Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-cyan-950 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/90 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  GLOBAL CYBER THREAT INTELLIGENCE
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-headline text-white tracking-wide flex items-center gap-2 mt-0.5">
                  CYBER THREAT MAP
                  <span className="text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded tracking-wider">
                    REAL-TIME SCAM DETECTION
                  </span>
                </h3>
              </div>
            </div>

            {/* Controls & Mode Switcher */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex rounded-xl bg-slate-900/90 p-1 border border-cyan-900/70 text-xs font-mono">
                <button
                  onClick={() => setActiveMapMode('global')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeMapMode === 'global'
                      ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Continental Attack Mesh</span>
                </button>
                <button
                  onClick={() => setActiveMapMode('regional')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeMapMode === 'regional'
                      ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Regional Hub Focus</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>LAST UPDATE: 14:58:02 UTC</span>
              </div>
            </div>
          </div>

          {/* Map Display Container */}
          {activeMapMode === 'global' ? (
            <div className="mt-6 space-y-6">
              {/* Full Cyber Threat Map Dashboard Grid matching user uploaded screenshot */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Left Telemetry HUD Column */}
                <div className="lg:col-span-3 space-y-4">
                  {/* Active Signals Metric */}
                  <div className="p-4 rounded-2xl bg-[#091424] border border-cyan-900/60 shadow-lg">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      ACTIVE SCAM SIGNALS (LAST 60 MIN):
                    </span>
                    <div className="text-3xl font-bold font-mono text-cyan-400 mt-1 flex items-center gap-2">
                      4,218
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>

                  {/* Threat Level */}
                  <div className="p-4 rounded-2xl bg-red-950/40 border-2 border-red-600/70 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-300 block">
                      THREAT LEVEL:
                    </span>
                    <div className="text-xl font-black font-headline text-red-500 mt-0.5 tracking-wider flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                      HIGH ALERT
                    </div>
                  </div>

                  {/* Top Scam Types */}
                  <div className="p-4 rounded-2xl bg-[#091424] border border-cyan-900/60 space-y-2.5 text-xs">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block pb-1 border-b border-cyan-950">
                      TOP SCAM TYPES
                    </span>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-slate-300 font-medium">🎯 Phishing</span>
                          <span className="text-cyan-400 font-mono font-bold">42%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="w-[42%] h-full bg-cyan-400 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-slate-300 font-medium">📞 Vishing</span>
                          <span className="text-amber-400 font-mono font-bold">28%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="w-[28%] h-full bg-amber-400 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-slate-300 font-medium">📱 Scam Calls</span>
                          <span className="text-rose-400 font-mono font-bold">19%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="w-[19%] h-full bg-rose-400 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-slate-300 font-medium">👾 Malware</span>
                          <span className="text-purple-400 font-mono font-bold">11%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="w-[11%] h-full bg-purple-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Scam Activity Attack Vectors Log */}
                  <div className="p-4 rounded-2xl bg-[#091424] border border-cyan-900/60 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block pb-1 border-b border-cyan-950">
                      LIVE SCAM ACTIVITY
                    </span>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {liveScamAttacks.map((atk, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] space-y-0.5 hover:border-cyan-500/40 transition-colors"
                        >
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-slate-200">
                              {atk.from} <span className="text-cyan-400">→</span> {atk.to}
                            </span>
                            <span className="text-[10px] font-mono text-cyan-300">
                              ({atk.type})
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-500">
                            <span>{atk.time}</span>
                            <span>{atk.ip}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center: The High-Tech Cyber Threat Map Visual */}
                <div className="lg:col-span-6 flex flex-col space-y-4">
                  <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/50 shadow-2xl shadow-cyan-950/90 bg-[#030914] group">
                    {/* Laser Scanning Line Animation */}
                    <motion.div 
                      animate={{ y: [-160, 320, -160] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_15px_#38bdf8] pointer-events-none z-30"
                    />

                    {/* Top HUD telemetry watermark */}
                    <div className="absolute top-2.5 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30">
                        ATTACK VECTOR TRAJECTORY MESH
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-slate-700">
                        ACTIVE_SENSORS: 4,218
                      </span>
                    </div>

                    {/* The Cyber Threat Map Image */}
                    <div className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden">
                      <img
                        src={cyberThreatMapImg}
                        alt="Global Cyber Threat Intelligence Map"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent pointer-events-none" />

                      {/* Interactive Pulsing Hotspot Markers */}
                      {globalCityNodes.map((city) => {
                        const isSelected = selectedGlobalCity === city.name;
                        return (
                          <div
                            key={city.name}
                            onClick={() => setSelectedGlobalCity(city.name)}
                            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group/pin z-20"
                            style={{ top: city.top, left: city.left }}
                          >
                            <div className="relative flex items-center justify-center">
                              {/* Glowing pulse ring */}
                              <span className="w-5 h-5 rounded-full bg-cyan-400/40 animate-ping absolute" />
                              <span className="w-3 h-3 rounded-full bg-cyan-400 border border-white shadow-[0_0_10px_#38bdf8]" />

                              {/* City Label Badge */}
                              <div
                                className={`absolute top-4 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-xl border transition-all ${
                                  isSelected
                                    ? 'bg-cyan-500 text-slate-950 font-bold border-white scale-110 z-30'
                                    : 'bg-slate-900/90 text-cyan-200 border-cyan-800 opacity-90 group-hover/pin:opacity-100 group-hover/pin:scale-110'
                                }`}
                              >
                                {city.name}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 backdrop-blur-md text-[10px] font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-slate-300">
                          ATTACK PATHWAY INTERCEPTION: <span className="text-emerald-400 font-bold">ONLINE</span>
                        </span>
                      </div>
                      <span className="text-cyan-400 font-bold">
                        LATENCY: 78ms | 1.2 Tbps
                      </span>
                    </div>
                  </div>

                  {/* Selected City Telemetry Card */}
                  {selectedGlobalCity && (
                    <div className="p-4 rounded-2xl bg-[#091424] border border-cyan-900/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {(() => {
                        const cityData = globalCityNodes.find((c) => c.name === selectedGlobalCity) || globalCityNodes[0];
                        return (
                          <>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                                  INSPECTED HUB NODE:
                                </span>
                                <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 text-[10px] font-mono font-bold">
                                  {cityData.threat}
                                </span>
                              </div>
                              <div className="text-lg font-bold font-headline text-white">
                                {cityData.name} Regional Cluster
                              </div>
                              <div className="text-xs text-slate-400 font-mono">
                                Primary Vector: <span className="text-slate-200 font-semibold">{cityData.vector}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-cyan-950 pt-2 sm:pt-0 sm:pl-4">
                              <div>
                                <div className="text-2xl font-bold font-mono text-cyan-400">{cityData.signals}</div>
                                <div className="text-[10px] text-slate-400 font-mono">SIGNALS / HR</div>
                              </div>
                              <div>
                                <div className="text-xs font-mono text-emerald-400 font-bold">{cityData.ip}</div>
                                <div className="text-[10px] text-slate-400 font-mono">RELAY SINK IP</div>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>

                {/* Right Telemetry HUD Column */}
                <div className="lg:col-span-3 space-y-4">
                  {/* Target Hotspots */}
                  <div className="p-4 rounded-2xl bg-[#091424] border border-cyan-900/60 space-y-2.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block pb-1 border-b border-cyan-950">
                      TARGET HOTSPOTS
                    </span>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">🇺🇸</span>
                          <span className="font-bold text-slate-200">USA</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-900">
                          Critical
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">🇨🇦</span>
                          <span className="font-bold text-slate-200">Canada</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-900">
                          Elevated
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sector Impact */}
                  <div className="p-4 rounded-2xl bg-[#091424] border border-cyan-900/60 space-y-2.5 text-xs">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block pb-1 border-b border-cyan-950">
                      SECTOR IMPACT
                    </span>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60">
                        <span className="text-slate-300">🏦 Finance</span>
                        <span className="font-mono font-bold text-cyan-400">35%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60">
                        <span className="text-slate-300">💻 Tech & IT</span>
                        <span className="font-mono font-bold text-cyan-400">28%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60">
                        <span className="text-slate-300">🛒 Retail</span>
                        <span className="font-mono font-bold text-cyan-400">19%</span>
                      </div>
                    </div>
                  </div>

                  {/* Interconnected Nodes Network Constellation */}
                  <div className="p-4 rounded-2xl bg-[#091424] border border-cyan-900/60 space-y-2">
                    <div className="flex items-center justify-between pb-1 border-b border-cyan-950">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        INTERCONNECTED NODES
                      </span>
                      <span className="text-[9px] font-mono text-cyan-400">MESH_ACTIVE</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Source IPs to Destinations topology
                    </div>

                    {/* Network constellation mini-graphic */}
                    <div className="h-28 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center relative overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 200 100">
                        <line x1="40" y1="50" x2="80" y2="30" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                        <line x1="80" y1="30" x2="130" y2="70" stroke="#f43f5e" strokeWidth="1" opacity="0.7" />
                        <line x1="130" y1="70" x2="160" y2="40" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                        <line x1="40" y1="50" x2="130" y2="70" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />
                        <line x1="80" y1="30" x2="160" y2="40" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
                        
                        <circle cx="40" cy="50" r="4" fill="#06b6d4" />
                        <circle cx="80" cy="30" r="5" fill="#f43f5e" />
                        <circle cx="130" cy="70" r="6" fill="#38bdf8" />
                        <circle cx="160" cy="40" r="4" fill="#06b6d4" />
                        <circle cx="100" cy="85" r="3" fill="#06b6d4" opacity="0.8" />
                      </svg>
                    </div>

                    {/* Latency & Traffic Telemetry */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                        <span className="text-[9px] font-mono text-slate-400 block">LATENCY</span>
                        <span className="text-xs font-mono font-bold text-cyan-400">78ms</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                        <span className="text-[9px] font-mono text-slate-400 block">TRAFFIC</span>
                        <span className="text-xs font-mono font-bold text-red-400">1.2 Tbps</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Regional Hub Mesh View */
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Interactive Regional Map Visual */}
              <div className="lg:col-span-8 relative h-80 sm:h-96 rounded-2xl bg-slate-950/90 border border-slate-800/80 overflow-hidden flex items-center justify-center">
                {/* Grid Lines */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Radar Sweep Circle */}
                <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-sky-500/20 animate-ring-slow pointer-events-none" />
                <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-sky-500/30 animate-ring-rev pointer-events-none" />

                <div className="text-slate-800/40 text-8xl font-black select-none pointer-events-none">
                  INDIA MESH
                </div>

                {/* Map Cyber Pins */}
                {mapHubs.map((hub) => {
                  const isSelected = selectedHub === hub.id;
                  return (
                    <div
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className="absolute cursor-pointer group"
                      style={{ top: hub.top, left: hub.left }}
                    >
                      <div className="relative flex items-center justify-center">
                        <span
                          className={`w-4 h-4 rounded-full ${
                            hub.threat === 'Critical' ? 'bg-red-500 pin-pulse' : 'bg-amber-500 pin-pulse-amber'
                          }`}
                        />
                        <span className="absolute w-2 h-2 rounded-full bg-white" />

                        {/* Tooltip on pin */}
                        <div
                          className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap shadow-xl border transition-all pointer-events-none ${
                            isSelected
                              ? 'bg-red-600 text-white border-red-400 font-bold scale-110 z-20'
                              : 'bg-slate-900 text-slate-200 border-slate-700 opacity-90 group-hover:opacity-100 group-hover:scale-105'
                          }`}
                        >
                          {hub.name} ({hub.count})
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Hub Details Panel */}
              <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4">
                {selectedHubData ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 bg-sky-950 px-2.5 py-0.5 rounded border border-sky-800">
                        REGIONAL RADAR
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          selectedHubData.threat === 'Critical'
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {selectedHubData.threat} Threat
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white font-headline">
                        {selectedHubData.name}
                      </h4>
                      <p className="text-xs text-slate-400">{selectedHubData.state}</p>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <div className="text-slate-400 text-[10px] uppercase font-mono">
                        PRIMARY INTERCEPT VECTORS:
                      </div>
                      <div className="text-slate-200 font-medium">
                        {selectedHubData.primaryVectors}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="text-xl font-bold text-white font-headline">
                          {selectedHubData.count}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">TOTAL FLAGS</div>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="text-xl font-bold text-red-400 font-headline">
                          {selectedHubData.activeAlerts}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">ACTIVE TODAY</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    Click any pin on the map to inspect regional fraud activity.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Search and Filters for Community Feed */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search company, telegram handle, or phone..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 shadow-sm"
              />
            </div>

            {/* Platform Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
              {[
                { id: 'all', label: 'All Channels' },
                { id: 'whatsapp', label: 'WhatsApp' },
                { id: 'telegram', label: 'Telegram' },
                { id: 'email', label: 'Email' },
                { id: 'instagram', label: 'Instagram' },
                { id: 'fake-offers', label: 'Fake Letters' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatformFilter(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    platformFilter === p.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Community Live Feed Rows */}
          <div className="space-y-3">
            {filteredFeed.slice(0, visibleCount).map((item) => {
              const isExpanded = expandedRow === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 transition-all overflow-hidden"
                >
                  <div
                    onClick={() => setExpandedRow(isExpanded ? null : item.id)}
                    className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                        {item.platform === 'whatsapp' && <MessageSquare className="w-4 h-4 text-emerald-600" />}
                        {item.platform === 'telegram' && <Send className="w-4 h-4 text-sky-600" />}
                        {item.platform === 'email' && <Mail className="w-4 h-4 text-indigo-600" />}
                        {item.platform === 'instagram' && <Instagram className="w-4 h-4 text-purple-600" />}
                        {item.platform === 'fake-offers' && <FileX2 className="w-4 h-4 text-red-600" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900 font-headline">
                            {item.company}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-500">
                            {item.handle}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 shrink-0 pl-11 md:pl-0">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-red-600 font-bold block">DEMANDED</span>
                        <span className="text-xs font-semibold text-slate-800">{item.fee}</span>
                      </div>

                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md ${
                          item.threatLevel === 'Critical'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.threatLevel}
                      </span>

                      <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.timeAgo}</span>
                      </div>

                      <div className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Item Forensics */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/60 text-xs space-y-3">
                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-body-md">
                        <strong className="text-slate-900 block font-headline mb-1">
                          Community Intercept Details:
                        </strong>
                        {item.details}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
                          <span>Verified by {item.reportCount} candidates</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold">Zero Document Exposure Logged</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onNavigate('check-offer')}
                            className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition-colors"
                          >
                            Check Matching Offer
                          </button>
                          <button
                            onClick={onOpenReportModal}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
                          >
                            Add Corroborating Flag
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredFeed.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + 2)}
                className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span>Load More Community Reports</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
