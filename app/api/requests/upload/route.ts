// app/api/requests/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { 
  validateFilesFromFormData, 
  sanitizeFilename,
  formatFileSize,
  MAX_FILES_PER_REQUEST,
  getUploadConstraints,
} from '@/lib/file-validation';
import { arcjetUpload, handleArcjetDecision, getRateLimitInfo, getClientIP } from '@/lib/arcjet-config';
import { logSecurityEvent } from '@/lib/security-logger';

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

export async function POST(request: NextRequest): Promise<NextResponse<UploadResponse>> {
  try {
    // ===== ARCJET PROTECTION (Stricter for uploads) =====
    const decision = await arcjetUpload.protect(request, { requested: 1 });
    
    // Log security events
    if (decision.isDenied()) {
      logSecurityEvent({
        type: decision.reason.isBot() ? "bot_blocked" : "rate_limit",
        ip: getClientIP(request),
        path: "/api/requests/upload",
        userAgent: request.headers.get("user-agent") || undefined,
        details: {
          reason: decision.reason,
          isBot: decision.reason.isBot?.(),
          isRateLimit: decision.reason.isRateLimit?.(),
        },
      });
    }
    
    // Handle denial
    const arcjetError = handleArcjetDecision(decision);
    if (arcjetError) {
      return NextResponse.json(
        { 
          success: false, 
          error: arcjetError.error, 
          constraints: getUploadConstraints(),
        },
        { 
          status: arcjetError.code === "RATE_LIMIT_EXCEEDED" ? 429 : 403,
          headers: arcjetError.retryAfter 
            ? { "Retry-After": arcjetError.retryAfter.toString() }
            : undefined,
        }
      );
    }
    
    // ===== AUTHENTICATION =====
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    
    if (!session?.user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication required',
          constraints: getUploadConstraints(),
        },
        { status: 401 }
      );
    }
    
    // ===== FORM DATA VALIDATION =====
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
    
    // ===== FILE UPLOAD =====
    const { put } = await import('@vercel/blob');
    
    const uploadResults = await Promise.all(
      files.map(async (file: File): Promise<{ success: true; data: UploadedFile } | { success: false; error: FailedUpload }> => {
        try {
          const timestamp = Date.now();
          const random = Math.random().toString(36).substring(2, 8);
          const sanitized = sanitizeFilename(file.name);
          const path = `uploads/${session.user.id}/${timestamp}-${random}-${sanitized}`;
          
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
    
    // ===== PROCESS RESULTS =====
    const uploaded: UploadedFile[] = [];
    const failed: FailedUpload[] = [];
    
    for (const result of uploadResults) {
      if (result.success) {
        uploaded.push(result.data);
      } else {
        failed.push(result.error);
      }
    }
    
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
    
    console.log(`✅ Uploaded ${uploaded.length}/${files.length} files by user: ${session.user.id}`);
    
    // ===== RESPONSE WITH RATE LIMIT HEADERS =====
    const rateLimitInfo = getRateLimitInfo(decision);
    const response = NextResponse.json({
      success: true,
      data: {
        uploaded,
        failed: failed.length > 0 ? failed : undefined,
        totalUploaded: uploaded.length,
        totalFailed: failed.length,
      },
    });
    
    if (rateLimitInfo) {
      response.headers.set("X-RateLimit-Limit", rateLimitInfo.limit.toString());
      response.headers.set("X-RateLimit-Remaining", rateLimitInfo.remaining.toString());
      if (rateLimitInfo.reset) {
        response.headers.set("X-RateLimit-Reset", rateLimitInfo.reset.toString());
      }
    }
    
    return response;
    
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

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    success: true,
    constraints: getUploadConstraints(),
  });
}