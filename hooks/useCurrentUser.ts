// hooks/useCurrentUser.ts - เวอร์ชันปรับปรุง (มี caching)
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface CurrentUser {
  id: string;
  username: string;
  email: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string | null;
  role: 'USER' | 'ADMIN';
  status: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseCurrentUserReturn {
  user: CurrentUser | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  refetch: () => Promise<void>;
  logout: () => Promise<void>;
}

// ✅ In-memory cache (shared across all instances)
let cachedUser: CurrentUser | null = null;
let isFetching = false;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function shouldRefetch(): boolean {
  return Date.now() - lastFetchTime > CACHE_DURATION;
}

export function useCurrentUser(): UseCurrentUserReturn {
  const [user, setUser] = useState<CurrentUser | null>(cachedUser);
  const [loading, setLoading] = useState(!cachedUser);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    // ✅ ถ้ามี cache และยังไม่หมดอายุ
    if (cachedUser && !shouldRefetch()) {
      setUser(cachedUser);
      setLoading(false);
      return;
    }

    // ✅ ป้องกัน fetch ซ้ำซ้อน
    if (isFetching) return;

    try {
      isFetching = true;
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          cachedUser = null;
          setUser(null);
          return;
        }
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();

      if (data.success && data.data?.user) {
        const u = data.data.user;
        const userData: CurrentUser = {
          id: u.id,
          username: u.username,
          email: u.email,
          firstName: u.firstName,
          lastName: u.lastName,
          fullName: u.fullName || `${u.firstName} ${u.lastName}`,
          phone: u.phone,
          role: u.role || 'USER',
          status: u.status,
          isActive: u.isActive,
          emailVerified: u.emailVerified,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
        };
        
        // ✅ Cache user data
        cachedUser = userData;
        lastFetchTime = Date.now();
        setUser(userData);
      } else {
        cachedUser = null;
        setUser(null);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาด';
      setError(errorMsg);
      console.error('Fetch user error:', err);
      cachedUser = null;
      setUser(null);
    } finally {
      setLoading(false);
      isFetching = false;
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      // ✅ Clear cache
      cachedUser = null;
      lastFetchTime = 0;
      setUser(null);
      
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
      cachedUser = null;
      lastFetchTime = 0;
      setUser(null);
      window.location.href = '/login';
    }
  }, []);

  return {
    user,
    loading,
    error,
    isAdmin: user?.role === 'ADMIN',
    isAuthenticated: !!user,
    refetch: fetchUser,
    logout,
  };
}