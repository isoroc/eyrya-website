'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Where to Buy', href: '/where-to-buy' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-black text-[#1a1a1a] tracking-tight">
              EYRYA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-[#1a1a1a] font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/wholesale"
              className="text-sm font-medium text-gray-600 hover:text-[#1a1a1a] transition-colors"
            >
              Wholesale
            </Link>
            <Link
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 font-medium hover:bg-black transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#1a1a1a] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-gray-700 hover:text-[#1a1a1a] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-gray-100" />
            <Link
              href="/wholesale"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-gray-600 hover:text-[#1a1a1a] transition-colors"
            >
              Wholesale
            </Link>
            <Link
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-5 py-3 font-medium"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
