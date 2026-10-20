import React, { useState } from 'react';
import { Sparkles, Globe, User, ChevronDown } from 'lucide-react';

export default function Navbar({ credits = 2, onNavigate }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0E0E0E]/90 border-b border-[#3A3A3A]/40 transition-colors">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6 lg:px-8" aria-label="Global">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 p-[1px] shadow-lg shadow-amber-500/10">
                <div className="w-full h-full bg-[#0E0E0E] rounded-xl flex items-center justify-center group-hover:bg-[#1A1A1A] transition-colors">
                  <Sparkles className="w-5 h-5 text-[#C6A664]" />
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight text-gold-gradient">
                Virtual Try On
              </span>
            </a>
          </div>

          {/* Links */}
          <div className="hidden md:flex md:items-center md:gap-x-8">
            <a href="#studio-section" className="text-xs uppercase tracking-wider font-semibold text-[#EDEDED] hover:text-[#FFD700] transition-colors">
              AI Clothes Changer
            </a>
            <a href="#showcase-section" className="text-xs uppercase tracking-wider font-semibold text-[#EDEDED] hover:text-[#FFD700] transition-colors">
              Showcase
            </a>
            <a href="#features-section" className="text-xs uppercase tracking-wider font-semibold text-[#EDEDED] hover:text-[#FFD700] transition-colors">
              Features
            </a>
            <a href="#pricing-section" className="text-xs uppercase tracking-wider font-semibold text-[#EDEDED] hover:text-[#FFD700] transition-colors">
              Pricing
            </a>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-3">
            {/* Credit Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-[#C6A664]/30 text-xs font-medium text-[#C6A664]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>{credits} Free Credits</span>
            </div>

            {/* Language */}
            <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium hover:border-[#C6A664]/50 transition-colors">
              <Globe className="w-4 h-4 text-gray-400" />
              <span>EN</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {/* Log in Button */}
            <button
              onClick={() => setShowLoginModal(true)}
              className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold rounded-lg border border-white/20 hover:border-white/60 transition-all hover:bg-white/5"
            >
              Log in
            </button>
          </div>
        </nav>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="tech-card rounded-2xl p-6 sm:p-8 max-w-md w-full relative">
            <h3 className="text-xl font-bold text-white mb-2">Sign in to Virtual Try On</h3>
            <p className="text-xs text-gray-400 mb-6">Access your saved generations, unlock batch try-ons, and get 2 free daily credits.</p>
            
            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/20 hover:border-[#C6A664] bg-white/5 hover:bg-white/10 text-sm font-medium transition-all mb-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Continue with Google
            </button>

            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full text-center py-2 text-xs text-gray-500 hover:text-gray-300 mt-2"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      )}
    </>
  );
}
