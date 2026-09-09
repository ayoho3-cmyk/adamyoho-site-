/**
 * Client-Side Analytics & Business Line Attribution Instrumentation
 * Chef Adam Yoho Atelier
 */

export interface AnalyticsEvent {
  type: 'page_view' | 'branch_select' | 'inquiry_submit' | 'newsletter_subscribe' | 'booking_initiated' | 'booking_completed' | 'cms_inspect';
  branch?: string;
  metadata?: Record<string, any>;
  path?: string;
  timestamp?: string;
}

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/**
 * Dispatches an analytics event to the serverless tracking endpoint
 * and synchronizes with window.dataLayer for Google Analytics / Tag Manager
 */
export const trackEvent = async (event: AnalyticsEvent): Promise<void> => {
  const payload = {
    ...event,
    timestamp: event.timestamp || new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent
  };

  // 1. Synchronize to global dataLayer if available
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event.type,
      branch: event.branch,
      metadata: event.metadata,
      pagePath: event.path || window.location.pathname,
      eventTimestamp: payload.timestamp
    });
  }

  // 2. Dispatch to backend analytics & attribution ledger
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    // Non-blocking telemetry failure
    console.debug('[Analytics] Event buffered locally:', event.type);
  }
};

/**
 * Standard pageview tracking
 */
export const trackPageView = (path: string, title?: string) => {
  trackEvent({
    type: 'page_view',
    path,
    metadata: {
      title: title || document.title,
      referrer: document.referrer || 'direct'
    }
  });
};

/**
 * Service-selector branch switch attribution tracking
 */
export const trackBranchSelect = (branch: string, previousBranch?: string) => {
  trackEvent({
    type: 'branch_select',
    branch,
    metadata: {
      previousBranch,
      interaction: 'service_selector_tab'
    }
  });
};

/**
 * Conversion: Inquiry submission with business line attribution
 */
export const trackInquirySubmit = (branch: string, inquiryId: string, leadMetadata?: Record<string, any>) => {
  trackEvent({
    type: 'inquiry_submit',
    branch,
    metadata: {
      inquiryId,
      ...leadMetadata
    }
  });
};

/**
 * Conversion: Newsletter subscription
 */
export const trackNewsletterSubscribe = (email: string, source: string = 'footer_newsletter') => {
  trackEvent({
    type: 'newsletter_subscribe',
    metadata: {
      source,
      domain: email.split('@')[1] || 'unknown'
    }
  });
};

/**
 * Conversion: Booking intro call initiated
 */
export const trackBookingInitiated = (serviceType: string, triggerContext: string = 'cta_button') => {
  trackEvent({
    type: 'booking_initiated',
    branch: serviceType,
    metadata: {
      triggerContext
    }
  });
};

/**
 * Conversion: Booking intro call successfully completed
 */
export const trackBookingCompleted = (serviceType: string, slotDate: string, slotTime: string, topic?: string) => {
  trackEvent({
    type: 'booking_completed',
    branch: serviceType,
    metadata: {
      slotDate,
      slotTime,
      topic
    }
  });
};
