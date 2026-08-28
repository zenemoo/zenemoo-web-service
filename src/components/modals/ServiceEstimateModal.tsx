import React, { useState } from 'react';
import { ServiceItem } from '../../types';
import { apiService } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Button } from '../ui/Button';
import { X, Calculator, CheckCircle2, Sparkles, Sliders, Mail, User, Phone, Building } from 'lucide-react';

interface ServiceEstimateModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceEstimateModal: React.FC<ServiceEstimateModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  const { showToast } = useToast();
  const [hours, setHours] = useState(100);
  const [language, setLanguage] = useState('Hindi');
  const [verbatimType, setVerbatimType] = useState('Clean Verbatim');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [estimateResult, setEstimateResult] = useState<{ estDays: number; estCode: string } | null>(null);

  if (!isOpen || !service) return null;

  // Simple dynamic estimator formula
  const calculatedDays = Math.max(2, Math.ceil(hours / 40));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast('Missing Info', 'Please enter your name and work email.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.submitContactInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: `Service Quote: ${service.title}`,
        language,
        message: `Configured Parameters:\n- Volume: ${hours} Units/Hours\n- Language/Dialect: ${language}\n- Standard: ${verbatimType}\n- Estimated Turnaround: ${calculatedDays} Business Days\n- Client Notes: ${formData.notes || 'None'}`,
      });

      if (res.success || res.status === '200') {
        const code = res.data?.[0]?.inquiry_code || `ZN-EST-${Math.floor(100000 + Math.random() * 900000)}`;
        setEstimateResult({ estDays: calculatedDays, estCode: code });
        setIsSuccess(true);
        showToast('Quote Requested', 'Custom solution estimate sent to Zenemoo engineering team.', 'success');
      } else {
        showToast('Error', res.message || 'Could not register estimate request.', 'error');
      }
    } catch {
      showToast('Connection Error', 'Network timeout while contacting backend.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel rounded-2xl border border-slate-700/80 shadow-2xl p-6 md:p-8 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Custom Solution Estimator</h3>
              <p className="text-xs text-purple-400 font-mono">{service.title}</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess && estimateResult ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-100">Estimate & Proposal Dispatched</h4>
            <p className="text-sm text-slate-300">
              Estimated Delivery: <strong className="text-cyan-300 font-mono">{estimateResult.estDays} Business Days</strong>
            </p>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-400 max-w-sm mx-auto">
              Reference Code: <span className="text-purple-300 font-bold">{estimateResult.estCode}</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our operations lead will review your audio/data specs and deliver a formal SOW to <span className="text-slate-200">{formData.email}</span>.
            </p>
            <div className="pt-4">
              <Button variant="outline" onClick={handleReset}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Interactive Calculator Controls */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5"><Sliders className="w-4 h-4 text-purple-400" /> Volume Requirement:</span>
                <span className="text-cyan-400 font-mono font-bold text-sm">{hours} Hours / Units</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Target Language / Dialect</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-purple-400"
                  >
                    <option value="Hindi">Hindi (Standard & Regional)</option>
                    <option value="Bengali">Bengali (West Bengal / Maithili)</option>
                    <option value="Tamil">Tamil / Telugu / Kannada</option>
                    <option value="Marathi">Marathi / Gujarati</option>
                    <option value="English">Indian English / Accented</option>
                    <option value="Multilingual">Multi-Language Mix</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Transcription Standard</label>
                  <select
                    value={verbatimType}
                    onChange={(e) => setVerbatimType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-purple-400"
                  >
                    <option value="Clean Verbatim">Clean Verbatim (Omits Stutters)</option>
                    <option value="Strict Verbatim">Strict Verbatim (Includes Disfluencies)</option>
                    <option value="Timestamped Only">Millisecond Timestamping Only</option>
                    <option value="RLHF Evaluation">RLHF Expert Quality Scoring</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Estimated SLA:
                </span>
                <span className="text-slate-200 font-semibold font-mono">~{calculatedDays} Business Days</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-purple-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Work Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@enterprise.com"
                    className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-purple-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Zenemoo Partner"
                    className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-purple-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 90000 00000"
                    className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-purple-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <Button type="button" variant="ghost" onClick={handleReset}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                Request Proposal & Quote
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
