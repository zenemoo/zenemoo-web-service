import React from 'react';
import { 
  Globe, 
  Monitor, 
  ShoppingCart, 
  Cpu, 
  Smartphone, 
  Mail, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ComingSoonPage: React.FC = () => {
  const previewServices = [
    {
      title: 'Custom Websites',
      icon: <Monitor className="w-4 h-4 text-cyan-400" />,
      description: 'Bespoke design & tailored brand identity'
    },
    {
      title: 'E-Commerce',
      icon: <ShoppingCart className="w-4 h-4 text-blue-400" />,
      description: 'High-converting online store platforms'
    },
    {
      title: 'Web Applications',
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      description: 'Scalable SaaS & interactive web tools'
    },
    {
      title: 'Responsive Design',
      icon: <Smartphone className="w-4 h-4 text-emerald-400" />,
      description: 'Optimized for mobile, tablet & desktop'
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#050813] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Left Planet Orb Glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 planet-orb-left rounded-full opacity-60 pointer-events-none animate-pulse-glow" />
      
      {/* Right Planet Orb Glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 planet-orb-right rounded-full opacity-60 pointer-events-none animate-pulse-glow" />

      {/* Top Center Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Background Star Sparkles */}
      <div className="absolute top-24 left-[15%] w-1.5 h-1.5 bg-cyan-300 rounded-full animate-sparkle pointer-events-none" />
      <div className="absolute top-40 right-[20%] w-2 h-2 bg-purple-300 rounded-full animate-sparkle pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-32 left-[25%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-sparkle pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-48 right-[15%] w-2 h-2 bg-cyan-200 rounded-full animate-sparkle pointer-events-none" style={{ animationDelay: '0.8s' }} />

      {/* HEADER */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        {/* Zenemoo Brand Mark */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-cyan-500/40 p-2 flex items-center justify-center shadow-lg shadow-cyan-500/10 backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <path d="M28 30H72L42 54H72L28 78" stroke="#00F2FE" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-wider text-slate-100 font-sans leading-none">
              ZENEMOO
            </span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-[0.2em] uppercase mt-1">
              Web Services
            </span>
          </div>
        </div>

        {/* Contact Email Pill Link */}
        <a
          href="mailto:contact@zenemoo.in?subject=Inquiry%20-%20Zenemoo%20Web%20Services"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 text-xs font-mono text-cyan-300 transition-all duration-300 shadow-md backdrop-blur-md"
        >
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>contact@zenemoo.in</span>
        </a>
      </header>

      {/* MAIN CONTENT / HERO & PREVIEW */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center flex flex-col items-center space-y-12 my-auto">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wider font-mono uppercase backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>ZENEMOO WEB SERVICES</span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
            Coming <span className="text-gradient-hero">Soon</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            We're building powerful, beautiful, and high-performing websites for businesses ready to grow online.
          </p>
        </div>

        {/* Compact Service Preview Section */}
        <div className="w-full max-w-4xl glass-panel-coming rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800/60">
            {previewServices.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-xl transition-all duration-300 hover:bg-slate-900/60 ${idx > 1 ? 'pt-4 md:pt-3' : ''}`}
              >
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-2.5 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-100">{item.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug font-sans">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Message Section */}
        <div className="max-w-2xl space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold font-mono text-purple-300 tracking-wider uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>Something great is being built</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Our Web Services platform is currently under development. We're preparing a better way to design, build, launch, and maintain your digital presence.
          </p>
        </div>

        {/* Contact CTA Action */}
        <div className="pt-2">
          <a
            href="mailto:contact@zenemoo.in?subject=Inquiry%20-%20Zenemoo%20Web%20Services"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 border border-cyan-300/40 transition-all duration-300 hover:-translate-y-0.5 group"
          >
            <Mail className="w-4 h-4 text-slate-950" />
            <span>Talk to Zenemoo</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-200 tracking-wider">ZENEMOO</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono">Web Services</span>
        </div>

        <div className="text-slate-400 italic font-sans text-center sm:text-left">
          "Building better digital experiences."
        </div>

        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>© 2026 Zenemoo. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};
