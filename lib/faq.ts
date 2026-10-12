// Single source of truth for the support FAQ.
//
// Both the visible accordion (app/support/SupportContent.tsx) and the FAQPage
// structured data (app/support/page.tsx) read from here, so the markup can never
// describe fewer questions than the page actually shows.
import { BRAND } from './products';
import { formatMinimumOrderPerColor } from './wholesale';

export interface FaqItem {
  question: string;
  answer: string;
}

export const SUPPORT_FAQ: FaqItem[] = [
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping within the US typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery. International shipping times vary by destination but generally take 7-14 business days.',
  },
  {
    question: 'Do you ship internationally?',
    answer: `Yes! We ship to over ${BRAND.countriesShipped} countries worldwide. International shipping rates are calculated at checkout based on your location and order weight. Please note that customs duties and taxes may apply depending on your country's regulations.`,
  },
  {
    question: 'What is your return policy?',
    answer:
      "We offer a 30-day return policy for unused items in their original packaging. If your product arrives damaged or defective, we'll provide a full refund or replacement at no extra cost. Simply contact our support team to initiate a return.",
  },
  {
    question: 'How can I track my order?',
    answer:
      "Once your order ships, you'll receive an email with a tracking number and link. You can also request tracking details using the form on this page. If you can't find your tracking information, contact us with your order number.",
  },
  {
    question: 'Can I order in bulk for an event?',
    answer:
      "Custom production starts at " + formatMinimumOrderPerColor() + ". That covers your own colours, EVA thickness, and a silk-screened logo - see the wholesale page for packing, lead time, and payment terms. Below that minimum, the 12-pack on Amazon and the 6-pack on Temu are the better route and ship immediately.",
  },
  {
    question: 'Where do I actually buy?',
    answer:
      'EYRYA sells through Amazon and Temu rather than directly on this site. That means Amazon Prime shipping, A-to-Z Guarantee, and the marketplace return process apply to your order. See the Where to Buy page for both storefronts.',
  },
  {
    question: 'My product arrived damaged, what do I do?',
    answer:
      "We're sorry to hear that! Please take photos of the damaged item and packaging, then contact our support team at support@eyrya.com. We'll arrange for a replacement or full refund within 24 hours. No need to return the damaged item.",
  },
  {
    question: 'How do I know if a product is in stock?',
    answer:
      'Live availability is shown on the Amazon and Temu listings, which is where orders are fulfilled. If an item is unavailable when you order, the marketplace will tell you immediately. For large quantity orders, contact us first and we will confirm availability.',
  },
];

export const SUPPORT_FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SUPPORT_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};
