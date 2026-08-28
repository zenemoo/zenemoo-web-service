import React, { useState } from 'react';
import { apiService } from '../services/api';
import { useToast } from '../context/ToastContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Send, CheckCircle2, Mail, User, Phone, Building, MessageSquare, ShieldCheck, MapPin, Globe, Headphones } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Audio Transcription',
    language: 'Hindi / Regional',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inquiryCode, setInquiryCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Validation Error', 'Please complete your name, email, and message details.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.submitContactInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        language: formData.language,
        message: formData.message,
      });

      if (res.success || res.status === '200') {
        const code = res.data?.[0]?.inquiry_code || `ZN-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
        setInquiryCode(code);
        setIsSuccess(true);
        showToast('Inquiry Transmitted', 'Your enterprise inquiry has been registered on Zenemoo Render backend.', 'success');
      } else {
        showToast('Submission Issue', res.message || 'Unable to log inquiry.', 'error');
      }
    } catch {
      showToast('Network Error', 'Could not transmit form data to Render API.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-3">
        <Badge variant="cyan" size="md" icon={<Send className="w-3.5 h-3.5" />}>
          ZENEMOO ENTERPRISE INQUIRY PORTAL
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Get in Touch with Data Solutions Architects
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Request custom dataset collection, clean verbatim transcription proposals, computer vision labeling SLAs, or enterprise commercial licensing terms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information Sidebar */}
        <div className="space-y-6">
          <Card glowColor="cyan" className="space-y-4">
            <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
              <Headphones className="w-5 h-5 text-cyan-400" /> Enterprise Desk
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Email Inquiries</div>
                  <a href="mailto:contact@zenemoo.in" className="text-cyan-400 hover:underline">contact@zenemoo.in</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Web Portal</div>
                  <span className="text-slate-400 font-mono">web.zenemoo.in</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Headquarters</div>
                  <span className="text-slate-400">Zenemoo Data Solutions, India</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1">
              <div className="flex items-center gap-1 text-slate-200 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> SLA Guaranteed
              </div>
              <p>Inquiries logged via this form are dispatched to our operations team within 4 business hours.</p>
            </div>
          </Card>
        </div>

        {/* Form Container */}
        <div className="lg:col-span-2">
          <Card className="p-6 sm:p-8">
            {isSuccess ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100">Inquiry Logged Successfully</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Your reference tracking code is:
                </p>
                <div className="inline-block px-5 py-2.5 bg-slate-900 border border-cyan-500/40 rounded-xl text-cyan-300 font-mono font-bold text-lg shadow-lg">
                  {inquiryCode}
                </div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Confirmation has been dispatched to <strong className="text-slate-200">{formData.email}</strong>. Our senior data architect will reach out shortly.
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: '', email: '', phone: '', company: '', service: 'Audio Transcription', language: 'Hindi / Regional', message: '' });
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-3">
                  Enterprise Service Inquiry
                </h3>

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
                        placeholder="Alviya Firoz"
                        className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Corporate Email *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alviya@domain.com"
                        className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Zenemoo AI Partner"
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
                        placeholder="+91 86010 02955"
                        className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Requested Service Category</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg p-2 text-sm text-slate-100 focus:outline-none"
                    >
                      <option value="Audio Transcription">Audio Transcription & Clean Verbatim</option>
                      <option value="Multilingual Dataset Collection">Multilingual Data Collection</option>
                      <option value="Computer Vision Annotation">Computer Vision & Frame Labeling</option>
                      <option value="RLHF & LLM Evaluation">RLHF & LLM Quality Evaluation</option>
                      <option value="Custom Dataset Licensing">Custom Dataset Access / Licensing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Target Language / Scope</label>
                    <input
                      type="text"
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      placeholder="e.g. Hindi, Maithili, Bengali, Tamil"
                      className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg p-2 text-sm text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Inquiry Details & Specifications *</label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify your project volume (e.g., 500 audio hours), delivery deadline, and formatting standards..."
                      className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} rightIcon={<Send className="w-4 h-4" />}>
                    Submit Enterprise Inquiry
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
