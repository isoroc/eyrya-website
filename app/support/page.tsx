import { Metadata } from 'next';
import { Mail, Clock } from 'lucide-react';
import SupportContent from './SupportContent';
import JsonLd from '@/app/components/JsonLd';

export const metadata: Metadata = {
  title: 'EYRYA® Support | Foam Finger FAQ, Shipping & Returns',
  description: 'EYRYA support center. FAQ about foam fingers, shipping info, returns policy, and order tracking. Get answers or email us directly.',
  keywords: 'EYRYA support, EYRYA FAQ, EYRYA shipping, EYRYA returns, track EYRYA order, foam finger support',
  alternates: {
    canonical: 'https://www.eyrya.com/support/',
  },
  openGraph: {
    title: 'EYRYA Support Center',
    description: 'Find answers about foam fingers, shipping, returns, and order tracking.',
    type: 'website',
    url: 'https://www.eyrya.com/support/',
    siteName: 'EYRYA',
    images: [
      {
        url: 'https://www.eyrya.com/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'EYRYA Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EYRYA Support Center',
    description: 'Find answers about foam fingers, shipping, returns, and order tracking.',
    images: ['https://www.eyrya.com/images/og-image.svg'],
  },
};

export default function SupportPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-6">
            Support Center
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Find answers to common questions, learn about shipping and returns, or track your order. 
            We&apos;re here to help make your EYRYA experience as smooth as possible.
          </p>
        </div>

        <div className="bg-[#1a1a1a] p-8 md:p-12 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-['Teko'] uppercase font-bold text-white mb-4">Need help?</h2>
            <p className="text-gray-400 mb-6">
              We read every email. Usually reply within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a 
                href="mailto:support@eyrya.com"
                className="inline-flex items-center gap-2 bg-[#DC2626] text-white px-6 py-3 font-semibold hover:bg-red-700 transition-colors rounded-sm"
              >
                <Mail className="w-5 h-5" />
                support@eyrya.com
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-5 h-5" />
                <span>Response time: Usually within 24 hours</span>
              </div>
            </div>
          </div>
        </div>

        <SupportContent />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How long does shipping take?", "acceptedAnswer": { "@type": "Answer", "text": "Standard shipping within the US typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery. International shipping times vary by destination but generally take 7-14 business days." } },
            { "@type": "Question", "name": "Do you ship internationally?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We ship to over 20 countries worldwide. International shipping rates are calculated at checkout based on your location and order weight." } },
            { "@type": "Question", "name": "What is your return policy?", "acceptedAnswer": { "@type": "Answer", "text": "We offer a 30-day return policy for unused items in their original packaging. If your product arrives damaged or defective, we will provide a full refund or replacement at no extra cost." } },
            { "@type": "Question", "name": "How can I track my order?", "acceptedAnswer": { "@type": "Answer", "text": "Once your order ships, you will receive an email with a tracking number and link. You can also track your order using our Track Order tool on this page." } },
            { "@type": "Question", "name": "Can I order in bulk for an event?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! We offer special pricing for bulk orders of 50+ units. Contact us at wholesale@eyrya.com for custom quotes and volume discounts." } },
          ],
        }} />
      </div>
    </div>
  );
}