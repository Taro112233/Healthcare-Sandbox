// components/shared/TypeBadge.tsx
// HealthTech Sandbox - Request Type Badge Component

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  RequestType, 
  REQUEST_TYPE_INFO 
} from '@/types/request';
import {
  Calculator,
  FileText,
  GitBranch,
  Brain,
  HelpCircle,
} from 'lucide-react';

interface TypeBadgeProps {
  type: RequestType;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  variant?: 'default' | 'outline';
}

const typeIcons: Record<RequestType, React.ReactNode> = {
  [RequestType.CALCULATOR]: <Calculator className="w-3 h-3" />,
  [RequestType.FORM]: <FileText className="w-3 h-3" />,
  [RequestType.WORKFLOW]: <GitBranch className="w-3 h-3" />,
  [RequestType.DECISION_AID]: <Brain className="w-3 h-3" />,
  [RequestType.OTHER]: <HelpCircle className="w-3 h-3" />,
};

const typeColors: Record<RequestType, string> = {
  [RequestType.CALCULATOR]: 'bg-violet-100 text-violet-700 border-violet-200',
  [RequestType.FORM]: 'bg-sky-100 text-sky-700 border-sky-200',
  [RequestType.WORKFLOW]: 'bg-amber-100 text-amber-700 border-amber-200',
  [RequestType.DECISION_AID]: 'bg-rose-100 text-rose-700 border-rose-200',
  [RequestType.OTHER]: 'bg-slate-100 text-slate-700 border-slate-200',
};

export function TypeBadge({ type, size = 'md', showIcon = true, variant = 'default' }: TypeBadgeProps) {
  const info = REQUEST_TYPE_INFO[type];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  const colorClass = variant === 'outline' 
    ? 'bg-transparent border ' + typeColors[type].replace('bg-', 'border-').split(' ')[2] + ' ' + typeColors[type].split(' ')[1]
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