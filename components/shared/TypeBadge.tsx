// components/shared/TypeBadge.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  RequestType, 
  REQUEST_TYPE_INFO,
} from '@/types/request';
import {
  Calculator,
  FileText,
  GitBranch,
  Brain,
  HelpCircle,
  Globe,
} from 'lucide-react';

interface TypeBadgeProps {
  type: RequestType;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  variant?: 'default' | 'outline';
}

const typeIcons: Record<RequestType, React.ReactNode> = {
  PAGE: <Globe className="w-3 h-3" />,
  CALCULATOR: <Calculator className="w-3 h-3" />,
  FORM: <FileText className="w-3 h-3" />,
  WORKFLOW: <GitBranch className="w-3 h-3" />,
  DECISION_AID: <Brain className="w-3 h-3" />,
  OTHER: <HelpCircle className="w-3 h-3" />,
};

const typeColors: Record<RequestType, string> = {
  PAGE: 'bg-teal-100 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
  CALCULATOR: 'bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
  FORM: 'bg-sky-100 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
  WORKFLOW: 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  DECISION_AID: 'bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  OTHER: 'bg-slate-100 dark:bg-slate-950/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800',
};

export function TypeBadge({ type, size = 'md', showIcon = true, variant = 'default' }: TypeBadgeProps) {
  const info = REQUEST_TYPE_INFO[type];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  const colorClass = variant === 'outline' 
    ? 'bg-transparent border ' + typeColors[type]
    : typeColors[type];

  return (
    <Badge 
      variant="outline"
      className={`
        ${colorClass}
        ${sizeClasses[size]}
        font-medium
        flex items-center gap-1.5
      `}
    >
      {showIcon && typeIcons[type]}
      {info.labelTh}
    </Badge>
  );
}