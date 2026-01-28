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
  PAGE: 'bg-alert-info-bg text-alert-info-text border-alert-info-border',
  CALCULATOR: 'bg-alert-info-bg text-alert-info-text border-alert-info-border',
  FORM: 'bg-alert-info-bg text-alert-info-text border-alert-info-border',
  WORKFLOW: 'bg-alert-info-bg text-alert-info-text border-alert-info-border',
  DECISION_AID: 'bg-alert-info-bg text-alert-info-text border-alert-info-border',
  OTHER: 'bg-alert-info-bg text-alert-info-text border-alert-info-border',
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