import { Metadata } from 'next';
import { Sparkles, Target, Shield, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - EYRYA',
  description: 'Learn about EYRYA, a fun lifestyle brand focused on products for celebration, play and outdoor energy.',
};

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To make every moment more fun, lively and memorable. We believe that the right products can transform ordinary events into extraordinary experiences.',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: Sparkles,
    title: 'Our Product Vision',
    description: 'We design products that are playful, practical and easy to enjoy across different occasions. From parties to outdoor adventures, we have got you covered.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Shield,
    title: 'Quality \u0026 Safety',
    description: 'We pay attention to materials, usability and product experience. All our products are designed with safety and durability in mind.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Heart,
    title: 'Our Promise',
    description: 'We are committed to bringing joy and excitement to every customer. Your satisfaction is our priority.',
    color: 'bg-purple-100 text-purple-600',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About EYRYA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            EYRYA is a fun lifestyle brand focused on products for celebration, play and outdoor energy. We create products that bring more excitement to parties, sports events, family time and everyday fun moments.
          </p>
        </div>

        {/* Brand Story */}
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-3xl p-8 md:p-12 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              EYRYA was founded with a simple belief: life is better when it is fun. We noticed a gap in the market for high-quality, affordable products that bring joy to everyday moments - from birthday parties and sports events to outdoor family adventures.
            </p>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Starting with our signature EVA Foam Finger, we have expanded our range to cover party supplies, toys, sports fan gear, and outdoor fun products. Each product is carefully designed to be both fun and functional.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              Today, EYRYA products are enjoyed by thousands of customers worldwide, and we are just getting started. Our mission is to make every celebration more memorable and every adventure more exciting.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Stand For</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 rounded-xl ${value.color} flex items-center justify-center mb-6`}>
                  <value.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-pink-400 mb-2">10K+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">50+</div>
              <div className="text-gray-400">Products</div>
            </div>
            
            <div>
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">20+</div>
              <div className="text-gray-400">Countries</div>
            </div>
            
            <div>
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">4</div>
              <div className="text-gray-400">Product Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
