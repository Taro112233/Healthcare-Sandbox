// app/api/auth/logout/route.ts
// HealthTech Sandbox - Logout API (Simplified)

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🚪 Logout request received');
    
    // ✅ Simple logout: Clear cookie and return success
    const response = NextResponse.json({ 
      success: true, 
      message: 'ออกจากระบบสำเร็จ' 
    });
    
    // Clear auth cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    console.log('✅ Logout successful');
    return response;
    
  } catch (error) {
    console.error('Logout error:', error);
    
    // ✅ Even on error, clear the cookie
    const response = NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      message: 'เกิดข้อผิดพลาดในการออกจากระบบ'
    }, { status: 500 });
    
    // Force clear cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });
    
    return response;
  }
}

// Disallow GET method
export async function GET() {
  return NextResponse.json({ 
    success: false, 
    error: 'Method not allowed',
    message: 'กรุณาใช้ POST method'
  }, { status: 405 });
}