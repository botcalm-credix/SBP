import React, { useState, useEffect } from 'react';
import { Wand2, Loader2, Sparkles } from 'lucide-react';
import { generateMatchBanner } from '../services/geminiService';

export const InteractiveBanner: React.FC = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Default high-quality stadium image
  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=2831&auto=format&fit=crop";

  // Load saved image on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('betlive_dashboard_banner');
      if (saved) {
        setBgImage(saved);
      }
    } catch (e) {
      console.warn('Could not load banner from storage', e);
    }
  }, []);

  const handleGenerateImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isGenerating) return;

    setIsGenerating(true);
    // Haptic feedback if available
    if (navigator.vibrate) navigator.vibrate(50);

    const image = await generateMatchBanner("Liverpool FC vs Manchester United");
    if (image) {
      setBgImage(image);
      try {
        localStorage.setItem('betlive_dashboard_banner', image);
      } catch (e) {
        console.error('Failed to save banner to storage', e);
      }
    }
    setIsGenerating(false);
  };

  return (
    <div className="mb-8 relative rounded-2xl overflow-hidden shadow-2xl group min-h-[320px] flex flex-col justify-end">
      {/* Background Container */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
        style={{
          backgroundImage: `url(${bgImage || DEFAULT_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient Overlays for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-black/40"></div>

        {/* Subtle accent color blend */}
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
      </div>

      {/* Decorative Gaming Elements (Cyberpunk/Tech accents) - Only show on default image */}
      {!bgImage && (
        <>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-accent/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        </>
      )}

      {/* Content */}
      <div className="relative z-20 p-6 md:p-8 text-white w-full">
        <div className="flex justify-between items-start absolute top-6 left-6 right-6">
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full border-2 border-brand-blue shadow-lg bg-white p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png"
                  className="w-full h-full object-contain"
                  alt="Liverpool"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Liverpool&background=fff&color=000&rounded=true`; }}
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-brand-blue shadow-lg bg-white p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png"
                  className="w-full h-full object-contain"
                  alt="Man Utd"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=ManUtd&background=fff&color=000&rounded=true`; }}
                />
              </div>
            </div>
            <span className="bg-black/50 border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md text-white shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-red animate-pulse"></span>
              Live Now
            </span>
          </div>

          <button
            onClick={handleGenerateImage}
            disabled={isGenerating}
            className="group flex items-center space-x-2 bg-black/50 hover:bg-black/70 border border-white/10 rounded-full px-4 py-2 transition-all text-xs font-bold backdrop-blur-md shadow-lg"
          >
            {isGenerating ? (
              <Loader2 size={14} className="animate-spin text-brand-accent" />
            ) : (
              <Wand2 size={14} className="text-brand-accent group-hover:text-white transition-colors" />
            )}
            <span className="hidden sm:inline">{isGenerating ? 'Rendering...' : 'Gaming Mode'}</span>
          </button>
        </div>

        <div className="max-w-xl mt-16 md:mt-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight drop-shadow-2xl leading-[0.9]">
            LIVERPOOL <span className="text-brand-blue stroke-text text-3xl md:text-5xl align-middle mx-1">v</span> MAN UTD
          </h1>
          <p className="text-blue-100/90 text-sm md:text-base mb-8 max-w-md font-medium leading-relaxed drop-shadow-lg text-shadow">
            Experience the match in high fidelity. Place your bets now to unlock exclusive in-game rewards.
          </p>

          <button className="bg-brand-blue text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-95 flex items-center gap-2 uppercase tracking-wide text-sm border border-white/10">
            <Sparkles size={18} className="fill-white" />
            Place Bet
          </button>
        </div>
      </div>
    </div>
  );
};