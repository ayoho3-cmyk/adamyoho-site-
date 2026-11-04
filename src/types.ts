export type RoutePath =
  | 'home'
  | 'about'
  | 'consulting'
  | 'events'
  | 'mentorship'
  | 'press'
  | 'press-detail'
  | 'faq'
  | 'contact';

export type ServiceBranch = 'consulting' | 'events' | 'mentorship' | 'general';

export interface RecipeSection {
  title: string;
  ingredients: { item: string; spec: string }[];
  method: string[];
}

export interface Article {
  slug: string;
  title: string;
  subtitle?: string;
  category: 'Essays' | 'Recipes' | 'Technique';
  date: string;
  readTime: string;
  heroImage: string;
  caption?: string;
  excerpt: string;
  body: string[];
  chefNotes?: string;
  ingredients?: { item: string; spec: string; provenance?: string }[];
  methodSteps?: { step: number; instruction: string }[];
  recipeSections?: RecipeSection[];
  harvestProvenance?: string;
  featured?: boolean;
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Consulting' | 'Events' | 'Mentorship' | 'Sourcing & Dietary';
  question: string;
  answer: string;
}

export interface InquirySubmission {
  serviceType: ServiceBranch;
  name: string;
  email: string;
  phone?: string;
  details: Record<string, any>;
  notes?: string;
  honeypot?: string;
}

export interface InquiryResponse {
  success: boolean;
  inquiryId: string;
  serviceType: ServiceBranch;
  receivedAt: string;
  tags: string[];
  notificationRoutedTo: string;
  message: string;
}

export interface BranchAttribution {
  views: number;
  submissions: number;
  conversionRate: string;
}

export interface AnalyticsSummary {
  totalEvents: number;
  totalInquiries: number;
  branchAttribution: Record<ServiceBranch, BranchAttribution>;
  recentEvents: Array<{
    type: string;
    branch?: string;
    metadata?: Record<string, any>;
    timestamp: string;
  }>;
}
