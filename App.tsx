
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ChatOverlay from './components/ChatOverlay';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Blog from './components/Blog';
import WorkTogether from './components/WorkTogether';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isInWorkTogether, setIsInWorkTogether] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .group');
      setIsHovering(!!isInteractive);
      
      // Check if mouse is in WorkTogether section
      const workTogetherSection = document.getElementById('work-together-section');
      if (workTogetherSection) {
        const rect = workTogetherSection.getBoundingClientRect();
        const isInSection = e.clientY >= rect.top && e.clientY <= rect.bottom;
        setIsInWorkTogether(isInSection);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-white selection:text-black scroll-smooth bg-black cursor-none">
      {/* Custom Cursor - always visible */}
      <div 
        className={`fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${isHovering ? 'scale-[4]' : 'scale-100'}`}
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px`,
        }}
      />

      {/* Spotlight Effect - hidden in WorkTogether section */}
      <div 
        className="pointer-events-none fixed inset-0 z-[60] transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.1), transparent 80%)`,
          opacity: isInWorkTogether ? 0 : 1
        }}
      />
      
      <div className="grainy-bg" />
      
      <Navbar />
      
      <main className="bg-black">
        <Hero onCtaClick={() => setIsChatOpen(true)} />
        <AboutMe />
        <Projects />
        <Blog />
      </main>

      <WorkTogether />

      {/* AI Chat Overlay */}
      <ChatOverlay isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;
