export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CategoryItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  docCount: number;
}

export interface DocItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  coverImage: string;
  description: string;
  readingTime: string;
  difficulty: DifficultyLevel;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedDate: string;
  updatedDate: string;
  tableOfContents: TableOfContentsItem[];
  content: string;
  notes?: string[];
  warnings?: string[];
  relatedArticles?: { title: string; slug: string; category: string }[];
  faq?: FAQItem[];
  seo: SEOMetadata;
  isFeatured?: boolean;
  isPublished?: boolean;
}

export interface GuideItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  category: string;
  readingTime: string;
  difficulty: DifficultyLevel;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedDate: string;
  content: string;
  keyTakeaways: string[];
  seo: SEOMetadata;
  isFeatured?: boolean;
}

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  category: string;
  bestFor: string;
  strengths: string[];
  weaknesses: string[];
  pricing: {
    model: "Free" | "Freemium" | "Paid" | "Enterprise" | "Open Source";
    startingPrice: string;
    details: string;
  };
  alternatives: string[];
  useCases: string[];
  workflow: {
    title: string;
    steps: { stepNumber: number; title: string; description: string }[];
  };
  faq: FAQItem[];
  relatedDocs: { title: string; slug: string }[];
  latestUpdates?: string;
  rating?: string;
  ratingCount?: string;
  license?: string;
  os?: string[];
  interfaceType?: string;
  updated?: string;
  isFeatured?: boolean;
  seo: SEOMetadata;
}

export type ResourceType =
  | "glossary"
  | "cheatsheet"
  | "template"
  | "diagram"
  | "checklist"
  | "download";

export interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: ResourceType;
  description: string;
  content: string;
  downloadUrl?: string;
  tags: string[];
  updatedAt: string;
}

export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  category: string;
  relatedDocs?: { title: string; slug: string }[];
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: "admin" | "author" | "user";
  bio?: string;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  itemType: "doc" | "guide" | "tool" | "resource";
  itemId: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
}

export interface ReadingHistoryItem {
  id: string;
  userId: string;
  itemType: "doc" | "guide";
  itemId: string;
  title: string;
  slug: string;
  progressPercent: number;
  lastReadAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  subscribedAt: string;
  preferences?: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  type: "doc" | "guide" | "tool" | "resource" | "glossary";
  slug: string;
  category: string;
  snippet: string;
  url: string;
}
