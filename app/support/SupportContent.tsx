'use client';

import { useState } from 'react';
import {
  MessageCircleQuestion,
  Truck,
  RotateCcw,
  Search,
  Check,
  ChevronDown,
} from 'lucide-react';
import { SUPPORT_FAQ } from '@/lib/faq';
import { BRAND } from '@/lib/products';

type RequestStatus = 'idle' | 'loading' | 'sent' | 'error';

export default function SupportContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');
  const [requestError, setRequestError] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestStatus('loading');
    setRequestError('');

    try {
      const formData = new FormData();
      formData.append('orderNumber', orderNumber);
      formData.append('email', email);
      formData.append('message', message);

      const res = await fetch('/api/support', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Request failed');
      }

      // This form emails our support team; it does not query a live order
      // database, so we say exactly that rather than claiming the order was found.
      setRequestStatus('sent');
    } catch (error) {
      console.error('Support request failed:', error);
      setRequestStatus('error');
      setRequestError(
        "We couldn't submit that request. Please check your details or email support@eyrya.com directly.",
      );
    }
  };

  return (
    <>
      <div id="faq" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#DC2626]/10 flex items-center justify-center">
            <MessageCircleQuestion className="w-5 h-5 text-[#DC2626]" />
          </div>
          <h2 className="text-2xl font-['Teko'] uppercase font-bold text-[#1a1a1a]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {SUPPORT_FAQ.map((item, index) => (
            <div key={item.question} className="border border-gray-200 bg-[#fafafa]">
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaqIndex === index}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-['Teko'] uppercase font-semibold text-[#1a1a1a] pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
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
        <div id="shipping" className="bg-[#fafafa] border border-gray-200 p-8 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#DC2626]/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-[#DC2626]" />
            </div>
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a]">Shipping Information</h2>
          </div>

          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <span>Standard US shipping: 3-5 business days</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <span>Express shipping: 1-2 business days available</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <span>International shipping to {BRAND.countriesShipped}+ countries</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <span>Free shipping on Amazon orders over ${BRAND.freeShippingThreshold}</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <span>Tracking provided for all orders</span>
            </li>
          </ul>
        </div>

        <div id="returns" className="bg-[#fafafa] border border-gray-200 p-8 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#DC2626]/10 flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-[#DC2626]" />
            </div>
            <h2 className="text-xl font-['Teko'] uppercase font-bold text-[#1a1a1a]">Returns Policy</h2>
          </div>

          <div className="space-y-4 text-gray-600">
            <p>
              We want you to be completely satisfied with your purchase. If you&apos;re not happy, we&apos;re here to help.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <span>30-day return window for unused items</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <span>Original packaging required</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <span>Defective items: full refund or replacement</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <span>Contact support@eyrya.com to initiate</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="track" className="bg-[#fafafa] border border-gray-200 p-8 md:p-12 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#DC2626]/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-[#DC2626]" />
            </div>
            <h2 className="text-2xl font-['Teko'] uppercase font-bold text-[#1a1a1a]">Request Order Tracking</h2>
          </div>

          <p className="text-gray-600 mb-8">
            Send us your order number and email address and our team will reply with the tracking
            details for your shipment, usually within 24 hours.
          </p>

          {requestStatus === 'sent' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Request received</h3>
              <p className="text-gray-600 mb-6">
                We&apos;ll email tracking details for order {orderNumber} to {email} within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setRequestStatus('idle');
                  setOrderNumber('');
                  setEmail('');
                  setMessage('');
                }}
                className="text-[#DC2626] font-medium hover:underline"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleTrackOrder} className="space-y-6">
              {/* Honeypot: hidden from humans and autofill, filled by naive bots. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="support-bot-field">Leave this field empty</label>
                <input id="support-bot-field" type="text" name="bot_field" tabIndex={-1} autoComplete="off" />
              </div>
              {requestStatus === 'error' && requestError && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800">
                  {requestError}
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
                  placeholder="e.g., 123-4567890-1234567"
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

              <div>
                <label htmlFor="trackMessage" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  What can we help you with?
                </label>
                <textarea
                  id="trackMessage"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors resize-none"
                  placeholder="Describe your issue or question..."
                />
              </div>

              <button
                type="submit"
                disabled={requestStatus === 'loading'}
                className="w-full flex items-center justify-center gap-2 bg-[#DC2626] text-white px-8 py-4 font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
              >
                {requestStatus === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Request tracking info
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
