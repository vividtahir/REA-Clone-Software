import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12 px-4 text-xs text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-600 to-yellow-400 p-[1px]">
            <div className="w-full h-full bg-[#0E0E0E] rounded-lg flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A664]" />
            </div>
          </div>
          <span className="font-bold text-sm text-gold-gradient">
            Virtual Try On
          </span>
          <span className="ml-2 text-gray-600">| Complete REA Reconstruction</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a href="#hero" className="hover:text-white transition-colors">Home</a>
          <a href="#studio-section" className="hover:text-white transition-colors">AI Clothes Changer</a>
          <a href="#showcase-section" className="hover:text-white transition-colors">Showcase</a>
          <a href="#pricing-section" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>

        <p className="text-gray-600">
          © {new Date().getFullYear()} Virtual Try On. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
