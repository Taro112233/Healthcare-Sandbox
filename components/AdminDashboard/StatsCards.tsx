// components/AdminDashboard/StatsCards.tsx
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Clock, 
  Code2, 
  CheckCircle2, 
  Users,
  MessageSquare,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface AdminStats {
  requests: {
    total: number;
    byStatus: {
      pendingReview: number;
      underConsideration: number;
      inDevelopment: number;
      inTesting: number;
      completed: number;
      beyondCapacity: number;
    };
  };
  activity: {
    requestsLast7Days: number;
    requestsLast30Days: number;
    commentsLast7Days: number;
    statusChangesLast7Days: number;
  };
  users: {
    total: number;
    active: number;
  };
}

interface StatsCardsProps {
  stats: AdminStats | null;
  isLoading?: boolean;
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  color: 'blue' | 'yellow' | 'purple' | 'green' | 'gray' | 'orange';
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900',
    yellow: 'bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400 border-yellow-100 dark:border-yellow-900',
    purple: 'bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900',
    green: 'bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900',
    gray: 'bg-muted text-muted-foreground border-border',
    orange: 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900',
  };

  const iconBgClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30',
    purple: 'bg-purple-100 dark:bg-purple-900/30',
    green: 'bg-green-100 dark:bg-green-900/30',
    gray: 'bg-muted-foreground/10',
    orange: 'bg-orange-100 dark:bg-orange-900/30',
  };

  return (
    <Card className={`${colorClasses[color]} border`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium opacity-80">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {trend && (
              <p className="text-xs mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {trend.value} {trend.label}
              </p>
            )}
          </div>
          <div className={`p-2 rounded-lg ${iconBgClasses[color]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCardSkeleton() {
  return (
    <Card className="border border-border">
      <CardContent className="p-4 animate-pulse">
        <div className="flex items-start justify-between">
          <div>
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-8 w-16 bg-muted rounded mt-2" />
          </div>
          <div className="w-10 h-10 bg-muted rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const { requests, activity, users } = stats;

  const inProgress = 
    requests.byStatus.underConsideration + 
    requests.byStatus.inDevelopment + 
    requests.byStatus.inTesting;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="คำขอทั้งหมด"
          value={requests.total}
          icon={<FileText className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="รอตรวจสอบ"
          value={requests.byStatus.pendingReview}
          icon={<Clock className="w-5 h-5" />}
          color="yellow"
        />
        <StatCard
          title="กำลังดำเนินการ"
          value={inProgress}
          icon={<Code2 className="w-5 h-5" />}
          color="purple"
        />
        <StatCard
          title="สำเร็จ"
          value={requests.byStatus.completed}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="green"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="ผู้ใช้งาน"
          value={users.active}
          icon={<Users className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="คำขอ (7 วัน)"
          value={activity.requestsLast7Days}
          icon={<TrendingUp className="w-5 h-5" />}
          color="green"
        />
        <StatCard
          title="ความคิดเห็น (7 วัน)"
          value={activity.commentsLast7Days}
          icon={<MessageSquare className="w-5 h-5" />}
          color="orange"
        />
        <StatCard
          title="เกินความสามารถ"
          value={requests.byStatus.beyondCapacity}
          icon={<AlertCircle className="w-5 h-5" />}
          color="gray"
        />
      </div>
    </div>
  );
}