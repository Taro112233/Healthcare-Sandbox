// components/RequestDetail/AttachmentList.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Attachment } from '@/types/request';
import { 
  FileImage, 
  FileText, 
  Download,
  ExternalLink,
  Paperclip,
} from 'lucide-react';

interface AttachmentListProps {
  attachments: Attachment[];
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function AttachmentList({ attachments }: AttachmentListProps) {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <FileImage className="w-5 h-5 text-blue-500" />;
    }
    return <FileText className="w-5 h-5 text-red-500" />;
  };

  const isImage = (fileType: string) => fileType.startsWith('image/');

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
          <Paperclip className="w-4 h-4" />
          ไฟล์แนบ ({attachments.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {attachments.map((attachment) => (
            <div 
              key={attachment.id}
              className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
            >
              {isImage(attachment.fileType) ? (
                <a 
                  href={attachment.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-shrink-0"
                >
                  <img
                    src={attachment.fileUrl}
                    alt={attachment.filename}
                    className="w-16 h-16 object-cover rounded border border-border hover:opacity-80 transition-opacity"
                  />
                </a>
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-card rounded border border-border">
                  {getFileIcon(attachment.fileType)}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {attachment.filename}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(attachment.fileSize)}
                </p>
              </div>

              <div className="flex-shrink-0 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <a 
                    href={attachment.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="เปิดในแท็บใหม่"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <a 
                    href={attachment.fileUrl} 
                    download={attachment.filename}
                    title="ดาวน์โหลด"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}