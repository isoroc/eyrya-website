import { Metadata } from 'next';
import { Mail, Clock, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact - EYRYA',
  description: 'Have a question? We read every email. Usually reply within 24 hours.',
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
              Contact Us
            </h1>
            
            <p className="text-gray-600 mb-8">
              Have a question about our products or want to discuss a bulk order? We read every email.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF6B6B]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#FF6B6B]" />
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1">Email</h3>
                  <a href="mailto:hello@eyrya.com" className="text-gray-600 hover:text-[#FF6B6B] transition-colors">
                    hello@eyrya.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#4ECDC4]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#4ECDC4]" />
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
                className="text-[#FF6B6B] hover:underline text-sm font-medium"
              >
                wholesale@eyrya.com
              </a>
            </div>
          </div>

          <div className="bg-[#fafafa] border border-gray-200 p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="inquiry" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Type
                </label>
                <select
                  id="inquiry"
                  name="inquiry"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select one...</option>
                  <option value="customer-support">Product question</option>
                  <option value="wholesale">Wholesale inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 font-semibold hover:bg-[#333] transition-colors"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
