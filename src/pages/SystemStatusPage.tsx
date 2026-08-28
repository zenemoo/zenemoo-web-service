import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { HealthTelemetry } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Activity, RefreshCw, Cpu, Terminal, Globe, CheckCircle2, AlertTriangle } from 'lucide-react';

export const SystemStatusPage: React.FC = () => {
  const [telemetry, setTelemetry] = useState<HealthTelemetry | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'endpoints' | 'docs'>('status');

  const runHealthCheck = async () => {
    setIsRefreshing(true);
    try {
      const data = await apiService.getHealthStatus();
      setTelemetry(data.telemetry);
      setLatency(data.latencyMs);
    } catch {
      // Handled in apiService
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    runHealthCheck();
  }, []);

  const endpointsList = [
    { method: 'GET', path: '/health', description: 'System health probe & server status', access: 'Public' },
    { method: 'GET', path: '/api/services', description: 'Fetch AI data solutions & transcription catalog', access: 'Public' },
    { method: 'GET', path: '/api/datasets', description: 'Fetch regional Indic language datasets catalog', access: 'Public' },
    { method: 'GET', path: '/api/portfolio', description: 'Fetch client case studies & benchmark metrics', access: 'Public' },
    { method: 'GET', path: '/api/team', description: 'Fetch Zenemoo data engineering team directory', access: 'Public' },
    { method: 'POST', path: '/api/contact', description: 'Submit enterprise custom data inquiry', access: 'Public' },
    { method: 'POST', path: '/api/subscribers', description: 'Subscribe email to dataset release updates', access: 'Public' },
    { method: 'GET', path: '/api/auth/me', description: 'Verify bearer JWT auth session', access: 'Bearer Token' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-3">
          <Badge variant="cyan" size="md" icon={<Activity className="w-3.5 h-3.5" />}>
            LIVE API TELEMETRY & CONSOLE
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            System Telemetry & Endpoint Monitor
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Real-time status monitor probing <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">https://zenemootech-api.onrender.com</code>.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={runHealthCheck}
          isLoading={isRefreshing}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Ping API Server
        </Button>
      </div>

      {/* Main Status Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card */}
        <Card glowColor="cyan" className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Operational Status</span>
            {telemetry?.status === 'ONLINE' ? (
              <Badge variant="emerald" icon={<CheckCircle2 className="w-3 h-3" />}>ONLINE</Badge>
            ) : (
              <Badge variant="amber" icon={<AlertTriangle className="w-3 h-3" />}>DEGRADED</Badge>
            )}
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">
            {telemetry?.service || 'ZENEMOO API Server'}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Last Ping: <span className="text-slate-200">{telemetry?.timestamp ? new Date(telemetry.timestamp).toLocaleTimeString() : 'N/A'}</span>
          </div>
        </Card>

        {/* Latency Card */}
        <Card glowColor="purple" className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Round-Trip Latency</span>
            <Badge variant="purple" icon={<Cpu className="w-3 h-3" />}>HTTP GET</Badge>
          </div>
          <div className="text-3xl font-extrabold text-cyan-300 font-mono">
            {latency ? `${latency} ms` : 'Measuring...'}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Target Node: <span className="text-slate-200">Render Cloud (asia-south1)</span>
          </div>
        </Card>

        {/* Domain Target Card */}
        <Card glowColor="cyan" className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Web Service Domain</span>
            <Badge variant="blue" icon={<Globe className="w-3 h-3" />}>Active DNS</Badge>
          </div>
          <div className="text-xl font-bold text-slate-100 font-mono text-cyan-300 truncate">
            web.zenemoo.in
          </div>
          <div className="text-xs text-slate-400 font-mono">
            SSL: <span className="text-emerald-400 font-semibold">TLS 1.3 Active</span>
          </div>
        </Card>
      </div>

      {/* Tabs Section */}
      <div className="space-y-6">
        <div className="flex border-b border-slate-800 space-x-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'status'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Registered Endpoints ({endpointsList.length})
          </button>
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'endpoints'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            API Integration Guide
          </button>
        </div>

        {activeTab === 'status' ? (
          <div className="glass-panel rounded-xl overflow-hidden border border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">HTTP Method</th>
                    <th className="p-4">Endpoint Path</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Access Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {endpointsList.map((ep, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ep.method === 'GET' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {ep.method}
                        </span>
                      </td>
                      <td className="p-4 text-cyan-300 font-semibold">{ep.path}</td>
                      <td className="p-4 text-slate-300 font-sans">{ep.description}</td>
                      <td className="p-4 text-slate-400">{ep.access}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" /> Centralized API Client Example
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All requests originating from <code className="text-cyan-300">web.zenemoo.in</code> pass through the environment-aware service layer (<code className="text-slate-200">src/services/api.ts</code>).
            </p>
            <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-cyan-200 overflow-x-auto border border-slate-800 leading-relaxed">
{`// Centralized Service Invocation Example
import { apiService } from '@/services/api';

// Fetch Live Datasets
const datasets = await apiService.getDatasets();

// Submit Inquiry to Render Backend
const response = await apiService.submitContactInquiry({
  name: "Jane Enterprise",
  email: "jane@company.ai",
  service: "Audio Transcription",
  message: "Requesting custom clean verbatim speech pipeline."
});`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
