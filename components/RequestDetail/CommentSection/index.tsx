// components/RequestDetail/CommentSection/index.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import { useComments } from '@/hooks/useComments';
import { MessageSquare } from 'lucide-react';

interface CommentSectionUser {
  id: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN';
}

interface CommentSectionProps {
  requestId: string;
  user: CommentSectionUser;
  canComment: boolean;
}

export function CommentSection({ requestId, user, canComment }: CommentSectionProps) {
  const { 
    comments, 
    loading, 
    error, 
    addComment, 
    isSubmitting 
  } = useComments(requestId);

  const handleAddComment = async (content: string): Promise<boolean> => {
    try {
      await addComment(content);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          ความคิดเห็น {comments.length > 0 && `(${comments.length})`}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {canComment && (
          <div className="pb-4 border-b border-border">
            <CommentInput
              user={user}
              onSubmit={handleAddComment}
              isSubmitting={isSubmitting}
            />
          </div>
        )}

        {error && (
          <div className="text-center py-4 text-red-500 text-sm">
            {error}
          </div>
        )}

        <CommentList 
          comments={comments} 
          isLoading={loading} 
        />
      </CardContent>
    </Card>
  );
}