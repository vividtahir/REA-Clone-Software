import React from 'react';
import { Wand2, Sparkles, Shirt, Gem, Palette, Scissors, Glasses } from 'lucide-react';

export default function HeroSection({ onSelectFeature }) {
  const features = [
    { id: 'clothes', label: 'Clothes', icon: Shirt, active: true },
    { id: 'image-gen', label: 'Image Generator', icon: Sparkles },
    { id: 'ring', label: 'Ring Try On', icon: Gem },
    { id: 'hair-color', label: 'Hair Color', icon: Palette },
    { id: 'hairstyle', label: 'Hairstyle', icon: Scissors },
    { id: 'glasses', label: 'Glasses', icon: Glasses },
  ];

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-12 pb-16 px-4">
      {/* Background Radial Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[300px] bg-yellow-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative text-center max-w-4xl mx-auto z-10 px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6A664]/30 bg-black/40 text-xs font-semibold text-[#FFD700] mb-6 shadow-lg shadow-black/60">
          <Sparkles className="w-4 h-4 text-[#C6A664]" />
          <span>#1 Free & Best Virtual Try On Tool</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Virtual Try On — Upload Your Photo & Try <span className="text-gold-gradient">Clothes, Outfits & Styles</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload a person photo, then add tops, pants, dresses, hairstyles, shoes, and glasses to create high-quality realistic try-on images in seconds.
        </p>

        {/* Start Try-On CTA Button */}
        <div className="flex justify-center mb-16">
          <a
            href="#studio-section"
            className="relative group inline-flex items-center justify-center p-[1px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl shadow-amber-500/20"
          >
            <div className="absolute inset-0 bg-gold-gradient" />
            <div className="relative bg-black rounded-xl px-8 py-4 flex items-center gap-3 transition-colors group-hover:bg-[#141414]">
              <Wand2 className="w-5 h-5 text-[#C6A664] group-hover:rotate-12 transition-transform" />
              <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                Start Try-On Now
              </span>
            </div>
          </a>
        </div>

        {/* Feature Navigation Cards Grid */}
        <div className="tech-card rounded-2xl p-6 sm:p-8 relative overflow-hidden max-w-4xl mx-auto">
          {/* Subtle Grid Pattern Overlay */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#C6A664]" />
              <Sparkles className="w-4 h-4 text-[#C6A664]" />
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#C6A664]" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gold-gradient">
              Explore More AI Features
            </h2>
            <p className="text-xs text-gray-400">
              Transform your look with tailored generative fashion models
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectFeature?.(item.id)}
                  className={`group relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                    item.active
                      ? 'bg-amber-500/10 border-[#C6A664] shadow-[0_8px_20px_rgba(198,166,100,0.2)]'
                      : 'bg-black/40 border-white/10 hover:border-[#C6A664]/60 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-6 h-6 transition-transform group-hover:scale-110 ${
                    item.active ? 'text-[#FFD700]' : 'text-[#C6A664]'
                  }`} />
                  <span className={`text-xs font-semibold ${
                    item.active ? 'text-[#FFD700]' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                  {item.active && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-[#C6A664] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
