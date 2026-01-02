// hooks/useComments.ts
import { useState, useEffect, useCallback } from 'react';
import { Comment, CommentType } from '@/types/comment';
import { RequestStatus } from '@/types/request';

interface UseCommentsReturn {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  addComment: (content: string, fromStatus: RequestStatus, toStatus?: RequestStatus) => Promise<Comment | null>;
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

  const addComment = async (
    content: string,
    fromStatus: RequestStatus,
    toStatus?: RequestStatus
  ): Promise<Comment | null> => {
    if (!requestId || !content.trim()) {
      return null;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // ✅ แก้ไข: ใช้ CommentType enum
      const type: CommentType = toStatus ? CommentType.STATUS_CHANGE : CommentType.COMMENT;

      const response = await fetch(`/api/requests/${requestId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          content: content.trim(),
          type,
          fromStatus: toStatus ? fromStatus : undefined,
          toStatus: toStatus,
        }),
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