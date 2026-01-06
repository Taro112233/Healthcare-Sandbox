// app/api/requests/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromHeaders } from '@/lib/auth-server';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

const CreateRequestSchema = z.object({
  department: z.string().min(1).max(200).trim(),
  painPoint: z.string().min(10).max(5000),
  currentWorkflow: z.string().min(10).max(5000),
  expectedTechHelp: z.string().min(10).max(5000),
  requestType: z.enum(['CALCULATOR', 'FORM', 'WORKFLOW', 'DECISION_AID', 'OTHER']),
  attachmentUrls: z.array(z.object({
    filename: z.string(),
    fileType: z.string(),
    fileSize: z.number(),
    fileUrl: z.string().url(),
  })).optional(),
});

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
    
    const where: Prisma.RequestWhereInput = {};
    
    if (userInfo.role !== 'ADMIN') {
      where.userId = userInfo.userId;
    }
    
    if (status && status !== 'ALL') {
      where.status = status as Prisma.EnumRequestStatusFilter;
    }
    
    if (type && type !== 'ALL') {
      where.requestType = type as Prisma.EnumRequestTypeFilter;
    }
    
    const total = await prisma.request.count({ where });
    
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
    
    const { department, painPoint, currentWorkflow, expectedTechHelp, requestType, attachmentUrls } = validation.data;
    
    const newRequest = await prisma.$transaction(async (tx) => {
      const created = await tx.request.create({
        data: {
          userId: userInfo.userId,
          department,
          painPoint,
          currentWorkflow,
          expectedTechHelp,
          requestType,
          status: 'PENDING_REVIEW',
        },
      });
      
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