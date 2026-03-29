'use client';

import { useState } from 'react';
import { 
  MessageCircleQuestion, 
  Truck, 
  RotateCcw, 
  Search, 
  Mail, 
  Clock, 
  Check, 
  ChevronDown 
} from 'lucide-react';

const faqItems = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping within the US typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery. International shipping times vary by destination but generally take 7-14 business days."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! We ship to over 20 countries worldwide. International shipping rates are calculated at checkout based on your location and order weight. Please note that customs duties and taxes may apply depending on your country's regulations."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unused items in their original packaging. If your product arrives damaged or defective, we'll provide a full refund or replacement at no extra cost. Simply contact our support team to initiate a return."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive an email with a tracking number and link. You can also track your order using our Track Order tool on this page. If you can't find your tracking information, contact us with your order number."
  },
  {
    question: "Can I order in bulk for an event?",
    answer: "Absolutely! We offer special pricing for bulk orders of 50+ units. Whether you're planning a corporate event, school function, or sports team gathering, contact us at wholesale@eyrya.com for custom quotes and volume discounts."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are securely processed with industry-standard encryption."
  },
  {
    question: "My product arrived damaged, what do I do?",
    answer: "We're sorry to hear that! Please take photos of the damaged item and packaging, then contact our support team at support@eyrya.com. We'll arrange for a replacement or full refund within 24 hours. No need to return the damaged item."
  },
  {
    question: "How do I know if a product is in stock?",
    answer: "All products displayed on our website are currently in stock. If an item becomes unavailable during your order process, you'll be notified immediately. For large quantity orders, we recommend contacting us first to confirm availability."
  }
];

export default function SupportPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackStatus, setTrackStatus] = useState<'idle' | 'loading' | 'found' | 'not_found'>('idle');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackStatus('loading');
    setTimeout(() => {
      setTrackStatus('not_found');
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
            Support Center
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Find answers to common questions, learn about shipping and returns, or track your order. 
            We&apos;re here to help make your EYRYA experience as smooth as possible.
          </p>
        </div>

        <div className="bg-[#1a1a1a] p-8 md:p-12 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Need help?</h2>
            <p className="text-gray-400 mb-6">
              We read every email. Usually reply within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a 
                href="mailto:support@eyrya.com"
                className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] px-6 py-3 font-semibold hover:bg-gray-100 transition-colors"
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

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#FF6B6B]/10 flex items-center justify-center">
              <MessageCircleQuestion className="w-5 h-5 text-[#FF6B6B]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="border border-gray-200 bg-[#fafafa]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#1a1a1a] pr-4">{item.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 text-gray-600 border-t border-gray-200 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#fafafa] border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#4ECDC4]/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-[#4ECDC4]" />
              </div>
              <h2 className="text-xl font-bold text-[#1a1a1a]">Shipping Information</h2>
            </div>
            
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#4ECDC4] flex-shrink-0 mt-0.5" />
                <span>Standard US shipping: 3-5 business days</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#4ECDC4] flex-shrink-0 mt-0.5" />
                <span>Express shipping: 1-2 business days available</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#4ECDC4] flex-shrink-0 mt-0.5" />
                <span>International shipping to 20+ countries</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#4ECDC4] flex-shrink-0 mt-0.5" />
                <span>Free shipping on orders over $50</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#4ECDC4] flex-shrink-0 mt-0.5" />
                <span>Tracking provided for all orders</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#fafafa] border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FFE66D]/20 flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-[#1a1a1a]" />
              </div>
              <h2 className="text-xl font-bold text-[#1a1a1a]">Returns Policy</h2>
            </div>
            
            <div className="space-y-4 text-gray-600">
              <p>
                We want you to be completely satisfied with your purchase. If you&apos;re not happy, we&apos;re here to help.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FFE66D] flex-shrink-0 mt-0.5" />
                  <span>30-day return window for unused items</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FFE66D] flex-shrink-0 mt-0.5" />
                  <span>Original packaging required</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FFE66D] flex-shrink-0 mt-0.5" />
                  <span>Defective items: full refund or replacement</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FFE66D] flex-shrink-0 mt-0.5" />
                  <span>Contact support@eyrya.com to initiate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#fafafa] border border-gray-200 p-8 md:p-12">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FF6B6B]/10 flex items-center justify-center">
                <Search className="w-5 h-5 text-[#FF6B6B]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a]">Track Your Order</h2>
            </div>
            
            <p className="text-gray-600 mb-8">
              Enter your order number and email address to check the status of your shipment.
            </p>

            {trackStatus === 'found' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Order Found!</h3>
                <p className="text-gray-600 mb-6">Your order is on its way. Check your email for tracking details.</p>
                <button
                  onClick={() => {
                    setTrackStatus('idle');
                    setOrderNumber('');
                    setEmail('');
                  }}
                  className="text-[#FF6B6B] font-medium hover:underline"
                >
                  Track another order
                </button>
              </div>
            ) : (
              <form onSubmit={handleTrackOrder} className="space-y-6">
                {trackStatus === 'not_found' && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800">
                    We couldn&apos;t find an order with those details. Please check your order number and email, or contact support.
                  </div>
                )}

                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors"
                    placeholder="e.g., EYR-12345"
                  />
                </div>

                <div>
                  <label htmlFor="trackEmail" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="trackEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={trackStatus === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 font-semibold hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {trackStatus === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-sm animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Track Order
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}