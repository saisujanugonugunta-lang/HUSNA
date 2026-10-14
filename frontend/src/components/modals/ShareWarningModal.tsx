import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share2, Copy, Check, MessageSquare, Send, ShieldAlert } from 'lucide-react';

interface ShareWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId?: string;
  threatLevel?: string;
}

export const ShareWarningModal: React.FC<ShareWarningModalProps> = ({
  isOpen,
  onClose,
  reportId = '#SH-92841',
  threatLevel = '82/100 (Critical Risk)'
}) => {
  const [copied, setCopied] = useState(false);

  const advisoryText = `⚠️ CAUTION: ScamShield Flagged Job Scam Alert (${reportId})
Risk Score: ${threatLevel}
Pattern: Upfront registration fee demanded + Telegram redirect + No interview offer letter.
Do NOT transfer money for training kits or security deposits. Verify any offer on ScamShield at: ${window.location.origin}/#check-offer`;

  const handleCopy = () => {
    navigator.clipboard.writeText(advisoryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(advisoryText)}`;
    window.open(url, '_blank');
  };

  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(advisoryText)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden"
        >
          <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-red-500/20 text-red-400 rounded-lg">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base font-headline">Share Warning Advisory</h3>
                <p className="text-xs text-slate-400">Protect peers, friends, and family from this scam</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed">
              {advisoryText}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleWhatsAppShare}
                className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Share to WhatsApp
              </button>
              <button
                onClick={handleTelegramShare}
                className="py-2.5 px-3 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
                Share to Telegram
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied Advisory to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy Plaintext Warning</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
