import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does the Virtual Try On process work?',
      a: 'You simply upload a photo of yourself (or choose one of our diverse model portraits), then upload images of clothing pieces such as shirts, pants, skirts, or accessories. Our generative AI engine identifies the body pose, segments the garments, wraps the fabric naturally to your body contours, and blends realistic lighting.'
    },
    {
      q: 'Can I upload multiple clothing items at once?',
      a: 'Yes! Our multi-item composer supports pairing tops, bottoms, hats, and shoes in a single cohesive generation so you can see a complete coordinated outfit.'
    },
    {
      q: 'Are my uploaded photos kept private?',
      a: 'Yes. With private generation enabled, your images and generated outputs are never shared publicly or displayed on the community showcase. You maintain full ownership of your creations.'
    },
    {
      q: 'How do product links work?',
      a: 'In the studio, select the "Product links" tab and paste a link from supported stores like Uniqlo, Amazon, or Shopify. Our system automatically fetches the product garment photos for immediate try-on.'
    },
    {
      q: 'Can I use the images for commercial e-commerce?',
      a: 'Yes, paid subscribers (Standard and Pro) receive full commercial distribution rights for lookbooks, online store listings, catalog presentations, and advertising campaigns.'
    }
  ];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C6A664]/30 bg-black/40 text-xs font-semibold text-[#FFD700] mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-[#C6A664]" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="tech-card rounded-xl border border-white/10 overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-[#FFD700] transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-[#C6A664] transition-transform ${
                openIndex === idx ? 'rotate-180 text-[#FFD700]' : ''
              }`} />
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
