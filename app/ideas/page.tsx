import { Metadata } from 'next';
import IdeasView from './IdeasView';

export const metadata: Metadata = {
  title: { absolute: 'Foam Finger Tips, Party Planning & Game Day Guides | EYRYA' },
  description: 'Expert tips on foam finger quality, game day checklists, party planning, bulk ordering, and outdoor activities. Real advice from EYRYA.',
  keywords: 'foam finger tips, party planning guide, game day checklist, bulk foam finger order, outdoor activities, EYRYA ideas',
  alternates: {
    canonical: 'https://www.eyrya.com/ideas/',
  },
  openGraph: {
    title: 'EYRYA Ideas - Party Tips & Game Day Guides',
    description: 'Expert tips on foam fingers, party planning, game day prep, and outdoor activities.',
    type: 'website',
    url: 'https://www.eyrya.com/ideas/',
    siteName: 'EYRYA',
    images: [
      {
        url: 'https://www.eyrya.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EYRYA Ideas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EYRYA Ideas - Party Tips & Game Day Guides',
    description: 'Expert tips on foam fingers, party planning, game day prep, and outdoor activities.',
    images: ['https://www.eyrya.com/images/og-image.png'],
  },
};

export default function IdeasPage() {
  return <IdeasView />;
}
