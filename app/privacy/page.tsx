import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EYRYA® Privacy Policy | How We Protect Your Data',
  description: 'EYRYA privacy policy. Learn how we collect, use, and protect your personal information.',
  keywords: 'EYRYA privacy policy, data protection, personal information',
  alternates: {
    canonical: 'https://www.eyrya.com/privacy/',
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
              We collect information you provide directly, such as when you contact us, place an order through our partners (Amazon, Temu), or subscribe to our updates. This may include your name, email address, shipping address, and payment information.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We also collect certain information automatically when you visit our website, including your IP address, browser type, device information, and pages visited.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              How We Use Your Information
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Process and fulfill your orders
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Communicate with you about products, orders, and promotions
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Improve our website and product offerings
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Respond to your inquiries and support requests
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
                Marketplace partners (Amazon, Temu) to fulfill your orders
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
              We use cookies and similar technologies to analyze site traffic, personalize content, and improve your experience. You can control cookies through your browser settings.
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
