// app/api/admin/stats/route.ts
// HealthTech Sandbox - Admin Dashboard Stats API

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromHeaders } from '@/lib/auth-server';

// ===== GET - Dashboard Stats (Admin Only) =====
export async function GET(request: NextRequest) {
  try {
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
    
    // Get counts by status
    const [
      total,
      pendingReview,
      underConsideration,
      inDevelopment,
      inTesting,
      completed,
      beyondCapacity,
    ] = await Promise.all([
      prisma.request.count(),
      prisma.request.count({ where: { status: 'PENDING_REVIEW' } }),
      prisma.request.count({ where: { status: 'UNDER_CONSIDERATION' } }),
      prisma.request.count({ where: { status: 'IN_DEVELOPMENT' } }),
      prisma.request.count({ where: { status: 'IN_TESTING' } }),
      prisma.request.count({ where: { status: 'COMPLETED' } }),
      prisma.request.count({ where: { status: 'BEYOND_CAPACITY' } }),
    ]);
    
    // Get counts by type
    const [
      calculatorCount,
      formCount,
      workflowCount,
      decisionAidCount,
      otherCount,
    ] = await Promise.all([
      prisma.request.count({ where: { requestType: 'CALCULATOR' } }),
      prisma.request.count({ where: { requestType: 'FORM' } }),
      prisma.request.count({ where: { requestType: 'WORKFLOW' } }),
      prisma.request.count({ where: { requestType: 'DECISION_AID' } }),
      prisma.request.count({ where: { requestType: 'OTHER' } }),
    ]);
    
    // Get recent activity counts
    const now = new Date();
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const [
      requestsLast7Days,
      requestsLast30Days,
      commentsLast7Days,
      statusChangesLast7Days,
    ] = await Promise.all([
      prisma.request.count({ where: { createdAt: { gte: last7Days } } }),
      prisma.request.count({ where: { createdAt: { gte: last30Days } } }),
      prisma.comment.count({ where: { createdAt: { gte: last7Days } } }),
      prisma.statusHistory.count({ where: { changedAt: { gte: last7Days } } }),
    ]);
    
    // Get user stats
    const [totalUsers, activeUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true, status: 'ACTIVE' } }),
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        requests: {
          total,
          byStatus: {
            pendingReview,
            underConsideration,
            inDevelopment,
            inTesting,
            completed,
            beyondCapacity,
          },
          byType: {
            calculator: calculatorCount,
            form: formCount,
            workflow: workflowCount,
            decisionAid: decisionAidCount,
            other: otherCount,
          },
        },
        activity: {
          requestsLast7Days,
          requestsLast30Days,
          commentsLast7Days,
          statusChangesLast7Days,
        },
        users: {
          total: totalUsers,
          active: activeUsers,
        },
      },
    });
    
  } catch (error) {
    console.error('Get admin stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}