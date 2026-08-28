import React, { useState } from 'react';
import { ZenemooLogo } from '../components/ui/ZenemooLogo';
import { apiService } from '../services/api';
import { 
  Rocket, 
  Monitor, 
  Code2, 
  TrendingUp, 
  Bell, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2,
  Linkedin,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

export const ComingSoonPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setToastMsg('Please enter a valid email address.');
      setTimeout(() => setToastMsg(null), 3000);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.subscribeNewsletter(email);
      if (res.success || res.status === '200') {
        setIsSubscribed(true);
        setToastMsg('Subscribed! We will notify you when we launch.');
      } else {
        setIsSubscribed(true);
        setToastMsg(res.message || 'Subscription registered!');
      }
    } catch {
      setIsSubscribed(true);
      setToastMsg('Subscription registered!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewServices = [
    {
      title: 'Beautiful Templates',
      icon: <Monitor className="w-5 h-5 text-cyan-400" />,
      description: 'Modern & responsive website templates.'
    },
    {
      title: 'Easy to Customize',
      icon: <Code2 className="w-5 h-5 text-purple-400" />,
      description: 'Build exactly what you imagine with ease.'
    },
    {
      title: 'Launch Faster',
      icon: <Rocket className="w-5 h-5 text-blue-400" />,
      description: 'Go live quickly with powerful tools.'
    },
    {
      title: 'Grow Your Business',
      icon: <TrendingUp className="w-5 h-5 text-indigo-400" />,
      description: 'Built to scale with your business growth.'
    },
  ];

  return (
    <div className="relative h-screen max-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#050813] text-slate-100 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 select-none">
      
      {/* Background Planet Glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 planet-orb-left rounded-full pointer-events-none opacity-60 animate-pulse-glow" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 planet-orb-right rounded-full pointer-events-none opacity-60 animate-pulse-glow" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-b from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Sparkles */}
      <div className="absolute top-16 left-[12%] w-1.5 h-1.5 bg-cyan-300 rounded-full animate-sparkle pointer-events-none" />
      <div className="absolute top-28 right-[15%] w-2 h-2 bg-purple-300 rounded-full animate-sparkle pointer-events-none" style={{ animationDelay: '1.2s' }} />
      <div className="absolute bottom-20 left-[20%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-sparkle pointer-events-none" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-32 right-[12%] w-2 h-2 bg-cyan-200 rounded-full animate-sparkle pointer-events-none" style={{ animationDelay: '0.8s' }} />

      {/* ================= HEADER ================= */}
      <header className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between shrink-0 py-1">
        <ZenemooLogo size="md" showTagline={true} taglineText="BUILD · LAUNCH · GROW" />

        {/* Small Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-slate-300 backdrop-blur-md shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px]">web.zenemoo.in</span>
        </div>
      </header>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-evenly py-1 my-auto text-center space-y-2 sm:space-y-3">
        
        {/* Top Hero Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs font-semibold font-mono uppercase tracking-wider backdrop-blur-md shadow-sm">
          <Rocket className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>SOMETHING AMAZING IS ON THE WAY</span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-1.5 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-none">
            Coming <span className="text-gradient-hero">Soon</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            We are building a powerful platform to help you <span className="text-cyan-400 font-semibold">buy</span>, <span className="text-cyan-400 font-semibold">create</span>, and <span className="text-purple-400 font-semibold">launch</span> stunning websites with ease.
          </p>

          {/* Decorative Divider Line */}
          <div className="w-32 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto opacity-70 mt-2" />
        </div>

        {/* Compact 4 Service Highlights Grid */}
        <div className="w-full glass-panel-coming rounded-2xl p-2.5 sm:p-4 shadow-xl border border-slate-800/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {previewServices.map((srv, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center p-2 sm:p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/60 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 mb-1.5 shadow-inner">
                  {srv.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-100">{srv.title}</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-tight font-sans line-clamp-2">{srv.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Panel */}
        <div className="w-full max-w-xl glass-panel-coming rounded-2xl p-3 sm:p-4 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            {/* Bell Icon */}
            <div className="p-3 rounded-xl bg-gradient-to-tr from-purple-600/20 to-blue-500/20 border border-purple-500/30 text-purple-400 shrink-0 shadow-md">
              <Bell className="w-6 h-6 animate-float-slow" />
            </div>

            {/* Title & Form */}
            <div className="flex-1 text-center sm:text-left space-y-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-100">Be the first to know!</h3>
                <span className="text-[10px] text-slate-400">Get notified when we launch.</span>
              </div>

              {isSubscribed ? (
                <div className="flex items-center gap-2 p-2 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{toastMsg || 'Thanks! You are on the early access list.'}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                  <div className="relative w-full">
                    <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 focus:outline-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto shrink-0 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Notify Me'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              <div className="flex items-center justify-center sm:justify-start gap-1 text-[10px] text-slate-500 pt-0.5">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>No spam. Just important updates.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Statement */}
        <div className="space-y-1 pt-0.5">
          <p className="text-xs sm:text-sm font-medium text-slate-300">
            Your <span className="text-cyan-400 font-bold">Vision</span>. Our <span className="text-cyan-400 font-bold">Websites</span>. A Bigger <span className="text-purple-400 font-bold">Tomorrow</span>.
          </p>

          <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase">
            <span className="w-8 h-[1px] bg-slate-800" />
            <span>Z E N E M O O</span>
            <span className="w-8 h-[1px] bg-slate-800" />
          </div>
        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 shrink-0 pt-2 border-t border-slate-800/60 gap-2">
        <div>© 2026 Zenemoo. All rights reserved.</div>

        <div className="font-bold text-slate-300 tracking-widest font-sans">
          ZENEMOO
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-500 hidden md:inline">Follow our journey</span>
          <div className="flex items-center gap-2 text-slate-400">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors p-1 bg-slate-900/60 rounded border border-slate-800">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors p-1 bg-slate-900/60 rounded border border-slate-800">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors p-1 bg-slate-900/60 rounded border border-slate-800">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors p-1 bg-slate-900/60 rounded border border-slate-800">
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
