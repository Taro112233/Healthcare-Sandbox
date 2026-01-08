// hooks/useCurrentUser.ts - Fixed Version
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

// ✅ Shared state across all hook instances
let cachedUser: CurrentUser | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// ✅ Singleton fetch promise (prevent duplicate requests)
let fetchPromise: Promise<CurrentUser | null> | null = null;

function shouldRefetch(): boolean {
  return Date.now() - lastFetchTime > CACHE_DURATION;
}

// ✅ Centralized fetch function (returns Promise)
async function fetchUserData(): Promise<CurrentUser | null> {
  // ✅ Return cached data if fresh
  if (cachedUser && !shouldRefetch()) {
    return cachedUser;
  }

  // ✅ Reuse existing fetch if in progress
  if (fetchPromise) {
    return fetchPromise;
  }

  // ✅ Create new fetch promise
  fetchPromise = (async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
        cache: 'no-store', // ✅ Prevent browser cache
      });

      if (!response.ok) {
        if (response.status === 401) {
          cachedUser = null;
          return null;
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

        cachedUser = userData;
        lastFetchTime = Date.now();
        return userData;
      }

      cachedUser = null;
      return null;
    } catch (err) {
      console.error('Fetch user error:', err);
      cachedUser = null;
      throw err;
    } finally {
      // ✅ Clear promise after completion
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

export function useCurrentUser(): UseCurrentUserReturn {
  const [user, setUser] = useState<CurrentUser | null>(cachedUser);
  const [loading, setLoading] = useState(!cachedUser); // ✅ Start with false if cached
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = await fetchUserData();
      setUser(userData);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาด';
      setError(errorMsg);
      setUser(null);
    } finally {
      setLoading(false); // ✅ Always set loading = false
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

      // ✅ Clear all cache
      cachedUser = null;
      lastFetchTime = 0;
      fetchPromise = null;
      setUser(null);

      window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
      cachedUser = null;
      lastFetchTime = 0;
      fetchPromise = null;
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