// hooks/useRequests.ts
// HealthTech Sandbox - Custom hook for requests data fetching

import { useState, useEffect, useCallback } from 'react';
import { 
  Request, 
  RequestStatus, 
  RequestType,
  RequestListResponse 
} from '@/types/request';

interface UseRequestsOptions {
  status?: RequestStatus | 'ALL';
  type?: RequestType | 'ALL';
  page?: number;
  pageSize?: number;
}

interface UseRequestsReturn {
  requests: Request[];
  loading: boolean;
  error: string | null;
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  refetch: () => Promise<void>;
  setPage: (page: number) => void;
  setFilters: (filters: { status?: RequestStatus | 'ALL'; type?: RequestType | 'ALL' }) => void;
}

export function useRequests(options: UseRequestsOptions = {}): UseRequestsReturn {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: options.page || 1,
    pageSize: options.pageSize || 10,
    totalPages: 0,
  });
  const [filters, setFiltersState] = useState({
    status: options.status || 'ALL' as RequestStatus | 'ALL',
    type: options.type || 'ALL' as RequestType | 'ALL',
  });

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.set('page', meta.page.toString());
      params.set('pageSize', meta.pageSize.toString());
      
      if (filters.status !== 'ALL') {
        params.set('status', filters.status);
      }
      if (filters.type !== 'ALL') {
        params.set('type', filters.type);
      }

      const response = await fetch(`/api/requests?${params.toString()}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('กรุณาเข้าสู่ระบบ');
        }
        throw new Error('ไม่สามารถโหลดข้อมูลได้');
      }

      const data: RequestListResponse = await response.json();

      if (data.success) {
        setRequests(data.data);
        setMeta(data.meta);
      } else {
        throw new Error('Failed to load requests');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาด';
      setError(errorMsg);
      console.error('Fetch requests error:', err);
    } finally {
      setLoading(false);
    }
  }, [meta.page, meta.pageSize, filters.status, filters.type]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const setPage = (page: number) => {
    setMeta(prev => ({ ...prev, page }));
  };

  const setFilters = (newFilters: { status?: RequestStatus | 'ALL'; type?: RequestType | 'ALL' }) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
    setMeta(prev => ({ ...prev, page: 1 })); // Reset to page 1 when filters change
  };

  return {
    requests,
    loading,
    error,
    meta,
    refetch: fetchRequests,
    setPage,
    setFilters,
  };
}

// ===== Single Request Hook =====

interface UseRequestReturn {
  request: Request | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useRequest(requestId: string): UseRequestReturn {
  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequest = useCallback(async () => {
    if (!requestId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/requests/${requestId}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('กรุณาเข้าสู่ระบบ');
        }
        if (response.status === 403) {
          throw new Error('คุณไม่มีสิทธิ์เข้าถึงคำขอนี้');
        }
        if (response.status === 404) {
          throw new Error('ไม่พบคำขอนี้');
        }
        throw new Error('ไม่สามารถโหลดข้อมูลได้');
      }

      const data = await response.json();

      if (data.success) {
        setRequest(data.data);
      } else {
        throw new Error(data.error || 'Failed to load request');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาด';
      setError(errorMsg);
      console.error('Fetch request error:', err);
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  return {
    request,
    loading,
    error,
    refetch: fetchRequest,
  };
}

// ===== Admin Stats Hook =====

interface AdminStats {
  requests: {
    total: number;
    byStatus: {
      pendingReview: number;
      underConsideration: number;
      inDevelopment: number;
      inTesting: number;
      completed: number;
      beyondCapacity: number;
    };
    byType: {
      calculator: number;
      form: number;
      workflow: number;
      decisionAid: number;
      other: number;
    };
  };
  activity: {
    requestsLast7Days: number;
    requestsLast30Days: number;
    commentsLast7Days: number;
    statusChangesLast7Days: number;
  };
  users: {
    total: number;
    active: number;
  };
}

interface UseAdminStatsReturn {
  stats: AdminStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAdminStats(): UseAdminStatsReturn {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/stats', {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('กรุณาเข้าสู่ระบบ');
        }
        if (response.status === 403) {
          throw new Error('ต้องเป็น Admin เท่านั้น');
        }
        throw new Error('ไม่สามารถโหลดข้อมูลได้');
      }

      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        throw new Error(data.error || 'Failed to load stats');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาด';
      setError(errorMsg);
      console.error('Fetch admin stats error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}