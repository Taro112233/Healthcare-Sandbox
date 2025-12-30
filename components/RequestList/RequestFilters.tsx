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
    <div className="flex flex-wrap gap-3">
      <Select 
        value={status} 
        onValueChange={(value) => onStatusChange(value as RequestStatus | 'ALL')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="สถานะ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">ทุกสถานะ</SelectItem>
          {Object.entries(REQUEST_STATUS_INFO).map(([key, info]) => (
            <SelectItem key={key} value={key}>
              {info.labelTh}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={type} 
        onValueChange={(value) => onTypeChange(value as RequestType | 'ALL')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="ประเภท" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">ทุกประเภท</SelectItem>
          {Object.entries(REQUEST_TYPE_INFO).map(([key, info]) => (
            <SelectItem key={key} value={key}>
              {info.labelTh}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}