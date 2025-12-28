// app/api/requests/[id]/comments/route.ts
// HealthTech Sandbox - Comments API (List & Create)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromHeaders, canCommentOnRequest } from '@/lib/auth-server';
import { z } from 'zod';

// ===== VALIDATION SCHEMA =====

const CreateCommentSchema = z.object({
  content: z.string().min(1, 'กรุณากรอกความคิดเห็น').max(5000, 'ความคิดเห็นยาวเกินไป'),
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
    
    // Check request exists and user has access
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
    
    // Check access (owner or admin)
    const isOwner = requestData.userId === userInfo.userId;
    const isAdmin = userInfo.role === 'ADMIN';
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }
    
    // Get comments
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

// ===== POST - Create Comment =====
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
    
    // Check if user can comment on this request
    const canComment = await canCommentOnRequest(userInfo.userId, userInfo.role, requestId);
    
    if (!canComment) {
      return NextResponse.json(
        { success: false, error: 'คุณไม่มีสิทธิ์แสดงความคิดเห็นในคำขอนี้' },
        { status: 403 }
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
    
    const { content } = validation.data;
    
    // Create comment
    const comment = await prisma.comment.create({
      data: {
        requestId,
        userId: userInfo.userId,
        content,
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
    
    console.log(`✅ Comment created on request ${requestId} by user: ${userInfo.userId}`);
    
    return NextResponse.json(
      {
        success: true,
        data: comment,
        message: 'เพิ่มความคิดเห็นสำเร็จ',
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