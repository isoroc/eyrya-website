import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/products';
import { formatMinimumOrderPerColor, formatWholesaleSize } from '@/lib/wholesale';

// `output: 'export'` needs metadata routes to be explicitly static, exactly as
// app/sitemap.ts and app/robots.ts do.
export const dynamic = 'force-static';

// Drives Android's "Add to home screen" icon and the browser's install metadata.
// Without it Android falls back to a screenshot of the page, and the tab icon is
// the only place the brand would appear.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EYRYA',
    short_name: 'EYRYA',
    description: `${formatWholesaleSize()} EVA foam hands. Retail packs from Amazon and Temu, custom production from ${formatMinimumOrderPerColor()}.`,
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F1EA',
    theme_color: '#DC2626',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      // A maskable icon must survive an arbitrary crop, so this one is a
      // full-bleed opaque square rather than the rounded tab tile.
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    id: BRAND.siteUrl,
  };
}
