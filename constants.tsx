import { MousePointer2, Smartphone, Database, Users, FileText, ShoppingCart, Zap, ShieldCheck, Layout, Settings, WifiOff, Activity } from 'lucide-react';
import { Feature, PricingTier, Testimonial, FAQItem, ComparisonFeature } from './types';

export const NAV_LINKS = [
  { name: 'Platform', href: '#features' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'ROI', href: '#roi' },
  { name: 'FAQ', href: '#faq' },
];

export const FEATURES: Feature[] = [
  {
    title: 'Instant Ticketing',
    description: 'Walk-ins, bookings, estimates—every intake is frictionless and logged with timestamped notes.',
    icon: MousePointer2,
  },
  {
    title: 'Repair Catalog',
    description: 'Preloaded with triage flows for phones, tablets, laptops, consoles, drones, and wearables.',
    icon: Smartphone,
  },
  {
    title: 'Inventory Sync',
    description: 'Track parts, flag low stock, and auto-suggest compatible replacements. Prevent lost parts.',
    icon: Database,
  },
  {
    title: 'Customer CRM',
    description: 'Lifetime revenue tracking, repeat visits, open tickets—all visible at a glance.',
    icon: Users,
  },
  {
    title: 'Technician Logging',
    description: 'Timestamped notes, progress updates, and repair guides per ticket. Audit-ready logs.',
    icon: FileText,
  },
  {
    title: 'POS Integration',
    description: 'Complete checkout, tax calculation, and receipt generation. No external system needed.',
    icon: ShoppingCart,
  },
];

export const BENEFITS: Feature[] = [
    { title: 'Zero Training Required', description: 'Technicians and front desk staff pick it up in minutes.', icon: Zap },
    { title: 'Audit-Ready', description: 'Every action is timestamped, logged, and exportable.', icon: ShieldCheck },
    { title: 'Multi-Tenant Ready', description: 'Scale to franchises or partner stores with isolated data.', icon: Layout },
    { title: 'Customizable Workflows', description: 'Add your own repair types, pricing, and intake logic.', icon: Settings },
    { title: 'Offline Resilience', description: 'Keep working even if the internet drops with local data sync.', icon: WifiOff },
    { title: 'ROI in Weeks', description: 'Reduce missed tickets, increase upsells, and build trust.', icon: Activity },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: '$29',
    period: '/mo',
    description: 'Perfect for small repair shops.',
    features: ['Unlimited Tickets', 'Basic Inventory', 'Customer CRM', 'Point of Sale', '1 User Account'],
    cta: 'Start 7-Day Free Trial',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '$59',
    period: '/mo',
    description: 'For growing shops needing automation.',
    features: ['Everything in Starter', 'Advanced Inventory', 'SMS & Email Alerts', 'Mendrix AI Assistant', '5 User Accounts'],
    cta: 'Start 7-Day Free Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For franchises and multi-store owners.',
    features: ['Everything in Professional', 'Unlimited Users', 'Multi-Store Mgmt', 'Dedicated API', 'White Labeling'],
    cta: 'Contact Sales',
    highlight: false,
  }
];

export const COMPARISON_DATA: ComparisonFeature[] = [
  { feature: 'Cloud-Based Access', apex: true, legacy: true, manual: false },
  { feature: 'Offline Mode', apex: true, legacy: false, manual: true },
  { feature: 'AI-Powered Triage', apex: true, legacy: false, manual: false },
  { feature: 'Inventory Auto-Sync', apex: true, legacy: 'Partial', manual: false },
  { feature: 'Integrated Marketing', apex: true, legacy: false, manual: false },
  { feature: 'Audit Trails', apex: true, legacy: 'Basic', manual: false },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "ApexRepairBench transformed our repair workflow. We used to lose hours to manual entry; now it's all automated.",
    author: "Sarah Jenkins",
    role: "Lead Technician",
    company: "FixItFast Hub",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    quote: "The inventory sync is a lifesaver. We stopped ordering parts we already had and cut our overhead by 20% in month one.",
    author: "Mike Ross",
    role: "Owner",
    company: "Ross Tech Repair",
    image: "https://i.pravatar.cc/150?u=mike"
  },
  {
    quote: "Mendrix AI is shockingly good. It drafts estimates for water damage repairs faster than my best tech.",
    author: "Elena Rodriguez",
    role: "Operations Manager",
    company: "Gadget Hospital",
    image: "https://i.pravatar.cc/150?u=elena"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Do I need a credit card to start the trial?",
    answer: "No. You get 7 days of full access to the Professional plan without entering any payment information. We only ask for payment if you decide to continue."
  },
  {
    question: "Can I import data from my old system?",
    answer: "Yes! We support one-click CSV imports for Inventory, Customers, and Ticket History from RepairDesk, RepairShopr, and Excel."
  },
  {
    question: "Does it work with thermal receipt printers?",
    answer: "Absolutely. Apex is compatible with all standard ESC/POS thermal printers (Star Micronics, Epson) and barcode scanners."
  },
  {
    question: "What happens if my internet goes down?",
    answer: "Apex includes Offline Mode. You can continue to create tickets, process cash payments, and manage inventory. Data syncs automatically when you reconnect."
  },
  {
    question: "Is my customer data secure?",
    answer: "Security is our top priority. We are SOC 2 Type II compliant, use 256-bit SSL encryption, and perform daily encrypted backups of your data."
  }
];