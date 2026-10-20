import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BrandMarquee from './components/BrandMarquee';
import TryOnStudio from './components/TryOnStudio';
import ShowcaseDemo from './components/ShowcaseDemo';
import FeaturesGrid from './components/FeaturesGrid';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import { initUser } from './services/api';

export default function App() {
  const [credits, setCredits] = useState('Unlimited');
  const [selectedFeature, setSelectedFeature] = useState('clothes');

  useEffect(() => {
    initUser().then(() => {
      setCredits('Unlimited');
    });
  }, []);

  const handleConsumeCredit = () => {
    // Unlimited free credits: no consumption needed!
  };

  const handleApplyPresetToStudio = (preset) => {
    // Scroll smoothly to studio section
    const el = document.getElementById('studio-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#EDEDED] flex flex-col selection:bg-[#C6A664] selection:text-black">
      <Navbar credits={credits} />
      
      <main className="flex-1">
        <HeroSection onSelectFeature={(feat) => {
          setSelectedFeature(feat);
          const el = document.getElementById('studio-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        <BrandMarquee />

        <TryOnStudio onConsumeCredit={handleConsumeCredit} userCredits={credits} />

        <ShowcaseDemo onApplyPreset={handleApplyPresetToStudio} />

        <FeaturesGrid onSelectFeature={(feat) => {
          const el = document.getElementById('studio-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        <PricingSection />

        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
