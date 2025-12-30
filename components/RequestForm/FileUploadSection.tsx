// components/RequestForm/FileUploadSection.tsx
'use client';

import React, { useCallback, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  X, 
  FileImage, 
  FileText, 
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { formatFileSize } from '@/lib/file-validation';

interface UploadedFile {
  filename: string;
  originalFilename: string;
  fileType: string;
  fileSize: number;
  fileSizeFormatted: string;
  fileUrl: string;
}

interface FileUploadSectionProps {
  uploadedFiles: UploadedFile[];
  onFilesUploaded: (files: UploadedFile[]) => void;
  onFileRemove: (index: number) => void;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
}

export function FileUploadSection({
  uploadedFiles,
  onFilesUploaded,
  onFileRemove,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  disabled = false,
}: FileUploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAddMore = uploadedFiles.length < maxFiles;

  const validateFiles = (files: File[]): { valid: File[]; errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: ประเภทไฟล์ไม่รองรับ (รองรับเฉพาะรูปภาพและ PDF)`);
        continue;
      }
      if (file.size > maxSize) {
        errors.push(`${file.name}: ไฟล์ใหญ่เกินไป (สูงสุด ${formatFileSize(maxSize)})`);
        continue;
      }
      valid.push(file);
    }

    const remainingSlots = maxFiles - uploadedFiles.length;
    if (valid.length > remainingSlots) {
      errors.push(`สามารถเพิ่มได้อีกเพียง ${remainingSlots} ไฟล์`);
      return { valid: valid.slice(0, remainingSlots), errors };
    }

    return { valid, errors };
  };

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));

      const response = await fetch('/api/requests/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'อัปโหลดไม่สำเร็จ');
      }

      const data = await response.json();

      if (data.success && data.data?.uploaded) {
        onFilesUploaded(data.data.uploaded);
      } else {
        throw new Error(data.error || 'อัปโหลดไม่สำเร็จ');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการอัปโหลด';
      setError(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const { valid, errors } = validateFiles(files);
    
    if (errors.length > 0) {
      setError(errors.join('\n'));
    }

    if (valid.length > 0) {
      await uploadFiles(valid);
    }

    e.target.value = '';
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled || !canAddMore) return;

    const files = Array.from(e.dataTransfer.files);
    const { valid, errors } = validateFiles(files);

    if (errors.length > 0) {
      setError(errors.join('\n'));
    }

    if (valid.length > 0) {
      await uploadFiles(valid);
    }
  }, [disabled, canAddMore, uploadedFiles.length]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && canAddMore) {
      setIsDragging(true);
    }
  }, [disabled, canAddMore]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <FileImage className="w-5 h-5 text-blue-500" />;
    }
    return <FileText className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="space-y-4">
      {canAddMore && (
        <Card
          className={`
            border-2 border-dashed transition-colors cursor-pointer
            ${isDragging ? 'border-teal-500 bg-teal-500/10' : 'border-border hover:border-muted-foreground/50'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="py-8 text-center">
            <input
              type="file"
              id="file-upload"
              multiple
              accept="image/*,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
              disabled={disabled || isUploading}
            />
            
            <label 
              htmlFor="file-upload" 
              className={`cursor-pointer ${disabled ? 'cursor-not-allowed' : ''}`}
            >
              {isUploading ? (
                <Loader2 className="w-10 h-10 mx-auto mb-3 text-teal-600 animate-spin" />
              ) : (
                <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              )}
              
              <p className="text-sm font-medium text-foreground mb-1">
                {isUploading ? 'กำลังอัปโหลด...' : 'ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือก'}
              </p>
              <p className="text-xs text-muted-foreground">
                รูปภาพ (JPEG, PNG, GIF, WebP) หรือ PDF - สูงสุด {maxFiles} ไฟล์, แต่ละไฟล์ไม่เกิน {formatFileSize(maxSize)}
              </p>
            </label>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="whitespace-pre-line">{error}</AlertDescription>
        </Alert>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            ไฟล์ที่อัปโหลด ({uploadedFiles.length}/{maxFiles})
          </p>
          
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="bg-muted/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      {getFileIcon(file.fileType)}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file.originalFilename}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {file.fileSizeFormatted}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onFileRemove(index)}
                      disabled={disabled}
                      className="text-muted-foreground hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}