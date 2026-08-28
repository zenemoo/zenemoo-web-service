import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AlertTriangle, Home, Database } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
      <Card className="p-8 sm:p-12 space-y-6 border border-slate-800">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <Badge variant="amber" size="md">
          404 - ROUTE NOT FOUND
        </Badge>

        <h1 className="text-3xl font-extrabold text-slate-100">
          Requested Service Route Unavailable
        </h1>

        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          The requested URL path was not found on <code className="text-cyan-300">web.zenemoo.in</code>. Please return to the overview portal or inspect dataset catalogs.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Return to Overview
            </Button>
          </Link>
          <Link to="/datasets">
            <Button variant="outline" size="md" leftIcon={<Database className="w-4 h-4" />}>
              Browse AI Datasets
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
