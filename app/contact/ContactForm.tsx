'use client';

import { useState } from 'react';
import { Mail, Clock, Send, Check, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const inquiry = formData.get('inquiry') as string;
    const message = formData.get('message') as string;

    const subject = encodeURIComponent(`EYRYA Contact: ${inquiry || 'General'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nType: ${inquiry || 'General'}\n\n${message}`
    );

    window.location.href = `mailto:contact@eyrya.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus('success');
      form.reset();
    }, 1000);
  };

  return (
    <div className="bg-[#fafafa] border border-gray-200 p-8">
      {status === 'success' ? (
        <div className="h-full flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Email client opened!</h3>
          <p className="text-gray-600 mb-6">Your email client should have opened with your message.</p>
          <button
            onClick={() => setStatus('idle')}
            className="text-[#DC2626] font-medium hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
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
              <option value="Product question">Product question</option>
              <option value="Wholesale inquiry">Wholesale inquiry</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#1a1a1a] mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 focus:border-[#1a1a1a] focus:outline-none transition-colors resize-none"
              placeholder="How can we help?"
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
                Opening email...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}