// app/api/requests/upload/route.ts
// HealthTech Sandbox - File Upload API
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getUserFromHeaders } from '@/lib/auth-server';
import { 
  validateFilesFromFormData, 
  sanitizeFilename,
  formatFileSize,
  MAX_FILES_PER_REQUEST,
  getUploadConstraints,
} from '@/lib/file-validation';

// ===== INTERFACES =====
interface UploadedFile {
  filename: string;
  originalFilename: string;
  fileType: string;
  fileSize: number;
  fileSizeFormatted: string;
  fileUrl: string;
}

interface FailedUpload {
  filename: string;
  error: string;
}

interface UploadResponse {
  success: boolean;
  data?: {
    uploaded: UploadedFile[];
    failed?: FailedUpload[];
    totalUploaded: number;
    totalFailed: number;
  };
  error?: string;
  details?: string[];
  constraints?: ReturnType<typeof getUploadConstraints>;
}

// ===== POST - Upload Files =====
export async function POST(request: NextRequest): Promise<NextResponse<UploadResponse>> {
  try {
    // ===== AUTHENTICATION =====
    const userInfo = getUserFromHeaders(new Headers(request.headers));
    
    if (!userInfo) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication required',
          constraints: getUploadConstraints(),
        },
        { status: 401 }
      );
    }
    
    // ===== PARSE FORM DATA =====
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid form data',
          constraints: getUploadConstraints(),
        },
        { status: 400 }
      );
    }
    
    // ===== VALIDATE FILES =====
    const validation = validateFilesFromFormData(formData, 'files');
    
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'File validation failed',
          details: validation.errors,
          constraints: getUploadConstraints(),
        },
        { status: 400 }
      );
    }
    
    const { files } = validation;
    
    // Check if any files provided
    if (files.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No files provided',
          constraints: getUploadConstraints(),
        },
        { status: 400 }
      );
    }
    
    // Double-check file count
    if (files.length > MAX_FILES_PER_REQUEST) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Maximum ${MAX_FILES_PER_REQUEST} files allowed`,
          constraints: getUploadConstraints(),
        },
        { status: 400 }
      );
    }
    
    // ===== UPLOAD TO VERCEL BLOB =====
    const { put } = await import('@vercel/blob');
    
    const uploadResults = await Promise.all(
      files.map(async (file: File): Promise<{ success: true; data: UploadedFile } | { success: false; error: FailedUpload }> => {
        try {
          // Generate unique path
          const timestamp = Date.now();
          const random = Math.random().toString(36).substring(2, 8);
          const sanitized = sanitizeFilename(file.name);
          const path = `uploads/${userInfo.userId}/${timestamp}-${random}-${sanitized}`;
          
          // Upload to Vercel Blob
          const blob = await put(path, file, {
            access: 'public',
            addRandomSuffix: false,
          });
          
          return {
            success: true,
            data: {
              filename: sanitized,
              originalFilename: file.name,
              fileType: file.type,
              fileSize: file.size,
              fileSizeFormatted: formatFileSize(file.size),
              fileUrl: blob.url,
            },
          };
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error);
          return {
            success: false,
            error: {
              filename: file.name,
              error: error instanceof Error ? error.message : 'Upload failed',
            },
          };
        }
      })
    );
    
    // Separate successful and failed uploads
    const uploaded: UploadedFile[] = [];
    const failed: FailedUpload[] = [];
    
    for (const result of uploadResults) {
      if (result.success) {
        uploaded.push(result.data);
      } else {
        failed.push(result.error);
      }
    }
    
    // All uploads failed
    if (uploaded.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All uploads failed',
          details: failed.map(f => `${f.filename}: ${f.error}`),
          constraints: getUploadConstraints(),
        },
        { status: 500 }
      );
    }
    
    console.log(`✅ Uploaded ${uploaded.length}/${files.length} files by user: ${userInfo.userId}`);
    
    // ===== SUCCESS RESPONSE =====
    return NextResponse.json({
      success: true,
      data: {
        uploaded,
        failed: failed.length > 0 ? failed : undefined,
        totalUploaded: uploaded.length,
        totalFailed: failed.length,
      },
    });
    
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        constraints: getUploadConstraints(),
      },
      { status: 500 }
    );
  }
}

// ===== GET - Get Upload Constraints =====
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    success: true,
    constraints: getUploadConstraints(),
  });
}