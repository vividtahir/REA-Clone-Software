import React, { useState, useRef, useCallback } from 'react';

export default function BeforeAfterSlider({
  beforeImage = '/assets/woman_model.webp',
  afterImage = '/assets/woman_output.webp',
  beforeLabel = 'Original Model',
  afterLabel = 'AI Try-On Result'
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      className="relative w-full h-[440px] md:h-[500px] rounded-xl overflow-hidden select-none cursor-ew-resize border border-[#C6A664]/30 bg-black/60 shadow-2xl"
    >
      {/* After Image (Background layer) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />

      {/* Before Image (Clipped layer) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none max-w-none"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
        />
      </div>

      {/* Split Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#B8860B] via-[#FFD700] to-[#C6A664] shadow-[0_0_12px_rgba(255,215,0,0.8)] pointer-events-none"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        {/* Handle Pill */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0E0E0E] border-2 border-[#FFD700] shadow-lg flex items-center justify-center text-[#FFD700]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/75 border border-white/10 text-xs font-semibold text-gray-300 pointer-events-none">
        {beforeLabel}
      </div>
      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/75 border border-[#C6A664]/40 text-xs font-semibold text-[#FFD700] pointer-events-none">
        {afterLabel}
      </div>
    </div>
  );
}
