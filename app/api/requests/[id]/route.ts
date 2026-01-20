// app/api/requests/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Fetch request
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
    
    if (!requestData) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }
    
    // Check access
    const userRole = (session.user as any).role || 'USER';
    const hasAccess = userRole === 'ADMIN' || requestData.userId === session.user.id;
    
    if (!hasAccess) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }
    
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const userRole = (session.user as any).role || 'USER';
    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }
    
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
    
    const updatedRequest = await prisma.$transaction(async (tx) => {
      if (status && status !== existingRequest.status) {
        await tx.statusHistory.create({
          data: {
            requestId: id,
            fromStatus: existingRequest.status,
            toStatus: status,
            changedBy: session.user.id,
            note: note || null,
          },
        });
      }
      
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
    
    console.log(`✅ Request ${id} updated by admin: ${session.user.id}`);
    
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