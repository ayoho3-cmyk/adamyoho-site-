import { createClient, type ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityConfig: ClientConfig = {
  projectId: process.env.SANITY_PROJECT_ID || '54009udh',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2024-03-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
};

// Create the Sanity client instance
export const sanityClient = createClient(sanityConfig);

// Safe lazy image builder helper compatible with both ESM and bundled CJS
let builderInstance: any = null;

function getBuilder() {
  if (!builderInstance) {
    const fn: any =
      typeof imageUrlBuilder === 'function'
        ? imageUrlBuilder
        : (imageUrlBuilder as any)?.default || (imageUrlBuilder as any)?.createImageUrlBuilder;
    if (typeof fn === 'function') {
      builderInstance = fn(sanityClient);
    }
  }
  return builderInstance;
}

export function urlFor(source: any) {
  const b = getBuilder();
  return b ? b.image(source) : source;
}

// 1. Articles & Recipes Query
export const ARTICLES_QUERY = `*[_type == "article"] | order(date desc) {
  _id,
  title,
  subtitle,
  "slug": slug.current,
  category,
  date,
  readTime,
  excerpt,
  body,
  "heroImage": heroImage.asset->url,
  "caption": heroImage.caption,
  chefNotes,
  harvestProvenance,
  ingredients,
  methodSteps,
  featured
}`;

export const ARTICLE_BY_SLUG_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  subtitle,
  "slug": slug.current,
  category,
  date,
  readTime,
  excerpt,
  body,
  "heroImage": heroImage.asset->url,
  "caption": heroImage.caption,
  chefNotes,
  harvestProvenance,
  ingredients,
  methodSteps,
  featured
}`;

// 5. FAQs Query
export const FAQS_QUERY = `*[_type == "faqItem"] | order(_createdAt asc) {
  _id,
  "id": _id,
  category,
  question,
  answer
}`;

// 6. Timeline Events Query
export const TIMELINE_QUERY = `*[_type == "timelineEvent"] | order(order asc) {
  _id,
  year,
  title,
  location,
  description,
  order
}`;

// 7. Kitchen Principles Query
export const KITCHEN_PRINCIPLES_QUERY = `*[_type == "kitchenPrinciple"] | order(order asc) {
  _id,
  number,
  title,
  description,
  order
}`;
