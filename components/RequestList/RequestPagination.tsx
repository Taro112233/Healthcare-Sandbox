// components/RequestList/RequestPagination.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RequestPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function RequestPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: RequestPaginationProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border w-full">
      {/* Items Count */}
      <p className="text-sm text-muted-foreground text-center sm:text-left">
        แสดง {start}-{end} จาก {totalItems} รายการ
      </p>
      
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex-shrink-0"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="hidden xs:inline">ก่อนหน้า</span>
        </Button>
        
        {/* Page Numbers */}
        <div className="flex items-center gap-1 flex-wrap justify-center">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                className={`min-w-[36px] flex-shrink-0 ${
                  currentPage === pageNum ? 'bg-teal-600 hover:bg-teal-700' : ''
                }`}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex-shrink-0"
        >
          <span className="hidden xs:inline">ถัดไป</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}