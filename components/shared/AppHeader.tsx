// components/shared/AppHeader.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Stethoscope,
  Plus,
  LogOut,
  User,
  Shield,
  LayoutDashboard,
} from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { ThemeToggle } from '@/components/theme-toggle';

export function AppHeader() {
  const router = useRouter();
  const { user, logout } = useCurrentUser();

  const getUserInitials = () => {
    if (!user) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">HealthTech Sandbox</h1>
              <p className="text-xs text-muted-foreground">Technology Request Platform</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle - Always visible */}
            <ThemeToggle />

            {user && (
              <>
                {/* New Request Button */}
                <Link href="/requests/new">
                  <Button className="hidden sm:flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
                    <Plus className="w-4 h-4" />
                    ส่งคำขอใหม่
                  </Button>
                  <Button size="icon" className="sm:hidden bg-teal-600 hover:bg-teal-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-sm">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:flex flex-col items-start">
                        <span className="text-sm font-medium text-foreground">
                          {user.fullName}
                        </span>
                        <div className="flex items-center gap-1">
                          {user.role === 'ADMIN' ? (
                            <Badge variant="outline" className="text-xs px-1.5 py-0 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                              <Shield className="w-3 h-3 mr-1" />
                              Admin
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">@{user.username}</span>
                          )}
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.fullName}</span>
                        <span className="text-xs text-muted-foreground font-normal">@{user.username}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      คำขอของฉัน
                    </DropdownMenuItem>

                    {user.role === 'ADMIN' && (
                      <DropdownMenuItem onClick={() => router.push('/admin')}>
                        <Shield className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem onClick={() => router.push('/dashboard/settings/profile')}>
                      <User className="w-4 h-4 mr-2" />
                      ตั้งค่าโปรไฟล์
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/20"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      ออกจากระบบ
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {!user && (
              <Link href="/login">
                <Button>เข้าสู่ระบบ</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}