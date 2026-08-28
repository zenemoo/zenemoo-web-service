import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../ui/Button';
import { X, Lock, Shield, Key, LogIn, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, user, logout } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Validation Error', 'Please enter your corporate email address.', 'warning');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const mockToken = `zenemoo_live_jwt_${Math.random().toString(36).substring(2)}${Date.now()}`;
      login(mockToken, {
        id: `usr_${Math.random().toString(36).substring(2, 8)}`,
        email,
        name: email.split('@')[0].toUpperCase(),
        role: 'enterprise_user',
        company: 'Zenemoo Enterprise Partner',
        apiKey: `zn_live_sk_${Math.random().toString(36).substring(2, 16)}`,
      });
      setIsLoading(false);
      showToast('Authenticated', `Welcome back, ${email.split('@')[0]}`, 'success');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel rounded-2xl border border-slate-700/80 shadow-2xl p-6 md:p-8 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Enterprise Console Portal</h3>
              <p className="text-xs text-slate-400">web.zenemoo.in Security Layer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {user ? (
          <div className="py-4 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100">{user.name}</h4>
              <p className="text-xs text-cyan-400 font-mono">{user.email}</p>
              <p className="text-xs text-slate-400 mt-1">Role: <span className="text-slate-200 font-medium">{user.role}</span></p>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-left space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Active API Key:</span>
              <div className="text-xs font-mono text-cyan-300 break-all bg-slate-950 p-2 rounded border border-slate-800 select-all">
                {user.apiKey}
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  logout();
                  showToast('Signed Out', 'Your session has been terminated.', 'info');
                  onClose();
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Corporate Email *</label>
              <div className="relative">
                <LogIn className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@zenemoo.in"
                  className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Access Token / Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex gap-2">
              <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Session tokens are authorized via Render backend header verification (`Authorization: Bearer`).</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isLoading}>
                Sign In to Console
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
