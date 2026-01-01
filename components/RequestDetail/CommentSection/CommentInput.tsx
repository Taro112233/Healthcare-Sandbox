// components/RequestDetail/CommentSection/CommentInput.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

interface CommentInputUser {
  firstName: string;
  lastName: string;
}

interface CommentInputProps {
  user: CommentInputUser;
  onSubmit: (content: string) => Promise<boolean>;
  isSubmitting: boolean;
}

export function CommentInput({ onSubmit, isSubmitting }: CommentInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || isSubmitting) return;

    const success = await onSubmit(content);
    
    if (success) {
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="เขียนความคิดเห็น..."
        className="min-h-[80px] resize-none"
        disabled={isSubmitting}
      />
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          size="sm"
          disabled={!content.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              กำลังส่ง...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-1" />
              ส่ง
            </>
          )}
        </Button>
      </div>
    </form>
  );
}