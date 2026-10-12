// Single source of truth for the support FAQ.
//
// Both the visible accordion (app/support/SupportContent.tsx) and the FAQPage
// structured data (app/support/page.tsx) read from here, so the markup can never
// describe fewer questions than the page actually shows.
//
// These answers used to describe shipping and returns as if EYRYA fulfilled
// orders itself ("3-5 business days", "we ship to over 20 countries", "30-day
// return policy", "free shipping over $20"). None of that was true: orders are
// placed on Amazon or Temu, so the marketplace's delivery and return terms
// apply. The answers now say that, and only that.
import { formatMinimumOrderPerColor } from './wholesale';

export interface FaqItem {
  question: string;
  answer: string;
}

export const SUPPORT_FAQ: FaqItem[] = [
  {
    question: 'How long does shipping take?',
    answer:
      'Delivery is handled by the marketplace you order from, so the speed depends on the option you pick at checkout. Amazon Prime members get Amazon\'s 2-day service; Temu shows its own estimate on the listing.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'We do not ship directly - orders are placed on Amazon or Temu, and each listing shows which destinations it can be delivered to. Where a listing ships, the marketplace handles the delivery and any customs paperwork.',
  },
  {
    question: 'What is the return policy?',
    answer:
      'Returns and refunds follow the policy of the marketplace you bought from, and are started from your Amazon or Temu order page. If an item arrives damaged or defective, email support@eyrya.com and we will sort it out with you directly.',
  },
  {
    question: 'How can I track my order?',
    answer:
      "The marketplace sends the tracking details once your order ships, and they are also visible on your Amazon or Temu order page. If you can't find them, contact us with your order number and we will help.",
  },
  {
    question: 'Can I order in bulk for an event?',
    answer:
      'Custom production starts at ' + formatMinimumOrderPerColor() + '. That covers your own colours, EVA thickness, and a silk-screened logo - see the wholesale page for packing, lead time, and payment terms. Below that minimum, the 12-pack on Amazon and the 6-pack on Temu are the better route and ship immediately.',
  },
  {
    question: 'Where do I actually buy?',
    answer:
      'EYRYA sells through Amazon and Temu rather than directly on this site. That means Amazon Prime shipping, A-to-Z Guarantee, and the marketplace return process apply to your order. See the Where to Buy page for both storefronts.',
  },
  {
    question: 'My product arrived damaged, what do I do?',
    answer:
      "Please take photos of the damaged item and the packaging, then email support@eyrya.com with your order number. We will work through the replacement or refund with you, and you do not need to send the damaged item back to us.",
  },
  {
    question: 'How do I know if a product is in stock?',
    answer:
      'Live availability is shown on the Amazon and Temu listings, which is where orders are fulfilled. If an item is unavailable when you order, the marketplace will tell you immediately. For a custom production run, contact us first and we will confirm the schedule.',
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
