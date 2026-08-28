import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { DatasetItem, ServiceItem, HealthTelemetry } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SkeletonCard } from '../components/ui/LoadingSpinner';
import { DatasetRequestModal } from '../components/modals/DatasetRequestModal';
import { ServiceEstimateModal } from '../components/modals/ServiceEstimateModal';
import { 
  Database, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  Cpu, 
  BarChart3, 
  Globe, 
  Lock,
  Headphones
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [datasets, setDatasets] = useState<DatasetItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [telemetry, setTelemetry] = useState<{ telemetry: HealthTelemetry; latencyMs: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDataset, setSelectedDataset] = useState<DatasetItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const [dsData, srvData, healthData] = await Promise.all([
          apiService.getDatasets(),
          apiService.getServices(),
          apiService.getHealthStatus(),
        ]);
        setDatasets(dsData);
        setServices(srvData);
        setTelemetry(healthData);
      } catch {
        // Fallbacks are handled inside apiService
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <Badge variant="cyan" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            ZENEMOO ENTERPRISE WEB SERVICE PLATFORM
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-[1.15]">
            Powering Next-Gen AI Models with <span className="text-gradient">Clean Verbatim Data</span> & Corpora
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            High-precision speech transcription, regional Indic language datasets, computer vision annotations, and live backend telemetry powering enterprise AI applications.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/datasets">
              <Button variant="primary" size="lg" leftIcon={<Database className="w-5 h-5" />}>
                Explore AI Datasets
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" leftIcon={<Layers className="w-5 h-5" />}>
                Browse Data Solutions
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-10">
            <div className="glass-panel p-4 rounded-xl border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">99.6%</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Verbatim Accuracy</div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">22+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Indic & Regional Dialects</div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">5,000+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Hours Speech Corpora</div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                {telemetry?.latencyMs ? `${telemetry.latencyMs}ms` : '<120ms'}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">Render API Telemetry</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Datasets Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <Badge variant="purple" size="sm" icon={<Database className="w-3.5 h-3.5" />}>
              AI DATASET MARKETPLACE
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-2">
              Featured Regional AI Datasets
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Commercial AI licenses for Speech Recognition (ASR), NLP, and Vision model training.
            </p>
          </div>
          <Link to="/datasets" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            View All Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {datasets.slice(0, 3).map((ds) => (
              <Card key={ds.id} hoverable glowColor="cyan" className="flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="cyan">{ds.category || 'Speech AI'}</Badge>
                    {ds.totalHours ? (
                      <span className="text-xs font-mono text-cyan-300 font-semibold">{ds.totalHours} Hours</span>
                    ) : null}
                  </div>
                  <h3 className="text-base font-bold text-slate-100 line-clamp-2">{ds.name}</h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{ds.description}</p>
                  
                  {ds.language && (
                    <div className="text-xs text-slate-400 font-mono pt-2 border-t border-slate-800">
                      Language: <span className="text-slate-200">{ds.language}</span>
                    </div>
                  )}
                </div>

                <div className="pt-5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">License: Commercial</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDataset(ds)}
                  >
                    Request Access
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Enterprise Data Solutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <Badge variant="cyan" size="sm" icon={<Layers className="w-3.5 h-3.5" />}>
              HUMAN-IN-THE-LOOP PIPELINES
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-2">
              Enterprise Data & Speech Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Custom transcription pipelines, multi-speaker segmentation, and computer vision labeling.
            </p>
          </div>
          <Link to="/services" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            Explore All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((srv) => (
              <Card key={srv.id} hoverable glowColor="purple" className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <Badge variant="purple">{srv.category || 'Data Service'}</Badge>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-100">{srv.title}</h3>
                  {srv.subtitle && <p className="text-xs text-cyan-400 font-mono mt-0.5">{srv.subtitle}</p>}
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{srv.description}</p>
                </div>

                {srv.features && srv.features.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    {srv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
                  <span className="text-xs text-slate-400 font-mono">Turnaround: {srv.estimatedTurnaround || '24-48 hrs'}</span>
                  <Button variant="primary" size="sm" onClick={() => setSelectedService(srv)}>
                    Configure Estimate
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Security & Infrastructure Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-8 border border-slate-800 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="space-y-3 lg:col-span-2">
              <Badge variant="emerald" icon={<Shield className="w-3.5 h-3.5" />}>
                ENTERPRISE SECURITY & INFRASTRUCTURE
              </Badge>
              <h3 className="text-2xl font-bold text-slate-100">
                Connected to Zenemoo Multi-Cloud Telemetry
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Operating on high-availability Render API clusters with encrypted Supabase DB storage. All dataset access requests follow strict GDPR, DPDP Act 2023, and commercial IP privacy controls.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
                <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-cyan-400" /> Bearer Token Auth</span>
                <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-purple-400" /> Render API Node</span>
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-emerald-400" /> web.zenemoo.in Domain</span>
              </div>
            </div>
            <div className="text-center lg:text-right space-y-3">
              <Link to="/system-status">
                <Button variant="outline" size="lg" leftIcon={<BarChart3 className="w-5 h-5" />}>
                  Inspect Live Telemetry
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <DatasetRequestModal
        dataset={selectedDataset}
        isOpen={!!selectedDataset}
        onClose={() => setSelectedDataset(null)}
      />
      <ServiceEstimateModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};
