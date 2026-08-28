import React, { useState } from 'react';
import { DatasetItem } from '../../types';
import { apiService } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Button } from '../ui/Button';
import { X, Database, CheckCircle2, ShieldCheck, Mail, User, Building, Phone } from 'lucide-react';

interface DatasetRequestModalProps {
  dataset: DatasetItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DatasetRequestModal: React.FC<DatasetRequestModalProps> = ({
  dataset,
  isOpen,
  onClose,
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    useCase: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inquiryCode, setInquiryCode] = useState('');

  if (!isOpen || !dataset) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.useCase) {
      showToast('Missing Fields', 'Please complete your name, email, and dataset use case.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.submitContactInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: `Dataset Access: ${dataset.name}`,
        message: `Requested Dataset Slug: ${dataset.slug}\nLanguage/Scope: ${dataset.language || 'N/A'}\nUse Case: ${formData.useCase}`,
      });

      if (res.success || res.status === '200') {
        const code = res.data?.[0]?.inquiry_code || `ZN-DS-${Math.floor(100000 + Math.random() * 900000)}`;
        setInquiryCode(code);
        setIsSuccess(true);
        showToast('Request Submitted', 'Your dataset access request has been transmitted to Zenemoo Enterprise team.', 'success');
      } else {
        showToast('Request Error', res.message || 'Failed to submit request. Please try again.', 'error');
      }
    } catch {
      showToast('Network Error', 'Could not transmit request. Please verify internet connection.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({ name: '', email: '', company: '', phone: '', useCase: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel rounded-2xl border border-slate-700/80 shadow-2xl p-6 md:p-8 overflow-hidden">
        {/* Header decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Request Enterprise Access</h3>
              <p className="text-xs text-cyan-400 font-mono">{dataset.name}</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-100">Dataset Request Logged!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Your inquiry has been registered under reference code:
            </p>
            <div className="inline-block px-4 py-2 bg-slate-900 border border-cyan-500/40 rounded-lg text-cyan-300 font-mono font-bold text-base">
              {inquiryCode}
            </div>
            <p className="text-xs text-slate-400">
              Our enterprise data solutions architect will send sample files and commercial terms to <strong className="text-slate-200">{formData.email}</strong>.
            </p>
            <div className="pt-4">
              <Button variant="outline" onClick={handleReset}>
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 text-xs text-slate-300 space-y-1">
              <p className="font-semibold text-slate-200">Dataset Specs:</p>
              <div className="grid grid-cols-2 gap-2 text-slate-400 pt-1 font-mono">
                <div>Language: <span className="text-slate-200">{dataset.language || 'N/A'}</span></div>
                <div>Hours: <span className="text-slate-200">{dataset.totalHours ? `${dataset.totalHours} hrs` : 'N/A'}</span></div>
                <div>Format: <span className="text-slate-200">{dataset.format || 'Standard JSON'}</span></div>
                <div>License: <span className="text-slate-200">{dataset.license || 'Commercial AI'}</span></div>
              </div>
            </div>

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
                    placeholder="Jane Doe"
                    className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
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
                    placeholder="jane@organization.ai"
                    className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company / Institution</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="AI Labs Inc."
                    className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
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
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">AI Model / Research Use Case *</label>
              <textarea
                required
                rows={3}
                value={formData.useCase}
                onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                placeholder="Briefly describe your intended model training, speech recognition fine-tuning, or research scope..."
                className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg p-3 text-sm text-slate-100 focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Enterprise GDPR & Data Governance compliant. Sample link will be sent upon verification.</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <Button type="button" variant="ghost" onClick={handleReset}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                Submit Access Request
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
