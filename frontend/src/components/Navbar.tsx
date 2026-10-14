import React, { useState } from 'react';
import { Shield, ShieldAlert, Radio, Globe, Menu, X, User, ChevronDown, Check, Activity, Bell, Download } from 'lucide-react';
import { PageRoute, Language } from '../types';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenReportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  language,
  onLanguageChange,
  onOpenReportModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const navItems: { id: PageRoute; label: string; badge?: string }[] = [
    { id: 'check-offer', label: 'Check Offer' },
    { id: 'scam-radar', label: 'Scam Radar', badge: 'LIVE' },
    { id: 'how-it-works', label: 'How it Works' },
    { id: 'whatsapp-bot', label: 'WhatsApp Bot' },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-[0_2px_12px_-3px_rgba(18,144,227,0.08)]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <Activity className="w-4 h-4 text-sky-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('check-offer')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 fill-white/20 stroke-white" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 font-headline group-hover:text-sky-600 transition-colors">
                  ScamShield
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200/60 hidden sm:inline-block">
                  v4.2
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block leading-none mt-0.5">
                Autonomous Job Fraud Intelligence
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 ml-4 pl-4 border-l border-slate-200/80">
            {navItems.map((item) => {
              const isActive = currentPage === item.id || 
                (item.id === 'check-offer' && (currentPage === 'analyzing' || currentPage === 'analysis-result'));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-sky-700 bg-sky-50/90 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-red-100 text-red-700 rounded-full border border-red-200 animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-sky-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* API Status Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium text-slate-700">API: <strong className="text-emerald-700">Live</strong></span>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-sky-100 py-1.5 z-50 text-xs">
                {[
                  { code: 'EN', label: 'English (EN)' },
                  { code: 'TE', label: 'తెలుగు (TE)' },
                  { code: 'HI', label: 'हिन्दी (HI)' },
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      onLanguageChange(item.code as Language);
                      setLangDropdownOpen(false);
                      showToast(`Language switched to ${item.label}`);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-sky-50 flex items-center justify-between text-slate-700"
                  >
                    <span>{item.label}</span>
                    {language === item.code && <Check className="w-3.5 h-3.5 text-sky-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export / Download ZIP Button */}
          <a
            href="/scamshield-frontend.zip"
            download="scamshield-frontend.zip"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 rounded-xl text-xs font-semibold transition-all hover:shadow-sm"
            title="Download complete frontend ZIP package"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export ZIP</span>
          </a>

          {/* Report Scam Button */}
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-red-500/20 hover:shadow-lg transition-all btn-interactive"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Report Scam</span>
          </button>

          {/* User Profile / Notifications */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 hover:border-sky-300 text-slate-700 flex items-center justify-center transition-colors focus:outline-none"
              title="Account & Threat Alerts"
            >
              <User className="w-4 h-4 text-slate-600" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-sky-100 p-3 z-50 text-xs">
                <div className="flex items-center gap-2.5 pb-3 mb-2 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-700 flex items-center justify-center font-bold">
                    SS
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 font-headline">Public Security Node</div>
                    <div className="text-[10px] text-slate-500">Autonomous Sentinel v4.2</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="p-2 rounded-lg bg-slate-50 text-[11px] text-slate-600 flex justify-between">
                    <span>Verified Scans Today:</span>
                    <strong className="text-slate-900">4,912</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 text-[11px] text-slate-600 flex justify-between">
                    <span>Cluster Sync:</span>
                    <strong className="text-emerald-600">Active (18ms)</strong>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    showToast("Security keys validated. Mesh encryption active.");
                  }}
                  className="w-full mt-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-semibold transition-colors"
                >
                  Verify Cryptographic Node
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id ||
              (item.id === 'check-offer' && (currentPage === 'analyzing' || currentPage === 'analysis-result'));
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-red-100 text-red-700 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          
          {/* Download ZIP link for mobile */}
          <a
            href="/scamshield-frontend.zip"
            download="scamshield-frontend.zip"
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 border border-slate-200"
          >
            <span className="flex items-center gap-2">
              <Download className="w-3.5 h-3.5 text-sky-600" />
              <span>Download Frontend ZIP</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">6.1 MB</span>
          </a>
          
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              API Mesh: Active
            </span>
            <span className="font-mono text-[11px]">Region: IN-SOUTH-1</span>
          </div>
        </div>
      )}
    </header>
  );
};
