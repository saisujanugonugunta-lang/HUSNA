import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageRoute, Language } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { CheckOfferPage } from './pages/CheckOfferPage';
import { AnalyzingPage } from './pages/AnalyzingPage';
import { AnalysisResultPage } from './pages/AnalysisResultPage';
import { ScamRadarPage } from './pages/ScamRadarPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { WhatsAppBotPage } from './pages/WhatsAppBotPage';

// Modals
import { ReportScamModal } from './components/modals/ReportScamModal';
import { VerifyCompanyModal } from './components/modals/VerifyCompanyModal';
import { ShareWarningModal } from './components/modals/ShareWarningModal';
import { EvidenceModal } from './components/modals/EvidenceModal';
import { ProtocolModals } from './components/modals/ProtocolModals';

export function App() {
  // Navigation state synchronized with window.location.hash
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    const hash = window.location.hash.replace('#', '') as PageRoute;
    const validRoutes: PageRoute[] = [
      'check-offer',
      'analyzing',
      'analysis-result',
      'scam-radar',
      'how-it-works',
      'whatsapp-bot',
    ];
    return validRoutes.includes(hash) ? hash : 'check-offer';
  });

  const [language, setLanguage] = useState<Language>('EN');

  // Modal States
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [verifyCompanyModalOpen, setVerifyCompanyModalOpen] = useState(false);
  const [shareWarningModalOpen, setShareWarningModalOpen] = useState(false);
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [protocolModalType, setProtocolModalType] = useState<'privacy' | 'security' | null>(null);

  // Sync route changes with browser URL hash
  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      const validRoutes: PageRoute[] = [
        'check-offer',
        'analyzing',
        'analysis-result',
        'scam-radar',
        'how-it-works',
        'whatsapp-bot',
      ];
      if (validRoutes.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f1fbff] text-[#001f27] selection:bg-sky-200 selection:text-sky-900 font-sans">
      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        language={language}
        onLanguageChange={setLanguage}
        onOpenReportModal={() => setReportModalOpen(true)}
      />

      {/* Main Page Area with AnimatePresence Transitions */}
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {currentPage === 'check-offer' && (
              <CheckOfferPage
                onNavigate={navigateTo}
                onOpenEvidence={() => setEvidenceModalOpen(true)}
                onOpenReportModal={() => setReportModalOpen(true)}
              />
            )}

            {currentPage === 'analyzing' && (
              <AnalyzingPage onNavigate={navigateTo} />
            )}

            {currentPage === 'analysis-result' && (
              <AnalysisResultPage
                onNavigate={navigateTo}
                onOpenVerifyCompany={() => setVerifyCompanyModalOpen(true)}
                onOpenShareWarning={() => setShareWarningModalOpen(true)}
                onOpenEvidence={() => setEvidenceModalOpen(true)}
                onOpenReportModal={() => setReportModalOpen(true)}
              />
            )}

            {currentPage === 'scam-radar' && (
              <ScamRadarPage
                onNavigate={navigateTo}
                onOpenReportModal={() => setReportModalOpen(true)}
              />
            )}

            {currentPage === 'how-it-works' && (
              <HowItWorksPage
                onNavigate={navigateTo}
                onOpenEvidence={() => setEvidenceModalOpen(true)}
              />
            )}

            {currentPage === 'whatsapp-bot' && (
              <WhatsAppBotPage
                onNavigate={navigateTo}
                onOpenReportModal={() => setReportModalOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenProtocol={(type) => setProtocolModalType(type)}
        onOpenReportModal={() => setReportModalOpen(true)}
      />

      {/* Modals */}
      <ReportScamModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      <VerifyCompanyModal
        isOpen={verifyCompanyModalOpen}
        onClose={() => setVerifyCompanyModalOpen(false)}
      />

      <ShareWarningModal
        isOpen={shareWarningModalOpen}
        onClose={() => setShareWarningModalOpen(false)}
      />

      <EvidenceModal
        isOpen={evidenceModalOpen}
        onClose={() => setEvidenceModalOpen(false)}
      />

      <ProtocolModals
        type={protocolModalType}
        onClose={() => setProtocolModalType(null)}
      />
    </div>
  );
}

export default App;
