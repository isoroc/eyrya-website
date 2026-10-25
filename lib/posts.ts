// Single source of truth for every article on the site.
//
// Before this module existed the same posts were hardcoded in three places - the
// home page preview section, the ideas listing, and the article template - and
// they had drifted apart: different excerpts for the same post, hardcoded read
// times that were up to 4x the real length, and no shared category slugs. Add or
// change a post here and every page picks it up.
import { formatCount, formatPackSize, formatPrice, getFeaturedProduct, getPrimaryOffer } from './products';
import { WHOLESALE, formatMinimumOrderPerColor } from './wholesale';

// Article copy that quotes a price reads it from the catalogue, so an article can
// never advertise a price the product page no longer shows. This is how an
// article once claimed "$29.99 (just $2.50 each)" - an invented price - while the
// real listing price was different. Change the price in lib/products.ts and every
// article quoting it follows.
const FLAGSHIP_OFFER = getPrimaryOffer(getFeaturedProduct());
const FLAGSHIP_PACK = formatPackSize(FLAGSHIP_OFFER.packSize);
const FLAGSHIP_COST_PHRASE =
  FLAGSHIP_OFFER.price === null
    ? 'is priced on the marketplace listing'
    : `costs ${formatPrice(FLAGSHIP_OFFER.price)} (just ${formatPrice(
        FLAGSHIP_OFFER.price / FLAGSHIP_OFFER.packSize,
      )} each)`;

export type PostCategorySlug = 'party-ideas' | 'sports-events' | 'outdoor-activities' | 'wholesale';

export interface PostCategory {
  slug: PostCategorySlug;
  name: string;
}

export interface Post {
  slug: string;
  title: string;
  /** Plain text, no markup: used on cards, in metadata, and in JSON-LD. */
  excerpt: string;
  categorySlug: PostCategorySlug;
  /** Display form shown on the card and the article header, e.g. 'Aug 29, 2026'. */
  date: string;
  /** Machine form for <time> and structured data, e.g. '2026-08-29'. */
  isoDate: string;
  /** Derived from the article body by estimateReadTime(), never hand-written. */
  readTime: string;
  /** Article body HTML, rendered with dangerouslySetInnerHTML. */
  content: string;
  image: string;
  /** Alt text for the lead image; defaults to the title when omitted. */
  imageAlt?: string;
  /** Product slugs shown under "Related Products"; product names live in lib/products. */
  relatedProductSlugs?: string[];
}

/** Used for posts that have no artwork of their own - Article rich results need an image. */
export const POST_FALLBACK_IMAGE = '/images/og-image.png';

export const POST_CATEGORIES: PostCategory[] = [
  { slug: 'party-ideas', name: 'Parties' },
  { slug: 'sports-events', name: 'Sports' },
  { slug: 'outdoor-activities', name: 'Outdoor' },
  { slug: 'wholesale', name: 'Wholesale' },
];

// Reading time is derived from the article body rather than maintained by hand.
// Tags are stripped first, then words are counted at 200 words per minute.
export function estimateReadTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).filter((word) => word.length > 0);
  const minutes = Math.max(1, Math.round(words.length / 200));
  return `${minutes} min read`;
}

