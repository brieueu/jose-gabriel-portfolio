
import React from 'react';

const Navbar: React.FC = () => {
  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#sobre' },
    { label: 'PROJECTS', href: '#projetos' },
    { label: 'ARTICLES', href: '#artigos' },
    { label: 'CONTACT', href: '#work-together-section' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-black/60 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-8">
        <div className="text-lg font-black tracking-tighter">JG.</div>
        <div className="flex gap-8 md:gap-12">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[10px] font-bold tracking-[0.2em] opacity-40 transition-all hover:opacity-100 hover:tracking-[0.3em] uppercase"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
