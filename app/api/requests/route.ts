// app/api/requests/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

// ✅ Define Better Auth User interface
interface BetterAuthUser {
  id: string;
  email: string;
  name: string;
  role?: 'USER' | 'ADMIN';
  firstName?: string;
  lastName?: string;
  phone?: string;
  image?: string;
}

const CreateRequestSchema = z.object({
  department: z.string().min(1).max(200).trim(),
  painPoint: z.string().min(10).max(5000),
  currentWorkflow: z.string().min(10).max(5000),
  expectedTechHelp: z.string().min(10).max(5000),
  requestType: z.enum(['PAGE', 'CALCULATOR', 'FORM', 'WORKFLOW', 'DECISION_AID', 'OTHER']),
  attachmentUrls: z.array(z.object({
    filename: z.string(),
    fileType: z.string(),
    fileSize: z.number(),
    fileUrl: z.string().url(),
  })).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    
    if (!session?.user) {
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
    
    // ✅ Type user properly
    const betterAuthUser = session.user as BetterAuthUser;
    const userRole = betterAuthUser.role || 'USER';
    
    if (userRole !== 'ADMIN') {
      where.userId = session.user.id;
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
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    
    if (!session?.user) {
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
          userId: session.user.id,
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
    
    console.log(`✅ Request created: ${newRequest?.id} by user: ${session.user.id}`);
    
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