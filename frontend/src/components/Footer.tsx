import React from 'react';
import { Shield, Lock, ExternalLink, Heart, Download } from 'lucide-react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenProtocol: (type: 'privacy' | 'security') => void;
  onOpenReportModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenProtocol,
  onOpenReportModal,
}) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <Shield className="w-5 h-5 fill-white/20" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight font-headline">
                ScamShield
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Autonomous verification intelligence safeguarding university graduates, job seekers, and early career professionals from recruitment fraud syndicates, fee extraction rackets, and impersonation.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 font-mono text-[11px]">
                <Lock className="w-3 h-3 text-emerald-400" />
                Zero Document Exposure Sandbox
              </span>
              <span className="text-slate-500">Node Cluster: v4.2-IND</span>
            </div>
          </div>

          {/* Quick Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 font-headline">
              Verification Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('check-offer')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Check Offer Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('scam-radar')}
                  className="hover:text-white transition-colors text-slate-400 flex items-center gap-1.5"
                >
                  <span>Scam Threat Radar</span>
                  <span className="text-[9px] bg-red-900/60 text-red-300 px-1 py-0.2 rounded border border-red-800/80">LIVE</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  How Verification Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('whatsapp-bot')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  WhatsApp Bot Assistant
                </button>
              </li>
              <li>
                <a
                  href="/scamshield-frontend.zip"
                  download="scamshield-frontend.zip"
                  className="hover:text-cyan-400 transition-colors text-slate-400 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Frontend ZIP</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Protocols */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 font-headline">
              Safety & Standards
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenProtocol('privacy')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Zero Knowledge Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenProtocol('security')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Autonomous Security Protocols
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenReportModal}
                  className="hover:text-red-400 transition-colors text-red-300 font-semibold"
                >
                  Report Fraud Syndicate Flag
                </button>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-slate-400 inline-flex items-center gap-1"
                >
                  <span>National Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} ScamShield Open Intelligence Initiative. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for job seeker defense
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
