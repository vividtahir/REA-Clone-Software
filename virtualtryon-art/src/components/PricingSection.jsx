import React, { useState } from 'react';
import { Check, Sparkles, Gift } from 'lucide-react';

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing-section" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-black via-[#141007] to-black border-t border-white/10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C6A664]/30 bg-black/40 text-xs font-semibold text-[#FFD700] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A664]" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Virtual Try On <span className="text-gold-gradient">Plans</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Choose a plan to instantly generate high resolution realistic try-on images for your fashion, e-commerce, and creator projects.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 p-1.5 shadow-lg">
            <button
              onClick={() => setIsYearly(true)}
              className={`rounded-lg px-5 py-2 text-xs font-bold transition-all ${
                isYearly
                  ? 'bg-amber-100 text-amber-950 shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly (Save 20%)
            </button>
            <button
              onClick={() => setIsYearly(false)}
              className={`rounded-lg px-5 py-2 text-xs font-bold transition-all ${
                !isYearly
                  ? 'bg-amber-100 text-amber-950 shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Standard Tier */}
          <article className="tech-card rounded-3xl p-8 flex flex-col justify-between border-white/15 hover:border-[#C6A664]/40 transition-all hover:scale-[1.02]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-[#FFD700]">Standard</h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-200">
                  -20% Off
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    {isYearly ? '$16.67' : '$19.99'}
                  </span>
                  <span className="text-sm text-gray-400">/month</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {isYearly ? '$199.99 billed annually' : 'Billed monthly, cancel anytime'}
                </p>
              </div>

              {/* Credits Box */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center mb-6">
                <div className="flex items-center justify-center gap-2 text-lg font-bold text-white">
                  <Sparkles className="w-5 h-5 text-[#FFD700]" />
                  <span>{isYearly ? '7,800 Credits' : '650 Credits / mo'}</span>
                </div>
                {isYearly && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20 text-xs font-semibold text-amber-200">
                    <Gift className="w-3.5 h-3.5" />
                    <span>+1,800 Bonus Credits (+30%)</span>
                  </div>
                )}
              </div>

              {/* Feature List */}
              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-200 mb-8">
                {[
                  'Private try-on images allowed',
                  'High quality 2K & 4K try-on outputs',
                  'Watermark-free downloads',
                  'Advanced multi-garment alignment engine',
                  'Priority generation worker queue'
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-100 text-amber-950 hover:bg-amber-200 transition-colors shadow-lg">
              Subscribe Standard
            </button>
          </article>

          {/* Pro Tier (Featured) */}
          <article className="tech-card rounded-3xl p-8 flex flex-col justify-between border-[#FFD700]/70 bg-gradient-to-b from-amber-500/10 to-yellow-950/20 shadow-[0_0_50px_-10px_rgba(245,158,11,0.35)] relative hover:scale-[1.02] transition-all">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-4 py-1 text-xs font-extrabold text-amber-950 shadow-md">
                MOST POPULAR
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-[#FFD700]">Pro</h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-[#FFD700]">
                  Save 50%
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    {isYearly ? '$25.00' : '$29.99'}
                  </span>
                  <span className="text-sm text-gray-400">/month</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {isYearly ? '$299.99 billed annually' : 'Billed monthly, cancel anytime'}
                </p>
              </div>

              {/* Credits Box */}
              <div className="rounded-2xl border border-[#C6A664]/30 bg-black/50 p-4 text-center mb-6">
                <div className="flex items-center justify-center gap-2 text-lg font-bold text-white">
                  <Sparkles className="w-5 h-5 text-[#FFD700]" />
                  <span>{isYearly ? '12,600 Credits' : '1,050 Credits / mo'}</span>
                </div>
                {isYearly && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/15 border border-amber-400/30 text-xs font-semibold text-[#FFD700]">
                    <Gift className="w-3.5 h-3.5" />
                    <span>+3,000 Bonus Credits (+31.25%)</span>
                  </div>
                )}
              </div>

              {/* Feature List */}
              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-200 mb-8">
                {[
                  'Everything in Standard included',
                  'Ultra-Fast Dedicated GPU Cluster',
                  'Unlimited Batch Multi-Outfit Try-Ons',
                  'Full Commercial Licensing Rights',
                  'Early Access to 4K Ultra Precision Models',
                  'Product URL Bulk Scraper API Access'
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="gradient-button w-full py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-black shadow-xl">
              Subscribe Pro
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
