import { Metadata } from 'next';
import { Mail, Clock } from 'lucide-react';
import SupportContent from './SupportContent';

export const metadata: Metadata = {
  title: 'EYRYA® Support Center | FAQ, Shipping & Returns',
  description: 'EYRYA support center. FAQ, shipping info, returns policy, and order tracking. Get answers or email us.',
  keywords: 'EYRYA support, EYRYA FAQ, EYRYA shipping, EYRYA returns, track EYRYA order',
  alternates: {
    canonical: 'https://www.eyrya.com/support/',
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
      </div>
    </div>
  );
}