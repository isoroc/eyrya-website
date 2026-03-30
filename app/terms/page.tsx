import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EYRYA® Terms of Service | Website & Product Terms',
  description: 'EYRYA terms of service. Read our terms before using the website or purchasing products.',
  keywords: 'EYRYA terms of service, website terms, product terms',
  alternates: {
    canonical: 'https://www.eyrya.com/terms/',
  },
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-8">
          Terms of Service
        </h1>
        
        <p className="text-gray-500 text-sm mb-12">Last updated: March 2026</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Agreement to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using the EYRYA website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Products and Purchases
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              EYRYA products are sold through third-party marketplaces including Amazon and Temu. All purchases are subject to the terms and policies of those marketplaces.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Product descriptions and images are provided for informational purposes
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Prices are set by the marketplace and may vary
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#DC2626] mt-2 flex-shrink-0"></span>
                Availability and shipping times depend on the marketplace
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Returns and Refunds
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Returns and refunds are handled by the marketplace where you made your purchase. Please refer to Amazon or Temu return policies for details. For defective products, contact us directly at <a href="mailto:support@eyrya.com" className="text-[#DC2626] hover:underline">support@eyrya.com</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Wholesale Orders
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Wholesale orders are subject to separate terms agreed upon at the time of purchase. Minimum order quantities, pricing, and shipping terms are negotiated individually.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All content on this website, including text, graphics, logos, and images, is the property of EYRYA and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our permission.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              EYRYA shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the product.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of the state where EYRYA is incorporated.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Questions about these terms? Email us at <a href="mailto:support@eyrya.com" className="text-[#DC2626] hover:underline">support@eyrya.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
