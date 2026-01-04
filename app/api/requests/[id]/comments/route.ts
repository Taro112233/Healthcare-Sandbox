// app/api/requests/[id]/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromHeaders, canCommentOnRequest } from '@/lib/auth-server';
import { z } from 'zod';

// ===== VALIDATION SCHEMA =====
const CreateCommentSchema = z.object({
  content: z.string().min(1, 'กรุณากรอกความคิดเห็น').max(5000, 'ความคิดเห็นยาวเกินไป'),
  type: z.enum(['COMMENT', 'STATUS_CHANGE']).optional().default('COMMENT'),
  fromStatus: z.enum([
    'PENDING_REVIEW',
    'UNDER_CONSIDERATION',
    'IN_DEVELOPMENT',
    'IN_TESTING',
    'COMPLETED',
    'BEYOND_CAPACITY',
  ]).optional(),
  toStatus: z.enum([
    'PENDING_REVIEW',
    'UNDER_CONSIDERATION',
    'IN_DEVELOPMENT',
    'IN_TESTING',
    'COMPLETED',
    'BEYOND_CAPACITY',
  ]).optional(),
});

// ===== GET - List Comments =====
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: requestId } = await params;
    const userInfo = getUserFromHeaders(new Headers(request.headers));
    
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const requestData = await prisma.request.findUnique({
      where: { id: requestId },
      select: { userId: true },
    });
    
    if (!requestData) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }
    
    const isOwner = requestData.userId === userInfo.userId;
    const isAdmin = userInfo.role === 'ADMIN';
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }
    
    const comments = await prisma.comment.findMany({
      where: { requestId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({
      success: true,
      data: comments,
      meta: {
        total: comments.length,
      },
    });
    
  } catch (error) {
    console.error('List comments error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ===== POST - Create Comment (รวมทั้ง STATUS_CHANGE) =====
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: requestId } = await params;
    const userInfo = getUserFromHeaders(new Headers(request.headers));
    
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const validation = CreateCommentSchema.safeParse(body);
    
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
    
    const { content, type, fromStatus, toStatus } = validation.data;
    
    // ✅ ตรวจสอบสิทธิ์
    if (type === 'STATUS_CHANGE') {
      // เฉพาะ Admin เท่านั้นที่เปลี่ยนสถานะได้
      if (userInfo.role !== 'ADMIN') {
        return NextResponse.json(
          { success: false, error: 'เฉพาะ Admin เท่านั้นที่เปลี่ยนสถานะได้' },
          { status: 403 }
        );
      }
      
      if (!fromStatus || !toStatus) {
        return NextResponse.json(
          { success: false, error: 'ต้องระบุ fromStatus และ toStatus' },
          { status: 400 }
        );
      }
    } else {
      // ความคิดเห็นทั่วไป - ต้องมีสิทธิ์ comment
      const canComment = await canCommentOnRequest(userInfo.userId, userInfo.role, requestId);
      
      if (!canComment) {
        return NextResponse.json(
          { success: false, error: 'คุณไม่มีสิทธิ์แสดงความคิดเห็นในคำขอนี้' },
          { status: 403 }
        );
      }
    }
    
    // ✅ ถ้าเป็น STATUS_CHANGE - อัปเดตสถานะ Request ด้วย
    const comment = await prisma.$transaction(async (tx) => {
      // 1. Create comment
      const newComment = await tx.comment.create({
        data: {
          requestId,
          userId: userInfo.userId,
          content,
          type,
          fromStatus: type === 'STATUS_CHANGE' ? fromStatus : null,
          toStatus: type === 'STATUS_CHANGE' ? toStatus : null,
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      });
      
      // 2. ถ้าเป็น STATUS_CHANGE - อัปเดตสถานะ Request
      if (type === 'STATUS_CHANGE' && toStatus) {
        await tx.request.update({
          where: { id: requestId },
          data: { status: toStatus },
        });
      }
      
      return newComment;
    });
    
    console.log(`✅ Comment created (type: ${type}) on request ${requestId} by user: ${userInfo.userId}`);
    
    return NextResponse.json(
      {
        success: true,
        data: comment,
        message: type === 'STATUS_CHANGE' ? 'อัปเดทสถานะสำเร็จ' : 'เพิ่มความคิดเห็นสำเร็จ',
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}