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
    
    // ✅ Fetch request with proper user data selection
    const requestData = await prisma.request.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,        // ✅ Better Auth uses 'name' field
            email: true,
            phone: true,
            // ✅ Add these if they exist in your schema
            firstName: true,
            lastName: true,
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
                name: true,    // ✅ Better Auth uses 'name'
                role: true,
                // ✅ Add these if needed
                firstName: true,
                lastName: true,
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
                name: true,    // ✅ Better Auth uses 'name'
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
    
    // ✅ Transform user data to include fullName
    const transformedRequest = {
      ...requestData,
      user: requestData.user ? {
        ...requestData.user,
        fullName: requestData.user.name || 
                  `${requestData.user.firstName || ''} ${requestData.user.lastName || ''}`.trim(),
      } : null,
      comments: requestData.comments.map(comment => ({
        ...comment,
        user: comment.user ? {
          ...comment.user,
          fullName: comment.user.name ||
                    `${comment.user.firstName || ''} ${comment.user.lastName || ''}`.trim(),
        } : null,
      })),
    };
    
    return NextResponse.json({
      success: true,
      data: transformedRequest,
    });
    
  } catch (error) {
    console.error('Get request detail error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}