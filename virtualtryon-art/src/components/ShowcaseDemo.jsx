import React, { useState } from 'react';
import { ArrowRight, Plus, Sparkles, Check } from 'lucide-react';

export default function ShowcaseDemo({ onApplyPreset }) {
  const demos = [
    {
      id: 'summer-chic',
      title: 'Summer Blouse & Chic Hat',
      inputs: [
        { name: 'Blouse', url: '/assets/blouse.webp' },
        { name: 'Hat', url: '/assets/hat.webp' },
        { name: 'Skirt', url: '/assets/skirt.webp' },
        { name: 'Character', url: '/assets/woman_model.webp' }
      ],
      prompt: 'Use the character in @image4 as the reference, and dress them in the blouse, skirt, and hat from the other images.',
      output: '/assets/woman_output.webp'
    },
    {
      id: 'casual-red',
      title: 'Casual Red Summer Styling',
      inputs: [
        { name: 'Outfit', url: '/assets/summer_casual.webp' },
        { name: 'Hair Tint', url: '/assets/red_hair.webp' },
        { name: 'Model', url: '/assets/woman_model.webp' },
        { name: 'Accessory', url: '/assets/hat.webp' }
      ],
      prompt: 'Apply vibrant red summer dress and warm lighting to model with natural drape.',
      output: '/assets/summer_casual_red.webp'
    },
    {
      id: 'luxury-car',
      title: 'Lifestyle & Automotive Persona',
      inputs: [
        { name: 'Subject', url: '/assets/cool_man.webp' },
        { name: 'Vehicle', url: '/assets/luxury_car.webp' },
        { name: 'Suit', url: '/assets/business_professional.webp' },
        { name: 'Casual', url: '/assets/urban_streetwear.webp' }
      ],
      prompt: 'Render character driving a luxury convertible with natural outdoor reflections.',
      output: '/assets/man_driving_car.webp'
    }
  ];

  const [activeDemo, setActiveDemo] = useState(demos[0]);

  return (
    <section id="showcase-section" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C6A664]/30 bg-black/40 text-xs font-semibold text-[#FFD700] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A664]" />
          <span>Real Engine Showcase</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
          How Our <span className="text-gold-gradient">Virtual Try On</span> Works
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Combine any model photo with tops, skirts, hats, or accessories. Our multi-layer alignment AI handles masking, drape physics, and lighting automatically.
        </p>

        {/* Demo Switcher Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {demos.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveDemo(d)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeDemo.id === d.id
                  ? 'bg-gold-gradient text-black font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:border-[#C6A664]/50'
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>
      </div>

      {/* Demonstration Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
        {/* Input Reference Images Card */}
        <div className="lg:col-span-5 tech-card rounded-2xl p-6 sm:p-8 relative">
          {/* Gold Decorative Corner Brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-[#C6A664] rounded-tl-xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-[#C6A664] rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-[#C6A664] rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-[#C6A664] rounded-br-xl pointer-events-none" />

          <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
            <span>Inputs: Character & Garments</span>
            <span className="text-xs font-normal text-[#C6A664]">4 Reference Items</span>
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {activeDemo.inputs.map((item, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square border border-white/10 bg-black/50">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <span className="text-xs font-medium text-gray-200">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-xs text-gray-300 leading-relaxed">
            <span className="font-bold text-[#FFD700] mr-2">Conditioning Prompt:</span>
            {activeDemo.prompt}
          </div>
        </div>

        {/* Center Conversion Icon */}
        <div className="lg:col-span-1 flex justify-center py-2 lg:py-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 p-[1px] shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-[#0E0E0E] rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#FFD700] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Output AI Generated Result Card */}
        <div className="lg:col-span-5 tech-card rounded-2xl p-6 sm:p-8 relative">
          {/* Gold Decorative Corner Brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-[#C6A664] rounded-tl-xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-[#C6A664] rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-[#C6A664] rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-[#C6A664] rounded-br-xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">AI Generated Try-On Result</h3>
            <span className="px-2.5 py-1 rounded-full bg-[#C6A664]/20 border border-[#C6A664]/40 text-xs font-semibold text-[#FFD700] flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> High Res Output
            </span>
          </div>

          <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-black/50 border border-[#C6A664]/30 shadow-2xl">
            <img
              src={activeDemo.output}
              alt="AI Output Result"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs text-gray-400">Resolution: 2K UHD · Aspect: 3:4</span>
            <button
              onClick={() => onApplyPreset?.(activeDemo)}
              className="px-4 py-2 rounded-lg bg-[#C6A664]/15 hover:bg-[#C6A664]/30 border border-[#C6A664]/40 text-xs font-bold text-[#FFD700] transition-colors flex items-center gap-1.5"
            >
              Load In Studio <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
