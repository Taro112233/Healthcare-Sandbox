// components/shared/StatusBadge.tsx
// HealthTech Sandbox - Status Badge Component

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  RequestStatus, 
  REQUEST_STATUS_INFO,
  REQUEST_STATUS_VALUES,  // ✅ เพิ่ม import
} from '@/types/request';
import {
  Clock,
  Eye,
  Code,
  TestTube,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface StatusBadgeProps {
  status: RequestStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const statusIcons: Record<RequestStatus, React.ReactNode> = {
  PENDING_REVIEW: <Clock className="w-3 h-3" />,
  UNDER_CONSIDERATION: <Eye className="w-3 h-3" />,
  IN_DEVELOPMENT: <Code className="w-3 h-3" />,
  IN_TESTING: <TestTube className="w-3 h-3" />,
  COMPLETED: <CheckCircle className="w-3 h-3" />,
  BEYOND_CAPACITY: <XCircle className="w-3 h-3" />,
};

export function StatusBadge({ status, size = 'md', showIcon = true }: StatusBadgeProps) {
  const info = REQUEST_STATUS_INFO[status];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  return (
    <Badge 
      className={`
        ${info.bgColor} ${info.textColor} 
        ${sizeClasses[size]}
        border-0 font-medium
        flex items-center gap-1.5
        hover:${info.bgColor}
      `}
    >
      {showIcon && statusIcons[status]}
      {info.labelTh}
    </Badge>
  );
}