// lib/role-helpers.ts
// NextHealTH Sandbox - Role Management Helper Functions (Simplified)
// ============================================

// ===== ROLE DEFINITIONS (Simplified - No Multi-tenant) =====
export const VALID_ROLES = ['USER', 'ADMIN'] as const;
export type UserRole = typeof VALID_ROLES[number];

// ===== VALIDATION =====

/**
 * Validate if role is valid
 */
export function isValidRole(role: string): role is UserRole {
  return VALID_ROLES.includes(role as UserRole);
}

/**
 * Get role hierarchy level (higher = more power)
 */
export function getRoleHierarchy(role: UserRole): number {
  const hierarchy: Record<UserRole, number> = { 
    USER: 1, 
    ADMIN: 2, 
  };
  return hierarchy[role];
}

/**
 * Check if user is admin
 */
export function isAdmin(role: UserRole | string): boolean {
  return role === 'ADMIN';
}

/**
 * Check if user is regular user
 */
export function isUser(role: UserRole | string): boolean {
  return role === 'USER';
}

// ===== PERMISSION CHECKING =====

/**
 * Check if user has permission for action
 */
export function hasPermission(
  userRole: UserRole,
  action: string
): boolean {
  // User permissions (also available to admin)
  const userActions = [
    'request.create',
    'request.view_own',
    'request.edit_own',
    'comment.create_own',
    'comment.view_own',
    'profile.view',
    'profile.edit',
  ];
  
  // Admin can do everything
  if (userRole === 'ADMIN') {
    return true;
  }
  
  // User can only do user-level actions
  if (userRole === 'USER') {
    return userActions.includes(action);
  }
  
  return false;
}

/**
 * Check if user can access request
 * USER: only own requests
 * ADMIN: all requests
 */
export function canAccessRequest(
  userRole: UserRole,
  requestOwnerId: string,
  currentUserId: string
): boolean {
  if (userRole === 'ADMIN') return true;
  return requestOwnerId === currentUserId;
}

/**
 * Check if user can comment on request
 * USER: only own requests
 * ADMIN: all requests
 */
export function canCommentOnRequest(
  userRole: UserRole,
  requestOwnerId: string,
  currentUserId: string
): boolean {
  if (userRole === 'ADMIN') return true;
  return requestOwnerId === currentUserId;
}

/**
 * Check if user can change request status
 * Only ADMIN can change status
 */
export function canChangeStatus(userRole: UserRole): boolean {
  return userRole === 'ADMIN';
}

// ===== DISPLAY HELPERS =====

/**
 * Get role display information
 */
export function getRoleInfo(role: UserRole) {
  const roleInfo: Record<UserRole, {
    label: string;
    labelTh: string;
    color: string;
    bgColor: string;
    textColor: string;
    icon: string;
    description: string;
  }> = {
    USER: {
      label: 'USER',
      labelTh: 'ผู้ใช้',
      color: 'gray',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      icon: 'User',
      description: 'ส่ง Request และดู Request ของตัวเอง',
    },
    ADMIN: {
      label: 'ADMIN',
      labelTh: 'ผู้ดูแลระบบ',
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      icon: 'Shield',
      description: 'จัดการทุก Request และเปลี่ยนสถานะได้',
    },
  };
  
  return roleInfo[role];
}

/**
 * Get role badge classes for UI
 */
export function getRoleBadgeClasses(role: UserRole): string {
  const classes: Record<UserRole, string> = {
    USER: 'bg-gray-100 text-gray-700 border-gray-300',
    ADMIN: 'bg-blue-100 text-blue-700 border-blue-300',
  };
  
  return classes[role];
}

/**
 * Get Thai label for role
 */
export function getRoleLabel(role: UserRole, locale: 'en' | 'th' = 'th'): string {
  const labels: Record<UserRole, { en: string; th: string }> = {
    USER: { en: 'User', th: 'ผู้ใช้' },
    ADMIN: { en: 'Admin', th: 'ผู้ดูแลระบบ' },
  };
  
  return labels[role][locale];
}