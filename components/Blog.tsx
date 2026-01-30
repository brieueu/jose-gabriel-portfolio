
import React from 'react';

const posts = [
  {
    title: "Evaluating Machine Learning Models",
    date: "JAN, 2025",
    category: "MACHINE LEARNING",
    link: "https://www.linkedin.com/pulse/avalia%C3%A7%C3%A3o-de-modelos-aprendizagem-m%C3%A1quina-parte-1-jos%C3%A9-gabriel-sfnte/"
  },
  {
    title: "The Future of AI in Education",
    date: "02 FEB, 2025",
    category: "AI & EDUCATION"
  },
  {
    title: "Engineering Transition: From Chemical to Software",
    date: "15 JAN, 2025",
    category: "CAREER"
  }
];

const Blog: React.FC = () => {
  return (
    <section id="artigos" className="w-full flex flex-col py-12 md:py-16 px-8">
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-20 text-center md:text-left">
          ARTICLES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <a 
              key={i} 
              href={post.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer border border-white/5 p-8 hover:border-white/20 hover:bg-white/[0.02] transition-all block"
            >
              <span className="text-[10px] font-bold tracking-widest opacity-30 uppercase group-hover:opacity-100 transition-opacity">
                {post.category}
              </span>
              <h3 className="text-xl font-bold uppercase mt-4 mb-8 leading-tight group-hover:text-white transition-colors min-h-[3rem]">
                {post.title}
              </h3>
              <div className="flex justify-between items-center mt-auto pt-8 border-t border-white/5">
                <span className="text-[10px] opacity-30 uppercase tracking-widest font-bold">{post.date}</span>
                <span className="text-[10px] font-black uppercase tracking-tighter group-hover:translate-x-1 transition-transform">Read more +</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="text-[10px] font-bold tracking-[0.4em] opacity-40 hover:opacity-100 uppercase border-b border-white/20 pb-1 transition-all">
            VIEW ALL ARTICLES
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
