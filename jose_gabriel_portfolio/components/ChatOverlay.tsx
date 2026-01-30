
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hello! I\'m José Gabriel\'s assistant. How can I help you learn more about his work?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: '',
        contents: [
          { role: 'user', parts: [{ text: userText }] }
        ],
        config: {
          systemInstruction: `You are José Gabriel's virtual assistant (jg.vieira.dev@gmail.com).
          BASE YOUR RESPONSES ON THESE FACTS:
          - He is a Computer Engineering student at UFAL (2023-2028).
          - Previously studied Chemical Engineering at UFAL, but did not complete (2019-2022).
          - Won 1st place at Microsoft AI Challenge II (2025) with a lactose detection app using Azure Computer Vision and Logic Apps.
          - Tech Stack: Python, C, SQL, Pandas, Scikit-learn, Flask, Django, Azure, Git.
          - Languages: Portuguese (Native), English (Advanced), Spanish (Intermediate).
          - Location: Maceió - AL, Brazil.
          - Link to schedule a call: https://cal.com/jose-gabriel-mulcbp
          
          PERSONALITY:
          - Professional, concise, focused on technology and results.
          - Respond elegantly and briefly in English.
          - If asked about hiring, mention email jg.vieira.dev@gmail.com or WhatsApp +(55) 82 99646 6028.`,
          temperature: 0.7,
        }
      });

      const aiText = response.text || 'Sorry, I had a problem processing your message.';
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'There was a connection error. Please try again later.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl h-[80vh] bg-zinc-900 border border-white/10 flex flex-col shadow-2xl overflow-hidden rounded-lg">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter text-white">INTERESTED?</h2>
            <p className="text-[10px] opacity-40 uppercase tracking-widest mt-1">JOSÉ GABRIEL AI AGENT</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-white text-black font-medium' 
                  : 'bg-zinc-800 text-white/90 border border-white/5'
              }`}>
                <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 p-4 rounded-2xl border border-white/5 flex gap-1">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-75" />
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-150" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about my projects or background..."
              className="w-full bg-zinc-800 border border-white/10 rounded-full py-4 px-6 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm pr-16 text-white"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2 p-2 bg-white text-black rounded-full hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatOverlay;
