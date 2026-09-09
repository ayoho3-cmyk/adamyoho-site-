export type RoutePath =
  | 'home'
  | 'about'
  | 'consulting'
  | 'events'
  | 'mentorship'
  | 'press'
  | 'press-detail'
  | 'testimonials'
  | 'faq'
  | 'contact';

export type ServiceBranch = 'consulting' | 'events' | 'mentorship' | 'general';

export interface Article {
  slug: string;
  title: string;
  subtitle?: string;
  category: 'Essays' | 'Recipes' | 'Technique' | 'Press';
  date: string;
  readTime: string;
  heroImage: string;
  caption?: string;
  excerpt: string;
  body: string[];
  chefNotes?: string;
  ingredients?: { item: string; spec: string; provenance?: string }[];
  methodSteps?: { step: number; instruction: string }[];
  harvestProvenance?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  title: string;
  establishmentOrContext: string;
  serviceType: ServiceBranch;
  quote: string;
  year: string;
  featured?: boolean;
  avatar?: string;
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Consulting' | 'Events' | 'Mentorship' | 'Sourcing & Dietary';
  question: string;
  answer: string;
}

export interface EventGalleryItem {
  id: string;
  title: string;
  location: string;
  format: string;
  guestCount: string;
  image: string;
  caption: string;
  tag: 'Private Dining' | 'Vineyard Banquets' | 'Tasting Salons' | 'Atelier';
}

export interface ConsultingCaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  duration: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  image: string;
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
