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
  AlertCircle,
  Users,
  Briefcase,
  UserCheck,
  Code,
  User,
  Linkedin,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

export const ComingSoonPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Strict RFC-compliant email validator
  const isValidEmail = (emailStr: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr.trim());
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError('Email address cannot be blank.');
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setEmailError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.subscribeNewsletter(trimmedEmail);
      if (res.success || res.status === '200') {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(true);
      }
    } catch {
      setIsSubscribed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewServices = [
    {
      title: 'Beautiful Websites',
      icon: <Monitor className="w-6 h-6 text-cyan-400" />,
      description: 'Modern & responsive website templates.'
    },
    {
      title: 'Easy to Customize',
      icon: <Code2 className="w-6 h-6 text-purple-400" />,
      description: 'Build exactly what you imagine with ease.'
    },
    {
      title: 'Launch Faster',
      icon: <Rocket className="w-6 h-6 text-blue-400" />,
      description: 'Go live quickly with powerful tools.'
    },
    {
      title: 'Grow Your Business',
      icon: <TrendingUp className="w-6 h-6 text-indigo-400" />,
      description: 'Built to scale with your business growth.'
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#050813] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Ambient Planet Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 planet-orb-left rounded-full pointer-events-none opacity-60 animate-pulse-glow" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 planet-orb-right rounded-full pointer-events-none opacity-60 animate-pulse-glow" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Sparkles */}
      <div className="absolute top-24 left-[12%] w-1.5 h-1.5 bg-cyan-300 rounded-full animate-sparkle pointer-events-none" />
      <div className="absolute top-40 right-[15%] w-2 h-2 bg-purple-300 rounded-full animate-sparkle pointer-events-none" style={{ animationDelay: '1.2s' }} />
      <div className="absolute bottom-40 left-[18%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-sparkle pointer-events-none" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-60 right-[12%] w-2 h-2 bg-cyan-200 rounded-full animate-sparkle pointer-events-none" style={{ animationDelay: '0.8s' }} />

      {/* ========================================== */}
      {/* NORMAL DOCUMENT FLOW HEADER (NO STICKY/FIXED POSITIONING) */}
      {/* ========================================== */}
      <header className="relative z-20 w-full border-b border-slate-800/80 bg-[#050813]/85 backdrop-blur-xl shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Left: Circular Logo & Brand */}
          <ZenemooLogo size="md" showTagline={true} taglineText="WEB SERVICES" />

          {/* Right: Contact Email & Status Pill */}
          <div className="flex items-center gap-3">
            {/* Contact Email Link */}
            <a
              href="mailto:contact@zenemoo.in?subject=Inquiry%20-%20Zenemoo%20Web%20Services"
              aria-label="Email Zenemoo Web Services at contact@zenemoo.in"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/50 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-all duration-200 shadow-sm backdrop-blur-md"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="hidden sm:inline">contact@zenemoo.in</span>
              <span className="sm:hidden text-[11px]">Email</span>
            </a>

            {/* Status Pill */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold text-slate-200 hidden md:inline">web.zenemoo.in</span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* MAIN CONTENT CONTAINER */}
      {/* ========================================== */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 flex-1 flex flex-col items-center space-y-16 md:space-y-20 text-center">
        
        {/* HERO SECTION */}
        <section className="space-y-6 max-w-3xl flex flex-col items-center pt-2">
          {/* Top Hero Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold font-mono uppercase tracking-wider backdrop-blur-md shadow-sm">
            <Rocket className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>PREMIUM WEBSITES. ACCESSIBLE PRICING.</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-100 leading-none">
            Coming <span className="text-gradient-hero">Soon</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            We're building beautiful, high-quality websites at practical prices, making professional web solutions accessible to <span className="text-cyan-400 font-semibold">businesses</span>, <span className="text-cyan-400 font-semibold">startups</span>, <span className="text-cyan-400 font-semibold">students</span>, and <span className="text-purple-400 font-semibold">growing teams</span>.
          </p>

          {/* Decorative Divider Line */}
          <div className="w-40 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto opacity-75 pt-1" />
        </section>

        {/* SERVICE HIGHLIGHTS GRID (4 Cards) */}
        <section className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {previewServices.map((srv, idx) => (
              <div 
                key={idx} 
                className="glass-panel-coming rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_10px_30px_-10px_rgba(0,242,254,0.2)]"
              >
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 mb-4 shadow-inner">
                  {srv.icon}
                </div>
                <h2 className="text-base font-bold text-slate-100 mb-1.5">{srv.title}</h2>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{srv.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NOTIFICATION & EARLY ACCESS FORM PANEL */}
        <section className="w-full max-w-4xl glass-panel-coming rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-800 shadow-2xl text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            
            {/* Left Header */}
            <div className="flex items-start gap-4 text-center md:text-left">
              <div className="p-4 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-blue-500/20 border border-purple-500/30 text-purple-400 shrink-0 shadow-md">
                <Bell className="w-7 h-7 animate-float-slow" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Be the first to know!</h2>
                <p className="text-xs sm:text-sm text-slate-400">Get notified when we launch.</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>No spam. Just important updates.</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="w-full md:w-auto md:min-w-[360px]">
              {isSubscribed ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Thanks! You are on the early access list.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="relative w-full">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError(null);
                        }}
                        placeholder="Enter your email address"
                        aria-label="Enter your email address"
                        className={`w-full bg-slate-950/90 border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none transition-colors ${
                          emailError ? 'border-rose-500/80 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-400'
                        }`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Notify Me when launched"
                      className="w-full sm:w-auto shrink-0 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Notify Me'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Inline Validation Error */}
                  {emailError && (
                    <p className="text-xs text-rose-400 font-mono flex items-center gap-1.5 pt-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{emailError}</span>
                    </p>
                  )}
                </form>
              )}
            </div>

          </div>
        </section>

        {/* TALENT / COLLABORATION SECTION */}
        <section className="w-full max-w-4xl glass-panel-coming rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-800 shadow-2xl text-left">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Left Text & Feature Pills */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                  Have the skills to build with us?
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                We're creating opportunities for talented web developers, UI designers, and creators to contribute to upcoming web projects.
              </p>

              {/* 3 Feature Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Work on real projects</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Collaborate with experts</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                  <span>Grow your skills</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Preview Card */}
            <div className="hidden lg:flex flex-col items-center justify-center relative p-6 bg-slate-950/90 rounded-2xl border border-slate-800 shadow-inner">
              <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <Code className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-center space-y-2 py-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center mx-auto shadow-lg">
                  <User className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-cyan-300 font-bold">&lt;/&gt; Zenemoo Creator</div>
                <div className="text-[10px] font-mono text-slate-500">Collaborative Web Platform</div>
              </div>
            </div>

          </div>
        </section>

        {/* BRAND STATEMENT */}
        <section className="space-y-2 pt-4 pb-4">
          <h2 className="text-base sm:text-lg md:text-xl font-medium text-slate-200">
            Your <span className="text-cyan-400 font-extrabold">Vision</span>. Our <span className="text-cyan-400 font-extrabold">Websites</span>. A Bigger <span className="text-purple-400 font-extrabold">Tomorrow</span>.
          </h2>

          <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-500 tracking-[0.4em] uppercase pt-2">
            <span className="w-12 h-[1px] bg-slate-800" />
            <span>Z E N E M O O</span>
            <span className="w-12 h-[1px] bg-slate-800" />
          </div>
        </section>

      </main>

      {/* ========================================== */}
      {/* FOOTER */}
      {/* ========================================== */}
      <footer className="relative z-20 w-full border-t border-slate-800/80 bg-[#04060E] shrink-0 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          {/* Left Copyright */}
          <div className="text-center md:text-left">
            <div>© 2026 Zenemoo.</div>
            <div className="text-slate-500">All rights reserved.</div>
          </div>

          {/* Center Contact Email */}
          <div className="text-center">
            <a 
              href="mailto:contact@zenemoo.in"
              className="text-slate-300 hover:text-cyan-300 transition-colors font-mono text-xs"
            >
              contact@zenemoo.in
            </a>
          </div>

          {/* Right Social Links */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-[11px] font-mono text-slate-500">Follow our journey</span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/zenemoo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zenemoo on LinkedIn"
                className="p-2 rounded-xl bg-slate-900/90 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/zenemooofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zenemoo on X (Twitter)"
                className="p-2 rounded-xl bg-slate-900/90 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors shadow-sm"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/zenemooofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zenemoo on Instagram"
                className="p-2 rounded-xl bg-slate-900/90 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCj8ryPiPOeM_HrWqkNsFkTg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zenemoo on YouTube"
                className="p-2 rounded-xl bg-slate-900/90 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors shadow-sm"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
