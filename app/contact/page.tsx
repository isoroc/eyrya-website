import { Metadata } from 'next';
import { Mail, Clock } from 'lucide-react';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact EYRYA® | Get in Touch for Foam Fingers & Party Supplies',
  description: 'Contact EYRYA for product questions about foam fingers, party supplies, wholesale inquiries, or support. We reply within 24 hours.',
  keywords: 'EYRYA contact, contact EYRYA, EYRYA support, foam finger inquiry, wholesale foam fingers',
  alternates: {
    canonical: 'https://www.eyrya.com/contact/',
  },
  openGraph: {
    title: 'Contact EYRYA',
    description: 'Get in touch with EYRYA for product questions, wholesale inquiries, or support.',
    type: 'website',
    url: 'https://www.eyrya.com/contact/',
    siteName: 'EYRYA',
    images: [
      {
        url: 'https://www.eyrya.com/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Contact EYRYA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact EYRYA',
    description: 'Get in touch with EYRYA for product questions, wholesale inquiries, or support.',
    images: ['https://www.eyrya.com/images/og-image.svg'],
  },
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-['Teko'] uppercase font-bold text-[#1a1a1a] mb-4">
              Contact Us
            </h1>
            
            <p className="text-gray-600 mb-8">
              Have a question about our products or want to discuss a bulk order? We read every email.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#DC2626]" />
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1">Email</h3>
                  <a href="mailto:contact@eyrya.com" className="text-gray-600 hover:text-[#DC2626] transition-colors">
                    contact@eyrya.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#DC2626]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#DC2626]" />
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1">Response time</h3>
                  <p className="text-gray-600">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-[#fafafa] border border-gray-200">
              <h3 className="font-semibold text-[#1a1a1a] mb-2">Wholesale inquiries</h3>
              <p className="text-gray-600 text-sm mb-4">
                Looking to order 50+ units? Email us for bulk pricing.
              </p>
              <a 
                href="mailto:wholesale@eyrya.com" 
                className="text-[#DC2626] hover:underline text-sm font-medium"
              >
                wholesale@eyrya.com
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}