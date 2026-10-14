export type PageRoute = 
  | 'check-offer' 
  | 'analyzing' 
  | 'analysis-result' 
  | 'scam-radar' 
  | 'how-it-works' 
  | 'whatsapp-bot';

export type Language = 'EN' | 'TE' | 'HI';

export interface ScamSignal {
  id: string;
  title: string;
  description: string;
  category: 'upfront-payment' | 'urgency' | 'salary' | 'domain' | 'links' | 'documents';
  icon: string;
  accentColor: string;
}

export interface CommunityReport {
  id: string;
  title: string;
  handle: string;
  platform: 'telegram' | 'whatsapp' | 'email' | 'instagram' | 'fake-offers';
  riskLevel: 'high' | 'caution';
  description: string;
  detailedIndicators: string;
  reportCount: number;
  timeAgo: string;
  icon: string;
}

export interface MapPinHub {
  id: string;
  name: string;
  reportsCount: number;
  subTitle: string;
  signal: string;
  threatLevel: string;
  status: string;
  top: string;
  left: string;
  type: 'critical' | 'relay' | 'elevated';
}

export interface HeuristicRule {
  id: string;
  title: string;
  badge: string;
  badgeClass: string;
  ruleCode: string;
  dangerExplanation: string;
  modus: string;
}
