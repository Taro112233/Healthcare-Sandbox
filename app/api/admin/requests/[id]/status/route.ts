// app/api/admin/requests/[id]/status/route.ts
// HealthTech Sandbox - Admin Status Change API

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromHeaders } from '@/lib/auth-server';
import { z } from 'zod';

// ===== VALIDATION SCHEMA =====

const UpdateStatusSchema = z.object({
  status: z.enum([
    'PENDING_REVIEW',
    'UNDER_CONSIDERATION',
    'IN_DEVELOPMENT',
    'IN_TESTING',
    'COMPLETED',
    'BEYOND_CAPACITY',
  ]),
  note: z.string().max(1000).optional(),
});

// ===== PATCH - Update Status (Admin Only) =====
export async function PATCH(
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
    
    // Admin only
    if (userInfo.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    // Check request exists
    const existingRequest = await prisma.request.findUnique({
      where: { id: requestId },
    });
    
    if (!existingRequest) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }
    
    // Validate body
    const body = await request.json();
    const validation = UpdateStatusSchema.safeParse(body);
    
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
    
    const { status, note } = validation.data;
    
    // Skip if status unchanged
    if (status === existingRequest.status) {
      return NextResponse.json({
        success: true,
        data: existingRequest,
        message: 'สถานะไม่เปลี่ยนแปลง',
      });
    }
    
    // Update status with history in transaction
    const updatedRequest = await prisma.$transaction(async (tx) => {
      // Create status history
      await tx.statusHistory.create({
        data: {
          requestId,
          fromStatus: existingRequest.status,
          toStatus: status,
          changedBy: userInfo.userId,
          note: note || null,
        },
      });
      
      // Update request status
      return await tx.request.update({
        where: { id: requestId },
        data: { status },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          statusHistory: {
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
            orderBy: { changedAt: 'desc' },
            take: 10,
          },
          _count: {
            select: {
              comments: true,
              attachments: true,
            },
          },
        },
      });
    });
    
    console.log(`✅ Status changed: ${existingRequest.status} → ${status} by admin: ${userInfo.userId}`);
    
    return NextResponse.json({
      success: true,
      data: updatedRequest,
      message: 'อัพเดทสถานะสำเร็จ',
    });
    
  } catch (error) {
    console.error('Update status error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}