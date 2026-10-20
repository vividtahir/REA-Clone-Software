import React from 'react';

export default function BrandMarquee() {
  const brands = [
    { name: 'Microsoft', icon: '⊞ Microsoft' },
    { name: 'Nike', icon: '✔ NIKE' },
    { name: 'P&G', icon: 'P&G' },
    { name: 'Lancôme', icon: 'LANCÔME' },
    { name: 'Zoom', icon: 'zoom' },
    { name: 'Sony', icon: 'SONY' },
    { name: 'Mercedes-Benz', icon: '⊗ Mercedes-Benz' },
    { name: 'Coca-Cola', icon: 'Coca-Cola' },
  ];

  return (
    <div className="bg-black py-10 border-y border-white/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
          Trusted by fashion creators, stylists and modern e-commerce brands
        </p>
      </div>

      <div className="relative overflow-hidden w-full flex">
        <div className="animate-ticker flex items-center gap-16 py-2">
          {brands.concat(brands).concat(brands).map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center text-gray-400/60 hover:text-white transition-colors duration-300 font-bold text-lg tracking-wider whitespace-nowrap cursor-default select-none"
            >
              {brand.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
