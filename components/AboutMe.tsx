
import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <section id="sobre" className="min-h-screen w-full flex flex-col items-center justify-center py-8 border-b border-white/5">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 px-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">
            ABOUT<br/><span className="opacity-50">ME</span>
          </h2>
          <div className="space-y-8 text-lg opacity-70 font-light leading-relaxed">
            <p>
              With a strategic career transition from Chemical Engineering to Computer Science, I bring a rigorous analytical mindset to software development and AI.
            </p>
            <p>
              Currently at <span className="text-white font-normal">UFAL</span>, I focus on creating systems that not only work, but solve real problems through intelligent automation and computer vision.
            </p>
            <div className="pt-8 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-bold tracking-widest opacity-60 uppercase mb-4">Languages</h4>
                <ul className="text-sm space-y-2 uppercase tracking-wider">
                  <li>Portuguese <span className="opacity-50">— Native</span></li>
                  <li>English <span className="opacity-50">— Advanced</span></li>
                  <li>Spanish <span className="opacity-50">— Intermediate</span></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-widest opacity-60 uppercase mb-4">Location</h4>
                <p className="text-sm uppercase tracking-wider">Maceió - Alagoas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="border-l-2 border-white/10 pl-8 py-2">
            <h3 className="text-xs font-bold tracking-[0.3em] opacity-50 mb-6 uppercase">Education</h3>
            <div className="space-y-12">
              <div className="group cursor-default">
                <p className="text-xs opacity-60 mb-2 group-hover:text-white group-hover:opacity-100 transition-all duration-500">2023 — 2028</p>
                <h4 className="text-xl font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-500">Computer Engineering</h4>
                <p className="text-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500">Federal University of Alagoas</p>
              </div>
              <div className="group cursor-default">
                <p className="text-xs opacity-60 mb-2 group-hover:text-white group-hover:opacity-100 transition-all duration-500">2019 — 2022</p>
                <h4 className="text-xl font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-500">Chemical Engineering</h4>
                <p className="text-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500">Federal University of Alagoas</p>
              </div>
            </div>
          </div>
          
          <div className="border-l-2 border-white/10 pl-8 py-2">
            <h3 className="text-xs font-bold tracking-[0.3em] opacity-50 mb-6 uppercase">Experience & Leadership</h3>
            <div className="space-y-8">
              <div className="group cursor-default p-4 -ml-4 hover:bg-white/[0.03] rounded-lg transition-colors duration-500">
                <h4 className="text-sm font-bold uppercase group-hover:text-white transition-colors">B2B Director at AIESEC</h4>
                <p className="text-xs opacity-50 mt-1 uppercase tracking-widest group-hover:opacity-100 transition-opacity">Partnership management and business strategy</p>
              </div>
              <div className="group cursor-default p-4 -ml-4 hover:bg-white/[0.03] rounded-lg transition-colors duration-500">
                <h4 className="text-sm font-bold uppercase group-hover:text-white transition-colors">Academic Leader — Chemical Engineering</h4>
                <p className="text-xs opacity-50 mt-1 uppercase tracking-widest group-hover:opacity-100 transition-opacity">Team coordination and scientific projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stack Técnica - Full Width */}
      <div className="w-full mt-20 py-12 border-t border-white/5">
        <div className="max-w-6xl w-full mx-auto px-8 mb-8">
          <h4 className="text-xs font-bold tracking-widest opacity-60 uppercase">Tech Stack</h4>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-3 animate-infinite-scroll">
            {[...Array(3)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {['Python', 'C', 'C++', 'Java', 'Go', 'SQL', 'PostgreSQL', 'NoSQL', 'MongoDB', 'Redis', 'Django', 'FastAPI', 'Flask', 'Node.js', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Azure', 'AWS', 'GCP', 'OpenCV', 'PyTorch', 'TensorFlow', 'Keras', 'Hugging Face', 'LangChain', 'MLflow', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Git', 'GitHub Actions', 'CI/CD', 'Linux', 'Bash', 'Pytest'].map((skill, i) => (
                  <span 
                    key={`${skill}-${i}-${setIndex}`}
                    className="text-xs font-bold uppercase tracking-widest px-5 py-3 border border-white/10 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-default whitespace-nowrap flex-shrink-0"
                  >
                    {skill}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
