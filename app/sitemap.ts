import type { MetadataRoute } from 'next';
import { BRAND, PRODUCTS } from '@/lib/products';
import { POSTS } from '@/lib/posts';

// Generated at build time from the same modules the pages render from, so a new
// product, category, or post is in the sitemap as soon as it exists in lib/.
const SITE = BRAND.siteUrl;

// `output: 'export'` cannot serve a route handler unless it is explicitly static.
export const dynamic = 'force-static';

// No `lastModified` on the static, product, and category entries, on purpose.
//
// These used to carry the build time, which marked every one of the 23 URLs as
// modified on every deploy. Besides being untrue - the deploys that week changed
// one page at a time - it teaches Google to distrust lastmod, and it spends a
// crawl budget this site does not have re-fetching pages that did not change.
// Search Console showed 15 of 23 URLs stuck at "Discovered - currently not
// indexed", so wasting crawls is expensive here.
//
// Articles keep their real publication date because it exists. When a page's
// content genuinely changes, use URL Inspection -> request indexing instead of
// inventing a date: an absent lastmod is more accurate than a false one.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/products/`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/ideas/`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE}/where-to-buy/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/about/`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/contact/`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/wholesale/`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/support/`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/privacy/`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/terms/`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${SITE}/products/${product.slug}/`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const postPages: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE}/ideas/${post.slug}/`,
    // Each article carries its own real publication date.
    lastModified: new Date(post.isoDate),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...postPages,
  ];
}
