import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { apiService } from '../../services/api';
import { HealthTelemetry } from '../../types';
import { AuthModal } from '../modals/AuthModal';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  Activity, 
  Database, 
  Layers, 
  Briefcase, 
  Users, 
  Send, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [telemetry, setTelemetry] = useState<HealthTelemetry | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await apiService.getHealthStatus();
        setTelemetry(data.telemetry);
      } catch {
        // Safe fallback
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // 30s probe
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { path: '/', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
    { path: '/datasets', label: 'AI Datasets', icon: <Database className="w-4 h-4" /> },
    { path: '/services', label: 'Data Solutions', icon: <Layers className="w-4 h-4" /> },
    { path: '/portfolio', label: 'Portfolio', icon: <Briefcase className="w-4 h-4" /> },
    { path: '/team', label: 'Team', icon: <Users className="w-4 h-4" /> },
    { path: '/system-status', label: 'API Telemetry', icon: <Activity className="w-4 h-4" /> },
    { path: '/contact', label: 'Inquire', icon: <Send className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#060913]/85 backdrop-blur-xl transition-all">
        {/* Top telemetry status bar */}
        <div className="border-b border-slate-800/60 bg-slate-950/80 px-4 py-1.5 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
                Target Domain: <strong className="text-cyan-300">web.zenemoo.in</strong>
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      telemetry?.status === 'ONLINE' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      telemetry?.status === 'ONLINE' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                </span>
                <span className="font-mono text-[11px] text-slate-300">
                  Render API Status: <span className="font-semibold text-emerald-400">{telemetry?.status || 'PROBING...'}</span>
                </span>
                {telemetry?.latencyMs && (
                  <span className="text-[10px] text-slate-500 font-mono hidden md:inline">
                    ({telemetry.latencyMs}ms)
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors font-mono text-[11px]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                {user ? user.name : 'Console Sign In'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/40 p-1.5 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M28 30H72L42 54H72L28 78" stroke="#00F2FE" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-wider text-slate-100 font-sans">
                  ZENEMOO
                </span>
                <Badge variant="purple" size="sm" className="hidden lg:inline-flex">
                  Enterprise
                </Badge>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider font-mono uppercase">
                Web Data Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/contact">
              <Button variant="primary" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-slate-100 rounded-lg hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-[#060913]/95 backdrop-blur-2xl px-4 py-4 space-y-2 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-800">
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Request Enterprise Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};
