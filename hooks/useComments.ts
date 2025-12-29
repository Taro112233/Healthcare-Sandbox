// hooks/useComments.ts
// HealthTech Sandbox - Custom hook for comments data fetching

import { useState, useEffect, useCallback } from 'react';
import { Comment } from '@/types/comment';

interface UseCommentsReturn {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  addComment: (content: string) => Promise<Comment | null>;
  refetch: () => Promise<void>;
  isSubmitting: boolean;
}

export function useComments(requestId: string): UseCommentsReturn {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    if (!requestId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/requests/${requestId}/comments`, {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('กรุณาเข้าสู่ระบบ');
        }
        if (response.status === 403) {
          throw new Error('คุณไม่มีสิทธิ์เข้าถึง');
        }
        throw new Error('ไม่สามารถโหลดความคิดเห็นได้');
      }

      const data = await response.json();

      if (data.success) {
        setComments(data.data);
      } else {
        throw new Error(data.error || 'Failed to load comments');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาด';
      setError(errorMsg);
      console.error('Fetch comments error:', err);
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = async (content: string): Promise<Comment | null> => {
    if (!requestId || !content.trim()) {
      return null;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`/api/requests/${requestId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ content: content.trim() }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('กรุณาเข้าสู่ระบบ');
        }
        if (response.status === 403) {
          throw new Error('คุณไม่มีสิทธิ์แสดงความคิดเห็น');
        }
        throw new Error('ไม่สามารถส่งความคิดเห็นได้');
      }

      const data = await response.json();

      if (data.success) {
        // Prepend new comment to the list
        setComments(prev => [data.data, ...prev]);
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to add comment');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาด';
      setError(errorMsg);
      console.error('Add comment error:', err);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
    refetch: fetchComments,
    isSubmitting,
  };
}