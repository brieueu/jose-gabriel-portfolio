
import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/josegabriel' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/josegabriel' },
    { name: 'Email', url: 'mailto:jose.gabriel@example.com' },
  ];

  return (
    <footer className="w-full border-t border-white/10 bg-black">
      <div className="max-w-6xl w-full mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Nome e Ano */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest">
              José Gabriel Dabriel
            </p>
            <p className="text-xs opacity-50 mt-1">© 2026</p>
          </div>

          {/* Local Time */}
          <div className="text-center">
            <p className="text-xs font-bold tracking-widest opacity-60 uppercase mb-2">
              Local Time (Brasil)
            </p>
            <p className="text-2xl font-bold tabular-nums tracking-tight">
              {formatTime(time)}
            </p>
            <p className="text-xs opacity-50 mt-1">GMT-3 • Maceió, AL</p>
          </div>

          {/* Redes Sociais */}
          <div className="md:text-right">
            <p className="text-xs font-bold tracking-widest opacity-60 uppercase mb-4">
              Conecte-se
            </p>
            <div className="flex md:justify-end gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wider px-4 py-2 border border-white/20 rounded hover:bg-white hover:text-black transition-all duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
