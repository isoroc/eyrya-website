import type { MetadataRoute } from 'next';
import { BRAND, PRODUCTS, getPopulatedCategories } from '@/lib/products';
import { POSTS, getPopulatedPostCategories } from '@/lib/posts';

// Generated at build time from the same modules the pages render from, so a new
// product, category, or post is in the sitemap as soon as it exists in lib/.
// Previously this was a hand-maintained public/sitemap.xml whose lastmod dates
// disagreed with the article dates.
const SITE = BRAND.siteUrl;

// `output: 'export'` cannot serve a route handler unless it is explicitly static.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/products/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/ideas/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE}/where-to-buy/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/contact/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/wholesale/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/support/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/privacy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/terms/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${SITE}/products/${product.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const productCategoryPages: MetadataRoute.Sitemap = getPopulatedCategories().map((category) => ({
    url: `${SITE}/products/category/${category.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const postCategoryPages: MetadataRoute.Sitemap = getPopulatedPostCategories().map((category) => ({
    url: `${SITE}/ideas/category/${category.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
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
    ...productCategoryPages,
    ...postCategoryPages,
    ...postPages,
  ];
}