// Article bodies, kept as literal HTML so the detail page renders them exactly
// as they were written.
const CUSTOM_FOAM_FINGERS_GUIDE_CONTENT = `
      <p>Custom foam fingers are a manufacturing order, not a larger retail order. That distinction decides almost everything that follows: the minimum, the lead time, the price, and what you have to send before anyone can quote you properly.</p>

      <h2>What you can actually change</h2>
      <ul>
        <li><strong>Thickness</strong> - the EVA foam weight is made to order, so you are not picking from a fixed menu.</li>
        <li><strong>Colours</strong> - matched to your specification, whether that is one team colour or a full range.</li>
        <li><strong>Logo</strong> - applied by silk-screen printing. Send vector artwork and we will confirm what reproduces cleanly on foam.</li>
      </ul>
      <p>The size is fixed at 18 in (46 cm), the same hand the retail 12-pack uses.</p>

      <h2>The minimum is per colour, not per order</h2>
      <p>Custom production starts at 5,000 pieces per colour. Two colours means 10,000 pieces, three means 15,000. The reason is the print setup: every colour is its own screen, so the per-colour minimum is what makes that setup worth running.</p>
      <p>Below that, the retail packs are the better route: a 12-pack on Amazon and a 6-pack on Temu, in five standard colours. They ship immediately, and at that volume they cost less per hand.</p>

      <h2>What to send with your enquiry</h2>
      <p>An enquiry we can quote without a round of questions needs five things:</p>
      <ul>
        <li><strong>Artwork</strong> - AI, EPS, PDF, or a high-resolution PNG. A logo pulled off a website at 200px will not screen-print.</li>
        <li><strong>Quantity per colour</strong>, counted separately rather than as one total.</li>
        <li><strong>Colour reference</strong> - Pantone numbers if you have them, not just "our team red".</li>
        <li><strong>Packing preference</strong> - 200 pieces per export carton is standard; say so if you also need an individual OPP bag per piece for handing out or reselling.</li>
        <li><strong>Destination</strong> - we can ship to your freight forwarder so you can consolidate with your other suppliers.</li>
      </ul>

      <h2>What happens next</h2>
      <ol>
        <li>We quote. Pricing is per project rather than off a rate card, because the unit price depends on the quantity, how much printing is involved, and the packing.</li>
        <li>We agree the specification - colours, logo placement, packing - before anything is produced.</li>
        <li>You pay 50% to start production; the balance is due before shipment.</li>
        <li>Production takes about 2 weeks once the deposit clears.</li>
        <li>We ship to your forwarder, or as agreed.</li>
      </ol>

      <h2>Four things that delay a run</h2>
      <ul>
        <li><strong>Low-resolution artwork.</strong> The most common cause, and it usually surfaces after the screens are made.</li>
        <li><strong>Colours named rather than specified.</strong> "Navy" is three different colours to three different people.</li>
        <li><strong>Packing decided late.</strong> Individual OPP bagging is a separate step, not something to add the day before shipment.</li>
        <li><strong>Working back from an event date without counting transit.</strong> The 2 weeks is production only.</li>
      </ul>

      <h2>When stock beats custom</h2>
      <p>Custom makes sense when identity matters: a school, a team, a brand running a campaign. If you simply need foam hands in a team colour, the <a href="/products/eva-foam-finger/">retail 12-pack</a> in five colours gets you there with a fraction of the commitment. The <a href="/wholesale/">foam finger bulk page</a> carries the full terms, and <a href="/ideas/bulk-order-guide/">this guide to bulk orders</a> covers the mechanics of placing one.</p>
    `;

const GAME_DAY_CHECKLIST_CONTENT = `
      <p>A good game day is mostly preparation. Here is what to sort out the week before, the night before, and at the ground - including the one piece of kit that makes a section look organised on camera instead of scattered.</p>

      <h2>The week before</h2>
      <ul>
        <li><strong>Check the bag policy.</strong> Most grounds restrict what you can carry in, and the rules differ from venue to venue. A phone call now beats an argument at the gate.</li>
        <li><strong>Decide who carries what.</strong> One person with the cooler, one with the chairs, one with the flag. Shared lists in a group chat beat good intentions.</li>
        <li><strong>Check the forecast</strong> and plan for the version of the day you actually expect, not the one you want.</li>
        <li><strong>Charge everything.</strong> Phones, speakers, whatever camera you are bringing.</li>
      </ul>

      <h2>The night before</h2>
      <ul>
        <li>Pack the car while it is still light, or stage everything by the door.</li>
        <li>Freeze the drinks. They double as ice and they are still cold at halftime.</li>
        <li>Lay out what you are wearing, including the layers you will be glad of after sunset.</li>
        <li>Put the tickets, parking pass, and any physical passes in one place that is not your pocket.</li>
      </ul>

      <h2>The section kit</h2>
      <p>This is where the foam fingers earn their place. A section wearing the same colour reads as one crowd on camera; a mix of whatever people had at home reads as noise. The <a href="/products/eva-foam-finger/">18-inch EVA foam hand</a> comes as a 12-pack on Amazon and a 6-pack on Temu in five standard colours, so a group of twenty can be matched on purpose rather than assembled by accident.</p>
      <p>Two practical notes. Keep them out of direct sun in a hot car - foam that bakes all afternoon is not the same foam by kickoff. And decide in advance who is taking them home, because a set of twelve is easy to lose one at a time.</p>

      <h2>At the ground</h2>
      <ul>
        <li>Arrive earlier than you think you need to. Parking is the variable you cannot control.</li>
        <li>Set up at the back of your section, not the front, so you are not blocking anyone's view.</li>
        <li>Keep the cooler out of the sun and off the ground if the ground is wet.</li>
        <li>Take the photo before the game, not after. Everyone still looks like they meant to be there.</li>
      </ul>

      <h2>After the game</h2>
      <p>The difference between kit that lasts several seasons and kit you replace every year is about ten minutes at the end. Wipe anything that got rained on, let it dry fully before it goes back in a bag, and store the foam hands flat rather than crushed under a cooler in the boot.</p>
      <p>If you are kitting out a whole section or a school, that is a different order of magnitude - see the <a href="/wholesale/">foam finger bulk terms</a> before you buy twelve-packs one at a time.</p>
    `;

