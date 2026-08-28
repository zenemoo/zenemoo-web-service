import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { TeamMember } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SkeletonCard } from '../components/ui/LoadingSpinner';
import { Users, Linkedin, Github, ShieldCheck } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getTeam();
        setTeamMembers(data);
      } catch {
        // Fallback handled in apiService
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <Badge variant="cyan" size="md" icon={<Users className="w-3.5 h-3.5" />}>
          ZENEMOO LEADERSHIP & DATA ARCHITECTS
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          The Engineering & Data Operations Team
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Led by experienced data solutions architects, speech annotators, quality managers, and multi-dialect linguists driving high-accuracy AI data pipelines.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} hoverable glowColor="purple" className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-slate-700/80 flex items-center justify-center text-slate-200 font-bold text-lg shadow-md shrink-0">
                  {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">{member.name}</h3>
                  <p className="text-xs text-cyan-400 font-mono font-medium">{member.designation}</p>
                  <Badge variant="slate" size="sm" className="mt-1">
                    {member.department}
                  </Badge>
                </div>
              </div>

              {member.bio && (
                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                  {member.bio}
                </p>
              )}

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Member
                </span>
                <div className="flex items-center gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
