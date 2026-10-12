import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/products';

// `output: 'export'` cannot serve a route handler unless it is explicitly static.
export const dynamic = 'force-static';

// Generated at build time so the sitemap reference and the host always match the
// canonical site URL instead of being maintained by hand.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The admin UI is a static page; keep it out of search indexes even
        // though it also carries a noindex meta tag.
        disallow: ['/admin.html'],
      },
    ],
    sitemap: `${BRAND.siteUrl}/sitemap.xml`,
    host: BRAND.siteUrl,
  };
}
