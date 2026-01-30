
import React, { useState } from 'react';

const projects = [
  {
    title: "Microsoft AI Challenge II",
    period: "2025",
    tag: "1º LUGAR",
    description: "Lactose identification app via photo using Azure Computer Vision and Logic Apps. National winner among several teams.",
    tech: ["Azure", "OCR", "Custom Vision", "Logic Apps"],
    link: "https://azureacademy.com.br/certificados/certificadoHack6.asp?ch1s=2495&ch2s=8600",
    image: "/certificado.png"
  },
  {
    title: "Pest Detection with YOLO",
    period: "2024",
    tag: "COMPUTER VISION",
    description: "Computer vision system for pest detection in orange tree leaves using YOLOv8. Identifies Whitefly, Orthezia, Sooty Mold and healthy leaves with average F1-Score of 0.93.",
    tech: ["YOLOv8", "Computer Vision", "Python", "Deep Learning"],
    link: "https://github.com/brieueu/yolo_pratic",
    image: "/pragas.png"
  }
];

const Projects: React.FC = () => {
  const [cursorImage, setCursorImage] = useState<string | null>(null);
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [previousY, setPreviousY] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'down' | 'up'>('down');

  const handleMouseMove = (e: React.MouseEvent, image: string) => {
    const currentY = e.clientY;
    setMousePosition({ x: e.clientX, y: currentY });
    
    if (cursorImage && cursorImage !== image) {
      // Detectar direção: se Y aumenta, mouse desce; se diminui, mouse sobe
      const direction = currentY > previousY ? 'down' : 'up';
      setSlideDirection(direction);
      setPreviousImage(cursorImage);
      setIsSliding(true);
      setTimeout(() => setIsSliding(false), 400);
    }
    setPreviousY(currentY);
    setCursorImage(image);
  };

  const handleMouseLeave = () => {
    setPreviousImage(null);
    setCursorImage(null);
    setIsSliding(false);
  };

  return (
    <section id="projetos" className="w-full flex flex-col py-16 md:py-20 px-8 bg-black relative">
      {/* Image that follows cursor */}
      {(cursorImage || previousImage) && (
        <div 
          className="fixed pointer-events-none z-50 overflow-hidden bg-transparent"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y + 20,
          }}
        >
          <div className="relative bg-transparent">
            {/* Previous image sliding out */}
            {previousImage && isSliding && (
              <img 
                src={previousImage} 
                alt="Project preview" 
                className={`w-80 h-auto object-contain rounded-lg shadow-2xl border-2 border-white/20 absolute top-0 left-0 bg-black ${
                  slideDirection === 'down' ? 'animate-slideOutUp' : 'animate-slideOutDown'
                }`}
              />
            )}
            {/* Current image sliding in */}
            {cursorImage && (
              <img 
                src={cursorImage} 
                alt="Project preview" 
                className={`w-80 h-auto object-contain rounded-lg shadow-2xl border-2 border-white/20 bg-black ${
                  isSliding 
                    ? (slideDirection === 'down' ? 'animate-slideInUp' : 'animate-slideInDown')
                    : 'animate-fadeInScale'
                }`}
              />
            )}
          </div>
        </div>
      )}
      
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex justify-between items-end mb-20">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
            SELECTED<br/><span className="opacity-50">PROJECTS</span>
          </h2>
          <p className="hidden md:block text-[10px] tracking-[0.4em] opacity-50 uppercase font-bold text-right">
            01 / 02
          </p>
        </div>

        <div className="grid grid-cols-1 gap-1">
          {projects.map((proj, i) => (
            <a 
              key={i} 
              href={proj.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block border-t border-white/10 py-16 hover:bg-white/5 transition-colors px-4"
              onMouseMove={(e) => handleMouseMove(e, proj.image)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] font-bold tracking-widest border border-white/20 px-2 py-0.5 rounded opacity-40 uppercase group-hover:opacity-100 group-hover:border-white transition-all">
                      {proj.tag}
                    </span>
                    <span className="text-[10px] opacity-30 font-bold uppercase tracking-widest">{proj.period}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                    {proj.title}
                  </h3>
                </div>
                
                <div className="max-w-md">
                  <p className="text-sm opacity-50 mb-6 group-hover:opacity-80 transition-opacity leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map(t => (
                      <span key={t} className="text-[9px] opacity-30 tracking-widest uppercase font-bold">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="hidden md:block">
                  <svg className="w-12 h-12 opacity-10 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
          <div className="border-t border-white/10 w-full" />
        </div>
      </div>
    </section>
  );
};

export default Projects;
