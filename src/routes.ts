import { RoutePath, ServiceBranch } from './types';

const ROUTE_PATHS: Partial<Record<RoutePath, string>> = {
  home: '/',
  about: '/about',
  consulting: '/consulting',
  events: '/events',
  mentorship: '/mentorship',
  press: '/press-journal',
  faq: '/faq',
  contact: '/contact'
};

const ROUTE_TITLES: Partial<Record<RoutePath, string>> = {
  about: 'About',
  consulting: 'Culinary Consulting',
  events: 'Private Events',
  mentorship: 'Chef Mentorship',
  press: 'Kitchen Journal',
  faq: 'FAQ',
  contact: 'Contact'
};

const BRANCHES: ServiceBranch[] = ['consulting', 'events', 'mentorship', 'general'];

export interface ParsedLocation {
  route: RoutePath;
  articleSlug: string | null;
  branch: ServiceBranch | null;
}

export function parseLocation(pathname: string, search: string): ParsedLocation {
  const path = pathname.replace(/\/+$/, '') || '/';
  const branchParam = new URLSearchParams(search).get('branch') as ServiceBranch | null;
  const branch = branchParam && BRANCHES.includes(branchParam) ? branchParam : null;

  if (path.startsWith('/press-journal/')) {
    return {
      route: 'press',
      articleSlug: decodeURIComponent(path.slice('/press-journal/'.length)),
      branch
    };
  }

  const match = (Object.entries(ROUTE_PATHS) as [RoutePath, string][]).find(([, p]) => p === path);
  return { route: match ? match[0] : 'home', articleSlug: null, branch };
}

export function buildPath(route: RoutePath, articleSlug?: string | null, branch?: ServiceBranch | null): string {
  if (route === 'press' && articleSlug) {
    return `/press-journal/${encodeURIComponent(articleSlug)}`;
  }
  const path = ROUTE_PATHS[route] || '/';
  return route === 'contact' && branch ? `${path}?branch=${branch}` : path;
}

export function pageTitle(route: RoutePath, articleTitle: string | undefined, homeTitle: string): string {
  if (articleTitle) return `${articleTitle} — Adam Yoho`;
  const title = ROUTE_TITLES[route];
  return title ? `${title} — Adam Yoho` : homeTitle;
}
