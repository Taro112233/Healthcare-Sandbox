// app/api/requests/[id]/route.ts
// HealthTech Sandbox - Single Request API (Detail & Update)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromHeaders, checkRequestOwnership } from '@/lib/auth-server';

// ===== GET - Request Detail =====
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userInfo = getUserFromHeaders(new Headers(request.headers));
    
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check ownership/access
    const accessCheck = await checkRequestOwnership(userInfo.userId, userInfo.role, id);
    
    if (!accessCheck.request) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }
    
    if (!accessCheck.hasAccess) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }
    
    // Fetch full request with all relations
    const requestData = await prisma.request.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true, 
          },
        },
        attachments: {
          orderBy: { uploadedAt: 'desc' },
        },
        comments: {
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
        },
        _count: {
          select: {
            comments: true,
            attachments: true,
          },
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      data: requestData,
    });
    
  } catch (error) {
    console.error('Get request detail error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ===== PATCH - Update Request (Admin only for status) =====
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userInfo = getUserFromHeaders(new Headers(request.headers));
    
    if (!userInfo) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Only admin can update requests
    if (userInfo.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    // Check request exists
    const existingRequest = await prisma.request.findUnique({
      where: { id },
    });
    
    if (!existingRequest) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }
    
    const body = await request.json();
    const { status, note } = body;
    
    // Validate status
    const validStatuses = [
      'PENDING_REVIEW',
      'UNDER_CONSIDERATION',
      'IN_DEVELOPMENT',
      'IN_TESTING',
      'COMPLETED',
      'BEYOND_CAPACITY',
    ];
    
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }
    
    // Update request and create status history in transaction
    const updatedRequest = await prisma.$transaction(async (tx) => {
      // Create status history if status changed
      if (status && status !== existingRequest.status) {
        await tx.statusHistory.create({
          data: {
            requestId: id,
            fromStatus: existingRequest.status,
            toStatus: status,
            changedBy: userInfo.userId,
            note: note || null,
          },
        });
      }
      
      // Update request
      return await tx.request.update({
        where: { id },
        data: {
          ...(status && { status }),
        },
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
            take: 5,
          },
        },
      });
    });
    
    console.log(`✅ Request ${id} updated by admin: ${userInfo.userId}`);
    
    return NextResponse.json({
      success: true,
      data: updatedRequest,
      message: 'อัพเดทสถานะสำเร็จ',
    });
    
  } catch (error) {
    console.error('Update request error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}