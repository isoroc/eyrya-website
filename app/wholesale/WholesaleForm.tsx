'use client';

import { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';

export default function WholesaleForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/wholesale', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send request');
      }

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#fafafa] border border-gray-200 p-8">
      {status === 'success' ? (
        <div className="h-full flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Request sent!</h3>
          <p className="text-gray-600 mb-6">We will reply within 24 hours with a quote.</p>
          <button
            onClick={() => setStatus('idle')}
            className="text-[#DC2626] font-medium hover:underline"
          >
            Send another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Failed to send request. Please email wholesale@eyrya.com directly.</span>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors"
                placeholder="Company name"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Quantity needed *
              </label>
              <select
                id="quantity"
                name="quantity"
                required
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors bg-white"
              >
                <option value="">Select...</option>
                <option value="50-100">50-100 units</option>
                <option value="100-500">100-500 units</option>
                <option value="500+">500+ units</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-[#1a1a1a] mb-2">
              Business type *
            </label>
            <select
              id="businessType"
              name="businessType"
              required
              className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors bg-white"
            >
              <option value="">Select...</option>
              <option value="retailer">Retailer / Store</option>
              <option value="school">School / University</option>
              <option value="sports">Sports Team / League</option>
              <option value="event">Event Planning</option>
              <option value="corporate">Corporate</option>
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
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors resize-none"
              placeholder="Tell us what you are looking for..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 font-semibold hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
          >
            {status === 'loading' ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Request Quote
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}