import { LucideIcon } from 'lucide-react';

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ComparisonFeature {
  feature: string;
  apex: boolean | string;
  legacy: boolean | string;
  manual: boolean | string;
}
