// components/ProfileForm/index.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Lock } from 'lucide-react';
import type { CurrentUser } from '@/hooks/useCurrentUser';
import { BasicInfoForm } from './BasicInfoSection';
import { PasswordForm } from './PasswordSection';

interface ProfileFormProps {
  user: CurrentUser;
  onSuccess: () => void;
}

export function ProfileForm({ user, onSuccess }: ProfileFormProps) {
  const [activeTab, setActiveTab] = useState<string>('basic-info');

  return (
    <Card>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger 
              value="basic-info" 
              className="flex items-center gap-2 data-[state=active]:bg-background"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">ข้อมูลส่วนตัว</span>
              <span className="sm:hidden">ข้อมูล</span>
            </TabsTrigger>
            <TabsTrigger 
              value="password" 
              className="flex items-center gap-2 data-[state=active]:bg-background"
            >
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">เปลี่ยนรหัสผ่าน</span>
              <span className="sm:hidden">รหัสผ่าน</span>
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="basic-info" className="mt-0">
              <BasicInfoForm user={user} onSuccess={onSuccess} />
            </TabsContent>

            <TabsContent value="password" className="mt-0">
              <PasswordForm user={user} onSuccess={onSuccess} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}