const FOAM_FINGER_QUALITY_CONTENT = `
      <p>Foam fingers fail in predictable ways. Knowing what those ways are tells you what to ask before you buy - whether you are buying twelve or twelve thousand.</p>

      <h2>How they fail</h2>
      <ul>
        <li><strong>Compression.</strong> Low-density foam is mostly air. Wave it for a few innings and it stops springing back, which is why cheap hands look tired by the second half.</li>
        <li><strong>Ink flaking.</strong> Printing that has not cured properly peels first at the edge of the logo, where the print meets unprinted foam.</li>
        <li><strong>Tearing at the hand opening.</strong> That opening takes the strain every single time it is pulled on, so it is where a weak cut shows up first.</li>
        <li><strong>Water.</strong> Foam that absorbs water stays heavy, and it smells of whatever bag it was stored in.</li>
      </ul>

      <h2>What actually decides how long it lasts</h2>
      <p><strong>Density, not just thickness.</strong> Two hands can be the same thickness and behave completely differently, because one is mostly air and the other is not. Thickness is easy to advertise; density is what you feel when you squeeze it.</p>
      <p><strong>How the print was applied.</strong> Silk-screen printing pushes ink into the surface rather than laying a film on top of it, which is why it survives handling better than a printed sticker or a heat transfer.</p>
      <p><strong>How it is stored between seasons.</strong> Flat, dry, and out of a hot car. Most of the damage that gets blamed on the product happens in storage.</p>

      <h2>What we make, specifically</h2>
      <p>Our hands are 18 in (46 cm) and made from EVA foam. On a custom production run the thickness is made to order rather than fixed, so a buyer who needs a different weight can specify it instead of taking whatever is in stock. Colours are matched to your specification on custom runs, and the retail range is five colours. Bulk orders pack 200 pieces to an export carton, with an individual OPP bag per piece available on request.</p>
      <p>Because the specification is yours on a custom run, the useful question is not "how thick is it" but "what do you need it to survive" - a single event, a season, or repeated handing out at a trade show.</p>

      <h2>How to judge before you commit</h2>
      <ul>
        <li><strong>Hold it by the finger and let it hang.</strong> Dense foam holds the shape; light foam droops immediately.</li>
        <li><strong>Twist it gently and let go.</strong> If it stays creased, it will stay creased on the shelf.</li>
        <li><strong>Look at the edge of the print.</strong> A crisp edge suggests proper curing; a soft or feathered edge suggests it was laid on rather than pushed in.</li>
        <li><strong>Ask what the foam weight is.</strong> A supplier who cannot answer that question is not specifying the product.</li>
      </ul>

      <p>The retail ${FLAGSHIP_PACK} ${FLAGSHIP_COST_PHRASE} on Amazon, and a custom run is quoted per project instead, because the unit price there depends on the quantity, the printing, and the packing.</p>

      <p>If you are choosing between stock and a custom run, the <a href="/wholesale/">foam finger bulk terms</a> cover what changes at each volume, and <a href="/products/eva-foam-finger/">the retail 12-pack</a> is the fastest way to see what the standard hand is like.</p>
    `;

const BULK_ORDER_GUIDE_CONTENT = `
      <p>Ordering foam fingers in quantity is a different process from buying a 12-pack. This guide covers the numbers that actually matter: the minimum order, what you can change, how long it takes, how the goods are packed, and how payment and shipping are handled.</p>

      <h2>Minimum Order Quantity</h2>
      <p>The minimum for a custom production run is ${formatMinimumOrderPerColor()}. The minimum applies per colour, so a two-colour run starts at ${formatCount(WHOLESALE.minimumOrderPerColor * 2)} pieces and a five-colour run at ${formatCount(WHOLESALE.minimumOrderPerColor * 5)}. This is not a sales tactic: print setup is per colour, which is exactly why the minimum exists.</p>

      <h2>If You Need Fewer</h2>
      <p>For anything below the minimum, our retail packs are the better route and they ship immediately: a 12-pack on Amazon and a 6-pack on Temu, in several standard colours. At small volumes that is genuinely cheaper than custom production, not merely faster.</p>

      <h2>What You Can Customise</h2>
      <ul>
        <li><strong>Thickness</strong> - the EVA foam thickness is made to order rather than fixed to a stock spec</li>
        <li><strong>Colours</strong> - matched to your specification, so team or brand colours are possible</li>
        <li><strong>Logo</strong> - applied by silk-screen printing</li>
      </ul>
      <p>Send vector artwork (AI, EPS, PDF, or a high-resolution PNG) with your enquiry so we can confirm what reproduces cleanly on foam.</p>

      <h2>Packing</h2>
      <ul>
        <li>${formatCount(WHOLESALE.piecesPerCarton)} pieces per export carton</li>
        <li>Individual OPP bag per piece on request, if you need to hand them out singly or resell them</li>
      </ul>

      <h2>Lead Time</h2>
      <p>Production takes about ${WHOLESALE.leadTimeWeeks} weeks once the deposit has cleared. That is production time only - it excludes shipping, so work the transit time in as well when you are counting back from an event date.</p>

      <h2>Payment</h2>
      <p>${WHOLESALE.depositPercent}% deposit before production, balance before shipment. Pricing is quoted per project, because it depends on the quantity, the printing, and the packing - tell us those three things and you get a real number instead of a range.</p>

      <h2>Shipping</h2>
      <p>${WHOLESALE.shipping}, so you can consolidate the shipment with your other suppliers rather than arranging separate transport for this order.</p>

      <h2>Who a Run This Size Suits</h2>
      <ul>
        <li><strong>Importers and distributors</strong> - stock for resale</li>
        <li><strong>Promotional product companies</strong> - client campaigns and giveaways</li>
        <li><strong>Brands and agencies</strong> - stadium and event activations</li>
        <li><strong>School districts and large sports organisations</strong> - graduation ceremonies and pep rallies at scale</li>
      </ul>

      <h2>How to Start</h2>
      <p>Send us your artwork, the colours, the thickness, the quantity per colour, and the destination. We will come back with a quote and a production schedule. <a href="/wholesale/">Start a foam finger bulk enquiry</a>.</p>
    `;

