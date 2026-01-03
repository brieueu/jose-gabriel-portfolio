
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section id="home" className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-16">
      
      {/* Background Hero Image */}
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <div className="relative w-full h-full translate-y-20">
          <img 
            src="/profile.png" 
            alt="José Gabriel"
            className="w-full h-full object-contain brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl px-8 h-full flex flex-col justify-start pt-16 md:pt-19">
        
        {/* Main Title */}
        <div className="text-center md:text-left">
          <h1 className="text-huge font-black uppercase pointer-events-none tracking-tighter whitespace-nowrap">
            JOSÉ GABRIEL
          </h1>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-6 md:ml-4">
            <span className="text-[10px] md:text-xs tracking-[0.4em] opacity-60 font-bold uppercase border border-white/20 px-3 py-1 rounded-full">
              Software Engineering
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.4em] opacity-60 font-bold uppercase border border-white/20 px-3 py-1 rounded-full">
              Artificial Intelligence
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.4em] opacity-60 font-bold uppercase border border-white/20 px-3 py-1 rounded-full">
              Data Science
            </span>
          </div>
        </div>

        {/* Vertical Socials (Left) */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8">
          <a href="https://linkedin.com/in/gabriel-work" target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-widest opacity-60 hover:opacity-100 transition-opacity border-b border-transparent hover:border-white pb-1">LI</a>
          <a href="https://github.com/brieueu" target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-widest opacity-60 hover:opacity-100 transition-opacity border-b border-transparent hover:border-white pb-1">GH</a>
          <a href="https://wa.me/5582996466028" target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-widest opacity-60 hover:opacity-100 transition-opacity border-b border-transparent hover:border-white pb-1">WA</a>
        </div>

        {/* Circular CTA (Right) */}
        <button 
          onClick={onCtaClick}
          className="absolute right-8 md:right-24 bottom-24 md:bottom-1/2 md:translate-y-1/2 group"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95 duration-500 shadow-[0_0_60px_rgba(255,255,255,0.3)]">
            <span className="text-black font-black text-[10px] md:text-xs leading-tight uppercase tracking-tighter -rotate-12 group-hover:rotate-0 transition-transform duration-500 text-center">
              LET'S<br/>TALK?
            </span>
          </div>
        </button>

        {/* Bottom Description */}
        <div className="mt-auto mb-12 w-full">
          <p className="text-sm md:text-base opacity-80 leading-relaxed font-light">
            Computer Engineering student at UFAL. 1st place winner at the
            <span className="text-white font-medium"> Microsoft AI Challenge II (2025)</span>. 
            Specialist in end-to-end AI solutions, from data analysis to cloud deployment.
            <span className="block mt-4 text-xs opacity-60 italic uppercase tracking-wider">
              Python • C • SQL • Django • Scikit-learn • Azure
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;
