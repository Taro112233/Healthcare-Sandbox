// components/RequestList/RequestFilters.tsx
'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  RequestStatus, 
  RequestType,
  REQUEST_STATUS_INFO,
  REQUEST_TYPE_INFO,
} from '@/types/request';

interface RequestFiltersProps {
  status: RequestStatus | 'ALL';
  type: RequestType | 'ALL';
  onStatusChange: (status: RequestStatus | 'ALL') => void;
  onTypeChange: (type: RequestType | 'ALL') => void;
}

export function RequestFilters({
  status,
  type,
  onStatusChange,
  onTypeChange,
}: RequestFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
      {/* Status Filter */}
      <Select 
        value={status} 
        onValueChange={(value) => onStatusChange(value as RequestStatus | 'ALL')}
      >
        <SelectTrigger className="w-full sm:w-45 bg-surface-primary">
          <SelectValue placeholder="เลือกสถานะ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">
            <span className="font-medium">ทุกสถานะ</span>
          </SelectItem>
          {Object.entries(REQUEST_STATUS_INFO).map(([key, info]) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${info.color} shrink-0`} />
                <span className="truncate">{info.labelTh}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Type Filter */}
      <Select 
        value={type} 
        onValueChange={(value) => onTypeChange(value as RequestType | 'ALL')}
      >
        <SelectTrigger className="w-full sm:w-45 bg-surface-primary">
          <SelectValue placeholder="เลือกประเภท" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">
            <span className="font-medium">ทุกประเภท</span>
          </SelectItem>
          {Object.entries(REQUEST_TYPE_INFO).map(([key, info]) => (
            <SelectItem key={key} value={key}>
              <span className="truncate">{info.labelTh}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}