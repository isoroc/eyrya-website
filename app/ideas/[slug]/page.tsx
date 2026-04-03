import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, User } from 'lucide-react';
import JsonLd from '@/app/components/JsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ArticleData {
  title: string;
  category: string;
  author: string;
  date: string;
  isoDate: string;
  readTime: string;
  content: string;
  relatedArticles: { title: string; slug: string }[];
  relatedProducts: { name: string; slug: string }[];
}

const articles: Record<string, ArticleData> = {
  'game-day-checklist': {
    title: 'The Ultimate Game Day Checklist',
    category: 'Sports',
    author: 'EYRYA Team',
    date: 'Apr 3, 2026',
    isoDate: '2026-04-03',
    readTime: '6 min read',
    content: `
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
    `,
    relatedArticles: [
      { title: 'Why Our Foam Fingers Are Different', slug: 'foam-finger-quality' },
      { title: 'Bulk Orders: What You Need to Know', slug: 'bulk-order-guide' },
    ],
    relatedProducts: [
      { name: 'EVA Foam Finger (12 Pack)', slug: 'eva-foam-finger' },
      { name: 'Party LED Lights Set', slug: 'party-led-lights' },
    ],
  },
  'foam-finger-quality': {
    title: 'Why Our Foam Fingers Are Different',
    category: 'Sports',
    author: 'EYRYA Team',
    date: 'Apr 3, 2026',
    isoDate: '2026-04-03',
    readTime: '4 min read',
    content: `
      <p>Walk into any party supply store and you will find foam fingers everywhere. Most of them cost $3 to $5. They look fine on the shelf. But after one game, they are flat, bent, and basically useless. We saw this problem and decided to fix it.</p>

      <h2>The Foam Problem</h2>
      <p>Here is what most manufacturers do: they use 3mm to 4mm low-density polyethylene foam. It is cheap, it is light, and it looks okay in photos. But it has one major flaw - it collapses. After you wave it around for a few innings or quarters, the foam compresses and your foam finger looks like it gave up.</p>

      <p>We use 8mm high-density EVA foam. EVA (ethylene-vinyl acetate) is the same material used in premium shoe soles and yoga mats. It is denser, more resilient, and holds its shape through repeated use. The difference is immediately obvious when you hold one.</p>

      <h2>What That Means for You</h2>
      <ul>
        <li><strong>Longer lifespan</strong> - Our foam fingers last multiple seasons, not just one game</li>
        <li><strong>Better appearance</strong> - They stay tall and proud from kickoff to the final whistle</li>
        <li><strong>Weather resistance</strong> - EVA foam does not absorb water, so rain will not ruin it</li>
        <li><strong>Comfortable grip</strong> - The hand opening is sized for adults but works for older kids too</li>
      </ul>

      <h2>The Numbers Speak</h2>
      <p>We have sold over 50,000 foam fingers with an average rating of 4.8 out of 5 stars. That is not a marketing claim - that is real customer feedback from Amazon and Temu. People notice the quality difference, and they tell others.</p>

      <h2>Is It Worth the Extra Cost?</h2>
      <p>Our foam fingers cost more than the cheapest options on the market. But think about it this way: if you buy a $4 foam finger that lasts one game, and then buy another one next season, and another the season after - you have spent $12 and still have nothing that lasts. Our 12-pack of foam fingers costs $29.99 (just $2.50 each) and lasts for years. The math works out.</p>

      <p>Plus, if you are ordering for a team, school, or event, our wholesale pricing brings the per-unit cost down significantly. Check our wholesale page for details.</p>

      <p>Bottom line: we make foam fingers the way we want them made. Quality materials, solid construction, and a product you will actually want to bring to the next game.</p>
    `,
    relatedArticles: [
      { title: 'The Ultimate Game Day Checklist', slug: 'game-day-checklist' },
      { title: 'Party Supplies That Actually Last', slug: 'reusable-party-supplies' },
    ],
    relatedProducts: [
      { name: 'EVA Foam Finger (12 Pack)', slug: 'eva-foam-finger' },
    ],
  },
  'reusable-party-supplies': {
    title: 'Party Supplies That Actually Last',
    category: 'Parties',
    author: 'EYRYA Team',
    date: 'Apr 3, 2026',
    isoDate: '2026-04-03',
    readTime: '5 min read',
    content: `
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
      <p>Every EYRYA product is designed with reuse in mind. Our EVA foam fingers are the perfect example - they are built to last through dozens of events. Our LED party lights run on batteries and can be packed flat for storage. Even our outdoor game kit is designed to be taken out again and again.</p>

      <h2>Quick Tips for Reusable Party Planning</h2>
      <ul>
        <li>Buy neutral colors that work for any theme - our foam fingers come in 12 colors that match any team or party palette</li>
        <li>Invest in LED lighting instead of disposable glow sticks - they last longer and are brighter</li>
        <li>Choose fabric banners over paper ones - they fold flat and last for years</li>
        <li>Store everything in labeled bins so you know what you have before buying more</li>
      </ul>

      <p>The shift from disposable to reusable party supplies is not just better for the environment - it is better for your wallet and your party experience. Quality supplies make your events feel more put together, and you will spend less time shopping and more time enjoying the celebration.</p>
    `,
    relatedArticles: [
      { title: 'The Problem with Cheap Party Decorations', slug: 'cheap-party-decorations' },
      { title: 'Why Our Foam Fingers Are Different', slug: 'foam-finger-quality' },
    ],
    relatedProducts: [
      { name: 'EVA Foam Finger (12 Pack)', slug: 'eva-foam-finger' },
      { name: 'Party LED Lights Set', slug: 'party-led-lights' },
    ],
  },
  'bulk-order-guide': {
    title: 'Bulk Orders: What You Need to Know',
    category: 'Wholesale',
    author: 'EYRYA Team',
    date: 'Apr 3, 2026',
    isoDate: '2026-04-03',
    readTime: '7 min read',
    content: `
      <p>Ordering party supplies or foam fingers in bulk is different from buying a single unit. Whether you are a school spirit coordinator, a sports league manager, or an event planner, here is everything you need to know about ordering EYRYA products in quantity.</p>

      <h2>Minimum Order Quantity</h2>
      <p>Our wholesale minimum is 50 units per product. This applies to any single SKU - so 50 foam fingers in one color, or 50 LED light sets, or any combination that adds up to 50 of the same item. We set this minimum because it allows us to offer meaningful discounts while keeping our operations efficient.</p>

      <h2>Discount Tiers</h2>
      <ul>
        <li><strong>50-99 units</strong> - 15% off retail price</li>
        <li><strong>100-249 units</strong> - 20% off retail price</li>
        <li><strong>250+ units</strong> - 30% off retail price</li>
      </ul>
      <p>These discounts apply to all EYRYA products. The more you order, the more you save per unit.</p>

      <h2>Who Orders in Bulk</h2>
      <p>Our wholesale customers fall into a few main categories:</p>
      <ul>
        <li><strong>Schools and universities</strong> - Spirit weeks, homecoming events, pep rallies, and graduation ceremonies</li>
        <li><strong>Sports teams and leagues</strong> - Fan appreciation events, opening day giveaways, playoff celebrations</li>
        <li><strong>Event planners</strong> - Corporate events, birthday parties, fundraisers, and community festivals</li>
        <li><strong>Retail stores</strong> - Small shops that want to stock EYRYA products locally</li>
      </ul>

      <h2>How to Place a Bulk Order</h2>
      <p>It is simple. Email us at wholesale@eyrya.com with the following information:</p>
      <ul>
        <li>Which product(s) you want</li>
        <li>Quantity per product</li>
        <li>Color preferences (for foam fingers)</li>
        <li>Your shipping address</li>
        <li>When you need the order by</li>
      </ul>
      <p>We will respond within 24 hours with a quote and estimated delivery date. Payment is handled via invoice, and we accept bank transfers and major credit cards.</p>

      <h2>Shipping and Lead Time</h2>
      <p>Standard wholesale orders ship within 3-5 business days. Rush orders are available for an additional fee. We ship worldwide, and shipping costs are calculated based on weight and destination. For orders over $500, we offer free domestic shipping.</p>

      <h2>Custom Orders</h2>
      <p>Need custom colors, logos, or packaging on foam fingers? We can do that for orders of 500+ units. Custom orders have a longer lead time of 4-6 weeks. Contact us to discuss your requirements.</p>

      <p>We make bulk ordering as straightforward as possible. No complicated forms, no hidden fees, and no minimum commitments beyond the initial order. Just quality products at fair prices.</p>
    `,
    relatedArticles: [
      { title: 'The Ultimate Game Day Checklist', slug: 'game-day-checklist' },
      { title: 'Party Supplies That Actually Last', slug: 'reusable-party-supplies' },
    ],
    relatedProducts: [
      { name: 'EVA Foam Finger (12 Pack)', slug: 'eva-foam-finger' },
      { name: 'Party LED Lights Set', slug: 'party-led-lights' },
      { name: 'Outdoor Game Kit', slug: 'outdoor-game-kit' },
    ],
  },
  'camping-with-kids': {
    title: 'Camping with Kids: A Survival Guide',
    category: 'Outdoor',
    author: 'EYRYA Team',
    date: 'Apr 3, 2026',
    isoDate: '2026-04-03',
    readTime: '8 min read',
    content: `
      <p>Camping with kids sounds wonderful until you are three hours into a rainstorm and your six-year-old is asking why the tent is leaking. We have been there. Here is what we learned from years of family camping trips.</p>

      <h2>Start Small</h2>
      <p>Your first family camping trip should not be a week in the backcountry. Start with one night at a campground that has bathrooms and running water. If that goes well, try two nights. Then consider more remote locations. Building up gradually keeps everyone happy and gives you a chance to figure out what works for your family.</p>

      <h2>What to Pack (Beyond the Basics)</h2>
      <p>You already know you need a tent, sleeping bags, and food. Here is what experienced camping parents add to the list:</p>
      <ul>
        <li><strong>Outdoor games</strong> - Kids get bored fast. A portable game kit with ring toss, bean bags, and bocce ball keeps them entertained for hours. Our outdoor game kit packs six games into one bag.</li>
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

      <p>Our best family camping memory is not from a perfectly executed trip. It is from a weekend where it rained the entire time, we played card games in the tent for six hours, and the kids still talk about it as one of the best weekends ever. Camping with kids is not about perfection. It is about being together somewhere different.</p>
    `,
    relatedArticles: [
      { title: 'The Ultimate Game Day Checklist', slug: 'game-day-checklist' },
      { title: 'Party Supplies That Actually Last', slug: 'reusable-party-supplies' },
    ],
    relatedProducts: [
      { name: 'Outdoor Game Kit', slug: 'outdoor-game-kit' },
      { name: 'Party LED Lights Set', slug: 'party-led-lights' },
    ],
  },
  'cheap-party-decorations': {
    title: 'The Problem with Cheap Party Decorations',
    category: 'Parties',
    author: 'EYRYA Team',
    date: 'Apr 3, 2026',
    isoDate: '2026-04-03',
    readTime: '6 min read',
    content: `
      <p>We bought 12 different brands of party banners and tested them at actual birthday parties. Only 3 made it through the full event without tearing, sagging, or falling off the wall. Here is what we found and why it matters.</p>

      <h2>The Test</h2>
      <p>We bought party banners, streamers, and table decorations from brands ranging from $2 to $15. We used them at six different parties - three indoor and three outdoor. We rated each product on durability, appearance, and ease of setup.</p>

      <h2>What Failed and Why</h2>
      <ul>
        <li><strong>Paper banners</strong> - 9 out of 10 paper banners tore during setup or within the first hour. Indoor use was marginally better, but outdoor use was a disaster. Even a light breeze destroyed them.</li>
        <li><strong>Thin plastic streamers</strong> - They tangled immediately and looked cheap up close. Several brands arrived partially torn in the package.</li>
        <li><strong>Adhesive decorations</strong> - The adhesive on cheap decorations either does not stick at all or damages the wall when removed. We tested on painted drywall and both outcomes happened.</li>
      </ul>

      <h2>What Worked</h2>
      <p>The three brands that performed well shared common traits:</p>
      <ul>
        <li><strong>Thicker materials</strong> - Fabric banners and heavy cardstock held up significantly better than paper or thin plastic</li>
        <li><strong>Proper hanging mechanisms</strong> - Products with grommets, clips, or string performed better than those relying on adhesive</li>
        <li><strong>Simple designs</strong> - Overly elaborate decorations were more likely to have weak points that failed</li>
      </ul>

      <h2>The Hidden Cost of Cheap Decorations</h2>
      <p>Here is the thing about cheap party decorations: they are not actually cheap. If you buy a $3 banner that tears before the party starts, you either have a ruined decoration or you need to buy a replacement. Either way, you have spent more than if you had bought a quality banner from the start.</p>

      <p>Over the course of a year, if you attend or host four parties, buying $3 decorations each time adds up to $12. A single $15 quality decoration that you reuse four times costs $3.75 per party - and it actually looks good every time.</p>

      <h2>Our Recommendation</h2>
      <p>Invest in a few key pieces that last rather than buying lots of disposable decorations. Our EVA foam fingers are a perfect example - they work for any sports party, birthday, or team event, and they last for years. Our LED party lights are another - they set the mood for any celebration and can be reused indefinitely.</p>

      <p>The next time you are shopping for party supplies, ask yourself: will this survive the party? If the answer is no, spend a little more on something that will. Your party will look better, you will waste less, and you will save money over time.</p>
    `,
    relatedArticles: [
      { title: 'Party Supplies That Actually Last', slug: 'reusable-party-supplies' },
      { title: 'Why Our Foam Fingers Are Different', slug: 'foam-finger-quality' },
    ],
    relatedProducts: [
      { name: 'EVA Foam Finger (12 Pack)', slug: 'eva-foam-finger' },
      { name: 'Party LED Lights Set', slug: 'party-led-lights' },
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) {
    return {
      title: 'Article Not Found | EYRYA',
      description: 'The article you are looking for does not exist.',
    };
  }
  return {
    title: `EYRYA® ${article.title} | Ideas & Inspiration`,
    description: `Read our guide: ${article.title}. ${article.content.replace(/<[^>]*>/g, '').slice(0, 120)}. Expert tips from EYRYA.`,
    keywords: `EYRYA, ${article.title.toLowerCase()}, party tips, sports event guide, foam fingers`,
    alternates: {
      canonical: `https://www.eyrya.com/ideas/${slug}/`,
    },
  };
}

export function generateStaticParams() {
  return [
    { slug: 'game-day-checklist' },
    { slug: 'foam-finger-quality' },
    { slug: 'reusable-party-supplies' },
    { slug: 'bulk-order-guide' },
    { slug: 'camping-with-kids' },
    { slug: 'cheap-party-decorations' },
  ];
}

export default async function IdeaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return (
      <div className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you are looking for does not exist.</p>
          <Link href="/ideas" className="text-[#DC2626] hover:underline">
            Back to Ideas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#DC2626] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Ideas
        </Link>

        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-[#DC2626]/10 text-[#DC2626] text-sm font-medium mb-4">
            {article.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>

            <span>{article.date}</span>
          </div>
        </div>

        <article
          className="prose prose-lg max-w-none prose-headings:font-['Teko'] prose-headings:uppercase prose-headings:tracking-wide prose-h2:text-2xl prose-h2:font-bold prose-h2:text-[#1a1a1a] prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-[#DC2626] prose-a:no-underline hover:prose-a:underline prose-li:text-gray-600 prose-strong:text-[#1a1a1a] prose-ul:my-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">Related Products</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {article.relatedProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group p-4 bg-[#fafafa] border border-gray-200 hover:border-[#DC2626] transition-colors"
                >
                  <h4 className="font-semibold text-[#1a1a1a] group-hover:text-[#DC2626] transition-colors">
                    {product.name}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">You Might Also Like</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {article.relatedArticles.map((related) => (
              <Link
                key={related.slug}
                href={`/ideas/${related.slug}`}
                className="group p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h4 className="font-medium text-gray-900 group-hover:text-[#DC2626] transition-colors">
                  {related.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.content.replace(/<[^>]*>/g, '').slice(0, 160),
          "author": {
            "@type": "Organization",
            "name": article.author,
            "url": "https://www.eyrya.com/",
          },
          "publisher": {
            "@type": "Organization",
            "name": "EYRYA",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.eyrya.com/images/logo.svg",
            },
          },
          "datePublished": article.isoDate,
          "dateModified": article.isoDate,
          "mainEntityOfPage": `https://www.eyrya.com/ideas/${slug}/`,
        }} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eyrya.com/" },
            { "@type": "ListItem", "position": 2, "name": "Ideas", "item": "https://www.eyrya.com/ideas/" },
            { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://www.eyrya.com/ideas/${slug}/` },
          ],
        }} />
      </div>
    </div>
  );
}
