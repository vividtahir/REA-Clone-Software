import React from 'react';
import { Shirt, Sparkles, Gem, Palette, Scissors, Glasses, ArrowRight } from 'lucide-react';

export default function FeaturesGrid({ onSelectFeature }) {
  const cards = [
    {
      id: 'clothes',
      title: 'AI Clothes Changer',
      desc: 'Swap tops, trousers, dresses, and coats with photorealistic body drape and lighting preservation.',
      icon: Shirt,
      highlight: true
    },
    {
      id: 'image-gen',
      title: 'AI Image Generator',
      desc: 'Create high-resolution studio lookbooks, editorial fashion shoots, and model poses from prompts.',
      icon: Sparkles
    },
    {
      id: 'ring',
      title: 'Virtual Ring Try-On',
      desc: 'Precise hand tracking and gem rendering for rings, bracelets, and luxury jewelry visualization.',
      icon: Gem
    },
    {
      id: 'hair-color',
      title: 'Hair Color Simulator',
      desc: 'Test balayage, highlights, platinum, or natural tints without permanent dyes.',
      icon: Palette
    },
    {
      id: 'hairstyle',
      title: 'Hairstyle Changer',
      desc: 'Explore bobs, curls, fades, and layered cuts matched to your facial structure.',
      icon: Scissors
    },
    {
      id: 'glasses',
      title: 'Virtual Glasses & Eyewear',
      desc: 'Fit luxury designer sunglasses, prescription opticals, and vintage frames accurately.',
      icon: Glasses
    }
  ];

  return (
    <section id="features-section" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
          All-in-One <span className="text-gold-gradient">Generative Fashion Engine</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Everything creators, shoppers, and digital fashion brands need to visualize styles instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onSelectFeature?.(card.id)}
              className="tech-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600/30 via-yellow-500/20 to-amber-300/10 border border-[#C6A664]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#FFD700]" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#C6A664] group-hover:text-[#FFD700] transition-colors">
                <span>Explore Feature</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
