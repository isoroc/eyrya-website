import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - EYRYA',
  description: 'We make party supplies and fan gear that actually work. No gimmicks.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
            About EYRYA
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We make party supplies and fan gear that actually work. No gimmicks, no dropshipping junk, 
            no products that fall apart after one use.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Started in 2022, we have sold over 50,000 foam fingers and party supplies to customers 
            across the US, UK, and Australia. Our products show up at tailgates, birthday parties, 
            school events, and family camping trips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#fafafa] p-8">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">What we do</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Design products that solve real problems</li>
              <li>• Test everything before it goes to market</li>
              <li>• Sell directly and through trusted retailers</li>
              <li>• Offer bulk pricing for schools and teams</li>
            </ul>
          </div>

          <div className="bg-[#fafafa] p-8">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">What we dont do</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Sell products we wouldnt use ourselves</li>
              <li>• Make vague marketing claims</li>
              <li>• Hide behind complicated return policies</li>
              <li>• Spam you with emails</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">By the numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#FF6B6B] mb-1">50K+</div>
              <div className="text-sm text-gray-600">Products sold</div>
            </div>
            
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#4ECDC4] mb-1">4.7</div>
              <div className="text-sm text-gray-600">Average rating</div>
            </div>
            
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#FFE66D] mb-1">20+</div>
              <div className="text-sm text-gray-600">Countries shipped</div>
            </div>
            
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-1">24h</div>
              <div className="text-sm text-gray-600">Avg. response time</div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-[#1a1a1a] p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Questions?</h2>
            <p className="text-gray-400 mb-6">
              We read every email. Usually reply within 24 hours.
            </p>
            <a 
              href="mailto:support@eyrya.com"
              className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] px-6 py-3 font-semibold hover:bg-gray-100 transition-colors"
            >
              support@eyrya.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
