import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Button } from '../ui/Button';
import { Mail, Send, ShieldCheck, ExternalLink, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Enter Email', 'Please enter your email to subscribe.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.subscribeNewsletter(email);
      if (res.success || res.status === '200') {
        showToast('Subscribed!', 'You will receive dataset release notes and AI telemetry updates.', 'success');
        setEmail('');
      } else {
        showToast('Subscription Info', res.message || 'Subscription logged successfully.', 'info');
      }
    } catch {
      showToast('Error', 'Unable to complete subscription.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#04060E] text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Column 1: Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-cyan-500/40 p-1 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M28 30H72L42 54H72L28 78" stroke="#00F2FE" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-extrabold text-lg tracking-wider text-slate-100 font-sans">
              ZENEMOO
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enterprise AI Data Solutions, Clean Verbatim Speech Corpora, Multilingual Dataset Engineering & Model Evaluation Telemetry.
          </p>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
            <Globe className="w-3.5 h-3.5" />
            <span>web.zenemoo.in</span>
          </div>
        </div>

        {/* Column 2: Web Application Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Data Solutions</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/services" className="hover:text-cyan-300 transition-colors">Audio Transcription</Link></li>
            <li><Link to="/datasets" className="hover:text-cyan-300 transition-colors">Indic Language Corpora</Link></li>
            <li><Link to="/services" className="hover:text-cyan-300 transition-colors">Computer Vision Annotations</Link></li>
            <li><Link to="/services" className="hover:text-cyan-300 transition-colors">RLHF & LLM Red-Teaming</Link></li>
            <li><Link to="/portfolio" className="hover:text-cyan-300 transition-colors">Client Case Studies</Link></li>
          </ul>
        </div>

        {/* Column 3: Platform Telemetry */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Platform Infrastructure</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/system-status" className="hover:text-cyan-300 transition-colors">API Telemetry & Latency</Link></li>
            <li><Link to="/team" className="hover:text-cyan-300 transition-colors">Leadership & Engineering</Link></li>
            <li><a href="https://www.zenemoo.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors inline-flex items-center gap-1">Zenemoo Main Site <ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
            <li><Link to="/contact" className="hover:text-cyan-300 transition-colors">Enterprise Inquiry Form</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Dataset Release Updates</h4>
          <p className="text-xs text-slate-400">
            Subscribe to receive notification when new regional speech corpora or computer vision datasets are released.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ai.engineer@corp.com"
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>
            <Button type="submit" variant="outline" size="sm" className="w-full" isLoading={isSubmitting} rightIcon={<Send className="w-3 h-3" />}>
              Subscribe Updates
            </Button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} ZENEMOO Data Solutions. All Rights Reserved.</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Render API & Supabase DB Secured</span>
          <span>•</span>
          <span>Vercel Edge Ready</span>
        </div>
      </div>
    </footer>
  );
};
