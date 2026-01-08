// types/profile.ts
// Profile & User Settings Type Definitions

// ===== FORM DATA =====

export interface ProfileFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfileFormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ProfileValidationResult {
  isValid: boolean;
  errors: ProfileFormErrors;
}

// ===== API REQUEST/RESPONSE =====

export interface UpdateProfileRequest {
  email?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  data?: {
    id: string;
    username: string;
    email: string | null;
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string | null;
    role: 'USER' | 'ADMIN';
    status: string;
    isActive: boolean;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  error?: string;
  message?: string;
}

// ===== VALIDATION HELPERS =====

export interface PasswordStrengthResult {
  isValid: boolean;
  errors: string[];
}

// ===== TYPE GUARDS =====

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isPasswordStrong(password: string): PasswordStrengthResult {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
  }
  
  if (!/[A-Za-z]/.test(password)) {
    errors.push('รหัสผ่านต้องมีตัวอักษรอย่างน้อย 1 ตัว');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}