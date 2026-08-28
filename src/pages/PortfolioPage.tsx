import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { PortfolioItem } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SkeletonCard } from '../components/ui/LoadingSpinner';
import { Briefcase, BarChart2, Tag, Building2 } from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getPortfolio();
        setPortfolioItems(data);
      } catch {
        // Fallback handled in apiService
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <Badge variant="blue" size="md" icon={<Briefcase className="w-3.5 h-3.5" />}>
          ENTERPRISE BENCHMARKS & CASE STUDIES
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Client Deployments & Proven Data Scale
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Case studies showing how Zenemoo processes high-volume speech, document OCR, and video tracking datasets for global AI laboratories and enterprise partners.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <Card key={item.id} hoverable glowColor="cyan" className="flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="cyan">{item.category}</Badge>
                  {item.clientSector && (
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-purple-400" /> {item.clientSector}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-100">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                {item.metrics && Object.keys(item.metrics).length > 0 && (
                  <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800 space-y-2">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1">
                      <BarChart2 className="w-3 h-3 text-cyan-400" /> Key Benchmarks:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      {Object.entries(item.metrics).map(([key, val]) => (
                        <div key={key} className="bg-slate-900/90 p-2 rounded border border-slate-800/80">
                          <div className="text-[10px] text-slate-500">{key}</div>
                          <div className="text-cyan-300 font-bold text-xs truncate mt-0.5">{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-1.5">
                {item.tags?.map((tag, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5 text-slate-500" /> {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
