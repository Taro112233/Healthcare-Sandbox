// components/RequestDetail/CommentSection/CommentInput.tsx
// HealthTech Sandbox - Comment Input Component

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

export function CommentInput({ user, onSubmit, isSubmitting }: CommentInputProps) {
  const [content, setContent] = useState('');

  const getUserInitials = () => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || isSubmitting) return;

    const success = await onSubmit(content);
    
    if (success) {
      setContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      {/* User Avatar */}
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarFallback className="bg-teal-100 text-teal-700 text-sm font-medium">
          {getUserInitials()}
        </AvatarFallback>
      </Avatar>

      {/* Input Area */}
      <div className="flex-1 space-y-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="เขียนความคิดเห็น..."
          className="min-h-[80px] resize-none"
          disabled={isSubmitting}
        />
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            กด Ctrl+Enter เพื่อส่ง
          </span>
          
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
                ส่งความคิดเห็น
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}