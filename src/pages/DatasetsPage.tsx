import React, { useState, useEffect, useMemo } from 'react';
import { apiService } from '../services/api';
import { DatasetItem } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SkeletonCard } from '../components/ui/LoadingSpinner';
import { DatasetRequestModal } from '../components/modals/DatasetRequestModal';
import { Database, Search, Download, Clock, Shield, Tag } from 'lucide-react';

export const DatasetsPage: React.FC = () => {
  const [datasets, setDatasets] = useState<DatasetItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDataset, setSelectedDataset] = useState<DatasetItem | null>(null);

  useEffect(() => {
    const fetchDatasets = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getDatasets();
        setDatasets(data);
      } catch {
        // Fallback handled in service
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatasets();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    datasets.forEach((d) => {
      if (d.category) cats.add(d.category);
    });
    return ['all', ...Array.from(cats)];
  }, [datasets]);

  const filteredDatasets = useMemo(() => {
    return datasets.filter((ds) => {
      const matchesSearch =
        ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ds.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ds.language && ds.language.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'all' || ds.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [datasets, searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <Badge variant="cyan" size="md" icon={<Database className="w-3.5 h-3.5" />}>
          ZENEMOO DATASET MARKETPLACE
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          AI Speech & Multilingual Corpora Catalog
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          High-fidelity speech audio, verbatim transcripts, multi-speaker recordings, and regional Indic language corpora curated for AI model training and Speech-to-Text benchmarks.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by language, dialect, ASR, or keyword..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : filteredDatasets.length === 0 ? (
        <div className="glass-panel rounded-xl p-12 text-center space-y-4 border border-slate-800">
          <Database className="w-12 h-12 text-slate-600 mx-auto animate-bounce" />
          <h3 className="text-lg font-bold text-slate-200">No Datasets Match Your Query</h3>
          <p className="text-xs text-slate-400">Try broadening your search term or select another category filter.</p>
          <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
            Reset Search Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((ds) => (
            <Card key={ds.id} hoverable glowColor="cyan" className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="cyan">{ds.category || 'Speech AI'}</Badge>
                  <span className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {ds.totalHours ? `${ds.totalHours} hrs` : 'Corpus'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100">{ds.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{ds.description}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
                  {ds.language && (
                    <div className="flex justify-between">
                      <span>Languages:</span>
                      <span className="text-slate-200 font-medium">{ds.language}</span>
                    </div>
                  )}
                  {ds.speakersCount ? (
                    <div className="flex justify-between">
                      <span>Speakers:</span>
                      <span className="text-slate-200">{ds.speakersCount}+ Unique</span>
                    </div>
                  ) : null}
                  {ds.sampleRate && (
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="text-slate-200">{ds.sampleRate}</span>
                    </div>
                  )}
                </div>

                {ds.tags && ds.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ds.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" /> {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                  <Shield className="w-3 h-3 text-cyan-500" /> Commercial AI
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => setSelectedDataset(ds)}
                >
                  Request Access
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <DatasetRequestModal
        dataset={selectedDataset}
        isOpen={!!selectedDataset}
        onClose={() => setSelectedDataset(null)}
      />
    </div>
  );
};
