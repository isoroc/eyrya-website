import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'EYRYA® Privacy Policy | How We Protect Your Data' },
  description: 'EYRYA privacy policy. Learn how we collect, use, and protect your personal information.',
  keywords: 'EYRYA privacy policy, data protection, personal information',
  alternates: {
    canonical: 'https://www.eyrya.com/privacy/',
  },
  openGraph: {
    title: 'EYRYA Privacy Policy',
    description: 'Learn how EYRYA collects, uses, and protects your personal information.',
    type: 'website',
    url: 'https://www.eyrya.com/privacy/',
    siteName: 'EYRYA',
    images: [
      {
        url: 'https://www.eyrya.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EYRYA Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EYRYA Privacy Policy',
    description: 'Learn how EYRYA collects, uses, and protects your personal information.',
    images: ['https://www.eyrya.com/images/og-image.png'],
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-8">
          Privacy Policy
        </h1>
        
        <p className="text-gray-500 text-sm mb-12">Last updated: March 2026</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect the information you submit through the forms on this website, such as your name, email address, company name, and the content of your message. If you contact us about a wholesale order we may also record the quantities and business type you tell us about.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Purchases are completed on Amazon or Temu, not on this website. We never receive or store your payment card details. The marketplace you buy from handles your order, shipping address, and payment under its own privacy policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              How We Use Your Information
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Respond to your inquiries and support requests
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Communicate with you about a wholesale quote or order
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Improve our website and product offerings
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Comply with legal obligations
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Service providers who help us operate our business
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Marketplace partners (Amazon, Temu), when you contact us about an order placed there
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Law enforcement when required by law
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This website does not set advertising or analytics cookies today. Our hosting provider may process standard server logs, such as your IP address and the URL you requested, in order to serve the site and protect it from abuse. If we add analytics or cookies in the future we will update this policy and, where the law requires it, ask for your consent first.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Depending on your location, you may have rights to access, correct, or delete your personal information. Contact us at <a href="mailto:privacy@eyrya.com" className="text-[#DC2626] hover:underline">privacy@eyrya.com</a> to exercise these rights.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Questions about this privacy policy? Email us at <a href="mailto:privacy@eyrya.com" className="text-[#DC2626] hover:underline">privacy@eyrya.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
