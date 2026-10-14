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
      <p>If you have ever tried to outfit an entire student section, a marching band, or a company spirit day, you already know the problem. Retail foam fingers come in small packs and rarely in the color or design you actually need. Custom foam fingers solve that problem - but only if you understand how the ordering process really works.</p>

      <p>This guide walks you through everything: when custom makes sense, how much it costs, how long it takes, and how to design a foam finger that people actually keep instead of tossing in the trash.</p>

      <h2>What Are Custom Foam Fingers?</h2>
      <p>Custom foam fingers are foam hands manufactured to your specifications - your colors, your logo, your text, even your own artwork. Unlike the stock foam fingers you find at a party store, a custom run is produced specifically for your school, team, brand, or event.</p>
      <p>Most custom foam fingers are made from the same high-density EVA foam used in premium stock options. The difference is that the color, print, and cutout are chosen by you rather than picked off a shelf.</p>

      <h2>When Custom Foam Fingers Are Worth It</h2>
      <p>Custom ordering is not for everyone. It makes sense when at least one of these is true:</p>
      <ul>
        <li><strong>You need a specific color.</strong> If your school colors are maroon and gold, a blue foam finger is not going to cut it.</li>
        <li><strong>You want your logo or mascot on it.</strong> A plain foam hand is fun, but one with your team logo becomes a keepsake.</li>
        <li><strong>You are ordering for a large group.</strong> Pep rallies, graduations, and stadium events scale into thousands of pieces - which is the point where custom production starts.</li>
        <li><strong>You want a consistent look.</strong> A matching set of foam fingers looks far more polished on camera than a mix of random colors.</li>
      </ul>
      <p>If you only need a handful of foam fingers in standard colors, buying a <a href="/products/eva-foam-finger/">12-pack of stock foam fingers</a> is faster and cheaper. Custom ordering only pays off at scale.</p>

      <h2>Custom vs. Stock Foam Fingers</h2>
      <p>Here is the honest comparison most suppliers will not give you:</p>
      <ul>
        <li><strong>Stock foam fingers</strong> - Available immediately, lower cost per unit, 12 colors to choose from, no design work required. Best for individuals and small groups.</li>
        <li><strong>Custom foam fingers</strong> - Higher upfront cost, longer lead time, but you control the color and print. Best for schools, teams, and brands with a clear identity.</li>
      </ul>
      <p>As a rule of thumb: custom production starts at ${formatMinimumOrderPerColor()}. Below that, stock is the better value - the 12-pack on Amazon and the 6-pack on Temu ship immediately.</p>

      <h2>How the Custom Ordering Process Works</h2>
      <p>A typical custom foam finger order moves through five stages:</p>
      <ul>
        <li><strong>1. Share your specs.</strong> Tell your supplier the color, quantity, and what you want printed.</li>
        <li><strong>2. Get a quote.</strong> You receive pricing based on quantity and complexity, plus an estimated delivery date.</li>
        <li><strong>3. Approve a proof.</strong> A digital mockup shows exactly how the foam finger will look before production begins.</li>
        <li><strong>4. Production.</strong> Once the proof is approved, your order goes into manufacturing.</li>
        <li><strong>5. Delivery.</strong> Finished units are packed and shipped to your address.</li>
      </ul>
      <p>Always ask for a physical or digital proof before production. Changes are cheap before printing and impossible after.</p>

      <h2>Design Tips That Make Your Foam Finger Stand Out</h2>
      <p>After working with hundreds of schools and teams, these are the design choices that consistently work:</p>
      <ul>
        <li><strong>Keep it readable from a distance.</strong> A foam finger is seen from across a stadium, not up close. Big, bold lettering beats intricate detail.</li>
        <li><strong>Use high contrast.</strong> Light text on a dark foam finger (or the reverse) reads best. Low-contrast logos disappear in photos.</li>
        <li><strong>Limit yourself to one or two colors.</strong> More colors mean more complexity and higher cost.</li>
        <li><strong>Make the hand shape part of the design.</strong> The raised index finger is the whole point - do not bury it under graphics.</li>
        <li><strong>Think about the photo.</strong> Your foam finger will end up in thousands of fan photos. Design for that moment.</li>
      </ul>

      <h2>Custom Foam Finger Costs and Lead Times</h2>
      <p>Custom foam fingers typically start at a higher unit price than stock and drop as quantity rises. Expect a lead time of four to six weeks for a custom run, compared to same-week shipping for stock orders.</p>
      <p>If you have a hard deadline - a homecoming game, a conference, a product launch - order early. Rushing a custom order rarely ends well.</p>

      <h2>Why EVA Foam Beats Cheap Alternatives</h2>
      <p>Whichever route you choose, specify the material rather than accepting &quot;foam&quot; as a description. EVA holds its shape far better than the thin low-density foams used in the cheapest hands, and it does not absorb water. On a custom run you are choosing the specification anyway, so it costs nothing to get it right.</p>

      <h2>The Bottom Line</h2>
      <p>Custom foam fingers are an investment in school spirit, team identity, or brand visibility. They are not the right choice for everyone, but for schools, teams, and events ordering at volume, they turn a fun prop into a keepsake that fans actually keep.</p>
      <p>Ready to order? Start with our <a href="/wholesale/">wholesale options</a> or browse our <a href="/products/eva-foam-finger/">EVA foam finger 12-pack</a> for smaller groups. If you have questions about a custom run, our team is happy to help.</p>
    `;

const GAME_DAY_CHECKLIST_CONTENT = `
      <p>Game day is coming up and you want to be the one who has everything covered. Whether it is a tailgate before the big NFL game, a college football watch party, or your kid's first trip to the stadium, being prepared makes all the difference.</p>

      <h2>Essentials You Cannot Forget</h2>
      <p>Every great game day starts with the basics. Here is what you absolutely need:</p>
      <ul>
        <li><strong>Foam fingers</strong> - The number one game day accessory. Our EVA foam fingers are 18 inches tall and made from high-density foam that will not collapse after one game. Get one in your team colors.</li>
        <li><strong>Team face paint</strong> - Nothing says fan spirit like painted cheeks. Pick up a few tubes of team-color face paint before you go.</li>
        <li><strong>Portable cooler</strong> - Keep drinks cold for hours. A good cooler is worth the investment for any serious tailgater.</li>
        <li><strong>Folding chairs</strong> - Standing for four hours is not fun. Bring comfortable seating for everyone in your group.</li>
      </ul>

      <h2>Tailgate Setup Tips</h2>
      <p>Setting up a great tailgate is about more than just throwing things in the trunk. Here is how to do it right:</p>
      <ul>
        <li>Arrive at least 3 hours before kickoff for the best parking spots</li>
        <li>Set up your canopy first - shade is everything on a sunny game day</li>
        <li>Keep food and drinks in separate coolers so you are not opening the food cooler all day</li>
        <li>Bring a Bluetooth speaker for pre-game music</li>
        <li>Pack hand sanitizer and wet wipes - stadium parking lots are not known for being clean</li>
      </ul>

      <h2>What to Bring for the Kids</h2>
      <p>If you are bringing kids to the game, you need extra supplies. Foam fingers are perfect because they are lightweight, fun, and give kids something to do during timeouts. Also pack:</p>
      <ul>
        <li>Ear protection for loud stadiums</li>
        <li>Snacks that will keep them happy through a 3-hour game</li>
        <li>A small blanket for sitting on bleachers</li>
        <li>Sunscreen - even on cloudy days</li>
      </ul>

      <h2>Post-Game Plan</h2>
      <p>Whether your team wins or loses, have a plan for after the game. Traffic is going to be terrible for at least an hour. If you can, stick around for 30 minutes after the final whistle to let the worst of the crowd clear out. This is also a great time to take photos with your foam fingers while the stadium is still buzzing.</p>

      <p>The bottom line: a good game day is a prepared game day. Check this list, pack the night before, and you will be the envy of every fan in the parking lot.</p>
    `;

const FOAM_FINGER_QUALITY_CONTENT = `
      <p>Foam fingers are simple objects, and that is exactly why the cheap ones disappoint. They look fine on the shelf, then go flat and bent within a game or two. The difference is almost entirely in the foam.</p>

      <h2>The Foam Problem</h2>
      <p>Thin, low-density foam is cheap, light, and photographs well. Its one flaw is that it compresses: wave it around for a few innings and it stops holding its shape. Density, not looks, is what decides how long a foam hand survives.</p>

      <p>We make ours from high-density EVA foam (ethylene-vinyl acetate) - the same family of material used in shoe soles and yoga mats. It is denser and more resilient than the low-density foams, so it holds its shape through repeated use, and it does not absorb water. On a custom run you can specify the thickness you want rather than taking whatever weight is in stock.</p>

      <h2>What That Means for You</h2>
      <ul>
        <li><strong>Longer lifespan</strong> - Our foam fingers last multiple seasons, not just one game</li>
        <li><strong>Better appearance</strong> - They stay tall and proud from kickoff to the final whistle</li>
        <li><strong>Weather resistance</strong> - EVA foam does not absorb water, so rain will not ruin it</li>
        <li><strong>Comfortable grip</strong> - The hand opening is sized for adults but works for older kids too</li>
      </ul>

      <h2>Is It Worth the Extra Cost?</h2>
      <p>The trade-off is arithmetic rather than marketing: if a hand lasts one game and you replace it every season, three seasons of replacements costs more than one that lasts. Our ${FLAGSHIP_PACK} of foam fingers ${FLAGSHIP_COST_PHRASE}, and it is meant to come back out next season.</p>

      <p>And if you are ordering for a team, school, or event, we produce custom runs from 5,000 pieces per colour with your own colours and printed logo. <a href="/wholesale/">The wholesale page</a> has the terms.</p>

      <p>Bottom line: we make foam fingers the way we want them made. Quality materials, solid construction, and a product you will actually want to bring to the next game.</p>
    `;

const REUSABLE_PARTY_SUPPLIES_CONTENT = `
      <p>There is a growing problem with party supplies: they are designed to be thrown away. Paper banners tear, plastic cups crack, and cheap decorations look sad after one use. We think that is wasteful and expensive over time.</p>

      <h2>The Real Cost of Disposable Party Supplies</h2>
      <p>Let us do the math. If you throw one party a month and spend $20 on disposable decorations each time, that is $240 a year. Over three years, you have spent $720 on things that end up in a landfill. Meanwhile, investing in quality reusable supplies costs more upfront but saves money in the long run.</p>

      <h2>What to Look for in Reusable Party Supplies</h2>
      <ul>
        <li><strong>Durable materials</strong> - EVA foam, thick fabric, and sturdy plastics that can be packed away and reused</li>
        <li><strong>Timeless designs</strong> - Avoid overly specific themes that only work for one occasion</li>
        <li><strong>Easy storage</strong> - If it is a pain to store, you will not reuse it</li>
        <li><strong>Easy to clean</strong> - Wipe-clean surfaces make reuse practical</li>
      </ul>

      <h2>Our Approach</h2>
      <p>Every EYRYA product is designed with reuse in mind. Our EVA foam fingers are the example we know best - an 18-inch EVA foam hand that is meant to come back out season after season rather than go flat after one game.</p>

      <h2>Quick Tips for Reusable Party Planning</h2>
      <ul>
        <li>Buy neutral colors that work for any theme - our foam fingers come in 12 colors that match any team or party palette</li>
        <li>Invest in LED lighting instead of disposable glow sticks - they last longer and are brighter</li>
        <li>Choose fabric banners over paper ones - they fold flat and last for years</li>
        <li>Store everything in labeled bins so you know what you have before buying more</li>
      </ul>

      <p>The shift from disposable to reusable party supplies is not just better for the environment - it is better for your wallet and your party experience. Quality supplies make your events feel more put together, and you will spend less time shopping and more time enjoying the celebration.</p>
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
      <p>Send us your artwork, the colours, the thickness, the quantity per colour, and the destination. We will come back with a quote and a production schedule. <a href="/wholesale/">Start a custom order enquiry</a>.</p>
    `;

const CAMPING_WITH_KIDS_CONTENT = `
      <p>Camping with kids sounds wonderful until you are three hours into a rainstorm and a six-year-old is asking why the tent is leaking. Here is what tends to go wrong, and how to make the trip work anyway.</p>

      <h2>Start Small</h2>
      <p>Your first family camping trip should not be a week in the backcountry. Start with one night at a campground that has bathrooms and running water. If that goes well, try two nights. Then consider more remote locations. Building up gradually keeps everyone happy and gives you a chance to figure out what works for your family.</p>

      <h2>What to Pack (Beyond the Basics)</h2>
      <p>You already know you need a tent, sleeping bags, and food. Here is what experienced camping parents add to the list:</p>
      <ul>
        <li><strong>Outdoor games</strong> - Kids get bored fast. A portable game kit with ring toss, bean bags, and bocce ball keeps them entertained for hours.</li>
        <li><strong>Headlamps for each kid</strong> - Flashlights are great, but headlamps keep hands free. Kids love them and they are surprisingly useful for nighttime bathroom trips.</li>
        <li><strong>Extra clothes in sealed bags</strong> - Kids will get wet, muddy, or both. Pack a complete change of clothes in a ziplock bag for each day.</li>
        <li><strong>Snacks that do not require cooking</strong> - Granola bars, trail mix, fruit snacks. When hunger strikes at 10 PM, you want something ready to go.</li>
        <li><strong>A first aid kit</strong> - Band-aids, antiseptic wipes, and children's pain reliever. You will use at least one of these.</li>
      </ul>

      <h2>Keeping Kids Engaged</h2>
      <p>The best family camping trips are the ones where kids feel like they are part of the adventure, not just along for the ride. Here is how:</p>
      <ul>
        <li>Let them help set up the tent - even small tasks like holding the poles or hammering stakes (with supervision) make kids feel important</li>
        <li>Plan a scavenger hunt - write a list of things to find (a pinecone, a smooth rock, a feather) and let them explore</li>
        <li>Bring a nature guidebook - identifying plants, birds, and insects turns a walk into an adventure</li>
        <li>Plan campfire activities - shadow puppets, storytelling, and stargazing are free and endlessly entertaining</li>
      </ul>

      <h2>The Golden Rule</h2>
      <p>Lower your expectations. Things will go wrong. The tent might leak. The food might burn. Someone will cry. That is all part of the experience. The families that enjoy camping most are the ones who can laugh when things go sideways and focus on the good moments - which there will be plenty of.</p>

      <p>The trips children remember are rarely the perfectly executed ones. A weekend of rain, six hours of card games in the tent, and everyone still talking about it afterwards beats a flawless itinerary. Camping with kids is not about perfection - it is about being together somewhere different.</p>
    `;

const CHEAP_PARTY_DECORATIONS_CONTENT = `
      <p>Party decorations have a quiet failure mode: they look fine in the packet and fall apart during the party. Here is what usually goes wrong, and what to look for instead.</p>

      <h2>Where Cheap Decorations Fail</h2>
      <ul>
        <li><strong>Paper banners</strong> - Thin paper tears during setup, and a light breeze finishes the job outdoors.</li>
        <li><strong>Thin plastic streamers</strong> - They tangle as you unpack them and rarely hang straight.</li>
        <li><strong>Adhesive decorations</strong> - Cheap adhesive either will not hold or takes paint off the wall when you remove it.</li>
      </ul>

      <h2>What to Look For Instead</h2>
      <ul>
        <li><strong>Thicker materials</strong> - Fabric banners and heavy cardstock cope far better than paper or thin plastic.</li>
        <li><strong>Proper hanging points</strong> - Grommets, clips, or string beat anything that relies on adhesive.</li>
        <li><strong>Simple designs</strong> - Elaborate decorations have more weak points to fail.</li>
      </ul>

      <h2>The Hidden Cost of Cheap Decorations</h2>
      <p>Here is the thing about cheap party decorations: they are not actually cheap. If you buy a $3 banner that tears before the party starts, you either have a ruined decoration or you need to buy a replacement. Either way, you have spent more than if you had bought a quality banner from the start.</p>

      <p>Over the course of a year, if you attend or host four parties, buying $3 decorations each time adds up to $12. A single $15 quality decoration that you reuse four times costs $3.75 per party - and it actually looks good every time.</p>

      <h2>Our Recommendation</h2>
      <p>Invest in a few key pieces that last rather than buying lots of disposable decorations. Our EVA foam fingers are one example - they work for a sports party, a birthday, or a team event, and they come back out the following season.</p>

      <p>The next time you are shopping for party supplies, ask yourself: will this survive the party? If the answer is no, spend a little more on something that will. Your party will look better, you will waste less, and you will save money over time.</p>
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
    relatedProductSlugs: ['eva-foam-finger', 'party-led-lights', 'outdoor-game-kit'],
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
    relatedProductSlugs: ['eva-foam-finger', 'party-led-lights'],
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
    slug: 'reusable-party-supplies',
    title: 'Party Supplies That Actually Last',
    excerpt: 'Why buy disposable decorations when you can get quality party supplies that work for multiple events?',
    categorySlug: 'party-ideas',
    date: 'Jul 22, 2026',
    isoDate: '2026-07-22',
    readTime: estimateReadTime(REUSABLE_PARTY_SUPPLIES_CONTENT),
    content: REUSABLE_PARTY_SUPPLIES_CONTENT,
    image: POST_FALLBACK_IMAGE,
    relatedProductSlugs: ['eva-foam-finger', 'party-led-lights'],
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
    relatedProductSlugs: ['eva-foam-finger', 'party-led-lights', 'outdoor-game-kit'],
  },
  {
    slug: 'camping-with-kids',
    title: 'Camping with Kids: A Survival Guide',
    excerpt: 'What tends to go wrong on a family camping trip, and how to make it work anyway.',
    categorySlug: 'outdoor-activities',
    date: 'Jun 8, 2026',
    isoDate: '2026-06-08',
    readTime: estimateReadTime(CAMPING_WITH_KIDS_CONTENT),
    content: CAMPING_WITH_KIDS_CONTENT,
    image: POST_FALLBACK_IMAGE,
    relatedProductSlugs: ['outdoor-game-kit', 'party-led-lights'],
  },
  {
    slug: 'cheap-party-decorations',
    title: 'The Problem with Cheap Party Decorations',
    excerpt: 'Why cheap party decorations fail before the party ends, what to look for instead, and the arithmetic of buying something that lasts.',
    categorySlug: 'party-ideas',
    date: 'May 19, 2026',
    isoDate: '2026-05-19',
    readTime: estimateReadTime(CHEAP_PARTY_DECORATIONS_CONTENT),
    content: CHEAP_PARTY_DECORATIONS_CONTENT,
    image: POST_FALLBACK_IMAGE,
    relatedProductSlugs: ['eva-foam-finger', 'party-led-lights'],
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

/** Categories that actually have at least one post. */
export function getPopulatedPostCategories(): PostCategory[] {
  return POST_CATEGORIES.filter((category) => getPostsByCategory(category.slug).length > 0);
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
