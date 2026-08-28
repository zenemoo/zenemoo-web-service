import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { ServiceItem } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SkeletonCard } from '../components/ui/LoadingSpinner';
import { ServiceEstimateModal } from '../components/modals/ServiceEstimateModal';
import { 
  Layers, 
  CheckCircle2, 
  Clock, 
  Target, 
  Headphones, 
  Zap, 
  FileText, 
  Video, 
  Bot,
  SlidersHorizontal
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getServices();
        setServices(data);
      } catch {
        // Fallback handled in service
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getServiceIcon = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'speech ai':
        return <Headphones className="w-6 h-6 text-purple-400" />;
      case 'data collection':
        return <FileText className="w-6 h-6 text-cyan-400" />;
      case 'computer vision':
        return <Video className="w-6 h-6 text-blue-400" />;
      case 'nlp & llm':
        return <Bot className="w-6 h-6 text-emerald-400" />;
      default:
        return <Zap className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <Badge variant="purple" size="md" icon={<Layers className="w-3.5 h-3.5" />}>
          HUMAN-IN-THE-LOOP ENTERPRISE SERVICES
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Precision Data Annotation & Speech Engineering
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          From multi-speaker clean verbatim transcription to RLHF prompt evaluations and computer vision labeling — Zenemoo delivers human-verified datasets with strict Quality Control SLAs.
        </p>
      </div>

      {/* Services Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv) => (
            <Card key={srv.id} hoverable glowColor="purple" className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
                    {getServiceIcon(srv.category)}
                  </div>
                  <Badge variant="purple">{srv.category || 'Enterprise Service'}</Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-100">{srv.title}</h3>
                  {srv.subtitle && <p className="text-xs text-cyan-400 font-mono mt-0.5">{srv.subtitle}</p>}
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">{srv.description}</p>
                </div>

                {srv.features && srv.features.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Service Deliverables & Benchmarks:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {srv.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {srv.recommendedFor && (
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Recommended for: <strong className="text-slate-200">{srv.recommendedFor}</strong></span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SLA: {srv.estimatedTurnaround || '24-48 hrs'}</span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<SlidersHorizontal className="w-3.5 h-3.5" />}
                  onClick={() => setSelectedService(srv)}
                >
                  Configure Estimate
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Estimator Modal */}
      <ServiceEstimateModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};
