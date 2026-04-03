import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.eyrya.com';

  const staticPages = [
    { url: '/', changefreq: 'weekly' as const, priority: 1.0 },
    { url: '/products/', changefreq: 'weekly' as const, priority: 0.9 },
    { url: '/products/eva-foam-finger/', changefreq: 'monthly' as const, priority: 0.8 },
    { url: '/products/party-led-lights/', changefreq: 'monthly' as const, priority: 0.8 },
    { url: '/products/outdoor-game-kit/', changefreq: 'monthly' as const, priority: 0.8 },
    { url: '/ideas/', changefreq: 'weekly' as const, priority: 0.7 },
    { url: '/ideas/game-day-checklist/', changefreq: 'monthly' as const, priority: 0.6 },
    { url: '/ideas/foam-finger-quality/', changefreq: 'monthly' as const, priority: 0.6 },
    { url: '/ideas/reusable-party-supplies/', changefreq: 'monthly' as const, priority: 0.6 },
    { url: '/ideas/bulk-order-guide/', changefreq: 'monthly' as const, priority: 0.6 },
    { url: '/ideas/camping-with-kids/', changefreq: 'monthly' as const, priority: 0.6 },
    { url: '/ideas/cheap-party-decorations/', changefreq: 'monthly' as const, priority: 0.6 },
    { url: '/where-to-buy/', changefreq: 'monthly' as const, priority: 0.7 },
    { url: '/about/', changefreq: 'monthly' as const, priority: 0.5 },
    { url: '/contact/', changefreq: 'monthly' as const, priority: 0.5 },
    { url: '/wholesale/', changefreq: 'monthly' as const, priority: 0.5 },
    { url: '/support/', changefreq: 'monthly' as const, priority: 0.5 },
    { url: '/privacy/', changefreq: 'monthly' as const, priority: 0.5 },
    { url: '/terms/', changefreq: 'monthly' as const, priority: 0.5 },
  ];

  return staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));
}