export const POSTS: Post[] = [
  {
    slug: 'custom-foam-fingers-guide',
    title: 'Custom Foam Fingers Guide for Schools, Teams & Events',
    excerpt: 'Everything you need to know about ordering custom foam fingers, from design and pricing to minimums and lead times.',
    categorySlug: 'wholesale',
    date: 'Sep 18, 2026',
    isoDate: '2026-09-18',
    readTime: estimateReadTime(CUSTOM_FOAM_FINGERS_GUIDE_CONTENT),
    content: CUSTOM_FOAM_FINGERS_GUIDE_CONTENT,
    image: POST_FALLBACK_IMAGE,
    relatedProductSlugs: ['eva-foam-finger'],
  },
  {
    slug: 'game-day-checklist',
    title: 'The Ultimate Game Day Checklist',
    excerpt: 'Everything you need for the perfect tailgate. From foam fingers to face paint, coolers to portable chairs.',
    categorySlug: 'sports-events',
    date: 'Aug 29, 2026',
    isoDate: '2026-08-29',
    readTime: estimateReadTime(GAME_DAY_CHECKLIST_CONTENT),
    content: GAME_DAY_CHECKLIST_CONTENT,
    image: POST_FALLBACK_IMAGE,
    relatedProductSlugs: ['eva-foam-finger'],
  },
  {
    slug: 'foam-finger-quality',
    title: 'Why Our Foam Fingers Are Different',
    excerpt: 'Most foam fingers fall apart after one game. Here\'s how we fixed that problem.',
    categorySlug: 'sports-events',
    date: 'Aug 7, 2026',
    isoDate: '2026-08-07',
    readTime: estimateReadTime(FOAM_FINGER_QUALITY_CONTENT),
    content: FOAM_FINGER_QUALITY_CONTENT,
    image: POST_FALLBACK_IMAGE,
    relatedProductSlugs: ['eva-foam-finger'],
  },
  {
    slug: 'bulk-order-guide',
    title: 'Bulk Foam Finger Orders: Minimums & Lead Time',
    excerpt: 'How custom foam finger orders actually work: the per-colour minimum, what you can change, packing, lead time, payment, and shipping.',
    categorySlug: 'wholesale',
    date: 'Jun 30, 2026',
    isoDate: '2026-06-30',
    readTime: estimateReadTime(BULK_ORDER_GUIDE_CONTENT),
    content: BULK_ORDER_GUIDE_CONTENT,
    image: POST_FALLBACK_IMAGE,
    relatedProductSlugs: ['eva-foam-finger'],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function getAllPosts(): Post[] {
  return POSTS;
}

export function getPostsByCategory(slug: PostCategorySlug): Post[] {
  return POSTS.filter((post) => post.categorySlug === slug);
}

export function getPostCategory(slug: string): PostCategory | undefined {
  return POST_CATEGORIES.find((category) => category.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 2): Post[] {
  return POSTS.filter((post) => post.slug !== slug).slice(0, limit);
}

export const POST_SLUGS: string[] = POSTS.map((post) => post.slug);

// The three posts featured in the home page preview section, in display order.
export const FEATURED_POST_SLUGS: string[] = [
  'custom-foam-fingers-guide',
  'game-day-checklist',
  'foam-finger-quality',
];

export function getFeaturedPosts(): Post[] {
  return FEATURED_POST_SLUGS.map((slug) => {
    const post = getPost(slug);
    if (!post) {
      throw new Error(`FEATURED_POST_SLUGS entry "${slug}" does not match any post`);
    }
    return post;
  });
}
