// app/api/requests/route.ts
// HealthTech Sandbox - Requests API (List & Create)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromHeaders } from '@/lib/auth-server';
import { z } from 'zod';

// ===== VALIDATION SCHEMA =====

const CreateRequestSchema = z.object({
  painPoint: z.string().min(10, 'กรุณาอธิบาย Pain Point อย่างน้อย 10 ตัวอักษร').max(5000),
  currentWorkflow: z.string().min(10, 'กรุณาอธิบายขั้นตอนการทำงานอย่างน้อย 10 ตัวอักษร').max(5000),
  expectedTechHelp: z.string().min(10, 'กรุณาอธิบายสิ่งที่ต้องการอย่างน้อย 10 ตัวอักษร').max(5000),
  requestType: z.enum(['CALCULATOR', 'FORM', 'WORKFLOW', 'DECISION_AID', 'OTHER']),
  attachmentUrls: z.array(z.object({
    filename: z.string(),
    fileType: z.string(),
    fileSize: z.number(),
    fileUrl: z.string().url(),
  })).optional(),
});

// ===== GET - List Requests =====
export async function GET(request: NextRequest) {
  try {
    const userInfo = getUserFromHeaders(new Headers(request.headers));
    
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    
    // Build where clause
    const where: any = {};
    
    // Non-admin users can only see their own requests
    if (userInfo.role !== 'ADMIN') {
      where.userId = userInfo.userId;
    }
    
    // Filter by status
    if (status && status !== 'ALL') {
      where.status = status;
    }
    
    // Filter by type
    if (type && type !== 'ALL') {
      where.requestType = type;
    }
    
    // Get total count
    const total = await prisma.request.count({ where });
    
    // Get requests with pagination
    const requests = await prisma.request.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        _count: {
          select: {
            comments: true,
            attachments: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    
    return NextResponse.json({
      success: true,
      data: requests,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
    
  } catch (error) {
    console.error('List requests error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ===== POST - Create Request =====
export async function POST(request: NextRequest) {
  try {
    const userInfo = getUserFromHeaders(new Headers(request.headers));
    
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const validation = CreateRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid input data',
          details: validation.error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }
    
    const { painPoint, currentWorkflow, expectedTechHelp, requestType, attachmentUrls } = validation.data;
    
    // Create request with attachments in transaction
    const newRequest = await prisma.$transaction(async (tx) => {
      // Create request
      const created = await tx.request.create({
        data: {
          userId: userInfo.userId,
          painPoint,
          currentWorkflow,
          expectedTechHelp,
          requestType,
          status: 'PENDING_REVIEW',
        },
      });
      
      // Create attachments if provided
      if (attachmentUrls && attachmentUrls.length > 0) {
        await tx.attachment.createMany({
          data: attachmentUrls.map((file) => ({
            requestId: created.id,
            filename: file.filename,
            fileType: file.fileType,
            fileSize: file.fileSize,
            fileUrl: file.fileUrl,
          })),
        });
      }
      
      // Fetch complete request with relations
      return await tx.request.findUnique({
        where: { id: created.id },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          attachments: true,
          _count: {
            select: {
              comments: true,
              attachments: true,
            },
          },
        },
      });
    });
    
    console.log(`✅ Request created: ${newRequest?.id} by user: ${userInfo.userId}`);
    
    return NextResponse.json(
      {
        success: true,
        data: newRequest,
        message: 'ส่งคำขอสำเร็จ',
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Create request error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}