// Wholesale and custom-manufacturing terms, as confirmed by the owner.
//
// Single source of truth. The site previously advertised "50 units per SKU"
// (and "100 units" in two articles) alongside invented 15/20/30% discount tiers,
// while the real minimum for a custom production run is 5,000 pieces per colour
// - a 100x difference that would have produced inquiries nobody could fulfil,
// and copy that actively told readers custom work starts above 100 units.
//
// Only facts the owner has confirmed belong here. There is deliberately no
// discount percentage, no certification claim, and no price: pricing is quoted
// per project.

// Local copy of the thousands formatter on purpose: this module must stay
// dependency-free, because the wholesale enquiry form is a client component and
// importing lib/products.ts from here would pull the whole product catalogue
// into the browser bundle.
function formatCount(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const WHOLESALE = {
  /** Minimum for a custom production run, per colour. */
  minimumOrderPerColor: 5000,
  /** Pieces per export carton. */
  piecesPerCarton: 200,
  /** Production time once the deposit has cleared. */
  leadTimeWeeks: 2,
  /** Deposit taken before production. */
  depositPercent: 50,
  sizeInches: 18,
  sizeMetric: '46 cm',
  material: 'EVA foam',
  printing: 'Silk-screen printing',
  /** Customisation the owner confirmed. */
  customisation: [
    'EVA thickness made to order',
    'Colours matched to your specification',
    'Your logo applied by silk-screen printing',
  ],
  packing: [
    `${formatCount(200)} pieces per export carton`,
    'Individual OPP bag per piece on request',
  ],
  payment: [`${50}% deposit before production`, 'Balance before shipment'],
  shipping: 'We can ship to your freight forwarder',
  pricing: 'Quoted per project',
  useCases: [
    'Graduation ceremonies',
    'Stadium and pep-rally celebrations',
    'Brand giveaways and promotional campaigns',
    'Distributor and retail stock',
  ],
  /** Who a 5,000-per-colour run actually suits. */
  audience: [
    'Importers and distributors',
    'Promotional product companies',
    'Brands running large campaigns',
    'School districts and large sports organisations',
  ],
} as const;

/** e.g. "5,000 pieces" - used wherever the minimum order is mentioned. */
export function formatMinimumOrder(): string {
  return `${formatCount(WHOLESALE.minimumOrderPerColor)} pieces`;
}

/** e.g. "5,000 pieces per colour" */
export function formatMinimumOrderPerColor(): string {
  return `${formatMinimumOrder()} per colour`;
}

/** e.g. "18 in (46 cm)" */
export function formatWholesaleSize(): string {
  return `${WHOLESALE.sizeInches} in (${WHOLESALE.sizeMetric})`;
}

export interface WholesaleFaqItem {
  question: string;
  answer: string;
}

// Shared by the visible FAQ and the FAQPage structured data, so the markup can
// never describe different terms from the page.
export const WHOLESALE_FAQ: WholesaleFaqItem[] = [
  {
    question: 'What is the minimum order quantity?',
    answer: `${formatMinimumOrderPerColor()}. The minimum applies per colour, so a run of two colours starts at ${formatCount(
      WHOLESALE.minimumOrderPerColor * 2,
    )} pieces.`,
  },
  {
    question: 'Can I order fewer than that?',
    answer:
      'For small quantities our retail packs are the better route: the 12-pack is on Amazon and the 6-pack is on Temu. Custom production with your own colours, thickness, and logo starts at the minimum above.',
  },
  {
    question: 'Can you print our logo?',
    answer:
      'Yes, by silk-screen printing. Send vector artwork (AI, EPS, PDF, or a high-resolution PNG) with your enquiry and we will confirm what reproduces cleanly on EVA foam.',
  },
  {
    question: 'Can we choose the colour and the EVA thickness?',
    answer:
      'Yes. Thickness is made to order and colours are matched to your specification, so both are part of the quote rather than fixed options.',
  },
  {
    question: 'What is the lead time?',
    answer: `About ${WHOLESALE.leadTimeWeeks} weeks for production once the deposit has cleared. Confirm the schedule with us when you place the order, since it depends on the quantity and the printing.`,
  },
  {
    question: 'How are they packed?',
    answer: `${formatCount(WHOLESALE.piecesPerCarton)} pieces per export carton${
      WHOLESALE.packing[1] ? `, and ${WHOLESALE.packing[1].toLowerCase()}` : ''
    }.`,
  },
  {
    question: 'What are the payment terms?',
    answer: `${WHOLESALE.payment[0]}, balance before shipment. ${WHOLESALE.pricing} - tell us the quantity, colours, and printing and we will come back with a price.`,
  },
  {
    question: 'How do you ship?',
    answer: `${WHOLESALE.shipping}, so you can consolidate the shipment with your other suppliers.`,
  },
];
